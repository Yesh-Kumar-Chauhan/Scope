import ExcelJS from 'exceljs';
import moment from 'moment';

const VisitsExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visits');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Visits';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Site', 'Date', 'Name', 'Reason'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // Sort the data by SITE_NAM
    const sortedData = reportData.sort((a: any, b: any) => {
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    // Add sorted data to the worksheet
    sortedData.forEach((staff: any) => {
        worksheet.addRow([
            staff.SITE_NAM|| '',
            staff?.date ? moment(staff.date).format('MM/DD/YYYY') : '',
            staff?.name|| '',
            `${staff?.OFFICAL == true ? 'Official, ' : ''} ${staff?.STAFFING == true ? 'Staffing, ' : ''} ${staff?.PROBLEM == true ? 'Problem, ' : ''} ${staff?.TRAINING == true ? 'Training, ' : ''} ${staff?.QUALITY == true ? 'Quality, ' : ''} ${staff?.OTHER == true ? 'Other, ' : ''}`,
        ]);
        currentRow++;

        worksheet.getRow(currentRow).values = ['Notes:', staff?.NOTES];
        currentRow++;
    });

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default VisitsExcel;
