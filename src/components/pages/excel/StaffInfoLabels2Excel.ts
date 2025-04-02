import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffInfoLabels2Excel = async (reportData: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Info Labels');

    // Sort data by Firstname then Lastname
    const sortedData = reportData.sort((a, b) => {
        const firstNameCompare = a.Firstname.localeCompare(b.Firstname);
        if (firstNameCompare !== 0) return firstNameCompare;
        return a.Lastname.localeCompare(b.Lastname);
    });

    let currentRow = 1;

    // Iterate over sorted data and add to worksheet
    sortedData.forEach((staff) => {
        // Add Name
        worksheet.getCell(`A${currentRow}`).value = 'Name:';
        worksheet.getCell(`B${currentRow}`).value = `${staff.Firstname} ${staff.Lastname}`;
        currentRow++;

        // Add Site
        worksheet.getCell(`A${currentRow}`).value = 'Site:';
        worksheet.getCell(`B${currentRow}`).value = staff.Site ?? '';
        worksheet.getCell(`C${currentRow}`).value = 'DOH:';
        worksheet.getCell(`D${currentRow}`).value = staff.DOEMP ? moment(staff.DOEMP).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add Title
        worksheet.getCell(`A${currentRow}`).value = 'Title:';
        worksheet.getCell(`B${currentRow}`).value = staff.Title;
        currentRow++;

        // Add Medical and CBC
        worksheet.getCell(`A${currentRow}`).value = 'Medical:';
        worksheet.getCell(`B${currentRow}`).value = staff.Medical ? moment(staff.Medical).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'CBC:';
        worksheet.getCell(`D${currentRow}`).value = staff.CBC ? moment(staff.CBC).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add CPR/FA and MAT
        worksheet.getCell(`A${currentRow}`).value = 'CPR/FA:';
        worksheet.getCell(`B${currentRow}`).value = staff.CPR ? moment(staff.CPR).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'MAT:';
        worksheet.getCell(`D${currentRow}`).value = staff.MATExpires ? moment(staff.MATExpires).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add H&S(5) and H&S(15)
        worksheet.getCell(`A${currentRow}`).value = 'H&S(5):';
        worksheet.getCell(`B${currentRow}`).value = staff.Foundations ? moment(staff.Foundations).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'H&S(15):';
        worksheet.getCell(`D${currentRow}`).value = staff.Foundations15H ? moment(staff.Foundations15H).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add E. Law and S. Harass
        worksheet.getCell(`A${currentRow}`).value = 'E. Law:';
        worksheet.getCell(`B${currentRow}`).value = staff.ELaw ? moment(staff.ELaw).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'S. Harass:';
        worksheet.getCell(`D${currentRow}`).value = staff.SHarass ? moment(staff.SHarass).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add ACES and Left Alone
        worksheet.getCell(`A${currentRow}`).value = 'ACES:';
        worksheet.getCell(`B${currentRow}`).value = staff.ACES ? moment(staff.ACES).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'Left Alone:';
        worksheet.getCell(`D${currentRow}`).value = staff.AloneWithChildren || '';
        currentRow++;

        // Add Child Abuse
        worksheet.getCell(`A${currentRow}`).value = 'Child Abuse:';
        worksheet.getCell(`B${currentRow}`).value = staff.ChildAbuse ? moment(staff.ChildAbuse).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add Total Hrs and Hrs Needed
        worksheet.getCell(`A${currentRow}`).value = 'Total Hrs: _____';
        worksheet.getCell(`C${currentRow}`).value = 'Hrs Needed: _____';
        currentRow++;

        // Add Topics Needed and Date
        worksheet.getCell(`A${currentRow}`).value = 'Topics Needed: _____';
        worksheet.getCell(`C${currentRow}`).value = `Date: ${moment(new Date()).format('MM/DD/YYYY')}`;
        currentRow++;

        // Add a blank row between each staff member for better readability
        currentRow++;
    });

    // Apply bold font for all labels in column A and C
    ['A', 'C'].forEach((col) => {
        worksheet.getColumn(col).eachCell((cell) => {
            cell.font = { bold: true };
        });
    });

    // Apply basic borders for better readability
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });
    });

    // Generate and return the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffInfoLabels2Excel;
