import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffSignInWithoutSite = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Sign In');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Staff Sign In';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.addRow([]); 

    let currentRow = 4;

    worksheet.addRow(['', `Today's Date: ______________`]);
    currentRow++;

    // Add table headers
    worksheet.getRow(currentRow).values = ['Name', 'District', 'Signature'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const nameA = `${a.LastName}, ${a.FirstName}`.toLowerCase();
        const nameB = `${b.LastName}, ${b.FirstName}`.toLowerCase();
        return nameA.localeCompare(nameB);
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            `${data.LastName}, ${data.FirstName}`,
            data?.DIST_NAM,
            '',
        ]);
        currentRow++;
    });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 35;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffSignInWithoutSite;
