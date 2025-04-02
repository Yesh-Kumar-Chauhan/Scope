import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
import autoTable from 'jspdf-autotable';
interface ScopeEmployeeTimeSheetPdf {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}


const ScopeEmployeeTimeSheetPdf: React.FC<ScopeEmployeeTimeSheetPdf> = ({ data, setPdfBlob }) => {


    const calculateTotalHours = (timeIn: string, timeOut: string) => {
        if (!timeIn || !timeOut || timeIn == "0" || timeOut == "0") {
            return 0; // Return 0 if either time is missing
        }
        const [inHour, inMinute] = timeIn.split(':').map(Number);
        const [outHour, outMinute] = timeOut
            ? timeOut.split(':').map(Number)
            : [0, 0];

        const inTime = new Date();
        inTime.setHours(inHour, inMinute, 0); // set to timeIn
        const outTime = new Date();
        outTime.setHours(outHour, outMinute, 0); // set to timeOut
        const diffInMilliseconds = outTime.getTime() - inTime.getTime();
        return diffInMilliseconds / (1000 * 60 * 60); // Return the difference in hours
    };

    const mapEmployeeDataToDays = (siteEmployees: any) => {
        const currentDate = moment();
        const startDate = currentDate.clone().startOf('isoWeek');
        const excelEndDate = currentDate.clone().add(1, 'week').endOf('isoWeek');
        const startOfCurrentWeek = moment(excelEndDate).subtract(1, 'week').startOf('week');
        const startOfPreviousWeek = moment(excelEndDate).subtract(2, 'week').startOf('week');
        const endOfPreviousWeek = moment(excelEndDate).subtract(2, 'week').endOf('week');

        const sortedEmployees = [...siteEmployees].sort((a, b) =>
            moment(a.TimeSheetDate).valueOf() - moment(b.TimeSheetDate).valueOf()
        );
        const dayMap = new Map();
        sortedEmployees.forEach((emp) => {
            if (emp?.TimeSheetDate) {
                const empDate = moment(emp.TimeSheetDate);
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
                    const timeIn = !emp?.TimeIn && !emp?.TimeOut && !emp?.AdditionalStart && !emp?.AdditionalStop ? "0" : emp.TimeIn;
                    const timeOut = !emp?.TimeIn && !emp?.TimeOut && !emp?.AdditionalStart && !emp?.AdditionalStop ? "0" : emp.TimeOut;
                    const additionalStart = !emp?.TimeIn && !emp?.TimeOut && !emp?.AdditionalStart && !emp?.AdditionalStop ? "0" : emp.AdditionalStart;
                    const additionalStop = !emp?.TimeIn && !emp?.TimeOut && !emp?.AdditionalStart && !emp?.AdditionalStop ? "0" : emp.AdditionalStop;
                    const entry = {
                        date: empDate.format('MM/DD/YYYY'),
                        timeIn: timeIn || '',
                        timeOut: timeOut || '',
                        additionalStart: additionalStart || '',
                        additionalStop: additionalStop || '',
                        siteName: emp?.SiteName || '',
                        position: emp?.Position || '',
                        code: emp?.DistNumber || '',
                        distNum: emp.DistNumber || '',
                        lunchIn: emp.LunchIn || '',
                        lunchOut: emp.LunchOut || '',
                        paycode: emp.Paycode,
                        hours: !emp.Paycode && emp.TimeIn && emp.TimeOut ? calculateTotalHours(timeIn, timeOut).toFixed(2) : calculateTotalHours(additionalStart, additionalStop).toFixed(2)
                    };

                    if (emp.Paycode) {
                        dayMap.get(weekKey).additionalHours.push(entry);
                    } else {
                        dayMap.get(weekKey).regularHours.push(entry);
                    }
                }
            }
        });

        return dayMap;
    };

    const constructHoursWorkedData = (siteEmployees: any) => {
        const dayMap = mapEmployeeDataToDays(siteEmployees);
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
                        const timeIn = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.timeIn;
                        const timeOut = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.timeOut;

                        hoursWorkedData.push([
                            index === 0 ? day : '', // Only show day label for first entry
                            entry.date,
                            timeIn,
                            timeOut,
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
                        const additionalStart = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.additionalStart;
                        const additionalStop = !entry?.timeIn && !entry?.timeOut && !entry?.additionalStart && !entry?.additionalStop ? "Absent" : entry.additionalStop;
                        additionalHoursData.push([
                            entry?.date,
                            additionalStart,
                            additionalStop,
                            entry?.siteName,
                            entry?.position,
                            entry?.code,
                            entry?.distNum,
                            entry?.hours
                        ]);
                    });
                } else {
                    additionalHoursData.push(['', '', '', '', '', '', '', '']);
                }
            });
        });

        return { hoursWorkedData, additionalHoursData };
    };


    const generatePDF = (groupedByPersonID: any) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });


        Object.keys(groupedByPersonID).forEach((personID, personIndex) => {
            const siteData = groupedByPersonID[personID];

            // Loop through each SiteID under the PersonID
            Object.keys(siteData).forEach((siteID, siteIndex) => {
                const siteEmployees = siteData[siteID];
                siteEmployees.forEach((item: any, employeeIndex: any) => {

                    const totalHoursData = siteEmployees.reduce(
                        (totals: { totalHoursWorked: number; totalAdditionalHours: number }, emp: any) => {
                            const hoursWorked = calculateTotalHours(emp?.TimeIn, emp?.TimeOut);

                            if (emp.Paycode && emp.Paycode.trim() !== "") {
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
                    const additionalHoursData = siteEmployees.reduce(
                        (totals: { totalHoursWorked: number; totalAdditionalHours: number }, emp: any) => {
                            const hoursWorked = calculateTotalHours(emp.AdditionalStart, emp.AdditionalStop);

                            if (emp.Paycode && emp.Paycode.trim() !== "") {
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

                    siteEmployees.forEach((entry: any) => {
                        const { TimeIn, TimeOut, SiteTimeIn, SiteTimeOut, TimeSheetDate, AdditionalStart, AdditionalStop } = entry;

                        // Convert time strings to Date objects
                        const timeInDate = TimeIn ? new Date(`${TimeSheetDate.substring(0, 10)}T${TimeIn}`) : null;
                        const timeOutDate = TimeOut ? new Date(`${TimeSheetDate.substring(0, 10)}T${TimeOut}`) : null;
                        const additionalStartDate = AdditionalStart ? new Date(`${TimeSheetDate.substring(0, 10)}T${AdditionalStart}`) : null;
                        const additionalStopDate = AdditionalStop ? new Date(`${TimeSheetDate.substring(0, 10)}T${AdditionalStop}`) : null;
                        const siteTimeInDate = new Date(`${TimeSheetDate.substring(0, 10)}T${SiteTimeIn}`);
                        const siteTimeOutDate = new Date(`${TimeSheetDate.substring(0, 10)}T${SiteTimeOut}`);

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


                    // siteEmployees.forEach((item: any, employeeIndex: any) => {


                    const pageWidth = doc.internal.pageSize.width + 40;
                    const pageWidth1 = doc.internal.pageSize.width - 40; // Adjust width for margin
                    const pageHeight = doc.internal.pageSize.height - 20; // Adjust height for margin
                    const margin = 10;
                    let y = margin;

                    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
                        doc.setLineWidth(0.3);
                        doc.line(x1, y1, x2, y2);
                    };
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(18);
                    // Title
                    doc.text("SCOPE Employee - Time Sheet", margin, y);
                    y += 9;

                    doc.setFontSize(12);

                    doc.text("Name:", margin, y);
                    doc.text(`${item.LASTNAME}, ${item.FIRSTNAME}`, margin + 20, y);
                    doc.text("Position:", pageWidth / 2, y);
                    doc.text(`${item.Position}`, pageWidth / 2 + 30, y);
                    y += 7; // Smaller gap for the next line

                    doc.text("District:", margin, y);
                    doc.text(`${item.DIST_NAM}`, margin + 20, y);
                    doc.text("Budget Code:", pageWidth / 2, y);
                    doc.text(String(item.DistNumber) || "", pageWidth / 2 + 30, y); // Use dynamic data
                    y += 7; // Smaller gap

                    doc.text("Max Hours:", margin, y);
                    doc.text(`${String(item.Max_Hours ? item.Max_Hours : 0)} a week`, margin + 22, y);
                    doc.text("Program:", pageWidth / 2, y);
                    doc.text(`${item.SITE_NAM}`, pageWidth / 2 + 30, y);
                    y += 7;

                    doc.text("Schedule:", margin, y);
                    doc.text(``, margin + 20, y);
                    y += 7;
                    doc.text("Comment:", margin, y);
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    y += 8;


                    const programHours = constructHoursWorkedData(siteEmployees).hoursWorkedData;
                    const additionalHours = constructHoursWorkedData(siteEmployees).additionalHoursData;

                    const hasProgramHours = programHours.some(row =>
                        row.slice(1).some(cell => cell.trim() !== '') // Ignore the first column (day names)
                    );
                    const hasAdditionalHours = additionalHours.some(row => row.some(cell => cell !== ''));


                    doc.setFont("helvetica", "bold");
                    if (hasProgramHours && !hasAdditionalHours) {
                        doc.text("Hours Worked", margin + 110, y + 8);
                    }
                    if (hasAdditionalHours && !hasProgramHours) {
                        doc.text("Additional Hours / Extra Pay", margin + 110, y + 8);
                    }

                    if (hasProgramHours && hasAdditionalHours) {
                        doc.text("Hours Worked", margin + 50, y + 8);
                        doc.text("Additional Hours / Extra Pay", margin + 170, y + 8);
                    }
                    doc.setFontSize(10);
                    if (hasProgramHours && !hasAdditionalHours) {
                        doc.text("(Record Actual time worked)", margin + 100, y + 12);
                    }
                    if (hasAdditionalHours && !hasProgramHours) {
                        doc.text("(Record Actual time worked)", margin + 115, y + 12);
                    }
                    if (hasProgramHours && hasAdditionalHours) {
                        doc.text("(Record Actual time worked)", margin + 40, y + 12);
                        doc.text("(Record Actual time worked)", margin + 175, y + 12);
                    }
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(12);

                    if (hasProgramHours && !hasAdditionalHours) {
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
                            margin: { right: 180 },
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
                                0: { cellWidth: 40 }, // Day column
                                1: { cellWidth: 50 }, // Date column
                                2: { cellWidth: 50 }, // In column
                                3: { cellWidth: 50 },
                                4: { cellWidth: 40 },
                                5: { cellWidth: 40 },
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

                    if (hasAdditionalHours && !hasProgramHours) {
                        autoTable(doc, {
                            startY: y + 14,
                            head: [['Date', 'Start', 'Stop', 'Explanation/Location', 'Position', 'Code', "Budget Code", '#Hours']],
                            body: additionalHours,
                            theme: 'grid',
                            margin: { right: 180 },
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
                                0: { cellWidth: 30 }, // Day column
                                1: { cellWidth: 25 }, // Date column
                                2: { cellWidth: 25 }, // In column
                                3: { cellWidth: 60 }, // Out column
                                4: { cellWidth: 60 },
                                5: { cellWidth: 25 },
                                6: { cellWidth: 25 },
                                7: { cellWidth: 20 },
                            },
                            didParseCell: function (data: any) {
                                if ((data.column.index === 3 || data.column.index === 4) && data.section === 'body') {
                                    data.cell.styles.fontSize = 6;
                                }
                            }
                        });
                    }
                    if (hasAdditionalHours && hasProgramHours) {
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
                            margin: { right: 180 },
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
                                0: { cellWidth: 15 }, // Day column
                                1: { cellWidth: 20 }, // Date column
                                2: { cellWidth: 15 }, // In column
                                3: { cellWidth: 15 }, // Out column
                                // 4: { cellWidth: 20 },
                                // 5: { cellWidth: 20 },
                                6: { cellWidth: 10 },
                                7: { cellWidth: 12 },
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
                
                        autoTable(doc, {
                            startY: y + 14,
                            head: [['Date', 'Start', 'Stop', 'Explanation/Location', 'Position', 'Code', "Budget Code", '#Hours']],
                            body: additionalHours,
                            theme: 'grid',
                            margin: { left: 120 },
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
                                0: { cellWidth: 18 }, // Day column
                                1: { cellWidth: 15 }, // Date column
                                2: { cellWidth: 15 }, // In column
                                3: { cellWidth: 35 }, // Out column
                                4: { cellWidth: 35 },
                                5: { cellWidth: 15 },
                                6: { cellWidth: 20 },
                                7: { cellWidth: 12 },
                            },
                            didParseCell: function (data: any) {
                                if ((data.column.index === 3 || data.column.index === 4) && data.section === 'body') {
                                    data.cell.styles.fontSize = 6;
                                }
                            }
                        });
                    }
                    addBottomTable(doc, totalHoursWorked, totalAdditionalHours, totalLateness, totalAbsence, totalLeftEarly, hasProgramHours, hasAdditionalHours);
                    if (
                        employeeIndex < siteEmployees.length - 1 ||
                        siteIndex < Object.keys(siteData).length - 1 ||
                        personIndex < Object.keys(groupedByPersonID).length - 1
                    ) {
                        doc.addPage();
                    }
                });
            });
        });

        // addBottomTable(doc, totalHoursWorked, totalAdditionalHours, totalLateness, totalAbsence, totalLeftEarly);

        addPageNumber(doc);

        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };
    const addBottomTable = (doc: jsPDF, totalHoursWorked: any, totalAdditionalHours: any, totalLateness: any, totalAbsence: any, totalLeftEarly: any, hasProgramHours: any, hasAdditionalHours: any) => {
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        let y = pageHeight - 60; // Adjust this value to position the table correctly

        // Left side of the table
        const leftTableBody = [
            ['For documenting time not at work indicate', ''],
            ['Sick (Personal Illness or Immediate Family)', 'Jury Duty'],
            ['Personal Business', 'Bereavement (Indicate Relationship)'],
            ['School Closed (as Indicated on Calendar)', 'Emergency Closing\n(Snow Days, other authorized emergencies)']
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
        ];

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
        doc.setFontSize(10);
        if (hasProgramHours && !hasAdditionalHours) {
            doc.text('Total:', 256, y - 15);
            doc.text(`${totalHoursWorked ? Number(totalHoursWorked).toFixed(2) : '0'} hours`, 266, y - 15);
        }
        // drawLine(margin + 105, y - 15, margin + 135, y - 15);
        if (hasAdditionalHours && !hasProgramHours) {
            doc.text('Total:', 256, y - 15);
            // drawLine(margin + 230, y - 15, margin + 260, y - 15);
            doc.text(`${totalAdditionalHours ? Number(totalAdditionalHours).toFixed(2) : '0'} hours`, 266, y - 15);
        }
        if (hasProgramHours && hasAdditionalHours) {
            doc.text('Total:', 100, y - 15);
            doc.text(`${totalHoursWorked ? Number(totalHoursWorked).toFixed(2) : '0'} hours`, 112, y - 15);
            doc.text('Total:', 256, y - 15);
            doc.text(`${totalAdditionalHours ? Number(totalAdditionalHours).toFixed(2) : '0'} hours`, 266, y - 15);
        }
        y += 50;

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

        doc.rect(margin + 180, y - 20, 30, 14);
        doc.text('Scope Office Use Only:', 195, y - 10);

        const scopeOfficeTable = [
            ['Total Hours Worked:'],
            ['Additional Pay Due:'],
            ['Approved by:'],
            ['Notes:']
        ];

        autoTable(doc, {
            startY: y - 20,
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

    useEffect(() => {
        if (data) {
            const groupedByPersonID = data.reduce(
                (acc: { [personID: string]: { [siteID: string]: any[] } }, item: { PersonID: string; SiteID: string }) => {
                    const personID = item.PersonID;
                    const siteID = item.SiteID;

                    // Initialize the grouping for this PersonID if it doesn't exist
                    if (!acc[personID]) {
                        acc[personID] = {};
                    }

                    // Initialize the grouping for this SiteID within the PersonID if it doesn't exist
                    if (!acc[personID][siteID]) {
                        acc[personID][siteID] = [];
                    }

                    // Add the item to the appropriate group
                    acc[personID][siteID].push(item);

                    return acc;
                },
                {} // Initial value for the accumulator
            );
            generatePDF(groupedByPersonID);
        }
    }, [data]);

    return null;
};

export default memo(ScopeEmployeeTimeSheetPdf);