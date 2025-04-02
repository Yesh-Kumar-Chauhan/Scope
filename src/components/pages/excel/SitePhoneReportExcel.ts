import ExcelJS from 'exceljs';
import moment from 'moment';

const SitePhoneReportExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Phone Report');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Site Phone Report';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add current date
    const todayDate = moment().format('DD-MM-YYYY');
    worksheet.mergeCells('A2:E2');
    worksheet.getCell('A2').value = `Date: ${todayDate}`;
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Group data by district
    const groupedData = groupByDistrict(reportData);

    let currentRow = 4;

    // Iterate over each district and site to insert data
    Object.keys(groupedData)
        .sort((a, b) => a.localeCompare(b)) // Sort districts alphabetically
        .forEach((key) => {
            const group = groupedData[key];

            // Add district header
            worksheet.getRow(currentRow).values = [
                `${group.DIST_NAM}`, 'Phone', 'Type', 'Email', 'Site Directors / Head of Group'
            ];
            worksheet.getRow(currentRow).font = { bold: true };
            currentRow++;

            // Sort sites by SiteName before adding them
            group.items
                .sort((a: any, b: any) => a.SiteName.localeCompare(b.SiteName))
                .forEach((data: any) => {
                    worksheet.addRow([
                        data.SiteName,   // Site Name
                        data.PHONE,      // Phone
                        data.PHONE_TYPE, // Phone Type
                        data.ScopeEmail, // Email
                        data.Directors   // Site Directors / Head of Group
                    ]);
                    currentRow++;
                });

            // Add a blank row between districts for better readability
            currentRow++;
        });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 25;
    });
    worksheet.eachRow({ includeEmpty: false }, (row) => {
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

// Helper function to group data by district
const groupByDistrict = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

export default SitePhoneReportExcel;
