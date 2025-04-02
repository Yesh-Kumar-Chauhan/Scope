import ExcelJS from 'exceljs';
import moment from 'moment';

const MatExpirationExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MAT Expiration');

    // Add title
    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value = 'MAT Expiration';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };
    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Mat Start', 'Mat Expire', 'Name', 'District', 'Site Name', 'Position', 'Multi-Site Director'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    // Sort the data by MATDATE in ascending order (earliest date first)
    const sortedData = reportData.sort((a: any, b: any) => {
        const dateA = a.MATDATE ? new Date(a.MATDATE).getTime() : 0;
        const dateB = b.MATDATE ? new Date(b.MATDATE).getTime() : 0;
        return dateA - dateB; // Sort ascending
    });

    // Add sorted data to the worksheet
    sortedData.forEach((staff: any) => {
        worksheet.addRow([
            staff?.MatStart ? moment(staff.MatStart).format('MM/DD/YYYY') : '', 
            staff?.MATDATE ? moment(staff.MATDATE).format('MM/DD/YYYY') : '',   
            `${staff?.LASTNAME || ''} ${staff?.FIRSTNAME || ''}`,               
            staff?.DIST_NAM || '',                                             
            staff?.SITE_NAM || '',                                            
            staff?.SitePos || '',                                             
            staff?.Directors || '',   
        ]);                                          
        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default MatExpirationExcel;
