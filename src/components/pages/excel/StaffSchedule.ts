import ExcelJS from 'exceljs';

// Group data by DIST_NAM, SiteType, and SiteName
const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const districtKey = `${item.DIST_NAM}-${item.SiteType}`;
        if (!acc[districtKey]) {
            acc[districtKey] = {
                DIST_NAM: item.DIST_NAM,
                SiteType: item.SiteType,
                sites: {}
            };
        }

        const siteKey = item.SiteName;
        if (!acc[districtKey].sites[siteKey]) {
            acc[districtKey].sites[siteKey] = {
                SiteName: item.SiteName,
                items: []
            };
        }

        acc[districtKey].sites[siteKey].items.push(item);
        return acc;
    }, {});
};

// Map site types to their labels
const getSiteTypeLabel = (siteType: number) => {
    switch (siteType) {
        case 1: return "Before School Programs";
        case 2: return "During School Programs";
        case 3: return "After School Programs";
        default: return "";
    }
};

// Generate the Staff Schedule Excel
const StaffSchedule = async (scheduleData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Schedule');

    // Add title
    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value = 'Staff Schedule';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Group data
    const groupedData = groupByDistrictSiteTypeAndSiteName(scheduleData);

    // Sort district keys alphabetically
    const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));
    let currentRow = 3;

    // Iterate over sorted district keys
    sortedDistrictKeys.forEach((districtKey) => {
        const group = groupedData[districtKey];

        // Insert District Name
        worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 14 };
        currentRow++;

        // Insert Site Type
        worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = getSiteTypeLabel(group.SiteType);
        worksheet.getCell(`A${currentRow}`).font = { bold: true };
        currentRow++;

        // Sort site keys alphabetically
        const sortedSiteKeys = Object.keys(group.sites).sort((a, b) => a.localeCompare(b));

        // Iterate over sorted site keys
        sortedSiteKeys.forEach((siteKey) => {
            const siteGroup = group.sites[siteKey];

            // Insert Site Name
            worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = siteGroup.SiteName;
            worksheet.getCell(`A${currentRow}`).font = { italic: true };
            currentRow++;

            // Add header row for the staff table
            worksheet.getRow(currentRow).values = ['Name', 'Role', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            worksheet.getRow(currentRow).font = { bold: true };
            currentRow++;

            // Insert staff items for the site
            siteGroup.items
            .sort((a: any, b: any) => a.LastName.localeCompare(b.LastName)) // Sort by LastName
            .forEach((staff: any) => {
                worksheet.addRow([
                    `${staff.LastName} ${staff.FirstName}`, // Name
                    staff.SitePos,                          // Role
                    `${staff.MON_B} - ${staff.MON_E}`,      // Monday
                    `${staff.TUE_B} - ${staff.TUE_E}`,      // Tuesday
                    `${staff.WED_B} - ${staff.WED_E}`,      // Wednesday
                    `${staff.THU_B} - ${staff.THU_E}`,      // Thursday
                    `${staff.FRI_B} - ${staff.FRI_E}`,      // Friday
                ]);
                currentRow++;
            });
        
            // Add a blank row after each site's staff list
            currentRow++;
        });

        // Add a blank row after each district group
        currentRow++;
    });

    // Write to a buffer and return the binary data
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffSchedule;
