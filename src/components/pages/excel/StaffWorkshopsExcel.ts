import ExcelJS from 'exceljs';
import moment from 'moment';

// Helper to group by DIST_NAM and SITE_NAM
const groupByDistrictAndSite = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        if (!acc[item.DIST_NAM]) {
            acc[item.DIST_NAM] = {};
        }
        if (!acc[item.DIST_NAM][item.SITE_NAM]) {
            acc[item.DIST_NAM][item.SITE_NAM] = [];
        }
        acc[item.DIST_NAM][item.SITE_NAM].push(item);
        return acc;
    }, {});
};

const StaffWorkshopsExcel = async (reportData: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Workshops Report');

    // Add title to the worksheet
    worksheet.mergeCells('A1:K1');
    worksheet.getCell('A1').value = 'Workshops Report';
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    let currentRow = 3;

    // Group data by DIST_NAM and SITE_NAM
    const groupedData = groupByDistrictAndSite(reportData);

    // Iterate over each district
    Object.keys(groupedData).forEach((district) => {
        // Add district header
        worksheet.mergeCells(`A${currentRow}:K${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = district;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
        worksheet.getCell(`A${currentRow}`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'A9A9A9' }, // Dark gray background
        };
        currentRow++;

        // Iterate over each site within the district
        Object.keys(groupedData[district]).forEach((site) => {
            // Add site header
            worksheet.mergeCells(`A${currentRow}:K${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = site;
            worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 11 };
            worksheet.getCell(`A${currentRow}`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D3D3D3' }, // Light gray background
            };
            currentRow++;

            // Sort the site data by LASTNAME
            const siteData = groupedData[district][site];
            const sortedSiteData = siteData.sort((a: any, b: any) => {
                const lastNameA = a.LASTNAME?.toLowerCase() || '';
                const lastNameB = b.LASTNAME?.toLowerCase() || '';
                return lastNameA.localeCompare(lastNameB);
            });

            // Add table headers
            const headers = [
                'Name', 'Title', 'Employed', 'First Aid', 'Abuse', 
                'Mat Exp.', 'S.Haras.', 'H&S 5', 'H&S 15', 'ACES', 'ELaw'
            ];
            worksheet.addRow(headers).eachCell((cell) => {
                cell.font = { bold: true };
                cell.alignment = { horizontal: 'center' };
            });
            currentRow++;

            // Add rows for each staff member in the site
            sortedSiteData.forEach((item: { LASTNAME: any; FIRSTNAME: any; Title: any; DOEMP: moment.MomentInput; FIRSTAID: moment.MomentInput; MATAPP: moment.MomentInput; MATDATE: moment.MomentInput; SHarassmentExp: moment.MomentInput; Foundations: moment.MomentInput; Foundations15H: moment.MomentInput; ACES: moment.MomentInput; ELaw: moment.MomentInput; }) => {
                worksheet.addRow([
                    `${item.LASTNAME ?? ''} ${item.FIRSTNAME ?? ''}`,
                    item.Title || '',
                    item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
                    item.FIRSTAID ? moment(item.FIRSTAID).format('MM/DD/YYYY') : '',
                    item.MATAPP ? moment(item.MATAPP).format('MM/DD/YYYY') : '',
                    item.MATDATE ? moment(item.MATDATE).format('MM/DD/YYYY') : '',
                    item.SHarassmentExp ? moment(item.SHarassmentExp).format('MM/DD/YYYY') : '',
                    item.Foundations ? moment(item.Foundations).format('MM/DD/YYYY') : '',
                    item.Foundations15H ? moment(item.Foundations15H).format('MM/DD/YYYY') : '',
                    item.ACES ? moment(item.ACES).format('MM/DD/YYYY') : '',
                    item.ELaw ? moment(item.ELaw).format('MM/DD/YYYY') : '',
                ]);
                currentRow++;
            });

            // Add a blank row between sites for better readability
            currentRow++;
        });

        // Add a blank row between districts for better readability
        currentRow++;
    });

    // Apply borders to all cells
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

    // Adjust column widths for better readability
    worksheet.columns = [
        { width: 25 }, // Name
        { width: 20 }, // Title
        { width: 15 }, // Employed
        { width: 15 }, // First Aid
        { width: 15 }, // Abuse
        { width: 15 }, // Mat Exp.
        { width: 15 }, // S.Haras.
        { width: 15 }, // H&S 5
        { width: 15 }, // H&S 15
        { width: 15 }, // ACES
        { width: 15 }, // ELaw
    ];

    // Generate the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffWorkshopsExcel;
