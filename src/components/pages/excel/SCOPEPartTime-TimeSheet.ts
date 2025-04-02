import React from 'react';
import ExcelJS from 'exceljs';

const getCurrentWeekRange = () => {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay();
    const lastDayOfWeek = firstDayOfWeek + 6;

    const startDate = new Date(today.setDate(firstDayOfWeek)).toISOString().split('T')[0];
    const endDate = new Date(today.setDate(lastDayOfWeek)).toISOString().split('T')[0];

    return { startDate, endDate };
};

const SCOPEPartTimeTimeSheet = async (reportData: any) => {
    const { startDate, endDate } = getCurrentWeekRange();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Timesheets');

    let currentRow = 1;

    // Loop over each row of data (each employee) and add their timesheet to the worksheet
    reportData.forEach((employee: any, index: number) => {
        // Merge header cells for the title
        worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'SCOPE PartTime - Time Sheet';
        worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        currentRow++;

        const timeSheetData = [
            ["Name:", `${employee?.FIRSTNAME} ${employee?.LASTNAME}`, "", "", "Position:", employee?.SitePos],
            ["District:", employee?.DIST_NAM, "", "", "Budget Code:", employee.DIST_NUM],
            ["Building:", "", "", "", "Program:", employee?.SITE_NAM],
            ["Schedule:", employee?.Schedule],
            ["IMPORTANT NOTE: You may be assigned additional hours or a location change which you must accommodate in order to meet legally required staff to student ratio."],
            []
        ];

        // Add the personal details rows
        timeSheetData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.addRow(row);
            currentRow++;

            // Make the label cells (1st and 5th column) bold
            if (rowIndex < 3) { // The first three rows contain labels
                worksheetRow.getCell(1).font = { bold: true }; // Make the first column bold (Name, District, Max Hours)
                worksheetRow.getCell(5).font = { bold: true }; // Make the fifth column bold (Position, Budget Code, Program)
            } else if (rowIndex === 3 || rowIndex === 4) {
                worksheetRow.getCell(1).font = { bold: true }; // Make the first column bold for 'Schedule'
            }
        });

        worksheet.addRow([]);
        currentRow++;

        // Add Hours Worked section header
        worksheet.getCell(`A${currentRow}`).value = `Program Hours (Maximum Weekly Program Hours ${employee?.Max_Hours?employee?.Max_Hours:'0'})`;
        worksheet.getCell(`A${currentRow}`).font = { bold: true };

        // Add Additional Hours section header to the right (Column G)
        worksheet.getCell(`I${currentRow}`).value = "Additional Hours (0.50 pre-approved inservices & late pick-up)";
        worksheet.getCell(`I${currentRow}`).font = { bold: true };
        currentRow++;

        // Add Hours Worked Table
        const hoursWorkedData = [
            ["", "Date", "In", "Out", "Lunch In", "Lunch Out", "#Hours"],
            ["Mon", "", "", "", "", "", ""],
            ["Tue", "", "", "", "", "", ""],
            ["Wed", "", "", "", "", "", ""],
            ["Thu", "", "", "", "", "", ""],
            ["Fri", "", "", "", "", "", ""],
            ["Mon", "", "", "", "", "", ""],
            ["Tue", "", "", "", "", "", ""],
            ["Wed", "", "", "", "", "", ""],
            ["Thu", "", "", "", "", "", ""],
            ["Fri", "", "", "", "", "", ""],
        ];

        // Add Additional Hours / Extra Pay Table (starting at Column G)
        const additionalHoursData = [
            ["Date", "Start", "Stop", "Explanation/ Location", "Code", "#Hours"],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
        ];

        // Insert the Hours Worked table (in columns A to F)
        hoursWorkedData.forEach((row, rowIndex) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;
            insertedRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        });

        // Insert the Additional Hours table (in columns G to L, aligned to the right)
        additionalHoursData.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                const cell = worksheet.getCell(currentRow - 11 + rowIndex, 9 + columnIndex); // Start from current row - 11 and column I (9th column)
                cell.value = value;
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        });

        worksheet.addRow([]);  // Add a blank row to avoid overlapping
        currentRow++;
        const programHoursRow = ["Program Hours:", ""]; // B cell is empty for now
        const insertedProgramHoursRow = worksheet.addRow(programHoursRow);
        currentRow++;
        insertedProgramHoursRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber === 2) { // Check if it is column B (2nd column)
                cell.border = {
                    top: { style: 'thin' }, left: { style: 'thin' },
                    bottom: { style: 'thin' }, right: { style: 'thin' }
                };
            }
        });
        worksheet.addRow([]);  // Another blank row to add more space
        currentRow++;

        // Add Total Absences, Lateness, and Left Early
        const summaryData = [
            ["Total Absences:", "", "Total Lateness:", "", "Total Left Early:", ""],
        ];

        summaryData.forEach((row) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;
            insertedRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin' }, left: { style: 'thin' },
                    bottom: { style: 'thin' }, right: { style: 'thin' }
                };
            });
        });

        // Shift the Employee Signature and Date section 5 rows down
        for (let i = 0; i < 2; i++) {
            worksheet.addRow([]);  // Adds 5 empty rows to add space
            currentRow++;
        }

        // Move the Employee Signature and Date section to a new row
        // Combine the certification text and signature rows
        const signatureData = [
            ["I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated."],
            ["Employee Signature:", "", "Date:", ""],
            ["Employee Signature:", "", "Date:", ""]
        ];

        // Add certification and signature data to the worksheet
        signatureData.forEach((row, rowIndex) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;

            // Apply borders for signature rows only (skip the first row which is the certification text)
            if (rowIndex > 0) {
                insertedRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.border = {
                        top: { style: 'thin' }, left: { style: 'thin' },
                        bottom: { style: 'thin' }, right: { style: 'thin' }
                    };
                });
            }
        });

        // Create a box for "SCOPE Office" use only
        worksheet.mergeCells(`I${currentRow - 5}:J${currentRow - 1}`);  // Create a square box for "SCOPE Office"
        const boxCell = worksheet.getCell(`I${currentRow - 5}`);
        boxCell.value = "";  // Keep it empty
        boxCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        // Explicitly position the "Additional Hours", "Program Hours", and "Total Hours" to the right of the box
        worksheet.getCell(`K${currentRow - 5}`).value = "Additional Hours:";
        worksheet.getCell(`L${currentRow - 5}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`K${currentRow - 4}`).value = "Program Hours:";
        worksheet.getCell(`L${currentRow - 4}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`K${currentRow - 3}`).value = "Total Hours:";
        worksheet.getCell(`L${currentRow - 3}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        // Add space between employee timesheets
        for (let i = 0; i < 4; i++) {
            worksheet.addRow([]);
            currentRow++;
        }
    });

    // Set column widths for readability
    worksheet.columns = [
        { width: 15 }, // A
        { width: 15 }, // B
        { width: 15 }, // C
        { width: 15 }, // D
        { width: 15 }, // E
        { width: 15 }, // F
        { width: 15 }, // G (Additional Hours start)
        { width: 15 }, // H
        { width: 15 }, // I
        { width: 15 }, // J
        { width: 15 }, // K
        { width: 20 }, // L
        { width: 15 }, // M
        { width: 15 }, // N
    ];

    // Create the Excel file and download it
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SCOPEPartTimeTimeSheet;