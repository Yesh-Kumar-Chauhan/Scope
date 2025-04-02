import React from 'react';
import ExcelJS from 'exceljs';

const ScopeSubstituteTimesheetExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Substitute Timesheets');
    
    let currentRow = 1;

    reportData.forEach((employee: any, index: number) => {
        // Merge header cells for the title
        worksheet.mergeCells(`A${currentRow}:M${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'SCOPE Substitute - Time Sheet';
        worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        currentRow++;

        const timeSheetData = [
            ["Name:", `${employee?.FIRSTNAME} ${employee?.LASTNAME}`, "", "", "", "", "", "", "Position:", employee?.SitePos],
            ["District:", employee?.DIST_NAM, "", "", "", "", "", "", "Budget Code:", employee.DIST_NUM],
            ["Max Hours:", ` ${employee?.Max_Hours?employee?.Max_Hours:''} a week`, "", "", "", "", "", "", "Program:", employee?.SITE_NAM],
            ["Schedule:", employee?.Schedule],
            ["Comment:", employee?.COMMENT],
            ["IMPORTANT NOTE: You may be assigned additional hours or a location change which you must accommodate in order to meet legally required staff to student ratio."],
            []
        ];

        // Add the personal details rows
        timeSheetData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.addRow(row);
            currentRow++;

            // Make the label cells (1st and 9th column) bold
            if (rowIndex < 3) { // The first three rows contain labels
                worksheetRow.getCell(1).font = { bold: true }; // Make the first column bold (Name, District, Max Hours)
                worksheetRow.getCell(9).font = { bold: true }; // Make the ninth column bold (Position, Budget Code, Program)
            } else if (rowIndex === 3 || rowIndex === 4) {
                worksheetRow.getCell(1).font = { bold: true }; // Make the first column bold for 'Schedule' and 'Comment'
            }
        });

        // Add Hours Worked section header
        worksheet.getCell(`C${currentRow}`).value = "Hours Worked \n (Record Actual time worked)";
        worksheet.getCell(`C${currentRow}`).font = { bold: true };

        // Add Additional Hours section header to the right (Column J)
        worksheet.getCell(`J${currentRow}`).value = "Additional Hours/ Extra Pay \n (Record Actual time worked)";
        worksheet.getCell(`J${currentRow}`).font = { bold: true };
        currentRow++;

        // Add Hours Worked Table
        const hoursWorkedData = [
            ["", "Date", "In", "Out", "Code","#Hours","Supervisor's Signature"],
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

        // Add Additional Hours / Extra Pay Table (starting at Column J)
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

        // Insert the Hours Worked table (in columns A to G)
        hoursWorkedData.forEach((row, rowIndex) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;
            insertedRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        });

        // Insert the Additional Hours table (in columns J to O, aligned to the right)
        additionalHoursData.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                const cell = worksheet.getCell(currentRow - 11 + rowIndex, 10 + columnIndex); // Start from current row - 11 and column J (10th column)
                cell.value = value;
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        });

        worksheet.addRow([]);  // Add a blank row to avoid overlapping
        currentRow++;

        const TotalData = [
            ["", "", "", "", "", "Total:", "______________________", "", "", "", "", "Total:", "______________________",],
        ];

        TotalData.forEach((row) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;
        });

        worksheet.addRow([]);
        currentRow++;

        // For documenting table design
        const timeNotAtWorkDataHeader = [
            ["For documenting time not at work indicate"],
        ];

        timeNotAtWorkDataHeader.forEach((row, rowIndex) => {
            const insertedRow = worksheet.addRow(row);
            worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
            insertedRow.height = 30; // Increase row height for better readability
            insertedRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                cell.alignment = { vertical: 'middle', wrapText: true };
            });
            currentRow++;
        });

        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = "Sick (Personal Illness or Immediate Family)";
        worksheet.getCell(`A${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
        worksheet.getCell(`C${currentRow}`).value = "Jury Duty";
        worksheet.getCell(`C${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        currentRow++;

        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = "Personal Business";
        worksheet.getCell(`A${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
        worksheet.getCell(`C${currentRow}`).value = "Bereavement (Indicate Relationship)";
        worksheet.getCell(`C${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        currentRow++;

        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = "School Closed (as Indicated on Calendar)"
        worksheet.getCell(`A${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
        worksheet.getCell(`C${currentRow}`).value = "Emergency Closing (Snow Days, other authorized emergencies)";
        worksheet.getCell(`C${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        currentRow++;

        // code table design
        worksheet.getCell(`I${currentRow-3}`).value = "Code";
        worksheet.getCell(`I${currentRow-3}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`J${currentRow-3}`).value = "Explanation / Location";
        worksheet.getCell(`J${currentRow-3}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`K${currentRow-3}`).value = "Code"
        worksheet.getCell(`K${currentRow-3}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`L${currentRow-3}`).value = "Explanation / Location";
        worksheet.getCell(`L${currentRow-3}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`I${currentRow-2}`).value = "1";
        worksheet.getCell(`I${currentRow-2}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`J${currentRow-2}`).value = "Assigned Role of Acting Director";
        worksheet.getCell(`J${currentRow-2}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`K${currentRow-2}`).value = "3"
        worksheet.getCell(`K${currentRow-2}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`L${currentRow-2}`).value = "Group Leader assigned to role of Small Group Leader";
        worksheet.getCell(`L${currentRow-2}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`I${currentRow-1}`).value = "2";
        worksheet.getCell(`I${currentRow-1}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`J${currentRow-1}`).value = "Assigned to another program site Permanent sub assigned to a program outside of cluster";
        worksheet.getCell(`J${currentRow-1}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`K${currentRow-1}`).value = "4"
        worksheet.getCell(`K${currentRow-1}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.getCell(`L${currentRow-1}`).value = "Group Leader assigned to role of Head of Group";
        worksheet.getCell(`L${currentRow-1}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.addRow([]);
        currentRow++;

        // Add Total Absences, Lateness, and Left Early
        const summaryData = [
            ["Total Absences:", "______________________", "Total Lateness:", "______________________", "Total Left Early:", "______________________"],
        ];

        summaryData.forEach((row) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;
        });

        worksheet.addRow([]);  // Add a blank row
        currentRow++;

        // Add certification and signature section
        const certificationText = "I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.";
        worksheet.mergeCells(`A${currentRow}:N${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = certificationText;
        worksheet.getCell(`A${currentRow}`).alignment = { wrapText: true };
        currentRow++;

        worksheet.addRow([]);  // Add a blank row
        currentRow++;

        const signatureData = [
            ["Employee Signature:", "______________________", "Date:", "______________________"],
            ["Verification Signature:", "______________________", "Date:", "______________________"]
        ];

        signatureData.forEach((row, rowIndex) => {
            const insertedRow = worksheet.addRow(row);
            currentRow++;
        });

        worksheet.mergeCells(`I${currentRow-2}:J${currentRow+1}`);  // Create a square box for "SCOPE Office"
        const boxCell = worksheet.getCell(`I${currentRow-2}`);
        boxCell.value = "Scope Office Use Only";
        boxCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        // Explicitly position the "Additional Hours", "Program Hours", and "Total Hours" to the right of the box
        worksheet.mergeCells(`K${currentRow-2}:L${currentRow-2}`);
        worksheet.getCell(`K${currentRow-2}`).value = "Total Hours Worked:";
        worksheet.getCell(`K${currentRow-2}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.mergeCells(`K${currentRow-1}:L${currentRow-1}`);
        worksheet.getCell(`K${currentRow-1}`).value = "Additional Pay Due:";
        worksheet.getCell(`K${currentRow-1}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        
        worksheet.mergeCells(`K${currentRow}:L${currentRow}`);
        worksheet.getCell(`K${currentRow}`).value = "Approved by:"
        worksheet.getCell(`K${currentRow}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        
        worksheet.mergeCells(`K${currentRow+1}:L${currentRow+1}`);
        worksheet.getCell(`K${currentRow+1}`).value = "Notes:";
        worksheet.getCell(`K${currentRow+1}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        
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
                { width: 15 }, // G
                { width: 15 }, // H
                { width: 15 }, // I
                { width: 15 }, // J
                { width: 15 }, // K
                { width: 20 }, // L
                { width: 15 }, // M
                { width: 15 }, // N
            ];
        
            // Create the Excel file and return the buffer
            const buffer = await workbook.xlsx.writeBuffer();
            return buffer;
        };
        
        export default ScopeSubstituteTimesheetExcel;