import ExcelJS from 'exceljs';
import moment from 'moment';

const SitePhoneCompactExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Phone');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Site Phone';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add current date
    // const todayDate = moment().format('DD-MM-YYYY');
    // worksheet.mergeCells('A2:E2');
    // worksheet.getCell('A2').value = `Date: ${todayDate}`;
    // worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Group data by district
    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['Site', 'Phone', 'Type', 'Email', 'Site Directors / Head of Group'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const nameA = `${a.SiteName}`.toLowerCase();
        const nameB = `${b.SiteName}`.toLowerCase();
        return nameA.localeCompare(nameB);
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data.SiteName,                  // Site Name
            data.PHONE,                     // Phone
            data.PHONE_TYPE,                // Phone Type
            data.ScopeEmail,                // Email
            data.Directors                  // Site Directors / Head of Group
        ]);
        currentRow++;
    });

// Apply basic formatting for all rows
worksheet.columns.forEach((column) => {
    column.width = 25;
});
// worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
//     row.alignment = { vertical: 'middle', horizontal: 'center' };
//     row.border = {
//         top: { style: 'thin' },
//         left: { style: 'thin' },
//         bottom: { style: 'thin' },
//         right: { style: 'thin' }
//     };
// });

// Return the Excel buffer
const buffer = await workbook.xlsx.writeBuffer();
return buffer;
};

export default SitePhoneCompactExcel;
