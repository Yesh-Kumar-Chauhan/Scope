import ExcelJS from 'exceljs';
import moment from 'moment';

// Group and sort data by EXPIRES, DIST_NAM, and SITE_NAM
const groupByExpires = (data: any[]) => {
    // Sort data by EXPIRES, then DIST_NAM, then SITE_NAM
    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.EXPIRES);
        const dateB = new Date(b.EXPIRES);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime(); // Sort by EXPIRES first
        }

        const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (distCompare !== 0) return distCompare; // Then by DIST_NAM

        return a.SITE_NAM.localeCompare(b.SITE_NAM); // Then by SITE_NAM
    });

    // Group the sorted data by EXPIRES
    return sortedData.reduce((acc: any, item: any) => {
        const key = item.EXPIRES;
        if (!acc[key]) {
            acc[key] = {
                EXPIRES: item.EXPIRES,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const PermitExpirationExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Permit Expiration');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Permit Expiration';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Group data by EXPIRES and sort it
    const groupedData = groupByExpires(reportData);
    let currentRow = 3;

    // Iterate over grouped and sorted data
    Object.keys(groupedData).forEach((expiresKey) => {
        const group = groupedData[expiresKey];

        // Insert the EXPIRES date as a merged row
        worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = group?.EXPIRES ? moment(group?.EXPIRES).format('DD/MM/YYYY') : 'N/A';
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        // Add header row for the group
        worksheet.getRow(currentRow).values = ['Number', 'District Name', 'Number', 'Site Name', 'PERMIT#'];
        worksheet.getRow(currentRow).font = { bold: true };
        currentRow++;

        // Add rows for each staff item in the group
        group.items.forEach((staff: any) => {
            worksheet.addRow([
                staff?.DIST_NUM,
                staff?.DIST_NAM,
                staff?.SITE_NUM,
                staff?.SITE_NAM,
                staff?.PERMIT,
            ]);

            currentRow++;
        });

        // Add a blank row between groups for better readability
        currentRow++;
    });

    // Create the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default PermitExpirationExcel;
