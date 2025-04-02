import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffInfoLabels1Excel = async (reportData: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Info Labels');

    // Sort data by Lastname then Firstname
    const sortedData = reportData.sort((a, b) => {
        const lastNameCompare = a.Lastname.localeCompare(b.Lastname);
        if (lastNameCompare !== 0) return lastNameCompare;
        return a.Firstname.localeCompare(b.Firstname);
    });

    let currentRow = 1;

    // Iterate over sorted data and add to worksheet
    sortedData.forEach((staff) => {
        // Add Name
        worksheet.getCell(`A${currentRow}`).value = 'Name:';
        worksheet.getCell(`B${currentRow}`).value = `${staff.Lastname} ${staff.Firstname}`;
        currentRow++;

        // Add Site
        worksheet.getCell(`A${currentRow}`).value = 'Site:';
        worksheet.getCell(`B${currentRow}`).value = staff.Site ?? '';
        currentRow++;

        // Add DOH
        worksheet.getCell(`A${currentRow}`).value = 'DOH:';
        worksheet.getCell(`B${currentRow}`).value = staff.DOEMP ? moment(staff.DOEMP).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add Title
        worksheet.getCell(`A${currentRow}`).value = 'Title:';
        worksheet.getCell(`B${currentRow}`).value = staff.Title;
        currentRow++;

        // Add Medical Date
        worksheet.getCell(`A${currentRow}`).value = 'Medical:';
        worksheet.getCell(`B${currentRow}`).value = staff.Medical ? moment(staff.Medical).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'CBC:';
        worksheet.getCell(`D${currentRow}`).value = staff.CBC ? moment(staff.CBC).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add CPR/FA Date and MAT Expiry
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

        // Add Left Alone and Child Abuse
        worksheet.getCell(`A${currentRow}`).value = 'Left Alone:';
        worksheet.getCell(`B${currentRow}`).value = staff.AloneWithChildren || '';
        worksheet.getCell(`C${currentRow}`).value = 'Child Abuse:';
        worksheet.getCell(`D${currentRow}`).value = staff.ChildAbuse ? moment(staff.ChildAbuse).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add ACES and E. Law
        worksheet.getCell(`A${currentRow}`).value = 'ACES:';
        worksheet.getCell(`B${currentRow}`).value = staff.ACES ? moment(staff.ACES).format('MM/DD/YYYY') : '';
        worksheet.getCell(`C${currentRow}`).value = 'E. Law:';
        worksheet.getCell(`D${currentRow}`).value = staff.ELaw ? moment(staff.ELaw).format('MM/DD/YYYY') : '';
        currentRow++;

        // Add a blank row between each staff member for readability
        currentRow++;
    });

    // Apply bold font for all labels in column A
    worksheet.getColumn('A').eachCell((cell) => {
        cell.font = { bold: true };
    });

    worksheet.getColumn('C').eachCell((cell) => {
        cell.font = { bold: true };
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

export default StaffInfoLabels1Excel;
