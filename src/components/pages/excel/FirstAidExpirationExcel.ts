import ExcelJS from 'exceljs';
import moment from 'moment';

const FirstAidExpirationExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('First Aid Expiration');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'First Aid Expiration';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Date', 'Name', 'District', 'Site', 'Position', 'Multi-Site Director'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // Sort the data by LASTNAME first and then by FIRSTNAME
    const sortedData = reportData.sort((a: any, b: any) => {
        const lastNameComparison = a.LASTNAME.localeCompare(b.LASTNAME);
        if (lastNameComparison !== 0) {
            return lastNameComparison;
        }
        return a.FIRSTNAME.localeCompare(b.FIRSTNAME);
    });

    // Add sorted data to the worksheet
    sortedData.forEach((staff: any) => {
        worksheet.addRow([
            staff?.FIRSTAID ? moment(staff.FIRSTAID).format('MM/DD/YYYY') : '',
            `${staff?.LASTNAME || ''} ${staff?.FIRSTNAME || ''} `,
            staff.DIST_NAM || '',
            staff.SITE_NAM || '',
            staff.SitePos || '',
            staff.Directors || '',
        ]);

        currentRow++;
    });

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default FirstAidExpirationExcel;
