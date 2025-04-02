import ExcelJS from 'exceljs';
import moment from 'moment';

const groupByWaiver = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.WAIVEREXP}`;
        if (!acc[key]) {
            acc[key] = {
                WAIVEREXP: item.WAIVEREXP,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const WaiverExpirationExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Waiver Expiration');

    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Waiver Expiration';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    const groupedData = groupByWaiver(reportData);

    let currentRow = 3;

    worksheet.getRow(currentRow).values = ['District Number', 'District Name', 'Site Number', 'Site Name'];
    worksheet.getRow(currentRow).font = { bold: true };
    currentRow++;

    const sortedGroupKeys = Object.keys(groupedData).sort((a, b) => {
        return moment(a).isBefore(moment(b)) ? -1 : 1;
    });

    sortedGroupKeys.forEach((districtKey) => {
        const group = groupedData[districtKey];

        group.items.sort((a: any, b: any) => a.DIST_NAM.localeCompare(b.DIST_NAM));
        worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = group?.WAIVEREXP ? moment(group?.WAIVEREXP).format('MM/DD/YYYY') : '';
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        group.items.forEach((staff: any) => {
            worksheet.addRow([
                staff?.DIST_NUM || '',
                staff?.DIST_NAM || '',
                staff.SITE_NUM  || '',
                staff.SITE_NAM  || '',
            ]);
            currentRow++;
        });

        currentRow++; // Add an extra row for spacing
    });

    // Return buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default WaiverExpirationExcel;
