import ExcelJS from 'exceljs';
import moment from 'moment';

const SitePermitNumberExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Permit Number');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Site Permit Number';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['Permit#', 'District', 'Site', 'Expiration', 'Licensor'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const dateA = a.DOEMP ? new Date(a.DOEMP).getTime() : 0;
        const dateB = b.DOEMP ? new Date(b.DOEMP).getTime() : 0;
        return dateB - dateA; 
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data?.Permit,
            data?.DIST_NAM,
            data?.SITE_NAM,
            data?.EXPIRES ? moment(data?.EXPIRES).format('MM/DD/YYYY') : '',
            data?.DSS_REP,
        ]);
        currentRow++;
    });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SitePermitNumberExcel;
