import ExcelJS from 'exceljs';
import moment from 'moment';

// Group and sort data by COUNTY, DIST_NAM, and Type
const groupByCountyDistrictAndType = (data: any[]) => {
    const grouped = data.reduce((acc: any, item: any) => {
        const countyKey = item.COUNTY;
        if (!acc[countyKey]) {
            acc[countyKey] = {
                COUNTY: item.COUNTY,
                districts: {},
            };
        }

        const districtKey = item.DIST_NAM;
        if (!acc[countyKey].districts[districtKey]) {
            acc[countyKey].districts[districtKey] = {
                DIST_NAM: item.DIST_NAM,
                types: {},
            };
        }

        const typeKey = item.Type;
        if (!acc[countyKey].districts[districtKey].types[typeKey]) {
            acc[countyKey].districts[districtKey].types[typeKey] = {
                Type: item.Type,
                sites: [],
            };
        }

        acc[countyKey].districts[districtKey].types[typeKey].sites.push(item);
        return acc;
    }, {});

    // Sort COUNTY, DIST_NAM, and Type alphabetically
    const sortedCountyKeys = Object.keys(grouped).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
    );

    sortedCountyKeys.forEach((countyKey: string) => {
        const districts = grouped[countyKey].districts;
        const sortedDistrictKeys = Object.keys(districts).sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );

        sortedDistrictKeys.forEach((districtKey: string) => {
            const types = districts[districtKey].types;
            const sortedTypeKeys = Object.keys(types).sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase())
            );
            districts[districtKey].types = sortedTypeKeys.reduce((acc: any, key: string) => {
                acc[key] = types[key];
                return acc;
            }, {});
        });

        grouped[countyKey].districts = sortedDistrictKeys.reduce((acc: any, key: string) => {
            acc[key] = districts[key];
            return acc;
        }, {});
    });

    return sortedCountyKeys.map(key => grouped[key]);
};

const SiteAddressListCCCExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Address List');

    // Add title
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Site Address List';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 14, bold: true };

    let currentRow = 3;

    const groupedData = groupByCountyDistrictAndType(reportData);

    groupedData.forEach((countyGroup: any) => {
        // Add county name as a bold row
        worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = `${countyGroup.COUNTY} County`;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
        currentRow++;

        Object.values(countyGroup.districts).forEach((district: any) => {
            // Add district name as a bold row
            worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = district.DIST_NAM;
            worksheet.getCell(`A${currentRow}`).font = { bold: true };
            currentRow++;

            Object.values(district.types).forEach((type: any) => {
                // Add type as a bold row with underline
                worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
                worksheet.getCell(`A${currentRow}`).value = type.Type;
                worksheet.getCell(`A${currentRow}`).font = { bold: true };
                worksheet.getCell(`A${currentRow}`).border = {
                    bottom: { style: 'thin' }
                };
                currentRow++;

                type.sites.forEach((site: any) => {
                    // Add site details
                    const siteDetails = [
                        [`${site.PERMIT || ''} ${site.SITE_NAM || ''}`],
                        [site.ADDR1 || ''],
                        [site.ADDR2 || ''],
                        [site.ADDR3 || ''],
                        ['License Capacity:', site.CAPACTIY || ''],
                        ['Grade:', site.GRADE_LVLS || ''],
                        []
                    ];

                    siteDetails.forEach((detailRow) => {
                        worksheet.addRow(detailRow);
                        currentRow++;
                    });
                });

                // Add a blank row between types for better readability
                currentRow++;
            });
        });

        // Add a blank row between counties for better readability
        currentRow++;
    });

    // Set column widths for better readability
    worksheet.columns = [
        { width: 30 },  // Adjusted for site name and address
        { width: 30 },  // Adjusted for values
        { width: 15 },
        { width: 15 },
    ];

    // Apply borders to all cells
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Return the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SiteAddressListCCCExcel;
