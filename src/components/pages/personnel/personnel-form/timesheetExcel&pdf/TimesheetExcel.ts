import React from 'react';
import ExcelJS from 'exceljs';
import { fetchAllDistrict } from '../../../../../apis/districtsApi'
import { fetchAllSites } from '../../../../../apis/sitesApi'
import moment from 'moment';

interface Site {
    SiteName: string;
    items: any[]; // Define the type for the items in this array, or use `any` if uncertain
}

interface Group {
    position: any;
    siteName: any;
    distNam: string;
    sites: {
        [siteName: string]: Site;
    };
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
    const [inHour, inMinute] = timeIn.split(':').map(Number);
    const [outHour, outMinute] = timeOut.split(':').map(Number);

    const inTime = new Date();
    inTime.setHours(inHour, inMinute, 0); // set to timeIn
    const outTime = new Date();
    outTime.setHours(outHour, outMinute, 0); // set to timeOut

    // Get the time in milliseconds and calculate the difference
    const diffInMilliseconds = outTime.getTime() - inTime.getTime();

    // Convert milliseconds to hours
    return diffInMilliseconds / (1000 * 60 * 60); // Return the difference in hours
};

const mapEmployeeDataToDays = (employees: any[], excelEndDate: any, siteEmployees: any) => {
    const currentDate = moment();
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
                    lunchIn: emp.lunchIn || '',
                    lunchOut: emp.lunchOut || '',
                    paycode: emp.paycode,
                    hours: emp.status == 'Absent' ? '0' : emp.timeIn && emp.timeOut ? calculateTotalHours(emp.timeIn, emp.timeOut).toFixed(2) : !emp?.timeIn && !emp?.timeOut && !emp?.additionalStart && !emp?.additionalStop ? '0' : ''
                };

                // Separate regular hours and additional hours
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

const constructHoursWorkedData = (employees: any[], excelEndDate: any, siteEmployees: any) => {
    const dayMap = mapEmployeeDataToDays(employees, excelEndDate, siteEmployees);
    const baseDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    const hoursWorkedData = [
        ["", "Date", "In", "Out", "Code", "#Hours"]
    ];
    const additionalHoursData = [
        ["Date", "Start", "Stop", "Explanation/ Location", "Position", "Code", "Budget Code", "#Hours"],
    ];

    // Process both weeks
    ['prev', 'curr'].forEach(week => {
        baseDays.forEach(day => {
            const dayKey = `${day}-${week}`;
            const dayData = dayMap.get(dayKey);

            if (!dayData) {
                // If no data exists for this day, add empty rows
                hoursWorkedData.push([day, '', '', '', '', '']);
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
                hoursWorkedData.push([day, '', '', '', '', '',]);
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
                        calculateTotalHours(entry.additionalStart, entry.additionalStop).toFixed(2)
                    ]);
                });
            } else {
                additionalHoursData.push(['', '', '', '', '', '', '']);
            }
        });
    });

    return { hoursWorkedData, additionalHoursData };
};

const TimesheetExcel = async (data: any, personnelData: any, excelEndDate: any, regularData: any, groupedData: any) => {
    const employee = data;

    const { data: districts } = await fetchAllDistrict();
    const { data: sites } = await fetchAllSites();

    // Define the districtMap type
    const districtMap = new Map(
        districts.map((district: any) => [
            district.districtId,
            { distNam: district.distNam, distNum: district.distNum }
        ])
    );

    const siteMap = new Map(
        sites.map((district: any) => [district.siteID, district.siteName])
    );

    // Add DIST_NAM to each employee based on districtId
    const updatedEmployees = employee.map((emp: any) => {
        const districtData = districtMap.get(Number(emp.districtID)); // Get district data
        return {
            ...emp,
            distNam: districtData?.distNam || "", // Use optional chaining and fallback
            distNum: districtData?.distNum || "", // Use optional chaining and fallback
            siteName: siteMap.get(Number(emp.siteID)) || "" // Fallback for siteName
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

    // const districtName = districtMap.get(Number(employee?.[0]?.districtID)) || 'Unknown District';

    const workbook = new ExcelJS.Workbook();
    for (const siteId in groupedData) {
        const siteEmployees = groupedData[siteId];
        const siteEmployeesGroupedDatas = groupedDatas[siteId] || [];
        const siteName = siteEmployees[0]?.siteName || `Site ${siteId}`;

        const worksheet = workbook.addWorksheet(siteName);
        let currentRow = 1;

        // const worksheet = workbook.addWorksheet('Employee Timesheets');

        // const groupedData = groupByDistrictSiteNameAndPosition(updatedEmployees);

        let prevGroupKey = '';

        //const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));

        // sortedDistrictKeys.forEach((districtKey) => {
        // const group = groupedData[districtKey];
        // const districtName = group.distNam;
        // const position = group.position;
        // const districtID = group.districtID; 
        // const distNum = group.distNum;

        // Object.keys(group.sites).forEach((siteName) => {
        // const site = group.sites[siteName];
        // const siteName = updatedEmployees[0]?.siteName;
        const employees = siteEmployeesGroupedDatas;

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
        // const totalHours = employees.reduce((sum: number, emp: any) => {
        //     return sum + calculateTotalHours(emp.timeIn, emp.timeOut);
        // }, 0);
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
        // const groupKey = `${group.siteName}`;

        // If the group changes, create a new sheet
        if (siteName !== prevGroupKey) {
            currentRow = 1;
            prevGroupKey = siteName;
            // Create a new sheet for the new group
            // const worksheet = workbook.addWorksheet(siteName);

            // Set the previous group key to current group
            // prevGroupKey = groupKey;

            worksheet.mergeCells(`A${currentRow}:O  ${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = 'SCOPE Employee - Time Sheet';
            worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
            worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
            currentRow++;



            // Personal details rows
            const timeSheetData = [
                ["Name:", `${siteEmployees[0]?.personel.firstname || personnelData?.firstname} ${siteEmployees[0]?.personel.lastname || personnelData?.lastname}`, "", "", "", "", "", "", "Position:", siteEmployees[0]?.position || updatedEmployees[0]?.position],
                ["District:", siteEmployees[0].distName || updatedEmployees[0]?.distNam, "", "", "", "", "", "", "Budget Code:", siteEmployees[0].distNumber || updatedEmployees[0]?.distNum],
                ["Program:", `${siteEmployees[0].siteName || siteName} `],
                ["Schedule:", personnelData?.Schedule],
                ["Comment:", personnelData?.comment],
                ["IMPORTANT NOTE:You may be assigned additional hours or a location change which you must accommodate in order to meet legally required staff to student ratio."],
                // ["Total Hours:", ],
                []
            ];

            timeSheetData.forEach((row, rowIndex) => {
                const worksheetRow = worksheet.getRow(currentRow);
                row.forEach((cell, cellIndex) => {
                    worksheetRow.getCell(cellIndex + 1).value = cell;
                    if (rowIndex < 3 && (cellIndex === 0 || cellIndex === 8)) {
                        worksheetRow.getCell(cellIndex + 1).font = { bold: true };
                    } else if ((rowIndex === 3 || rowIndex === 4) && cellIndex === 0) {
                        worksheetRow.getCell(cellIndex + 1).font = { bold: true };
                    }
                });
                currentRow++;
            });
            const hoursWorkedData = constructHoursWorkedData(employees, excelEndDate, siteEmployees).hoursWorkedData;
            const additionalHoursData = constructHoursWorkedData(employees, excelEndDate, siteEmployees).additionalHoursData;

            // const hasProgramHours = hoursWorkedData.some(row =>
            //     row.slice(1).some(cell => cell.trim() !== '') // Ignore the first column (day names)
            // );
            // const hasAdditionalHours = additionalHoursData.some(row => row.some(cell => cell !== ''));

            const hasProgramHours = hoursWorkedData.slice(1).some(row =>
                row.slice(1).some(cell => cell && cell.toString().trim() !== '') // Ensure non-empty cells
            );

            const hasAdditionalHours = additionalHoursData.slice(1).some(row =>
                row.some(cell => cell && cell.toString().trim() !== '') // Ensure non-empty cells
            );

            // Hours Worked and Additional Hours headers
            if (hasProgramHours && !hasAdditionalHours) {
                worksheet.getCell(`B${currentRow}`).value = "Hours Worked \n (Record Actual time worked)";
                worksheet.getCell(`B${currentRow}`).font = { bold: true };
            }
            if (!hasProgramHours && hasAdditionalHours) {
                worksheet.getCell(`B${currentRow}`).value = "Additional Hours/ Extra Pay \n (Record Actual time worked)";
                worksheet.getCell(`B${currentRow}`).font = { bold: true };
            }
            if (hasProgramHours && hasAdditionalHours) {
                worksheet.getCell(`B${currentRow}`).value = "Hours Worked \n (Record Actual time worked)";
                worksheet.getCell(`B${currentRow}`).font = { bold: true };
                worksheet.getCell(`H${currentRow}`).value = "Additional Hours/ Extra Pay \n (Record Actual time worked)";
                worksheet.getCell(`H${currentRow}`).font = { bold: true };
            }
            currentRow++;


            // Add both tables side by side
            // hoursWorkedData.forEach((row, rowIndex) => {
            //     const worksheetRow = worksheet.getRow(currentRow + rowIndex);

            //     // Hours Worked table (columns A-F)
            //     row.forEach((value, colIndex) => {
            //         const cell = worksheetRow.getCell(colIndex + 1);
            //         cell.value = value;
            //         cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            //     });

            //     // Additional Hours table (columns H-P)
            //     additionalHoursData[rowIndex].forEach((value, colIndex) => {
            //         const cell = worksheetRow.getCell(colIndex + 8);
            //         cell.value = value||'';
            //         cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            //     });
            // });
            // currentRow += hoursWorkedData.length + 1;

            if (hasProgramHours && !hasAdditionalHours) {
                hoursWorkedData.forEach((row, rowIndex) => {
                    const worksheetRow = worksheet.getRow(currentRow + rowIndex);
                    row.forEach((value, colIndex) => {
                        const cell = worksheetRow.getCell(colIndex + 1);
                        cell.value = value;
                        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    });
                });
                currentRow += hoursWorkedData.length + 1;
            }
            // If no program hours but additional hours exist, display additionalHoursData
            if (hasAdditionalHours && !hasProgramHours) {
                additionalHoursData.forEach((row, rowIndex) => {
                    const worksheetRow = worksheet.getRow(currentRow + rowIndex);
                    row.forEach((value, colIndex) => {
                        const cell = worksheetRow.getCell(colIndex + 1);
                        cell.value = value;
                        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    });
                });
                currentRow += additionalHoursData.length + 1;
            }

            if (hasAdditionalHours && hasProgramHours) {
                hoursWorkedData.forEach((row, rowIndex) => {
                    const worksheetRow = worksheet.getRow(currentRow + rowIndex);

                    // Hours Worked table (columns A-F)
                    row.forEach((value, colIndex) => {
                        const cell = worksheetRow.getCell(colIndex + 1);
                        cell.value = value;
                        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    });

                    // Additional Hours table (columns H-P)
                    additionalHoursData[rowIndex].forEach((value, colIndex) => {
                        const cell = worksheetRow.getCell(colIndex + 8);
                        cell.value = value || '';
                        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    });
                });
                currentRow += hoursWorkedData.length + 1;
            }

            // Totals row
            if (hasProgramHours && !hasAdditionalHours) {
                worksheet.getRow(currentRow).values = ["", "", "", "", `${hasProgramHours ? 'Total:' : ''}`, `${hasProgramHours ? `${totalHoursWorked.toFixed(2)} hours` : ''}`, "", "", "", "", "", ""];
            }
            if (hasAdditionalHours && !hasProgramHours) {
                worksheet.getRow(currentRow).values = ["", "", "", "", "", "", `${hasAdditionalHours ? 'Total:' : ''}`, `${hasAdditionalHours ? `${totalAdditionalHours.toFixed(2)} hours` : ''}`, "", "", "", "", "", ""];
            }
            if (hasAdditionalHours && hasProgramHours) {
                worksheet.getRow(currentRow).values = ["", "", "", "", `${hasProgramHours ? 'Total:' : ''}`, `${hasProgramHours ? `${totalHoursWorked.toFixed(2)} hours` : ''}`, "", "", "", "", "", "", "", `${hasAdditionalHours ? 'Total:' : ''}`, `${hasAdditionalHours ? `${totalAdditionalHours.toFixed(2)} hours` : ''}`];
            }
            currentRow += 2;
            // Time not at work sectio
            worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = "For documenting time not at work indicate";
            worksheet.getCell(`A${currentRow}`).border = {
                top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
            };
            worksheet.getRow(currentRow).height = 30;
            currentRow++;

            // Time not at work indicators
            const timeNotAtWorkRows = [
                { left: "Sick (Personal Illness or Immediate Family) /01", right: "Jury Duty /02" },
                { left: "Personal Business /03", right: "Bereavement (Indicate Relationship) /04" },
                { left: "School Closed (as Indicated on Calendar) 05", right: "Emergency Closing (Snow Days, other authorized emergencies) /06" }
            ];

            timeNotAtWorkRows.forEach(row => {
                worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
                worksheet.getCell(`A${currentRow}`).value = row.left;
                worksheet.getCell(`A${currentRow}`).border = {
                    top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
                };

                worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
                worksheet.getCell(`C${currentRow}`).value = row.right;
                worksheet.getCell(`C${currentRow}`).border = {
                    top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
                };
                currentRow++;
            });

            // Code table
            const codeData = [
                { cells: ['I', 'J', 'K', 'L'], values: ["Code", "Explanation / Location", "Code", "Explanation / Location"] },
                { cells: ['I', 'J', 'K', 'L'], values: ["1", "Assigned Role of Acting Director", "3", "Group Leader assigned to role of Small Group Leader"] },
                { cells: ['I', 'J', 'K', 'L'], values: ["2", "Assigned to another program site Permanent sub assigned to a program outside of cluster", "4", "Group Leader assigned to role of Head of Group"] },
                { cells: ['I', 'J', 'K', 'L'], values: ["22", "Assigned to another program site Permanent sub assigned to a program outside of cluster", "", ""] }
            ];

            codeData.forEach((row, rowIndex) => {
                row.cells.forEach((cell, cellIndex) => {
                    worksheet.getCell(`${cell}${currentRow - 3 + rowIndex}`).value = row.values[cellIndex];
                    worksheet.getCell(`${cell}${currentRow - 3 + rowIndex}`).border = {
                        top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
                    };
                });
            });

            currentRow += 1;




            // Summary section
            const summaryRow = worksheet.getRow(currentRow);
            summaryRow.values = ["Total Absences:", `${totalAbsence}`, "Total Lateness:", `${totalLateness}`, "Total Left Early:", `${totalLeftEarly}`];
            currentRow += 2;

            // Certification text
            worksheet.mergeCells(`A${currentRow}:N${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = "I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.";
            worksheet.getCell(`A${currentRow}`).alignment = { wrapText: true };
            currentRow += 2;

            // Signature section
            const signatureData = [
                ["Employee Signature:", "______________________", "Date:", "______________________"],
                ["Verification Signature:", "______________________", "Date:", "______________________"]
            ];

            signatureData.forEach(row => {
                worksheet.getRow(currentRow).values = row;
                currentRow++;
            });

            // SCOPE Office box and additional info
            worksheet.mergeCells(`I${currentRow - 2}:J${currentRow + 1}`);
            worksheet.getCell(`I${currentRow - 2}`).value = "Scope Office Use Only";
            worksheet.getCell(`I${currentRow - 2}`).border = {
                top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
            };

            // Right side information
            const officeData = [
                ["Total Hours Worked:"],
                ["Additional Pay Due:"],
                ["Approved by:"],
                ["Notes:"]
            ];

            officeData.forEach((row, index) => {
                worksheet.mergeCells(`K${currentRow - 2 + index}:L${currentRow - 2 + index}`);
                worksheet.getCell(`K${currentRow - 2 + index}`).value = row[0];
                worksheet.getCell(`K${currentRow - 2 + index}`).border = {
                    top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
                };
            });
        }

        // Add gap between employees
        currentRow += 5;
        // });
        // });
        // });

        // Set column widths
        // worksheet.columns = [
        //     { width: 15 }, // A
        //     { width: 15 }, // B
        //     { width: 15 }, // C
        //     { width: 15 }, // D
        //     { width: 15 }, // E
        //     { width: 15 }, // F
        //     { width: 15 }, // G
        //     { width: 15 }, // H
        //     { width: 15 }, // I
        //     { width: 15 }, // J
        //     { width: 15 }, // K
        //     { width: 20 }, // L
        //     { width: 15 }, // M
        //     { width: 15 }, // N
        // ];
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default TimesheetExcel;