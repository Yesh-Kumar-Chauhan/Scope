import ExcelJS from 'exceljs';
import moment from 'moment';

const TimeSheetAggregateExcel = async (reportData: any,formData:any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Timesheet Aggregate Report');

    const startDate = formData?.StartDate ?  moment(formData?.StartDate).format("DD-MM-YYYY") : null;
    const endDate = formData?.EndDate ? moment(formData?.EndDate).format("DD-MM-YYYY") : null;

    // Add title
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Timesheet Aggregate Report';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    worksheet.getCell('A3').value = 'Date Range';
    worksheet.getCell('B3').value = `${startDate ?? ''} - ${endDate ?? ''}`;
    worksheet.getCell('A3').font = { size: 13,bold: true };
    worksheet.getCell('B3').font = { size: 13,bold: true };
    let currentRow = 5;

    // Add table headers
    worksheet.getRow(currentRow).values = [ 'Employee name', 'District Name', 'Site Name', 'Total Hours'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // const sortedData = reportData.sort((a: any, b: any) => {
    //     const nameA = `${a.LASTNAME}, ${a.FIRSTNAME}`.toLowerCase();
    //     const nameB = `${b.LASTNAME}, ${b.FIRSTNAME}`.toLowerCase();
    //     return nameA.localeCompare(nameB);
    // })
    const roundToQuarter = (value :number) => {
        return Math.round(value * 4) / 4; 
    };
    let totalWorkingHours = 0;
    reportData.timesheetAggregateData.forEach((data: any) => {
        const workingHours = roundToQuarter(data?.WorkingHours);
        worksheet.addRow([
            `${data?.FIRSTNAME}, ${data?.LASTNAME}`,
            data?.DIST_NAM,
            data?.SITE_NAM,
            workingHours
        ]);
        totalWorkingHours += workingHours;
        currentRow++;
    });

    worksheet.addRow([
        'Total',
        '',
        '',
        totalWorkingHours 
    ]);
    worksheet.getRow(currentRow).font = { bold: true };

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 35;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default TimeSheetAggregateExcel;
