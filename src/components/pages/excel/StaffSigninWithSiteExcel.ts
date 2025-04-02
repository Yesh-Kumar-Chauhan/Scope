import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffSigninWithSiteExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Sign In');

    // Add title
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Staff Sign In';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.addRow(["", "Today's Date:", "______________________",]);
    currentRow++;

    worksheet.getRow(currentRow).values = ['Name', '', 'District', 'Site',];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.LASTNAME}, ${a?.FIRSTNAME}`.toUpperCase();
        const nameB = `${b?.LASTNAME}, ${b?.FIRSTNAME}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    sortedReportData.forEach((staff: any) => {
        worksheet.addRow([
            `${staff?.LASTNAME}, ${staff?.FIRSTNAME}`,
            "",
            staff?.DIST_NAM,
            staff?.SITE_NAM,
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default StaffSigninWithSiteExcel;