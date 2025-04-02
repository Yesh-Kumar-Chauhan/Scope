import ExcelJS from 'exceljs';
import moment from 'moment';

const AttendanceTotalZeroReportExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Total Zero');

    // Add title
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'Attendance Total Report - Zero';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add headers
    const headerRow = worksheet.addRow([
        'Absences',
        'Lateness',
        'Left Early',
        'Staff Name',
        'Title',
        'Site',
        'Employeed',
        'Notes'
    ]);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Format headers row
    worksheet.getRow(2).font = { bold: true };

    // Format and sort the data
    const sortedData = reportData
        .map((item: any) => ({
            TotalAbsences: item.TotalAbsences,
            TotalLateness: item.TotalLateness,
            TotalLeftEarly: item.TotalLeftEarly,
            StaffName: `${item.LastName}, ${item.FirstName}`,
            SitePos: item.SitePos,
            SITENAM: item.SITENAM,
            DOEMP: item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
            Notes: item.Notes || '',
        }))
        .sort((a: { StaffName: string; }, b: { StaffName: any; }) => a.StaffName.localeCompare(b.StaffName));

    // Add data rows
    sortedData.forEach((rowData: { TotalAbsences: any; TotalLateness: any; TotalLeftEarly: any; StaffName: any; SitePos: any; SITENAM: any; DOEMP: any; Notes: any; }) => {
        worksheet.addRow([
            rowData.TotalAbsences,
            rowData.TotalLateness,
            rowData.TotalLeftEarly,
            rowData.StaffName,
            rowData.SitePos,
            rowData.SITENAM,
            rowData.DOEMP,
            rowData.Notes,
        ]);
    });

    // Set column widths for better readability
    worksheet.columns = [
        { width: 12 },  // Absences
        { width: 12 },  // Lateness
        { width: 12 },  // Left Early
        { width: 25 },  // Staff Name
        { width: 20 },  // Title
        { width: 25 },  // Site
        { width: 15 },  // Employed
        { width: 30 },  // Notes
    ];

    // Apply borders to all cells for a cleaner look
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Generate Excel buffer and return it
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default AttendanceTotalZeroReportExcel;
