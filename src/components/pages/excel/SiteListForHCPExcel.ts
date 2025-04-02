import ExcelJS from 'exceljs';

const SiteListForHCPExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site List for HCP');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Site List for HCP';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['District', 'Program', 'Address', 'SCOPE Phone', 'SCOPE E-mail', 'Site Director'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // Sort the data by DIST_NAM and then by SiteName
    const sortedData = reportData.sort((a: any, b: any) => {
        // First compare DIST_NAM
        const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (distCompare !== 0) return distCompare;
        // If DIST_NAM is the same, compare SiteName
        return a.SiteName.localeCompare(b.SiteName);
    });

    // Add sorted data to the worksheet
    sortedData.forEach((staff: any) => {
        worksheet.addRow([
            staff?.DIST_NAM || '',  
            staff?.SiteName || '',  
            `${staff?.ADDR2 || ''} ${staff?.ADDR3 || ''}`,
            staff?.PHONE || '',   
            staff?.ScopeEmail || '',   
            `${staff?.FIRSTNAME || ''} ${staff?.LASTNAME || ''}`, 
        ]);
        currentRow++;
    });

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SiteListForHCPExcel;
