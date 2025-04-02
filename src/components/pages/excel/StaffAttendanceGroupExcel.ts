import ExcelJS from 'exceljs';
import moment from 'moment';

const groupByName = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.LASTNAME}-${item.FIRSTNAME}`;
        if (!acc[key]) {
            acc[key] = {
                FIRSTNAME: item.FIRSTNAME,
                LASTNAME: item.LASTNAME,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const calculateTotals = (group: any) => {
    const totalLateness = group.items.filter((item: any) => item.Absent === 'Arrived Late').length;
    const totalLeftEarly = group.items.filter((item: any) => item.Absent === 'Left Early').length;
    const total = group.items.length;

    return {
        totalLateness,
        totalLeftEarly,
        total,
    };
};

const StaffAttendanceGroupExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Attendance');

    // Add title
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'Staff Attendance';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    const groupedData = groupByName(reportData);
    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
        const [lastNameA, firstNameA] = a.split('-');
        const [lastNameB, firstNameB] = b.split('-');

        if (lastNameA < lastNameB) return -1;
        if (lastNameA > lastNameB) return 1;
        if (firstNameA < firstNameB) return -1;
        if (firstNameA > firstNameB) return 1;
        return 0;
    });

    let currentRow = 3;

    sortedKeys.forEach((districtKey, index) => {
        const group = groupedData[districtKey];
        const { totalLateness, totalLeftEarly, total } = calculateTotals(group);

        worksheet.mergeCells(`A${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = ` ${group.LASTNAME}, ${group.FIRSTNAME}`;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        worksheet.getRow(currentRow).values = ['Date', 'District', 'Site', 'Absent', 'Reason', 'Notes'];
        worksheet.getRow(currentRow).font = { bold: true };
        currentRow++;

        group.items.forEach((staff: any) => {
            worksheet.addRow([
                staff.DATE ? moment(staff?.DATE).format('DD/MM/YYYY') : '',
                staff?.DIST_NAM,
                staff?.SITENAM,
                staff?.Absent,
                staff?.Reason,
                staff?.Notes,
            ]);

            currentRow++;
        });

        worksheet.addRow(["Total Lateness:", totalLateness ? totalLateness : '0', "", "Total Left early:", totalLeftEarly ? totalLeftEarly : '0', "", "Total:", total ? total : '0',]);
        currentRow++;

        currentRow++;
    });


    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default StaffAttendanceGroupExcel;