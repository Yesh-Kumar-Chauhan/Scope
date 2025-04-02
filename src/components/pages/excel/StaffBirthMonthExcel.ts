import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffBirthMonthExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Birth Month');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Staff Birth Month';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['DOB', 'Name', 'District', 'Site', 'Position'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const nameA = `${a.LASTNAME}, ${a.FIRSTNAME}`.toLowerCase();
        const nameB = `${b.LASTNAME}, ${b.FIRSTNAME}`.toLowerCase();
        return nameA.localeCompare(nameB);
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data?.DOB ? moment(data?.DOB).format('MM/DD/YYYY') : '',
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

export default StaffBirthMonthExcel;
