import ExcelJS from 'exceljs';
import moment from 'moment';

const groupByDistrict = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const InserviceStaffTotalExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inservice Staff Totals');

    // Add title
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'Inservice Staff Totals';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    const groupedData = groupByDistrict(reportData);
    const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));
    let currentRow = 4;

    sortedDistrictKeys?.forEach((expiresKey) => {
        const group = groupedData[expiresKey];

        // Insert the EXPIRES date as a merged row
        worksheet.mergeCells(`A${currentRow}:E${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = group?.DIST_NAM;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        // Add table headers
        worksheet.getRow(currentRow).values = ['Name', 'Title', 'From', 'To', 'Total Inservice Hours', 'Topics',];
        worksheet.getRow(currentRow).font = { bold: true };
        currentRow++;

        const sortedData = group?.items.sort((a: any, b: any) => {
            const nameA = `${a.LASTNAME}, ${a.FIRSTNAME}`.toLowerCase();
            const nameB = `${b.LASTNAME}, ${b.FIRSTNAME}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        sortedData?.forEach((data: any) => {
            worksheet.addRow([
                `${data?.LASTNAME}, ${data?.FIRSTNAME}`,
                data?.SitePos,
                data.FromDate ? moment(data?.FromDate).format('MM/DD/YYYY') : '',
                data.ToDate ? moment(data?.ToDate).format('MM/DD/YYYY') : '',
                data?.TotalInserviceHours,
                data?.Topics,
            ]);
            currentRow++;
        });
        currentRow++;
    });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default InserviceStaffTotalExcel;
