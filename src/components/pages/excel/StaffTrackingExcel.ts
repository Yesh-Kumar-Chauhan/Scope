import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffTrackingExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Tracking');

    // Add title
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'Staff Tracking';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Name', 'Site', 'Title', 'S.H.Exp', 'Clear. Rec', 'FP Ret.', 'SEL', 'DOH',];
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
            `${staff?.LastName}, ${staff?.FirstName}`,
            staff?.SITE_NAM,
            staff?.SitePos,
            staff.SHarassmentExp ? moment(staff?.SHarassmentExp).format('MM/DD/YYYY') : '',
            staff.CLEARREC ? moment(staff?.CLEARREC).format('MM/DD/YYYY') : '',
            staff.STATE_FPR ? moment(staff?.STATE_FPR).format('MM/DD/YYYY') : '',
            staff.SEL ? moment(staff?.SEL).format('MM/DD/YYYY') : '',
            staff.DOEMP ? moment(staff?.DOEMP).format('MM/DD/YYYY') : '',
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default StaffTrackingExcel;