import ExcelJS from 'exceljs';
import moment from 'moment';

const ContactsExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contacts');

    // Add title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Contacts';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['Site', 'Date', 'Name', 'Contact', 'Child'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedReportData = reportData.sort((a: any, b: any) => {
        const nameA = `${a?.SITE_NAM}`.toUpperCase();
        const nameB = `${b?.SITE_NAM}`.toUpperCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    sortedReportData.forEach((staff: any) => {
        worksheet.addRow([
            staff?.SITE_NAM,
            staff.DATE ? moment(staff?.DATE).format('MM/DD/YYYY') : '',
            staff?.NAME,
            staff?.CONTACT,
            staff?.CHILD,
        ]);

        worksheet.addRow([
            "Notes:", staff?.SITUATION,
        ]);
        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default ContactsExcel;