import ExcelJS from 'exceljs';

const FingerprintWaiverAdditionalSitesExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Fingerprint Waiver - Additional Sites');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Fingerprint Waiver - Additional Sites';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    worksheet.mergeCells('A2:C2');
    worksheet.getCell('A2').value = 'Use this form to eliminate the need to complete a separate waiver request for multiple sites';
    worksheet.getCell('A2').alignment = { horizontal: 'center' };
    worksheet.getCell('A2').font = { size: 10, bold: true };

    let currentRow = 4;

    worksheet.getRow(currentRow).values = [
        '',
        'Name: ______________________',
        'D.O.B: ____/____/_____',
        'NYSID Number(if Known): ______________'
    ];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    worksheet.getCell(`A${currentRow}`).value = 'Additional Sites (list individually): Check the box next to the programs you need to be associated with';
    worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
    worksheet.getCell(`A${currentRow}`).font = { bold: true };

    currentRow++;
    currentRow++;

    worksheet.getRow(currentRow).values = ['', 'Permit#', 'District', 'Facility / Provider / Agency - Name and Address',];;
    worksheet.getRow(currentRow).font = { bold: true };

    const sortedData = reportData.sort((a: any, b: any) => a.DIST_NAM.localeCompare(b.DIST_NAM));

    sortedData.forEach((staff: any) => {
        worksheet.addRow([
            '☐',
            staff?.PERMIT || '',
            staff?.DIST_NAM || '',
            `${staff?.SITE_NAM || ''}, ${staff?.ADDR1 || ''}, ${staff?.ADDR2 || ''}`,
        ]);

        currentRow++;
    });

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default FingerprintWaiverAdditionalSitesExcel;