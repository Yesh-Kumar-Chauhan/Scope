import ExcelJS from 'exceljs';
import moment from 'moment';

const ChildAbuseExpirationExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Child Abuse Expiration');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Child Abuse Expiration';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['Date', 'Name', 'District', 'Site', 'Position'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const siteCompare = (a[3] || '').localeCompare(b[3] || ''); // Compare DIST_NAM (index 2)
        if (siteCompare !== 0) {
            return siteCompare; // Sort by DIST_NAM first
        }
        return (a[2] || '').localeCompare(b[2] || '');
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data?.MATAPP ? moment(data?.MATAPP).format('MM/DD/YYYY') : '',
            `${data?.LASTNAME}, ${data?.FIRSTNAME}`,
            data?.DIST_NAM,
            data?.SITE_NAM,
            data?.SitePos
        ]);
        currentRow++;
    });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 25;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default ChildAbuseExpirationExcel;
