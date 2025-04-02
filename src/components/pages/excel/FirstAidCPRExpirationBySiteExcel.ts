import ExcelJS from 'exceljs';
import moment from 'moment';

const FirstAidCPRExpirationBySiteExcel = async (reportData: any) => {
    console.log("FirstAidCPRExpirationBySiteExcel called");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('First Aid CPR Expiration by Site');

    // Add title
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'First Aid/CPR Expiration by Site Report';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add current date
    const todayDate = moment().format('DD-MM-YYYY');
    worksheet.mergeCells('A2:F2');
    worksheet.getCell('A2').value = `Date: ${todayDate}`;
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Grouping and sorting logic
    const groupedData = groupByDistrictAndSiteType(reportData);

    let currentRow = 4;
    let lastDistrictName = '';

    // Iterate over sorted district keys
    Object.keys(groupedData)
        .sort((a, b) => a.localeCompare(b)) // Sort by DIST_NAM then SITE_NAM
        .forEach((key) => {
            const group = groupedData[key];

            // Insert District Name if it changes
            if (lastDistrictName !== group.DIST_NAM) {
                worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
                worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
                worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
                currentRow++;
                lastDistrictName = group.DIST_NAM;
            }

            // Insert Site Name and Director
            worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = `Site: ${group.SITE_NAM}`;
            worksheet.getCell(`A${currentRow}`).font = { italic: true, bold: true };
            currentRow++;

            worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = `Multi-Site Director: ${group?.Directors ?? ''}`;
            worksheet.getCell(`A${currentRow}`).font = { italic: true };
            currentRow++;

            // Add table headers for this group
            worksheet.getRow(currentRow).values = ['First Aid', 'CPR', 'Mat Training', 'Child Abuse', 'Name', 'Position'];
            worksheet.getRow(currentRow).font = { bold: true };
            currentRow++;

            // Insert rows for each staff member, sorted by LASTNAME
            group.items
                .sort((a: any, b: any) => a.LASTNAME.localeCompare(b.LASTNAME))
                .forEach((data: any) => {
                    worksheet.addRow([
                        data.FIRSTAID ? moment(data.FIRSTAID).format('YYYY-MM-DD') : '', // First Aid
                        data.CPR ? moment(data.CPR).format('YYYY-MM-DD') : '',           // CPR
                        data.MATDATE ? moment(data.MATDATE).format('YYYY-MM-DD') : '',   // Mat Training
                        data.MATAPP ? moment(data.MATAPP).format('YYYY-MM-DD') : '',     // Child Abuse
                        `${data.FIRSTNAME} ${data.LASTNAME}`,                            // Name
                        data.SitePos                                                    // Position
                    ]);
                    currentRow++;
                });

            // Add a blank row between groups for better readability
            currentRow++;
        });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 20;
    });
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        row.alignment = { vertical: 'middle', horizontal: 'center' };
        row.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Return the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

// Helper function to group data by district and site type
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

export default FirstAidCPRExpirationBySiteExcel;
