import React from 'react';
import ExcelJS from 'exceljs';
import moment from 'moment';

const ScopeTimesheetWithoutNotesExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Timesheets');
    
    let currentRow = 1;

    // Sort data by FullName
    const sortedData = [...reportData.scopeTimesheetData].sort((a, b) =>
        a.FullName.localeCompare(b.FullName)
    );

    // Group data by PersonID
    const groupedByPerson = sortedData.reduce((acc: any, entry: any) => {
        if (!acc[entry.PersonID]) {
            acc[entry.PersonID] = [];
        }
        acc[entry.PersonID].push(entry);
        return acc;
    }, {});

    Object.entries(groupedByPerson).forEach(([personId, personEntries]: any, personIndex: number) => {
        if (personIndex > 0) {
            // Add gap between employees
            currentRow += 4;
        }

        // Get the first entry for personal details
        const firstEntry = personEntries[0];

        // Header
        worksheet.mergeCells(`A${currentRow}:M${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'SCOPE Employee - Time Sheet';
        worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        currentRow++;

        // Personal Details
        const personalDetails = [
            ["Name:", firstEntry?.FullName || '', "", "", "", "", "", "", "Position:", firstEntry?.Position || ''],
            ["District:", firstEntry?.DistrictName || '', "", "", "", "", "", "", "Budget Code:", String(firstEntry.DIST_NUM || '')],
            ["Building:", "", "", "", "", "", "", "", "Program:", firstEntry?.SiteName || ''],
            ["Schedule:", firstEntry?.Schedule || ''],
            []
        ];

        personalDetails.forEach((row) => {
            const worksheetRow = worksheet.addRow(row);
            worksheetRow.getCell(1).font = { bold: true };
            if (row[8]) worksheetRow.getCell(9).font = { bold: true };
            currentRow++;
        });

        // Group entries by WeekNumber
        const groupedByWeek = personEntries.reduce((acc: any, entry: any) => {
            if (!acc[entry.WeekNumber]) {
                acc[entry.WeekNumber] = [];
            }
            acc[entry.WeekNumber].push(entry);
            return acc;
        }, {});

        // For each week
        Object.entries(groupedByWeek).forEach(([weekNumber, weekEntries]: any, weekIndex: number) => {
            if (weekIndex > 0) {
                worksheet.addRow([]);
                currentRow++;
            }

            // Week Header
            worksheet.getCell(`A${currentRow}`).value = `Week# ${weekNumber}`;
            worksheet.getCell(`A${currentRow}`).font = { bold: true };
            worksheet.getCell(`F${currentRow}`).value = "Program Hours";
            worksheet.getCell(`F${currentRow}`).font = { bold: true };
            currentRow++;

            // Max Program Hours
            worksheet.getCell(`F${currentRow}`).value = "Maximum Weekly Program Hours.";
            currentRow++;

            // Table Header
            const tableHeader = ["Program", "Date", "Clock In", "System In", "Clock Out", "System Out", "Lunch Out", "Lunch In", "Start", "End", "Explanation", "Code", "Hours"];
            const headerRow = worksheet.addRow(tableHeader);
            headerRow.eachCell((cell) => {
                cell.font = { bold: true };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
            currentRow++;

            // Table Data
            weekEntries.forEach((entry: any) => {
                const rowData = [
                    entry.SiteName || '',
                    entry.TimeSheetDate ? moment(entry.TimeSheetDate).format('MM/DD/YYYY') : '',
                    entry.TimeIn ? moment(entry.TimeIn, 'HH:mm:ss').format('hh:mm A') : '',
                    entry.ClockInLocal ? moment(entry.ClockInLocal, 'HH:mm:ss').format('hh:mm A') : '',
                    entry.TimeOut ? moment(entry.TimeOut, 'HH:mm:ss').format('hh:mm A') : '',
                    entry.ClockOutLocal ? moment(entry.ClockOutLocal, 'HH:mm:ss').format('hh:mm A') : '',
                    entry.LunchOut ? moment(entry.LunchOut, 'HH:mm:ss').format('hh:mm A') : '',
                    entry.LunchIn ? moment(entry.LunchIn, 'HH:mm:ss').format('hh:mm A') : '',
                    entry.AdditionalStart ? moment(entry.AdditionalStart, 'HH:mm A') : '',
                    entry.AdditionalStop ? moment(entry.AdditionalStop, 'HH:mm A') : '',
                    '', // Explanation
                    '', // Code
                    (entry.WorkingHours + entry.AdditionalHours).toFixed(2)
                ];

                const dataRow = worksheet.addRow(rowData);
                dataRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
                currentRow++;

                // Notes (if any)
                if (entry.NotesHeader) {
                    const notesRow = worksheet.addRow([]);
                    notesRow.getCell(1).value = entry.NotesHeader || '';
                    notesRow.getCell(1).font = { bold: true };
                    notesRow.getCell(2).value = entry.NotesDetails || '';
                    notesRow.getCell(2).font = { color: { argb: 'FF474747' } };
                    worksheet.mergeCells(`B${currentRow}:M${currentRow}`);
                    currentRow++;
                }
            });

            currentRow++;
        });

        // Totals
        const totalProgramHours = personEntries.reduce((sum: any, entry: any) => sum + entry.WorkingHours, 0);
        const totalAdditionalHours = personEntries.reduce((sum: any, entry: any) => sum + entry.AdditionalHours, 0);
        const totalHours = totalProgramHours + totalAdditionalHours;

        worksheet.getCell(`F${currentRow}`).value = `Program Hours: ${totalHours.toFixed(2)}`;
        currentRow += 2;

        // Summary
        const summaryRow = worksheet.addRow(["Total Absences:","______________________", "", "Total Lateness:","______________________", "", "Total Left Early:","______________________", ""]);
        summaryRow.eachCell((cell, colNumber) => {
            if (colNumber % 2 === 1) {
                cell.font = { bold: true };
            }
        });
        currentRow += 2;

        // Certification
        const certificationText = "I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.";
        worksheet.mergeCells(`A${currentRow}:M${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = certificationText;
        worksheet.getCell(`A${currentRow}`).alignment = { wrapText: true };
        currentRow += 2;

        // Signatures
        const signatureRow1 = worksheet.addRow(["Employee Signature:","______________________", "", "Date:","______________________", ""]);
        signatureRow1.eachCell((cell, colNumber) => {
            if (colNumber % 2 === 1) {
                cell.font = { bold: true };
            }
        });
        currentRow++;
        
        const signatureRow2 = worksheet.addRow(["Verification Signature:","______________________", "", "Date:","______________________", ""]);
        signatureRow2.eachCell((cell, colNumber) => {
            if (colNumber % 2 === 1) {
                // cell.font = { bold: true };
            }
        });
        worksheet.getCell(`A${currentRow + 1}`).value = "(for Program Hours)";
        currentRow += 3;

        // SCOPE Office Box
        worksheet.mergeCells(`I${currentRow - 4}:J${currentRow - 1}`);
        const scopeBoxCell = worksheet.getCell(`I${currentRow - 4}`);
        scopeBoxCell.value = "SCOPE Office:";
        scopeBoxCell.alignment = { vertical: 'top' };
        scopeBoxCell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        // Create border for the merged cells
        for (let i = currentRow - 4; i <= currentRow - 1; i++) {
            for (let j = 9; j <= 10; j++) {
                const cell = worksheet.getCell(i, j);
                cell.border = {
                    top: { style: i === currentRow - 4 ? 'thin' : undefined },
                    left: { style: j === 9 ? 'thin' : undefined },
                    bottom: { style: i === currentRow - 1 ? 'thin' : undefined },
                    right: { style: j === 10 ? 'thin' : undefined }
                };
            }
        }

        // Hours Summary
        worksheet.getCell(`K${currentRow - 4}`).value = `Program Hours: ${totalProgramHours.toFixed(2)} Hours`;
        worksheet.getCell(`K${currentRow - 3}`).value = `Additional Hours: ${totalAdditionalHours.toFixed(2)} Hours`;
        worksheet.getCell(`K${currentRow - 2}`).value = `Total Hours: ${totalHours.toFixed(2)} Hours`;
    });

    // Adjust column widths
    worksheet.columns = [
        { width: 15 }, // A
        { width: 15 }, // B
        { width: 15 }, // C
        { width: 15 }, // D
        { width: 15 }, // E
        { width: 15 }, // F
        { width: 15 }, // G
        { width: 15 }, // H
        { width: 15 }, // I
        { width: 15 }, // J
        { width: 15 }, // K
        { width: 20 }, // L
        { width: 15 }, // M
        { width: 15 }, // N
    ];

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default ScopeTimesheetWithoutNotesExcel;