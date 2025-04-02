import ExcelJS from 'exceljs';
import moment from 'moment';

const FoundationsExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Foundations');

    // Add title
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'Foundations';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Foundations', 'Name', 'District', 'Site', 'Position', 'Employment'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const dateA = a.Foundations ? new Date(a.Foundations).getTime() : Number.POSITIVE_INFINITY;
        const dateB = b.Foundations ? new Date(b.Foundations).getTime() : Number.POSITIVE_INFINITY;
        return dateA - dateB;
    });


    sortedData.forEach((staff: any) => {
        worksheet.addRow([
            staff.Foundations ? moment(staff?.Foundations).format('MM/DD/YYYY') : '',
            `${staff?.LASTNAME}, ${staff?.FIRSTNAME}`,
            staff?.DIST_NAM,
            staff?.SITE_NAM,
            staff?.SitePos,
            staff.DOEMP ? moment(staff?.DOEMP).format('MM/DD/YYYY') : '',
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default FoundationsExcel;