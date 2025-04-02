import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffCheckListExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Check List');

    // Add title
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'Staff Check List';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 4;

    // Add table headers
    worksheet.getRow(currentRow).values = ['DOE', 'Name', 'Title', 'Medical Date', 'Foundations', 'Child Abuse', 'Elijahs Law', 'Site'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedData = reportData.sort((a: any, b: any) => {
        const dateA = a.DOEMP ? new Date(a.DOEMP).getTime() : 0;
        const dateB = b.DOEMP ? new Date(b.DOEMP).getTime() : 0;
        return dateB - dateA; 
    })

    sortedData.forEach((data: any) => {
        worksheet.addRow([
            data.DOEMP ? moment(data?.DOEMP).format('MM/DD/YYYY') : '',
            `${data?.LASTNAME}, ${data?.FIRSTNAME}`,
            data?.SitePos,
            data?.MEDICALEXP ? moment(data?.MEDICALEXP).format('MM/DD/YYYY') : '',
            data?.Foundations ? moment(data?.Foundations).format('MM/DD/YYYY') : '',
            data?.MATAPP ? moment(data?.MATAPP).format('MM/DD/YYYY') : '',
            data?.ELaw ? moment(data?.ELaw).format('MM/DD/YYYY') : '',
            data?.SITE_NAM,
        ]);
        currentRow++;
    });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffCheckListExcel;
