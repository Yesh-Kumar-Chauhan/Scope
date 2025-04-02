import React, { memo, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../../../../common/addPageNumber';
import autoTable from 'jspdf-autotable';
import { fetchAllDistrict } from '../../../../../apis/districtsApi';
import { fetchAllSites } from '../../../../../apis/sitesApi';
import { fetchSchedular } from '../../../../../apis/personnelApi';
import { any } from 'zod';

interface TimesheetEntry {
    LASTNAME?: string;
    FIRSTNAME?: string;
    SitePos?: string;
    DIST_NAM?: string;
    DIST_NUM?: number;
    Max_Hours?: number;
    SITE_NAM?: string;
    Schedule?: string;
}

const groupByDistrictSiteNameAndPosition = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const districtKey = `${item.DIST_NAM}-${item.position}-${item.districtID}`;
        // const districtKey = `${item.distNam}`;
        if (!acc[districtKey]) {
            acc[districtKey] = {
                distNam: item.distNam,
                position: item.position,
                districtID: item.districtID,
                distNum: item.distNum,
                sites: {}
            };
        }

        const siteKey = item.siteName;
        if (!acc[districtKey].sites[siteKey]) {
            acc[districtKey].sites[siteKey] = {
                siteName: item.siteName,
                items: []
            };
        }

        acc[districtKey].sites[siteKey].items.push(item);
        return acc;
    }, {});
};

const calculateTotalHours = (timeIn: string, timeOut: string) => {
    if (!timeIn || !timeOut || timeIn == "0" || timeOut == "0") {
        return 0; // Return 0 if either time is missing
    }
    debugger;
    const [inHour, inMinute] = timeIn.split(':').map(Number);
    const [outHour, outMinute] = timeOut
        ? timeOut.split(':').map(Number)
        : [0, 0];

    const inTime = new Date();
    inTime.setHours(inHour, inMinute, 0); // set to timeIn
    const outTime = new Date();
    outTime.setHours(outHour, outMinute, 0); // set to timeOut
    const diffInMilliseconds = outTime.getTime() - inTime.getTime();
    return diffInMilliseconds / (1000 * 60 * 60) < 0 ? Math.abs(diffInMilliseconds / (1000 * 60 * 60))+ 12 : diffInMilliseconds / (1000 * 60 * 60); // Return the difference in hours
};

const mapEmployeeDataToDays = (employees: any[], excelEndDate: any, siteEmployees: any, updatedEmployees: any, weekOffset: number) => {
    const currentDate = moment().add(weekOffset, 'weeks');;
    const startOfCurrentWeek = moment(excelEndDate).subtract(1, 'week').startOf('week');
    const startOfPreviousWeek = moment(excelEndDate).subtract(2, 'week').startOf('week');
    const endOfPreviousWeek = moment(excelEndDate).subtract(2, 'week').endOf('week');

    const sortedEmployees = [...employees].sort((a, b) =>
        moment(a.timeSheetDate).valueOf() - moment(b.timeSheetDate).valueOf()
    );
    const dayMap = new Map();
    sortedEmployees.forEach((emp) => {
        if (emp?.timeSheetDate) {
            const empDate = moment(emp.timeSheetDate);
            const dayOfWeek = empDate.format('ddd');
            let weekKey = '';
            if (empDate.isBetween(startOfPreviousWeek, endOfPreviousWeek, 'day', '[]')) {
                weekKey = `${dayOfWeek}-prev`;
            } else if (empDate.isSame(startOfCurrentWeek, 'week')) {
                weekKey = `${dayOfWeek}-curr`;
            }
            if (weekKey) {
                if (!dayMap.has(weekKey)) {
                    dayMap.set(weekKey, {
                        regularHours: [],
                        additionalHours: []
                    });
                }

                // const timeIn = !emp?.timeIn && !emp?.timeOut && !emp?.additionalStart && !emp?.additionalStop ? "0" : emp.timeIn;
                // const timeOut = !emp?.timeIn && !emp?.timeOut && !emp?.additionalStart && !emp?.additionalStop ? "0" : emp.timeOut;
                // const additionalStart = !emp?.timeIn && !emp?.timeOut && !emp?.additionalStart && !emp?.additionalStop ? "0" : emp.additionalStart;
                // const additionalStop = !emp?.timeIn && !emp?.timeOut && !emp?.additionalStart && !emp?.additionalStop ? "0" : emp.additionalStop;
                const entry = {
                    date: empDate.format('MM/DD/YYYY'),
                    timeIn: emp?.status == 'Absent' ? "Absent" : emp.timeIn || '',
                    timeOut: emp?.status == 'Absent' ? "Absent" : emp.timeOut || '',
                    additionalStart: emp?.status == 'Absent' ? "Absent" : emp.additionalStart || '',
                    additionalStop: emp?.status == 'Absent' ? "Absent" : emp.additionalStop || '',
                    siteName: siteEmployees[0]?.siteName || emp?.siteName || '',
                    position: siteEmployees[0]?.position || emp?.position || '',
                    code: emp?.status == 'Absent' ? emp?.reasonId : siteEmployees[0]?.paycode || emp?.paycode || '',
                    distNum: siteEmployees[0]?.distNumber || emp.distNumber || '',
                    lunchIn: emp?.lunchIn || '',
                    lunchOut: emp?.lunchOut || '',
                    paycode: emp.paycode,
                    hours: emp.status == 'Absent' ? '0' : emp.timeIn && emp.timeOut ? calculateTotalHours(emp.timeIn, emp.timeOut).toFixed(2) : !emp?.timeIn && !emp?.timeOut && !emp?.additionalStart && !emp?.additionalStop ? '0' : ''
                };

                if (emp.paycode) {
                    dayMap.get(weekKey).additionalHours.push(entry);
                } else {
                    dayMap.get(weekKey).regularHours.push(entry);
                }
            }
        }
    });

    return dayMap;
};

const constructHoursWorkedData = (employees: any[], excelEndDate: any, siteEmployees: any, updatedEmployees: any, weekOffset: number) => {
    const dayMap = mapEmployeeDataToDays(employees, excelEndDate, siteEmployees, updatedEmployees, weekOffset);
    const baseDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hoursWorkedData: any[][] = [];
    const additionalHoursData: any[][] = [];

    // Process both weeks
    ['prev', 'curr'].forEach(week => {
        baseDays.forEach(day => {
            const dayKey = `${day}-${week}`;
            const dayData = dayMap.get(dayKey);

            if (!dayData) {
                // If no data exists for this day, add empty rows
                hoursWorkedData.push([day, '', '', '', '', '', '', '']);
                additionalHoursData.push(['', '', '', '', '', '', '', '']);
                return;
            }

            // Add regular hours entries
            if (dayData.regularHours.length > 0) {
                dayData.regularHours.forEach((entry: any, index: any) => {
                    // const timeIn = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.timeIn;
                    // const timeOut = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.timeOut;
                    hoursWorkedData.push([
                        index === 0 ? day : '', // Only show day label for first entry
                        entry.date,
                        entry.timeIn,
                        entry.timeOut,
                        entry.code,
                        entry.hours
                    ]);
                });
            } else {
                hoursWorkedData.push([day, '', '', '', '', '', '', '']);
            }

            // Add additional hours entries
            if (dayData.additionalHours.length > 0) {
                dayData.additionalHours.forEach((entry: any) => {
                    // const additionalStart = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.additionalStart;
                    // const additionalStop = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.additionalStop;
                    additionalHoursData.push([
                        entry.date,
                        entry.additionalStart,
                        entry.additionalStop,
                        entry.siteName,
                        entry.position,
                        entry.code,
                        entry.distNum,
                        // entry.hours
                        calculateTotalHours(entry.additionalStart, entry.additionalStop).toFixed(2)
                    ]);
                });
            } else {
                additionalHoursData.push(['', '', '', '', '', '', '', '']);
            }
        });
    });

    return { hoursWorkedData, additionalHoursData };
};

const generateSinglePDF = async (
    doc: any,
    personnelData: any,
    employees: any[],
    pdfEndDate: any,
    regularData: any,
    siteEmployees: any,
    updatedEmployees: any,
    weekOffset: number,
    isPaycode: boolean
) => {

    const totalHoursData = employees.reduce(
        (totals: { totalHoursWorked: number; totalAdditionalHours: number }, emp: any) => {
            const hoursWorked = calculateTotalHours(emp?.timeIn, emp?.timeOut);

            if (emp.paycode && emp.paycode.trim() !== "") {
                // Add to additional hours if paycode is present and not empty
                //totals.totalAdditionalHours += hoursWorked;
            } else {
                // Add to regular hours worked
                totals.totalHoursWorked += hoursWorked;
            }

            return totals;
        },
        { totalHoursWorked: 0, totalAdditionalHours: 0 } // Initial values
    );
    const additionalHoursData = employees.reduce(
        (totals: { totalHoursWorked: number; totalAdditionalHours: number }, emp: any) => {
            const hoursWorked = calculateTotalHours(emp.additionalStart, emp.additionalStop);

            if (emp.paycode && emp.paycode.trim() !== "") {
                // Add to additional hours if paycode is present and not empty
                totals.totalAdditionalHours += hoursWorked;
            }
            return totals;
        },
        { totalAdditionalHours: 0 } // Initial values
    );
    const { totalHoursWorked } = totalHoursData;
    const { totalAdditionalHours } = additionalHoursData;
    let totalLateness = 0;
    let totalAbsence = 0;
    let totalLeftEarly = 0;

    employees.forEach((entry: any) => {
        const { timeIn, timeOut, siteTimeIn, siteTimeOut, timeSheetDate, additionalStart, additionalStop } = entry;

        // Convert time strings to Date objects
        const timeInDate = timeIn ? new Date(`${timeSheetDate.substring(0, 10)}T${timeIn}`) : null;
        const timeOutDate = timeOut ? new Date(`${timeSheetDate.substring(0, 10)}T${timeOut}`) : null;
        const additionalStartDate = additionalStart ? new Date(`${timeSheetDate.substring(0, 10)}T${additionalStart}`) : null;
        const additionalStopDate = additionalStop ? new Date(`${timeSheetDate.substring(0, 10)}T${additionalStop}`) : null;
        const siteTimeInDate = new Date(`${timeSheetDate.substring(0, 10)}T${siteTimeIn}`);
        const siteTimeOutDate = new Date(`${timeSheetDate.substring(0, 10)}T${siteTimeOut}`);

        // Check for totalAbsence
        if (!timeInDate && !timeOutDate && !additionalStartDate && !additionalStopDate) {
            totalAbsence++;
        } else {
            // Check for totalLateness
            if ((timeInDate && timeInDate > siteTimeInDate) || (additionalStartDate && additionalStartDate > siteTimeInDate)) {
                totalLateness++;
            }
            // Check for totalLeftEarly
            if ((timeOutDate && timeOutDate < siteTimeOutDate) || (additionalStopDate && additionalStopDate < siteTimeOutDate)) {
                totalLeftEarly++;
            }
        }
    });

    const pageWidth = doc.internal.pageSize.width + 40;
    const margin = 10;
    let y = margin;

    // Header section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text("SCOPE Employee - Time Sheet", margin, y);
    y += 9;

    doc.setFontSize(12);
    doc.text("Name:", margin, y);
    doc.text(`${siteEmployees[0]?.personel?.firstname || personnelData?.firstname} ${siteEmployees[0]?.personel?.lastname || personnelData?.lastname}`, margin + 20, y);
    doc.text("Position:", pageWidth / 2, y);
    doc.text(`${siteEmployees[0]?.position || employees[0]?.position}`, pageWidth / 2 + 30, y);
    y += 7;

    doc.text("District:", margin, y);
    doc.text(`${siteEmployees[0]?.distName || employees[0]?.distNam}`, margin + 20, y);
    doc.text("Budget Code:", pageWidth / 2, y);
    doc.text(String(siteEmployees[0]?.distNumber || employees[0]?.distNum) || "", pageWidth / 2 + 30, y);
    y += 7;

    // doc.text("Max Hours:", margin, y);
    // doc.text(`${personnelData?.Max_Hours ? personnelData?.Max_Hours : '0'} a week`, margin + 22, y);
    doc.text("Program:", margin, y);
    doc.text(`${siteEmployees[0]?.siteName || employees[0]?.siteName}`, margin + 22, y);
    // doc.text("Program:", pageWidth / 2, y);
    // doc.text(`${regularData[0].siteName||employees[0]?.siteName}`, pageWidth / 2 + 30, y);
    y += 7;

    doc.text("Schedule:", margin, y);
    doc.text(`${personnelData?.Schedule || ''}`, margin + 20, y);
    y += 7;
    doc.text("Comment:", margin, y);
    doc.text(`${personnelData?.comment}`, margin + 20, y);
    y += 5;

    doc.text(`IMPORTANT NOTE: You may be assigned additional hours or a location change which you must accommodate in order to meet legally required \nstaff to student ratio.`, margin, y);
    y += 5;

    // Add hours worked table
    const programHours = constructHoursWorkedData(employees, pdfEndDate, siteEmployees, updatedEmployees, weekOffset).hoursWorkedData;
    const additionalHours = constructHoursWorkedData(employees, pdfEndDate, siteEmployees, updatedEmployees, weekOffset).additionalHoursData;
    // const additionalHours = Array(10).fill(['', '', '', '', '', '']);

    const hasProgramHours = programHours.some(row =>
        row.slice(1).some(cell => cell.trim() !== '') // Ignore the first column (day names)
    );
    const hasAdditionalHours = additionalHours.some(row => row.some(cell => cell !== ''));

    // Add tables and bottom section (reuse existing code)
    doc.setFont("helvetica", "bold");
        if (isPaycode) {
        doc.text("Hours Worked", margin + 110, y + 8);
        doc.setFontSize(10);
        doc.text("(Record Actual time worked)", margin + 100, y + 12);
        }else{
        doc.text("Additional Hours / Extra Pay", margin + 110, y + 8);
        doc.text("(Record Actual time worked)", margin + 115, y + 12);

        }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add the tables
    // if (hasProgramHours && !hasAdditionalHours) {
    //     autoTable(doc, {
    //         startY: y + 14,
    //         head: [
    //             [
    //                 { content: '', styles: { fillColor: false } },
    //                 { content: 'Date', styles: { fillColor: false } },
    //                 { content: 'In', styles: { fillColor: false } },
    //                 { content: 'Out', styles: { fillColor: false } },
    //                 // { content: 'Lunch Out' },
    //                 // { content: 'Lunch In' },
    //                 { content: 'Code' },
    //                 { content: '#Hours', styles: { fillColor: false } }
    //             ]
    //         ],
    //         body: programHours,
    //         theme: 'grid',
    //         margin: { right: 180 },
    //         styles: {
    //             fontSize: 8,
    //             cellPadding: 1,
    //             lineColor: 40,
    //             lineWidth: 0.1,
    //         },
    //         headStyles: {
    //             fontStyle: 'normal',
    //             textColor: 0,
    //             fillColor: false,
    //         },
    //         columnStyles: {
    //             0: { cellWidth: 40 }, // Day column
    //             1: { cellWidth: 50 }, // Date column
    //             2: { cellWidth: 50 }, // In column
    //             3: { cellWidth: 50 },
    //             4: { cellWidth: 40 },
    //             5: { cellWidth: 40 },
    //         },
    //         didDrawCell: (data: { column: { index: number; }; row: { index: number; }; cell: { x: number; y: number; height: any; }; }) => {
    //             // Add vertical lines for grid
    //             if (data.column.index === 0 && data.row.index === -1) {
    //                 doc.setLineWidth(0.1);
    //                 doc.line(
    //                     data.cell.x,
    //                     data.cell.y,
    //                     data.cell.x,
    //                     data.cell.y + data.cell.height
    //                 );
    //             }
    //         },
    //     });

    // }
    // if (hasAdditionalHours && !hasProgramHours) {
    //     autoTable(doc, {
    //         startY: y + 14,
    //         head: [['Date', 'Start', 'Stop', 'Explanation/Location', 'Position', 'Code', "Budget Code", '#Hours']],
    //         body: additionalHours,
    //         theme: 'grid',
    //         margin: { right: 180 },
    //         styles: {
    //             fontSize: 8,
    //             cellPadding: 1,
    //             lineColor: 40,
    //             lineWidth: 0.1,
    //         },
    //         headStyles: {
    //             fontStyle: 'normal',
    //             textColor: 0,
    //             fillColor: false,
    //         },
    //         columnStyles: {
    //             0: { cellWidth: 30 }, // Day column
    //             1: { cellWidth: 25 }, // Date column
    //             2: { cellWidth: 25 }, // In column
    //             3: { cellWidth: 60 }, // Out column
    //             4: { cellWidth: 60 },
    //             5: { cellWidth: 25 },
    //             6: { cellWidth: 25 },
    //             7: { cellWidth: 20 },
    //         },
    //         didParseCell: function (data: any) {
    //             if ((data.column.index === 3 || data.column.index === 4) && data.section === 'body') {
    //                 data.cell.styles.fontSize = 6;
    //             }
    //         }
    //     });
    // }

    if (isPaycode) {
        autoTable(doc, {
            startY: y + 14,
            head: [
                [
                    { content: '', styles: { fillColor: false } },
                    { content: 'Date', styles: { fillColor: false } },
                    { content: 'In', styles: { fillColor: false } },
                    { content: 'Out', styles: { fillColor: false } },
                    // { content: 'Lunch Out' },
                    // { content: 'Lunch In' },
                    { content: 'Code' },
                    { content: '#Hours', styles: { fillColor: false } }
                ]
            ],
            body: programHours,
            theme: 'grid',
            margin: { right: 120 },
            styles: {
                fontSize: 8,
                cellPadding: 1,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'normal',
                textColor: 0,
                fillColor: false,
            },
            columnStyles: {
                0: { cellWidth: 45 }, // Day column
                1: { cellWidth: 45 }, // Date column
                2: { cellWidth: 45 }, // In column
                3: { cellWidth: 45 }, // Out column
                // 4: { cellWidth: 20 },
                // 5: { cellWidth: 20 },
                4: { cellWidth: 45 },
                5: { cellWidth: 45 },
            },
            didDrawCell: (data: { column: { index: number; }; row: { index: number; }; cell: { x: number; y: number; height: any; }; }) => {
                // Add vertical lines for grid
                if (data.column.index === 0 && data.row.index === -1) {
                    doc.setLineWidth(0.1);
                    doc.line(
                        data.cell.x,
                        data.cell.y,
                        data.cell.x,
                        data.cell.y + data.cell.height
                    );
                }
            },
        });
    }
    else{
        autoTable(doc, {
            startY: y + 14,
            head: [['Date', 'Start', 'Stop', 'Explanation/Location', 'Position', 'Code', "Budget Code", '#Hours']],
            body: additionalHours,
            theme: 'grid',
            margin: { right: 120 },
            styles: {
                fontSize: 8,
                cellPadding: 1,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'normal',
                textColor: 0,
                fillColor: false,
            },
            columnStyles: {
                0: { cellWidth: 25 }, // Day column
                1: { cellWidth: 25 }, // Date column
                2: { cellWidth: 25 }, // In column
                3: { cellWidth: 55 }, // Out column
                4: { cellWidth: 55 },
                5: { cellWidth: 25 },
                6: { cellWidth: 30 },
                7: { cellWidth: 25 },
            },
            didParseCell: function (data: any) {
                if ((data.column.index === 3 || data.column.index === 4) && data.section === 'body') {
                    data.cell.styles.fontSize = 6;
                }
            }
        });
    }

    addBottomTable(doc, totalHoursWorked, totalAdditionalHours, totalLateness, totalAbsence, totalLeftEarly, hasProgramHours, hasAdditionalHours);
    addPageNumber(doc);

    // const fileName = `${siteEmployees[0]?.siteName || employees[0]?.siteName}.pdf`;
    // doc.save(fileName);

    // return doc.output('arraybuffer');

};

const addBottomTable = (doc: jsPDF, totalHoursWorked: any, totalAdditionalHours: any, totalLateness: any, totalAbsence: any, totalLeftEarly: any, hasProgramHours: any, hasAdditionalHours: any) => {
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let y = pageHeight - 60; // Adjust this value to position the table correctly

    // Left side of the table
    const leftTableBody = [
        ['For documenting time not at work indicate', ''],
        ['Sick (Personal Illness or Immediate Family) /01', 'Jury Duty /02'],
        ['Personal Business /03', 'Bereavement (Indicate Relationship) /04'],
        ['School Closed (as Indicated on Calendar) /05', 'Emergency Closing\n(Snow Days, other authorized emergencies) /06']
    ];

    autoTable(doc, {
        startY: y - 10,
        body: leftTableBody,
        theme: 'grid',
        styles: {
            fontSize: 6,
            cellPadding: 1,
            lineColor: 40,
            lineWidth: 0.1,
            halign: 'left',
        },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 70 },
        },
        didParseCell: (data: any) => {
            // Merge cells for the first row
            if (data.row.index === 0) {
                if (data.column.index === 0) {
                    // Set the text for the merged cell
                    data.cell.text[0] = leftTableBody[0][0]; // Text for the merged cell
                    data.cell.styles.halign = 'center'; // Center the text
                    // Set the rowSpan for merging effect
                    data.cell.styles.rowSpan = 1; // Keep as 1
                    data.cell.styles.colSpan = 2; // Span across both columns
                } else if (data.column.index === 1) {
                    // Hide the second cell's text for the first row
                    data.cell.text[0] = ''; // Clear the text
                    data.cell.styles.cellWidth = 0; // Set width to 0 to avoid visual space
                }
            }
        },
    });

    // Right side of the table
    const rightTableBody = [
        ['Code', 'Explanation / Location', 'Code', 'Explanation / Location'],
        ['1', 'Assigned Role of Acting Director', '3', 'Group Leader assigned to role of Small Group Leader'],
        ['2', 'Assigned to another program site Permanent sub assigned to a program outside of cluster', '4', 'Group Leader assigned to role of Head of Group'],
        ['22', 'Assigned to another program site Permanent sub assigned to a program outside of cluster/double', '', ''],
    ];
debugger;
    var totalHoursWorkedFinal = Number(totalHoursWorked) <0?0.00:Number(totalHoursWorked);
    var totalAdditionalHoursFinal = Number(totalAdditionalHours) <0?0.00:Number(totalAdditionalHours);
    autoTable(doc, {
        startY: y - 10,
        body: rightTableBody,
        theme: 'grid',
        styles: {
            fontSize: 6.5,
            cellPadding: 1,
            lineColor: 40,
            lineWidth: 0.1,
        },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 50 },
            2: { cellWidth: 10 },
            3: { cellWidth: 50 },
        },
        margin: { left: 163 },
    });
    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        doc.setLineWidth(0.3);
        doc.line(x1, y1, x2, y2);
    };
    // Add "Total:" text above tables
    y += 3;
    doc.setFontSize(10);
    if (hasProgramHours && !hasAdditionalHours) {
        doc.text('Total:', 256, y - 15);
        doc.text(`${totalHoursWorked ? (Math.round(totalHoursWorkedFinal*4)/4).toFixed(2) : '0'} hours`, 266, y - 15);
    }
    // drawLine(margin + 105, y - 15, margin + 135, y - 15);
    if (hasAdditionalHours && !hasProgramHours) {
        doc.text('Total:', 256, y - 15);
        // drawLine(margin + 230, y - 15, margin + 260, y - 15);
        doc.text(`${totalAdditionalHours ? (Math.round(totalAdditionalHoursFinal*4)/4).toFixed(2) : '0'} hours`, 266, y - 15);
    }
    if (hasProgramHours && hasAdditionalHours) {
        doc.text('Total:', 100, y - 15);
        doc.text(`${totalHoursWorked ? (Math.round(totalHoursWorkedFinal*4)/4).toFixed(2) : '0'} hours`, 112, y - 15);
        doc.text('Total:', 256, y - 15);
        doc.text(`${totalAdditionalHours ? (Math.round(totalAdditionalHoursFinal*4)/4) : '0'} hours`, 266, y - 15);
    }

    y += 50;

    // totalLateness : any, totalAbsence : any, totalLeftEarly : any
    doc.setFontSize(6);
    doc.text('Total Absences:', 10, y - 25);
    doc.setFontSize(9);
    doc.text(`${totalAbsence}`, margin + 30, y - 25);
    drawLine(margin + 18, y - 24, margin + 45, y - 24);
    doc.setFontSize(6);
    doc.text('Total Lateness:', 70, y - 25);
    doc.setFontSize(9);
    doc.text(`${totalLateness}`, margin + 85, y - 25);
    drawLine(margin + 75, y - 24, margin + 100, y - 24);
    doc.setFontSize(6);
    doc.text('Total Left Early:', 120, y - 25);
    doc.setFontSize(9);
    doc.text(`${totalLeftEarly}`, margin + 138, y - 25);
    drawLine(margin + 125, y - 24, margin + 150, y - 24);
    doc.setFontSize(6);
    doc.text('I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated', 10, y - 20);

    doc.text('Employee Signature:', 10, y - 15);
    drawLine(margin + 20, y - 15, margin + 90, y - 15);

    doc.text('Date:', 120, y - 15);
    drawLine(margin + 120, y - 15, margin + 150, y - 15);

    doc.text('Verfication Signature:', 10, y - 10);
    drawLine(margin + 20, y - 10, margin + 90, y - 10);

    doc.text('Date:', 120, y - 10);
    drawLine(margin + 120, y - 10, margin + 150, y - 10);

    doc.rect(margin + 180, y - 22, 30, 14);
    doc.text('Scope Office Use Only:', 195, y - 10);

    const scopeOfficeTable = [
        ['Total Hours Worked:'],
        ['Additional Pay Due:'],
        ['Approved by:'],
        ['Notes:']
    ];

    autoTable(doc, {
        startY: y - 22,
        body: scopeOfficeTable,
        theme: 'grid',
        styles: {
            fontSize: 6,
            cellPadding: 0.5,
            lineColor: 0,
            lineWidth: 0.1,
            halign: 'left',
            valign: 'top'
        },
        headStyles: {
            fillColor: false,
            textColor: 0,
            fontSize: 9,
            fontStyle: 'normal',
            halign: 'center'
        },
        columnStyles: {
            0: { cellWidth: 50 }
        },
        margin: { left: 220, right: -10 },
        tableWidth: 'auto',
    });


};

const TimesheetPDF = async (data: any, personnelData: any, pdfEndDate: any, regularData: any, groupedData: any, weekOffset: number): Promise<ArrayBuffer> => {
    const { data: districts } = await fetchAllDistrict();
    const { data: sites } = await fetchAllSites();

    const districtMap = new Map(
        districts.map((district: any) => [district.districtId, { distNam: district.distNam, distNum: district.distNum }])
    );
    const siteMap = new Map(
        sites.map((site: any) => [site.siteID, site.siteName])
    );

    // Update employees with district and site names
    const updatedEmployees = data?.map((emp: any) => {
        const districtData = districtMap.get(Number(emp.districtID));
        return {
            ...emp,
            distNam: districtData?.distNam || "", // Use optional chaining to avoid undefined
            distNum: districtData?.distNum || "", // Default to an empty string if undefined
            siteName: siteMap.get(Number(emp.siteID)) || "" // Default siteName to an empty string
        };
    });



    updatedEmployees.forEach((record: { status: string; reasonId: any; siteId: any; attendance: string | any[]; }) => {
        if (record.status === 'Absent' && record.reasonId) {
            let key = record.siteId; // Default key (siteId)

            // If siteId is null, extract siteName from the attendance array
            if (!key && record.attendance?.length > 0) {
                key = record?.attendance[0]?.sitenam || "Unknown Site"; // Fallback to 'Unknown Site'
            }

            // If there's no siteId but attendance has siteName, try finding the correct group by siteName
            if (key && record.attendance?.length > 0) {
                const siteName = record.attendance[0]?.sitenam;

                // Find existing siteId group with the same siteName, if it exists
                const matchedSiteId = Object.keys(groupedData).find((siteId) =>
                    groupedData[siteId]?.[0]?.siteName === siteName
                );  

                if (matchedSiteId) {
                    key = matchedSiteId; // Use the matched siteId if found
                }
            }

            // If no matching key is found, fallback to 'Unknown Site'
            if (!groupedData[key]) {
                groupedData[key] = [];
            }

            // Add the record to the group corresponding to the resolved siteId
            groupedData[key].push(record);
        }
    });

    const groupedDatas = updatedEmployees.reduce((acc: { [key: string]: any[] }, item: { siteId: any; status: string; reasonId: string; attendance?: any[]; siteName?: string }) => {
        let siteKey: any;

        if (item.siteId !== null) {
            siteKey = item.siteId; // Use siteId if available
        } else if (item.status === "Absent" && item.reasonId) {
            // Extract siteName from attendance array if available
            siteKey = item.attendance?.length ? item.attendance[0].sitenam || "Unknown Site" : "Unknown Site";

            let matchedSiteId: any;
            siteMap.forEach((value, key) => {
                if (value === siteKey) {
                    matchedSiteId = key;
                }
            });
           
            if (matchedSiteId) {
                siteKey = matchedSiteId;
            }
        }

        if (!siteKey) return acc;

        if (!acc[siteKey]) {
            acc[siteKey] = [];
        }
        acc[siteKey].push(item);

        return acc;
    }, {});


    const pdfPromises: Promise<ArrayBuffer>[] = [];

    // Initialize a single PDF document
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    let isFirstPage = true;
    let fileName = '';
    for (const siteID in groupedData) {
        const siteEmployees = groupedData[siteID];
        const siteEmployeesGroupedDatas = groupedDatas[siteID] || [];
        const fullName = `${personnelData?.firstname} ${personnelData?.lastname}`
        fileName = `Timesheets ${fullName}.pdf`;

        if (!isFirstPage) {
            doc.addPage(); // Add a new page for subsequent sites
        }
        isFirstPage = false;
        debugger;
        var dataWithPaycode = siteEmployees.filter((x:any)=>x.paycode != null);
        debugger;
        await generateSinglePDF(doc, personnelData, siteEmployeesGroupedDatas, pdfEndDate, regularData, siteEmployees, updatedEmployees, weekOffset, dataWithPaycode.length>0?false:true);
        // pdfPromises.push(pdfPromise);
    }

    doc.save(fileName);

    return doc.output("arraybuffer");

};

export default TimesheetPDF;
