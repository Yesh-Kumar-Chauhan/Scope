import ExcelJS from 'exceljs';
import moment from 'moment';

const groupByDistrictSiteName = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const SiteSpaceExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Space');

    // Add title
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Site Space';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    const groupedData = groupByDistrictSiteName(reportData);
    let currentRow = 3;
    let previousDistrict = '';

    Object.keys(groupedData).forEach((districtKey, index) => {
        const group = groupedData[districtKey];

        if (group.DIST_NAM !== previousDistrict) {
            worksheet.mergeCells(`A${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = `${group.DIST_NAM}`;
            worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
            currentRow++;
            previousDistrict = group.DIST_NAM; // Update the previous district to current one
        }

        worksheet.mergeCells(`A${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = `${group.SITE_NAM}`;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 11 };
        currentRow++;

        worksheet.getRow(currentRow).values = ['Location', 'Capacity', 'Additional Location', 'Capacity'];
        worksheet.getRow(currentRow).font = { bold: true };
        currentRow++;

        group.items.forEach((staff: any) => {
            worksheet.addRow([
                staff?.ROOM_NO,
                staff?.CAP1,
                staff?.ADDLOC,
                staff?.ASCAP1,
            ]);
            worksheet.addRow([
                staff?.ROOM_NO2,
                staff?.CAP2,
                staff?.ADDLOC2,
                staff?.ASCAP2,
            ]);
            worksheet.addRow([
                staff?.ROOM_NO3,
                staff?.CAP3,
                staff?.ADDLOC3,
                staff?.ASCAP3,
            ]);
            worksheet.addRow([
                staff?.ROOM_NO4,
                staff?.CAP4,
                staff?.ADDLOC4,
                staff?.ASCAP4,
            ]);

            currentRow += 4;
        });

        currentRow++;
    });


    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export default SiteSpaceExcel;