import ExcelJS from 'exceljs';
import moment from 'moment';

// Helper function to group data by COUNTY, DIST_NAM, and Type
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
    });

    return sortedCountyKeys.map(key => grouped[key]);
};

const SiteAddressListExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Address List');

    // Add title
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = 'Site Address List';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add date
    const todayDate = moment().format('DD-MM-YYYY');
    worksheet.mergeCells('A2:C2');
    worksheet.getCell('A2').value = `Date: ${todayDate}`;
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Group and sort data
    const groupedData = groupByCountyDistrictAndType(reportData);
    let currentRow = 4;

    // Iterate over grouped data and add to worksheet
    groupedData.forEach((countyGroup: any) => {
        // Add COUNTY name
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = `${countyGroup.COUNTY} County`;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        Object.values(countyGroup.districts).forEach((district: any) => {
            // Add DISTRICT name
            worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = district.DIST_NAM;
            worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
            currentRow++;

            Object.values(district.types).forEach((type: any) => {
                // Add Type
                worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
                worksheet.getCell(`A${currentRow}`).value = type.Type;
                worksheet.getCell(`A${currentRow}`).font = { italic: true, bold: true };
                currentRow++;

                // Add each site under the type
                type.sites.forEach((site: any) => {
                    const siteDetails = [
                        [`${site.SITE_NUM || ''} ${site.SITE_NAM || ''}`],
                        [site.ADDR1 || ''],
                        [site.ADDR2 || ''],
                        [site.ADDR3 || ''],
                        ['School phone:', site.SCHFONE || ''],
                        ['Program phone:', site.PHONE || ''],
                        ['Start time:', site.START_TIME || ''],
                        []
                    ];

                    siteDetails.forEach((row) => {
                        const worksheetRow = worksheet.addRow(row);
                        if (row[0] && row[1]) {
                            worksheetRow.getCell(1).font = { bold: true }; // Make labels bold
                        }
                    });

                    currentRow += siteDetails.length;
                });

                // Add a blank row between types for readability
                currentRow++;
            });

            // Add a blank row between districts
            currentRow++;
        });

        // Add a blank row between counties
        currentRow++;
    });

    // Set column widths for better readability
    worksheet.columns.forEach((column) => {
        column.width = 25;
    });

    // Apply border and alignment for all cells
    worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.alignment = { vertical: 'middle', horizontal: 'left' };
        row.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Generate and return the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SiteAddressListExcel;
