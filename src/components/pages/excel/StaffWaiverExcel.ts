import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffWaiverExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Waiver');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Staff Waiver';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Name', 'District', 'Site', 'Received', 'PERMIT'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // const sortedData = reportData.sort((a: any, b: any) => {
        // const distA = a.DIST_NAM || ''; // Fallback to empty string if null/undefined
        // const distB = b.DIST_NAM || '';
        // const distCompare = distA.localeCompare(distB);
        // if (distCompare !== 0) return distCompare;

        // const siteA = a.SITE_NAM || '';
        // const siteB = b.SITE_NAM || '';
        // const siteCompare = siteA.localeCompare(siteB);
        // if (siteCompare !== 0) return siteCompare;

    //     const lastNameA = a.LASTNAME || '';
    //     const lastNameB = b.LASTNAME || '';
    //     return lastNameA.localeCompare(lastNameB);
    // });

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
            staff?.DIST_NAM,
            staff?.SITE_NAM,
            staff.RECEIVED ? moment(staff?.RECEIVED).format('MM/DD/YYYY') : '',
            staff?.PERMIT,
        ]);

        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default StaffWaiverExcel;