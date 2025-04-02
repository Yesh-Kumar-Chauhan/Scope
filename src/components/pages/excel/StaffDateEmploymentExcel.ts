import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffDateEmploymentExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Date of Employment');

    // Set column widths for better readability
    worksheet.columns = [
        { header: 'DOE', width: 15 },
        { header: 'Name', width: 25 },
        { header: 'Title', width: 20 },
        { header: 'Medical Date', width: 15 },
        { header: 'Foundations', width: 15 },
        { header: 'District', width: 25 },
        { header: 'Site', width: 30 },
    ];

    // Add title row
    worksheet.mergeCells('A1:G1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Staff Date of Employment';
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center' };

    // Add header row for the table
    const headerRow = worksheet.addRow(['DOE', 'Name', 'Title', 'Medical Date', 'Foundations', 'District', 'Site']);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Sort the data by DOE in descending order
    const sortedData = reportData.sort((a: any, b: any) => {
        const dateA = a.DOEMP ? moment(a.DOEMP) : null;
        const dateB = b.DOEMP ? moment(b.DOEMP) : null;

        if (dateA && dateB) {
            return dateB.diff(dateA); // Sort by DOE in descending order (latest first)
        } else if (dateA) {
            return 1; // Place rows with no DOE last
        } else if (dateB) {
            return -1; // Place rows with DOE first
        }
        return 0;
    });

    // Add data rows
    sortedData.forEach((item: any) => {
        worksheet.addRow([
            item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
            `${item.LASTNAME}, ${item.FIRSTNAME}`,
            item.SitePos,
            item.MEDICALEXP ? moment(item.MEDICALEXP).format('MM/DD/YYYY') : '',
            item.Foundations ? moment(item.Foundations).format('MM/DD/YYYY') : '',
            item.DIST_NAM,
            item.SITE_NAM,
        ]);
    });

    // Apply borders to all cells
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Generate Excel buffer and return it
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffDateEmploymentExcel;
