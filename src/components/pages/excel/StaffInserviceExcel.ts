import ExcelJS from 'exceljs';
import moment from 'moment';

const groupByDistrictSiteTypeAndTraining = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}-${item.FIRSTNAME}-${item.LASTNAME}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                FIRSTNAME: item.FIRSTNAME,
                LASTNAME: item.LASTNAME,
                trainings: {}
            };
        }
        // Group by TRAINING within each staff member
        if (!acc[key].trainings[item.TRAINING]) {
            acc[key].trainings[item.TRAINING] = {
                TRAINING: item.TRAINING,
                items: []
            };
        }
        acc[key].trainings[item.TRAINING].items.push(item);
        return acc;
    }, {});
}

const StaffInserviceExcel = async (data: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Inservice');

    const calculateTotalHours = (items: any[] = []) => {
        return items.reduce((sum, item) => sum + (parseFloat(item.HOURS) || 0), 0);
    };

    const calculateTotalHoursForAllData = (data: any[]) => {
        return calculateTotalHours(data);
    };
    // Sort data by DIST_NAM then by SITE_NAM
    const sortedData = data.sort((a, b) => {
        const districtComparison = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (districtComparison !== 0) return districtComparison;
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    const groupedData = groupByDistrictSiteTypeAndTraining(sortedData);
    let currentRow = 1;

    // Add the title
    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value = 'Staff Inservice';
    worksheet.getCell('A1').font = { size: 14, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    currentRow += 2;

    // Iterate through grouped data and add rows
    Object.keys(groupedData).forEach((key) => {
        const group = groupedData[key];

        // Add District Name if it hasn't been printed
        worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
        worksheet.getCell(`A${currentRow}`).font = { bold: true };
        currentRow++;

        // Add Site Name if it hasn't been printed
        worksheet.getCell(`A${currentRow}`).value = group.SITE_NAM;
        worksheet.getCell(`A${currentRow}`).font = { bold: true };
        currentRow++;

        // Add Staff Member Name
        const fullName = `${group.FIRSTNAME} ${group.LASTNAME}`;
        // worksheet.getCell(`A${currentRow}`).value = fullName;
        // worksheet.getCell(`A${currentRow}`).font = { bold: true };
        // currentRow++;

        // Add header for the staff member's info
        worksheet.addRow([fullName, '', 'Employed', 'First Aid', 'CPR', 'Abuse']);
        worksheet.getRow(currentRow).font = { bold: true };
        currentRow++;

        // Add data for the staff member
        const staffInfo = sortedData.find(item => `${item.FIRSTNAME} ${item.LASTNAME}` === fullName);
        worksheet.addRow([
            staffInfo?.SitePos || '',
            `Total Hours: ${calculateTotalHoursForAllData(sortedData)}`,
            staffInfo?.DOEMP ? moment(staffInfo?.DOEMP).format('MM/DD/YYYY') : '',
            staffInfo?.FIRSTAID ? moment(staffInfo?.FIRSTAID).format('MM/DD/YYYY') : '',
            staffInfo?.CPR ? moment(staffInfo?.CPR).format('MM/DD/YYYY') : '',
            staffInfo?.MATAPP ? moment(staffInfo?.MATAPP).format('MM/DD/YYYY') : '',
        ]);
        currentRow++;

        // Iterate through training details
        Object.keys(group.trainings).forEach((trainingKey) => {
            const training = group.trainings[trainingKey];

            // Add training header
            worksheet.getCell(`A${currentRow}`).value = `${training.TRAINING}`;
            worksheet.getCell(`A${currentRow}`).font = { bold: true };
            currentRow++;

            // Add training details header
            worksheet.addRow(['Workshop', 'Hours', 'Date', 'Topic', 'Sponsor']);
            worksheet.getRow(currentRow).font = { bold: true };
            currentRow++;

            // Add training details rows
            training.items.forEach((item: any) => {
                worksheet.addRow([
                    item.TRAINING,
                    item.HOURS,
                    item.DATE ? moment(item.DATE).format('MM/DD/YYYY') : '',
                    item.TopicName,
                    item.SPONSOR,
                ]);
                currentRow++;
            });

            // Add a blank row between different training sections
            currentRow++;
        });
    });

    // Adjust column widths for readability
    worksheet.columns = [
        { width: 20 }, // Workshop column
        { width: 10 }, // Hours column
        { width: 15 }, // Date column
        { width: 25 }, // Topic column
        { width: 25 }, // Sponsor column
        { width: 25 }, // Additional columns if necessary
    ];

    // Apply borders to all filled cells
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

    // Generate the Excel file as a buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffInserviceExcel;
