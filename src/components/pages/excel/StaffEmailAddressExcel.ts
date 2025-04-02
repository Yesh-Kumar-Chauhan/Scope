import ExcelJS from 'exceljs';
const groupByCountyDistrictAndSite = (data: any[]) => {
    const sortedData = data.sort((a, b) => {
        if (a.COUNTY < b.COUNTY) return -1;
        if (a.COUNTY > b.COUNTY) return 1;
        if (a.DIST_NAM < b.DIST_NAM) return -1;
        if (a.DIST_NAM > b.DIST_NAM) return 1;
        if (a.SiteName < b.SiteName) return -1;
        if (a.SiteName > b.SiteName) return 1;
        return 0;
    });

    return sortedData.reduce((acc: any, item: any) => {
        // Group by COUNTY first
        if (!acc[item.COUNTY]) {
            acc[item.COUNTY] = {};
        }

        // Then group by DIST_NAM within each COUNTY
        const districtKey = `${item.DIST_NAM}-${item.SiteType}`;
        if (!acc[item.COUNTY][districtKey]) {
            acc[item.COUNTY][districtKey] = {
                DIST_NAM: item.DIST_NAM,
                SiteType: item.SiteType,
                sites: {}
            };
        }

        // Then group by SiteName within each DIST_NAM
        const siteKey = item.SiteName;
        if (!acc[item.COUNTY][districtKey].sites[siteKey]) {
            acc[item.COUNTY][districtKey].sites[siteKey] = {
                SiteName: item.SiteName,
                items: []
            };
        }

        // Push the staff data into the respective site
        acc[item.COUNTY][districtKey].sites[siteKey].items.push(item);
        return acc;
    }, {});
};

const getSiteTypeLabel = (siteType: number) => {
    switch (siteType) {
        case 1: return "Before School Programs";
        case 2: return "During School Programs";
        case 3: return "After School Programs";
        default: return "";
    }
};

const StaffEmailAddressExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff E-mail Addresses');

    // Add title
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Staff E-mail Addresses';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Group and sort data
    const groupedData = groupByCountyDistrictAndSite(reportData);

    let currentRow = 3;

    // Iterate through each COUNTY (first level)
    Object.keys(groupedData).forEach((county) => {
        // Check if it's Nassau or Suffolk and print the corresponding name
        let countyName = '';
        if (county === 'N') {
            countyName = 'Nassau';
        } else if (county === 'S') {
            countyName = 'Suffolk';
        }

        // Insert the COUNTY name into the Excel sheet
        worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = countyName;
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'center' };
        worksheet.getCell(`A${currentRow}`).font = { size: 12, bold: true };
        currentRow++;

        // Iterate through each DIST_NAM in the COUNTY (second level)
        Object.keys(groupedData[county]).forEach((districtKey) => {
            const group = groupedData[county][districtKey];

            // Insert District Name
            worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
            worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
            currentRow++;

            // Insert Site Type
            worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = getSiteTypeLabel(group.SiteType);
            worksheet.getCell(`A${currentRow}`).font = { bold: true };
            currentRow++;

            // Sort sites by SiteName (third level)
            const sortedSiteKeys = Object.keys(group.sites).sort();

            sortedSiteKeys.forEach((siteKey) => {
                const siteGroup = group.sites[siteKey];

                // Insert Site Name
                worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
                worksheet.getCell(`A${currentRow}`).value = siteGroup.SiteName;
                worksheet.getCell(`A${currentRow}`).font = { italic: true };
                currentRow++;

                worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
                worksheet.getCell(`A${currentRow}`).value = `Multi-Site Director:`;
                currentRow++;

                worksheet.getRow(currentRow).values = ['Name', 'E-mail', 'Phone', 'Work'];
                worksheet.getRow(currentRow).font = { bold: true };
                currentRow++;

                // Sort staff by LASTNAME
                const sortedStaff = siteGroup.items.sort((a: any, b: any) => {
                    if (a.LASTNAME < b.LASTNAME) return -1;
                    if (a.LASTNAME > b.LASTNAME) return 1;
                    return 0;
                });

                sortedStaff.forEach((staff: any) => {
                    worksheet.addRow([
                        `${staff?.LASTNAME} ${staff?.FIRSTNAME}`,
                        staff?.EMAIL,
                        staff?.HOMEPHONE,
                        staff?.WORKPHONE,
                    ]);
                    currentRow++;
                });

                // Add a blank row after each site
                currentRow++;
            });

            // Add a blank row after each district
            currentRow++;
        });

        // Add a blank row after each county
        currentRow++;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};


export default StaffEmailAddressExcel;
