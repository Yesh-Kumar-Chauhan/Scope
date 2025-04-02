import React from 'react';
import ExcelJS from 'exceljs';

const Scope11TimesheetExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Timesheets');
    
    let currentRow = 1;

    reportData.forEach((employee: any, index: number) => {
        // Title Section
        worksheet.mergeCells(`A${currentRow}:N${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = 'SCOPE 1:1 - Time Sheet';
        worksheet.getCell(`A${currentRow}`).font = { size: 14, bold: true };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        currentRow++;

        // Personal Details Section
        const timeSheetData = [
            ["Name:", `${employee?.FIRSTNAME} ${employee?.LASTNAME}`, "", "", "", "", "", "", "Position:", employee?.SitePos],
            ["District:", employee?.DIST_NAM, "", "", "", "", "", "", "Budget Code:", employee.DIST_NUM],
            ["Max Hours:", ` ${employee?.Max_Hours?employee?.Max_Hours:'0'} a week`, "", "", "", "", "", "", "Program:", employee?.SITE_NAM],
            ["Schedule:", employee?.Schedule],
            ["Comment:", employee?.COMMENT],
            ["IMPORTANT NOTE : You may be assigned additional hours or a location change which you must accommodate in order to meet legally required staff to student ratio."],
            []
        ];

        timeSheetData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.getRow(currentRow);
            row.forEach((cell, cellIndex) => {
                worksheetRow.getCell(cellIndex + 1).value = cell;
            });

            if (rowIndex < 3) {
                worksheetRow.getCell(1).font = { bold: true };
                worksheetRow.getCell(9).font = { bold: true };
            } else if (rowIndex === 3 || rowIndex === 4 || rowIndex === 5) {
                worksheetRow.getCell(1).font = { bold: true };
            }
            currentRow++;
        });

        // Hours Section Headers
        worksheet.getCell(`C${currentRow}`).value = "Hours Worked \n (Record Actual time worked)";
        worksheet.getCell(`C${currentRow}`).font = { bold: true };
        worksheet.getCell(`J${currentRow}`).value = "Additional Hours/ Extra Pay \n (Record Actual time worked)";
        worksheet.getCell(`J${currentRow}`).font = { bold: true };
        currentRow++;

        // Hours Worked Table
        const hoursWorkedData = [
            ["", "Date", "In", "Out", "CIRCLE YOUR POSITION","", "#Hours"],
            ["Mon", "", "", "", "1:1", "Aide", ""],
            ["Tue", "", "", "", "1:1", "Aide", ""],
            ["Wed", "", "", "", "1:1", "Aide", ""],
            ["Thu", "", "", "", "1:1", "Aide", ""],
            ["Fri", "", "", "", "1:1", "Aide", ""],
            ["Mon", "", "", "", "1:1", "Aide", ""],
            ["Tue", "", "", "", "1:1", "Aide", ""],
            ["Wed", "", "", "", "1:1", "Aide", ""],
            ["Thu", "", "", "", "1:1", "Aide", ""],
            ["Fri", "", "", "", "1:1", "Aide", ""],
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
            ["", "", "", "", "", ""],
        ];

        // Insert Hours Worked table
        hoursWorkedData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.getRow(currentRow);
            row.forEach((cell, cellIndex) => {
                const excelCell = worksheetRow.getCell(cellIndex + 1);
                excelCell.value = cell;
                excelCell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });

            if (rowIndex === 1) {
                worksheet.mergeCells(`E${currentRow}:F${currentRow}`);
            }
            currentRow++;
        });

        // Insert Additional Hours table
        let additionalHoursStartRow = currentRow - 11;
        additionalHoursData.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                const cell = worksheet.getCell(additionalHoursStartRow + rowIndex, 9 + columnIndex);
                cell.value = value;
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        // Add Totals Section
        currentRow++;
        const totalRow = worksheet.getRow(currentRow);
        totalRow.getCell(6).value = "Total:";
        totalRow.getCell(7).value = "______________________";
        totalRow.getCell(12).value = "Total:";
        totalRow.getCell(13).value = "______________________";
        currentRow++;

        // Documentation Section Header
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
        const docHeader = worksheet.getCell(`A${currentRow}`);
        docHeader.value = "For documenting time not at work indicate";
        docHeader.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        docHeader.alignment = { vertical: 'middle', wrapText: true };

        // Code Table Headers
        worksheet.getCell(`I${currentRow}`).value = "Code";
        worksheet.getCell(`J${currentRow}`).value = "Explanation / Location";
        worksheet.getCell(`K${currentRow}`).value = "Code";
        worksheet.getCell(`L${currentRow}`).value = "Explanation / Location";
        
        [`I${currentRow}`, `J${currentRow}`, `K${currentRow}`, `L${currentRow}`].forEach(cell => {
            worksheet.getCell(cell).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        currentRow++;

        // Documentation Items
        const docItems = [
            ["Sick (Personal Illness or Immediate Family)", "Jury Duty"],
            ["Personal Business", "Bereavement (Indicate Relationship)"],
            ["School Closed (as Indicated on Calendar)", "Emergency Closing (Snow Days, other authorized emergencies)"]
        ];

        docItems.forEach((row, index) => {
            worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
            worksheet.mergeCells(`C${currentRow}:D${currentRow}`);
            
            worksheet.getCell(`A${currentRow}`).value = row[0];
            worksheet.getCell(`C${currentRow}`).value = row[1];
            
            [`A${currentRow}`, `C${currentRow}`].forEach(cell => {
                worksheet.getCell(cell).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
            currentRow++;
        });

        // Code Table Content
        const codeItems = [
            ["1", "Assigned Role of Site Director", "6", "Assigned to program outside of cluster"],
            ["2", "Assigned to program during programs hours (same district)", "7", "Group Leader Assigned to cover 1:1"],
            ["3", "Assigned to program during regular programs hours (same district)", "8", "Group Leader Assigned to cover 2:1"],
            ["4", "Assigned to program outside of regular programs hours (same district)", "9", "Teacher Assistants covers for teacher"],
            ["5", "Assigned to program during outside of regular programs hours (same district)", "10", "Teacher covers for another teacher"]
        ];

        let codeStartRow = currentRow - 5;
        codeItems.forEach((row, index) => {
            worksheet.getCell(`I${codeStartRow + index}`).value = row[0];
            worksheet.getCell(`J${codeStartRow + index}`).value = row[1];
            worksheet.getCell(`K${codeStartRow + index}`).value = row[2];
            worksheet.getCell(`L${codeStartRow + index}`).value = row[3];

            [`I${codeStartRow + index}`, `J${codeStartRow + index}`, `K${codeStartRow + index}`, `L${codeStartRow + index}`].forEach(cell => {
                worksheet.getCell(cell).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });
        currentRow++;

        // Summary Section
        currentRow++;
        worksheet.getRow(currentRow).values = ["Total Absences:", "______________________", "Total Lateness:", "______________________", "Total Left Early:", "______________________"];
        currentRow += 2;

        // Certification Text
        worksheet.mergeCells(`A${currentRow}:N${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = "I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.";
        worksheet.getCell(`A${currentRow}`).alignment = { wrapText: true };
        currentRow++;

        // Signature Section
        currentRow++;
        const signatureData = [
            ["Employee Signature:", "______________________", "Date:", "______________________"],
            ["Verification Signature:", "______________________", "Date:", "______________________"]
        ];

        signatureData.forEach(row => {
            worksheet.getRow(currentRow).values = row;
            currentRow++;
        });

        // SCOPE Office Box
        const scopeOfficeStartRow = currentRow - 2;
        worksheet.mergeCells(`I${scopeOfficeStartRow}:J${scopeOfficeStartRow + 3}`);
        const boxCell = worksheet.getCell(`I${scopeOfficeStartRow}`);
        boxCell.value = "Scope Office Use Only";
        boxCell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        // Office Use Fields
        const officeFields = [
            ["Total Hours Worked:", ""],
            ["Additional Pay Due:", ""],
            ["Approved by:", ""],
            ["Notes:", ""]
        ];

        officeFields.forEach((field, index) => {
            worksheet.mergeCells(`K${scopeOfficeStartRow + index}:L${scopeOfficeStartRow + index}`);
            const cell = worksheet.getCell(`K${scopeOfficeStartRow + index}`);
            cell.value = field[0];
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

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

export default Scope11TimesheetExcel;