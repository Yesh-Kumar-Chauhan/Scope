import ExcelJS from 'exceljs';
import moment from 'moment';

const NurseVisitExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Nurse Visit Report');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Nurse Visit Report';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['District', 'Site', 'Visit 1', 'Visit 2', 'Visit 2',];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const nameA = `${a.DIST_NAM}`.toLowerCase();
        const nameB = `${b.DIST_NAM}`.toLowerCase();
        return nameA.localeCompare(nameB);
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data?.DIST_NAM,
            data?.SITE_NAM,
            data?.NURSEVISIT ? moment(data?.NURSEVISIT).format('MM/DD/YYYY') : '',
            data?.NURSEVISI2 ? moment(data?.NURSEVISI2).format('MM/DD/YYYY') : '',
            data?.NURSEVISI3 ? moment(data?.NURSEVISI3).format('MM/DD/YYYY') : '',
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

export default NurseVisitExcel;
