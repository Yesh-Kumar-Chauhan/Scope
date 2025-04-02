import ExcelJS from 'exceljs';
import moment from 'moment';

const SexualHarassmentExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sexual Harassment');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Sexual Harassment';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['District', 'Site', 'Name', 'Harassment I', 'Harassment II'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const nameA = `${a.LASTNAME}, ${a.FIRSTNAME}`.toLowerCase();
        const nameB = `${b.LASTNAME}, ${b.FIRSTNAME}`.toLowerCase();
        return nameA.localeCompare(nameB);
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data?.DIST_NAM,
            data?.SITE_NAM,
            `${data?.LASTNAME}, ${data?.FIRSTNAME}`,
            data?.SHarassmentExp ? moment(data?.SHarassmentExp).format('MM/DD/YYYY') : '',
            data?.SHarassmentExp2 ? moment(data?.SHarassmentExp2).format('MM/DD/YYYY') : '',
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

export default SexualHarassmentExcel;
