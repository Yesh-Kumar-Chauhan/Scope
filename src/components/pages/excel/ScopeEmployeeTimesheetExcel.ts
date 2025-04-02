import React from 'react';
import ExcelJS from 'exceljs';

const ScopeEmployeeTimesheetExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Timesheets');
    
    let currentRow = 1;

    reportData.forEach((employee: any, index: number) => {
        // Title Section
        worksheet.mergeCells(`A${currentRow}:M${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'SCOPE Employee - Time Sheet';
        worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        currentRow++;

        // Personal details rows
        const timeSheetData = [
            ["Name:", `${employee?.FIRSTNAME} ${employee?.LASTNAME}`, "", "", "", "", "", "", "Position:", employee?.SitePos],
            ["District:", employee?.DIST_NAM, "", "", "", "", "", "", "Budget Code:", employee.DIST_NUM],
            ["Max Hours:", `${employee?.Max_Hours?employee?.Max_Hours:'0'} a week`, "", "", "", "", "", "", "Program:", employee?.SITE_NAM],
            ["Schedule:", employee?.Schedule],
            ["Comment:", employee?.COMMENT],
            ["IMPORTANT NOTE: : You may be assigned additional hours or a location change which you must accommodate in order to meet legally required staff to student ratio."],
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

        // Hours Worked and Additional Hours headers
        worksheet.getCell(`C${currentRow}`).value = "Hours Worked \n (Record Actual time worked)";
        worksheet.getCell(`C${currentRow}`).font = { bold: true };
        worksheet.getCell(`J${currentRow}`).value = "Additional Hours/ Extra Pay \n (Record Actual time worked)";
        worksheet.getCell(`J${currentRow}`).font = { bold: true };
        currentRow++;

        // Hours Worked Table
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
            ["Fri", "", "", "", "", "", ""]
        ];

        // Additional Hours Table
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
            ["", "", "", "", "", ""]
        ];

        // Add both tables side by side
        hoursWorkedData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.getRow(currentRow + rowIndex);
            
            // Hours Worked table (columns A-G)
            row.forEach((value, colIndex) => {
                const cell = worksheetRow.getCell(colIndex + 1);
                cell.value = value;
                cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
            });

            // Additional Hours table (columns I-N)
            additionalHoursData[rowIndex].forEach((value, colIndex) => {
                const cell = worksheetRow.getCell(colIndex + 9);
                cell.value = value;
                cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
            });
        });
        currentRow += hoursWorkedData.length + 1;

        // Totals row
        worksheet.getRow(currentRow).values = ["", "", "", "", "", "Total:", "______________________", "", "", "", "", "Total:", "______________________"];
        currentRow += 2;

        // Time not at work section
        worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = "For documenting time not at work indicate";
        worksheet.getCell(`A${currentRow}`).border = {
            top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
        };
        worksheet.getRow(currentRow).height = 30;
        currentRow++;

        // Time not at work indicators
        const timeNotAtWorkRows = [
            { left: "Sick (Personal Illness or Immediate Family)", right: "Jury Duty" },
            { left: "Personal Business", right: "Bereavement (Indicate Relationship)" },
            { left: "School Closed (as Indicated on Calendar)", right: "Emergency Closing (Snow Days, other authorized emergencies)" }
        ];

        timeNotAtWorkRows.forEach(row => {
            worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = row.left;
            worksheet.getCell(`A${currentRow}`).border = {
                top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
            };

            worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
            worksheet.getCell(`C${currentRow}`).value = row.right;
            worksheet.getCell(`C${currentRow}`).border = {
                top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
            };
            currentRow++;
        });

        // Code table
        const codeData = [
            { cells: ['I', 'J', 'K', 'L'], values: ["Code", "Explanation / Location", "Code", "Explanation / Location"] },
            { cells: ['I', 'J', 'K', 'L'], values: ["1", "Assigned Role of Acting Director", "3", "Group Leader assigned to role of Small Group Leader"] },
            { cells: ['I', 'J', 'K', 'L'], values: ["2", "Assigned to another program site Permanent sub assigned to a program outside of cluster", "4", "Group Leader assigned to role of Head of Group"] }
        ];

        codeData.forEach((row, rowIndex) => {
            row.cells.forEach((cell, cellIndex) => {
                worksheet.getCell(`${cell}${currentRow - 3 + rowIndex}`).value = row.values[cellIndex];
                worksheet.getCell(`${cell}${currentRow - 3 + rowIndex}`).border = {
                    top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
                };
            });
        });

        currentRow += 1;

        // Summary section
        const summaryRow = worksheet.getRow(currentRow);
        summaryRow.values = ["Total Absences:", "______________________", "Total Lateness:", "______________________", "Total Left Early:", "______________________"];
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
        worksheet.mergeCells(`I${currentRow-2}:J${currentRow+1}`);
        worksheet.getCell(`I${currentRow-2}`).value = "Scope Office Use Only";
        worksheet.getCell(`I${currentRow-2}`).border = {
            top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
        };

        // Right side information
        const officeData = [
            ["Total Hours Worked:"],
            ["Additional Pay Due:"],
            ["Approved by:"],
            ["Notes:"]
        ];

        officeData.forEach((row, index) => {
            worksheet.mergeCells(`K${currentRow-2+index}:L${currentRow-2+index}`);
            worksheet.getCell(`K${currentRow-2+index}`).value = row[0];
            worksheet.getCell(`K${currentRow-2+index}`).border = {
                top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
            };
        });

        // Add gap between employees
        currentRow += 5;
    });

    // Set column widths
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

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default ScopeEmployeeTimesheetExcel;