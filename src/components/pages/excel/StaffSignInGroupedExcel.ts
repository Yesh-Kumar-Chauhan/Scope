import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';

const StaffSignInGroupedExcel = async (data: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Sign In');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Staff Sign In';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add "Today's Date" row
    const todayDate = moment().format('MM/DD/YYYY');
    worksheet.addRow(['', '', `Today's Date: ______________`]);
    worksheet.addRow([]); // Add an empty row for spacing

    // Sort data by DIST_NAM and SITE_NAM
    const sortedData = data.sort((a: any, b: any) => {
        const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (distCompare !== 0) return distCompare;
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    // Group data by District and Site
    const groupedData = groupByDistrictAndSiteType(sortedData);

    let lastDistrictName = '';
    Object.keys(groupedData).forEach((districtKey, districtIndex) => {
        const group = groupedData[districtKey];

        // Add district name if it changes
        if (lastDistrictName !== group.DIST_NAM) {
            worksheet.addRow([group.DIST_NAM]);
            if (worksheet.lastRow) {
                worksheet.getCell(`A${worksheet.lastRow.number}`).font = { bold: true };
            }
            lastDistrictName = group.DIST_NAM;
        }

        // Add site name
        worksheet.addRow([group.SITE_NAM]);
        if (worksheet.lastRow) {
            worksheet.getCell(`A${worksheet.lastRow.number}`).font = { italic: true, bold: true };
        }

        // Add header row for names
        worksheet.addRow(['Name', 'Signature']);

        // Add staff information with a signature line
        const signatureLine = '_______________';
        group.items.forEach((staff: any) => {
            worksheet.addRow([`${staff.LASTNAME} ${staff.FIRSTNAME}`, signatureLine]);
        });

        worksheet.addRow([]); // Add an empty row between groups
    });

    // Auto adjust column width
    worksheet.columns.forEach((column) => {
        if (column.values) {
            column.width = Math.max(...column.values.map(val => (val || '').toString().length), 10);
        }
    });

    // Apply border style for better readability
    worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.alignment = { vertical: 'middle', horizontal: 'left' };
        row.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Generate Excel buffer and save
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Staff_Sign_In.xlsx');
};

// Utility function for grouping data
const groupByDistrictAndSiteType = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

export default StaffSignInGroupedExcel;
