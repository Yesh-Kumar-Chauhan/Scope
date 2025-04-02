import ExcelJS from 'exceljs';
import moment from 'moment';

const FirstAidChildAbuseCPRExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('First Aid, Child Abuse, CPR');

    // Add title
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'First Aid, Child Abuse, CPR Report';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add current date
    const todayDate = moment().format('DD/MM/YYYY');
    worksheet.mergeCells('A2:D2');
    worksheet.getCell('A2').value = `Date: ${todayDate}`;
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Define table headers
    const headers = ['Name', 'First Aid', 'Child Abuse', 'CPR'];
    worksheet.addRow(headers);
    worksheet.getRow(3).font = { bold: true };

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.LASTNAME}, ${a?.FIRSTNAME}`.toUpperCase();
        const nameB = `${b?.LASTNAME}, ${b?.FIRSTNAME}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    // Insert data rows
    sortedReportData.forEach((data: any) => {
        worksheet.addRow([
            `${data.LASTNAME}, ${data.FIRSTNAME}`,                    // Name
            data.FIRSTAID ? moment(data.FIRSTAID).format('MM/DD/YYYY') : '',   // First Aid
            data.MATAPP ? moment(data.MATAPP).format('MM/DD/YYYY') : '',       // Child Abuse
            data.CPR ? moment(data.CPR).format('MM/DD/YYYY') : ''              // CPR
        ]);
    });

    // Apply some basic formatting
    worksheet.columns.forEach((column) => {
        column.width = 20;  // Set column width
    });
    // worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    //     row.alignment = { vertical: 'middle', horizontal: 'center' };
    //     row.border = {
    //         top: { style: 'thin' },
    //         left: { style: 'thin' },
    //         bottom: { style: 'thin' },
    //         right: { style: 'thin' }
    //     };
    // });

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default FirstAidChildAbuseCPRExcel;
