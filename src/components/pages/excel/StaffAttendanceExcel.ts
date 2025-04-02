import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffAttendanceExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Attendance');

    // Add title
    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value = 'Staff Attendance';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Date', 'Name', 'District', 'Site Name', 'Absent', 'Reason', 'Notes'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.DIST_NAM}`.toUpperCase();
        const nameB = `${b?.DIST_NAM}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    sortedReportData.forEach((staff: any) => {
        worksheet.addRow([
            staff.DATE ? moment(staff?.DATE).format('MM/DD/YYYY') : '',
            `${staff?.LASTNAME}, ${staff?.FIRSTNAME}`,
            staff?.DIST_NAM,
            staff?.SITENAM,
            staff?.Absent,
            staff?.Reason,
            staff?.Notes,
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default StaffAttendanceExcel;