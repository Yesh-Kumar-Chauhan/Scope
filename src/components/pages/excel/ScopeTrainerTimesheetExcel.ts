// import React from 'react';
// import ExcelJS from 'exceljs';


// const ScopeTrainerTimesheetExcel = async (reportData: any) => {
//     const workbook = new ExcelJS.Workbook();

//     // Loop over each row of data (each employee) and create a new sheet
//     reportData.forEach((employee: any, index: number) => {
//         // Create a new worksheet for each employee
//         const worksheet = workbook.addWorksheet(`TimeSheet ${index + 1}`);

//         // Merge header cells for the title
//         worksheet.mergeCells('A1:M1');
//         worksheet.getCell('A1').value = 'SCOPE Trainer - Time Sheet';
//         worksheet.getCell('A1').font = { size: 14, bold: true };
//         worksheet.getCell('A1').alignment = { horizontal: 'center' };

//         const timeSheetData = [
//             ["Name:", `${employee?.FIRSTNAME} ${employee?.LASTNAME}`, "", "", "", "", "", "", "Position:", employee?.SitePos],
//             ["Max Hours:",` ${employee?.Max_Hours} a week`, "", "", "", "", "", "", "Budget Code:", employee.DIST_NUM],
//             ["Schedule:", employee?.Schedule],
//             ["Comment:", employee?.COMMENT],
//             []
//         ];

//         // Add the personal details rows
//         timeSheetData.forEach((row, rowIndex) => {
//             const worksheetRow = worksheet.addRow(row);

//             // Make the label cells (1st and 5th column) bold
//             if (rowIndex < 2) { // The first three rows contain labels
//                 worksheetRow.getCell(1).font = { bold: true }; // Make the first column bold (Name, District, Max Hours)
//                 worksheetRow.getCell(9).font = { bold: true }; // Make the fifth column bold (Position, Budget Code, Program)
//             } else if (rowIndex === 2 || rowIndex === 3) {
//                 worksheetRow.getCell(1).font = { bold: true }; // Make the first column bold for 'Schedule'
//             }
//         });

//         // Add Hours Worked section header
//         worksheet.getCell('C10').value = `Program Hours Maximum Weekly Program Hours. ${employee?.Max_Hours?employee?.Max_Hours:''}`;
//         worksheet.getCell('C10').font = { bold: true };

//         // Add Additional Hours section header to the right (Column G)
//         worksheet.getCell('J10').value = "Additional Hours (0.50 pre-approved inservices & late pick-up)";
//         worksheet.getCell('J10').font = { bold: true };

//         // Add Hours Worked Table
//         const hoursWorkedData = [
//             ["", "Date", "In", "Out", "Lunch In", "Lunch Out", "#Hours"],
//             ["Mon", "", "", "", "", "", ""],
//             ["Tue", "", "", "", "", "", ""],
//             ["Wed", "", "", "", "", "", ""],
//             ["Thu", "", "", "", "", "", ""],
//             ["Fri", "", "", "", "", "", ""],
//             ["Mon", "", "", "", "", "", ""],
//             ["Tue", "", "", "", "", "", ""],
//             ["Wed", "", "", "", "", "", ""],
//             ["Thu", "", "", "", "", "", ""],
//             ["Fri", "", "", "", "", "", ""],
//         ];

//         // Add Additional Hours / Extra Pay Table (starting at Column G)
//         const additionalHoursData = [
//             ["Date", "Start", "Stop", "Explanation/ Location", "Code", "#Hours"],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//             ["", "", "", "", "", ""],
//         ];

//         // Insert the Hours Worked table (in columns A to F)
//         hoursWorkedData.forEach((row, rowIndex) => {
//             const insertedRow = worksheet.addRow(row);
//             insertedRow.eachCell({ includeEmpty: true }, (cell) => {
//                 cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
//             });
//         });

//         // Insert the Additional Hours table (in columns G to L, aligned to the right)
//         additionalHoursData.forEach((row, rowIndex) => {
//             row.forEach((value, columnIndex) => {
//                 const cell = worksheet.getCell(11 + rowIndex, 9 + columnIndex); // Start from row 11 and column G (7th column)
//                 cell.value = value;
//                 cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
//             });
//         });

//         worksheet.addRow([]);  // Add a blank row to avoid overlapping

//         const TotalData = [
//             ["", "", "", "", "", "Total:", "______________________", "", "", "", "", "Total:", "______________________",],
//         ];

//         TotalData.forEach((row) => {
//             const insertedRow = worksheet.addRow(row);
//             insertedRow.eachCell({ includeEmpty: true }, (cell) => {
//             });
//         });

//         worksheet.addRow([]);

//         // For documenting table desing

//         const timeNotAtWorkDataHeader = [
//             ["For documenting time not at work indicate"],
//         ]

//         timeNotAtWorkDataHeader.forEach((row, rowIndex) => {
//             const insertedRow = worksheet.addRow(row);
//             worksheet.mergeCells('A25:F25');
//             insertedRow.height = 30; // Increase row height for better readability
//             insertedRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
//                 cell.border = {
//                     top: { style: 'thin' },
//                     left: { style: 'thin' },
//                     bottom: { style: 'thin' },
//                     right: { style: 'thin' }
//                 };
//                 cell.alignment = { vertical: 'middle', wrapText: true };
//             });
//         });

//         worksheet.mergeCells('A26:C26');
//         worksheet.getCell('A26').value = "Sick (Personal Illness or Immediate Family)";
//         worksheet.getCell('A26').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

//         worksheet.mergeCells('D26:F26');
//         worksheet.getCell('D26').value = "Jury Duty";
//         worksheet.getCell('D26').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

//         worksheet.mergeCells('A27:C27');
//         worksheet.getCell('A27').value = "Personal Business";
//         worksheet.getCell('A27').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

//         worksheet.mergeCells('D27:F27');
//         worksheet.getCell('D27').value = "Bereavement (Indicate Relationship)";
//         worksheet.getCell('D27').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

//         worksheet.mergeCells('A28:C28');
//         worksheet.getCell('A28').value = "School Closed (as Indicated on Calendar)"
//         worksheet.getCell('A28').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

//         worksheet.mergeCells('D28:F28');
//         worksheet.getCell('D28').value = "Emergency Closing (Snow Days, other authorized emergencies)";
//         worksheet.getCell('D28').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

//         worksheet.getCell('I25').value = "Total Absences: ______________________";

//         worksheet.getCell('I26').value = "Total Lateness: ______________________";

//         worksheet.getCell('I27').value = "Total Left Early: _____________________";

//         worksheet.getCell('I29').value = "I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.";


//         worksheet.getCell('I31').value = "Employee Signature: ______________________";

//         worksheet.getCell('J31').value = "Date: _____________________";

//         worksheet.getCell('I32').value = "Verfication Signature: ______________________";

//         worksheet.getCell('J32').value = "Date: _____________________";

//         worksheet.addRow([]);

//         worksheet.mergeCells('E30:F33');  // Create a square box for "SCOPE Office"
//         const boxCell = worksheet.getCell('E30');
//         boxCell.value = `Total Hours\n\n\n For Office Use Only`;  // Keep it empty
//         boxCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
//         boxCell.alignment = { 
//             vertical: 'top',    
//             horizontal: 'left', 
//             wrapText: true     
//         };

//         worksheet.columns = [
//             { width: 15 }, // A
//             { width: 15 }, // B
//             { width: 15 }, // C
//             { width: 15 }, // D
//             { width: 15 }, // E
//             { width: 15 }, // F
//             { width: 15 }, // G (Additional Hours start)
//             { width: 15 }, // H
//             { width: 15 }, // I
//             { width: 15 }, // J
//             { width: 15 }, // K
//             { width: 20 }, // L
//             { width: 15 }, // M
//             { width: 15 }, // N
//         ];
//     });

//     // Create the Excel file and download it
//     const buffer = await workbook.xlsx.writeBuffer();
//     return buffer;
// };

// export default ScopeTrainerTimesheetExcel;
import React from 'react';
import ExcelJS from 'exceljs';

const ScopeTrainerTimesheetExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Timesheets');
    
    let currentRow = 1;

    reportData.forEach((employee: any, index: number) => {
        // Merge header cells for the title
        worksheet.mergeCells(`A${currentRow}:M${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'SCOPE Trainer - Time Sheet';
        worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        currentRow++;

        // Personal details rows
        const timeSheetData = [
            ["Name:", `${employee?.FIRSTNAME} ${employee?.LASTNAME}`, "", "", "", "", "", "", "Position:", employee?.SitePos],
            ["Max Hours:", `${employee?.Max_Hours?employee?.Max_Hours:'0'} a week`, "", "", "", "", "", "", "Budget Code:", employee.DIST_NUM],
            ["Schedule:", employee?.Schedule],
            ["Comment:", employee?.COMMENT],
            []
        ];

        timeSheetData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.getRow(currentRow);
            row.forEach((cell, cellIndex) => {
                worksheetRow.getCell(cellIndex + 1).value = cell;
            });

            if (rowIndex < 2) {
                worksheetRow.getCell(1).font = { bold: true };
                worksheetRow.getCell(9).font = { bold: true };
            } else if (rowIndex === 2 || rowIndex === 3) {
                worksheetRow.getCell(1).font = { bold: true };
            }
            currentRow++;
        });

        // Hours Worked section header
        worksheet.getCell(`C${currentRow}`).value = `Program Hours Maximum Weekly Program Hours. ${employee?.Max_Hours ? employee?.Max_Hours : ''}`;
        worksheet.getCell(`C${currentRow}`).font = { bold: true };
        worksheet.getCell(`J${currentRow}`).value = "Additional Hours (0.50 pre-approved inservices & late pick-up)";
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
        currentRow += hoursWorkedData.length;

        // Total row
        worksheet.getRow(currentRow).values = ["", "", "", "", "", "Total:", "______________________", "", "", "", "", "Total:", "______________________"];
        currentRow++;

        // Documentation section
        currentRow += 2;
        worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = "For documenting time not at work indicate";
        worksheet.getCell(`A${currentRow}`).border = {
            top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
        };
        currentRow++;

        // Time not at work indicators
        const timeNotAtWorkRows = [
            {left: "Sick (Personal Illness or Immediate Family)", right: "Jury Duty"},
            {left: "Personal Business", right: "Bereavement (Indicate Relationship)"},
            {left: "School Closed (as Indicated on Calendar)", right: "Emergency Closing (Snow Days, other authorized emergencies)"}
        ];

        timeNotAtWorkRows.forEach(row => {
            worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = row.left;
            worksheet.getCell(`A${currentRow}`).border = {
                top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
            };

            worksheet.mergeCells(`D${currentRow}:F${currentRow}`);
            worksheet.getCell(`D${currentRow}`).value = row.right;
            worksheet.getCell(`D${currentRow}`).border = {
                top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
            };
            currentRow++;
        });

        // Totals and signature section
        worksheet.getCell(`I${currentRow-2}`).value = "Total Absences: ______________________";
        worksheet.getCell(`I${currentRow-1}`).value = "Total Lateness: ______________________";
        worksheet.getCell(`I${currentRow}`).value = "Total Left Early: _____________________";
        currentRow++;

        worksheet.getCell(`I${currentRow}`).value = "I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.";
        currentRow += 2;

        worksheet.getCell(`I${currentRow}`).value = "Employee Signature: ______________________";
        worksheet.getCell(`J${currentRow}`).value = "Date: _____________________";
        currentRow++;

        worksheet.getCell(`I${currentRow}`).value = "Verification Signature: ______________________";
        worksheet.getCell(`J${currentRow}`).value = "Date: _____________________";

        // Office use box
        worksheet.mergeCells(`E${currentRow-3}:F${currentRow}`);
        const boxCell = worksheet.getCell(`E${currentRow-3}`);
        boxCell.value = `Total Hours\n\n\n For Office Use Only`;
        boxCell.border = {
            top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
        };
        boxCell.alignment = {
            vertical: 'top',
            horizontal: 'left',
            wrapText: true
        };

        // Add gap between employees
        currentRow += 4;
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

export default ScopeTrainerTimesheetExcel;