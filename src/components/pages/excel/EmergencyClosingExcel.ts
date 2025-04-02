import ExcelJS from 'exceljs';
import moment from 'moment';

const EmergencyClosingExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Emergency Closing');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Emergency Closing';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Date', 'District', 'Staff Paid', 'Parent Credit', 'Make-Up Day'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // const sortedReportData = reportData.sort((a: any, b: any) => {
    //     if (a.DIST_NAM < b.DIST_NAM) return -1;
    //     if (a.DIST_NAM > b.DIST_NAM) return 1;
    //     return 0;
    // });

    // sortedReportData.forEach((staff: any) => {
    //     worksheet.addRow([
    //         staff.Date ? moment(staff?.Date).format('MM/DD/YYYY') : '',
    //         staff?.DIST_NAM,
    //         staff?.STAFF_ALL == true ? 'Yes' : 'No',
    //         staff?.PARENT_CR == true ? 'Yes' : 'No',
    //         staff?.MakeUpDay == true ? 'Yes' : 'No',
    //     ]);

    //     worksheet.addRow([
    //         "Notes:", staff?.Notes,
    //     ]);
    //     currentRow++;
    // });

    const tableData = reportData
        .sort((a: any, b: any) => (a.DIST_NAM || '').localeCompare(b.DIST_NAM || '')) // Sort by DIST_NAM
        .flatMap((item: any) => {
            // Main row
            const mainRow = [
                item.Date ? moment(item.Date).format('MM/DD/YYYY') : '',
                item.DIST_NAM,
                item.STAFF_ALL ? 'Yes' : 'No',
                item.PARENT_CR ? 'Yes' : 'No',
                item.MakeUpDay ? 'Yes' : 'No',
            ];

            // Notes row (if available)
            const notesRow = item.Notes ? [`Notes: ${item.Notes}`, '', '', '', ''] : null;

            // Return both rows if notes exist, else only the main row
            return notesRow ? [mainRow, notesRow] : [mainRow];
        });

    // Add each row to the worksheet
    tableData.forEach((row: any) => {
        worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default EmergencyClosingExcel;