import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffSalariesExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Salaries');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Staff Salaries';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Name', 'Title', 'District', 'Site', 'Rate'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    reportData.forEach((staff: any) => {
        worksheet.addRow([
            `${staff?.LASTNAME || ''} ${staff?.FIRSTNAME || ''} `,
            staff.SitePosition || '',
            staff?.DIST_NAM || '',
            staff?.SITE_NAM || '',
            `${staff?.FebRate || ''} ${staff?.SepRate || ''}`,
        ]);
        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default StaffSalariesExcel;