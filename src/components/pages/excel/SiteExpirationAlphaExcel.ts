import ExcelJS from 'exceljs';
import moment from 'moment';

const SiteExpirationAlphaExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Expiration Alpha');

    // Add title
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'Site Expiration Alpha';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Name', 'Site', 'DOE', 'Child Abuse', 'Foundations', 'Title', 'CPR', 'MAT',];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.LASTNAME}, ${a?.FIRSTNAME}`.toUpperCase();
        const nameB = `${b?.LASTNAME}, ${b?.FIRSTNAME}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    sortedReportData.forEach((staff: any) => {
        worksheet.addRow([
            `${staff?.LASTNAME}, ${staff?.FIRSTNAME}`,
            staff?.SiteName,
            staff.DOEMP ? moment(staff?.DOEMP).format('MM/DD/YYYY') : '',
            staff.MatApp ? moment(staff?.MatApp).format('MM/DD/YYYY') : '',
            staff.Foundations ? moment(staff?.Foundations).format('YYYY-MM-DD') : '',
            staff?.Position,
            staff.CPR ? moment(staff?.CPR).format('MM/DD/YYYY') : '',
            staff.MATDATE ? moment(staff?.MATDATE).format('MM/DD/YYYY') : '',
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default SiteExpirationAlphaExcel;