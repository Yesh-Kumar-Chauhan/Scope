import React from 'react';
import ExcelJS from 'exceljs';

const EmergencyPhoneExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Emergency Phone Report');

    // Add title
    worksheet.mergeCells('A1:M1');
    worksheet.getCell('A1').value = 'Emergency Phone Report';
    worksheet.getCell('A1').font = { size: 14, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    // Sort the data by DIST_NAM then by SITE_NAM
    const sortedData = reportData.sort((a: any, b: any) => {
        const distComparison = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (distComparison !== 0) return distComparison;
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    // Add each employee's data to the worksheet
    sortedData.forEach((employee: any) => {
        const EmergencyPhoneData = [
            ["", "", `${employee?.SITE_NUM} ${employee?.SITE_NAM}`],
            ["", "", "SCOPE Information"],
            ["", "", `${employee?.DIST_NAM} / ${employee?.ADDR1}`],
            ["", "", "SCOPE program phone number:", employee?.PHONE],
            ["", "", "Home School phone number:", employee?.SCHFONE],
            ["", "", "Home School fax# number:", employee?.SFAX],
            []
        ];

        // Add the emergency phone data
        EmergencyPhoneData.forEach((row, rowIndex) => {
            const worksheetRow = worksheet.addRow(row);
            if (rowIndex < 6) {
                worksheetRow.getCell(3).font = { bold: true };
            }
        });

        // Add hours worked data
        const hoursWorkedData = [
            ["SCOPE Admin Office", "(631)360-0800"],
            ["SCOPE Beyond Office Hours", "(631)942-8054 Or contact your District Field Manager"],
            ["Long Island Regional Office 250 Veteran’s Highway, Suite 2A-20 Hauppauge, New York 11788  www.ocfs.state.ny.us", "(631)240-2560"],
            ["Suffolk Child Care Council", "(631)462-0303"],
            ["Nassau Child Care Council", "(516)358-9250"],
            ["Suffolk Soc. Ser. Day Care Unit", "(631)853-3666"],
            ["Nassau Soc. Ser. Day Care Unit", "(516)227-7976"],
            ["Department of health", "(631)852-5999"],
            ["Child Protective Services", "(800)635-1522"],
            ["Poison Control", "(800)222-1222"],
            ["School Tranportaion", "516-801-5190"],
            ["Fire Department", "516-621-7539"],
            ["Police", "516-573-6600"],
            ["School Security", "516-782-1129"]
        ];

        hoursWorkedData.forEach((row) => {
            const insertedRow = worksheet.addRow(row);
            insertedRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        });

        // Dynamically determine the starting row for additional hours data
        const additionalHoursStartRow = worksheet.lastRow ? worksheet.lastRow.number - 13 : 1;

        // Add additional hours data
        const additionalHoursData = [
            ["EMERGENCY", "911"],
            ["Ambulance", "516-742-3300"],
            ["Hospital", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""]
        ];

        additionalHoursData.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                const cell = worksheet.getCell(additionalHoursStartRow + rowIndex, 5 + columnIndex); // Adjust column if needed
                cell.value = value;
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
        });

        worksheet.addRow([]); // Add a blank row for better spacing between entries
    });

    // Create the Excel file and return the buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default EmergencyPhoneExcel;
