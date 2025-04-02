import ExcelJS from 'exceljs';
import moment from 'moment';

const AttendanceTotalExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Total Report');

    // Add title
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'Attendance Total Report';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Absences', 'Lateness', 'LeftEarly', 'Staff Name', 'Title', 'Site Name', 'Employeed', 'Notes',];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.LastName}, ${a?.FirstName}`.toUpperCase();
        const nameB = `${b?.LastName}, ${b?.FirstName}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    sortedReportData.forEach((staff: any) => {
        worksheet.addRow([
            staff?.TotalAbsences,
            staff?.TotalLateness,
            staff?.TotalLeftEarly,
            `${staff?.LastName}, ${staff?.FirstName}`,
            staff?.SitePos,
            staff?.SITENAM,
            staff.DOEMP ? moment(staff?.DOEMP).format('MM/DD/YYYY') : '',
            "",
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default AttendanceTotalExcel;