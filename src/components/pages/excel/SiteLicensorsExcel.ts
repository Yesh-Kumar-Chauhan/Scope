import ExcelJS from 'exceljs';
import moment from 'moment';

const SiteLicensorsExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Licensors');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Site Licensors';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['District', 'Site', 'Permit#', 'Licensor', 'Phone'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const districtCompare = (a?.DIST_NAM || '').toString().localeCompare((b?.DIST_NAM || '').toString(), undefined, { sensitivity: 'base' });
        if (districtCompare !== 0) return districtCompare;
        return (a?.SITE_NAM || '').toString().localeCompare((b?.SITE_NAM || '').toString(), undefined, { sensitivity: 'base' });
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data?.DIST_NAM,
            data?.SITE_NAM,
            data?.PERMIT,
            data?.DSS_REP,
            data?.DSS_FON,
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

export default SiteLicensorsExcel;
