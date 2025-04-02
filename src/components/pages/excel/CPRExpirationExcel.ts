import ExcelJS from 'exceljs';
import moment from 'moment';

const CPRExpirationExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('CPR Expiration');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'CPR Expiration';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Name', 'Position', 'CPR'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.LastName}, ${a?.FirstName}`.toUpperCase();
        const nameB = `${b?.LastName}, ${b?.FirstName}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    sortedReportData.forEach((staff: any) => {
        worksheet.addRow([
            `${staff?.LastName}, ${staff?.FirstName}`,
            staff?.SitePos,
            staff.CPR ? moment(staff?.CPR).format('MM/DD/YYYY') : '',
        ]);
        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default CPRExpirationExcel;