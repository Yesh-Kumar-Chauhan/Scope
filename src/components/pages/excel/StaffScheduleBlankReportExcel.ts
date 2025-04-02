import { debug } from 'console';
import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffScheduleBlankReportExcel = async (reportData: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Schedule');

    // Add title
    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value = 'Staff Schedule';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 16, bold: true };

    // Add current date
    const todayDate = moment().format('DD-MM-YYYY');
    worksheet.mergeCells('A2:G2');
    worksheet.getCell('A2').value = `Date: ${todayDate}`;
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Group and sort data by district, site type, and site name
    const groupedData = groupByDistrictSiteTypeAndSiteName(reportData);

    let currentRow = 4;
    let lastDistrictName = '';
    let lastSiteType = -1;

    groupedData.forEach((group) => {
        // Insert District Name if it changes
        if (lastDistrictName !== group.DIST_NAM) {
            worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
            worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
            currentRow++;
            lastDistrictName = group.DIST_NAM;
        }

        // Insert Site Type if it changes
        if (lastSiteType !== group.SiteType) {
            worksheet.mergeCells(`A${currentRow}:G${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = getSiteTypeLabel(group.SiteType);
            worksheet.getCell(`A${currentRow}`).font = { italic: true, bold: true };
            currentRow++;
            lastSiteType = group.SiteType;
        }

        // Insert Table Headers


        Object.values(group.sites).forEach((siteGroup: any) => {
            // Insert Site Name and Director info
            currentRow++;

            worksheet.addRow([siteGroup.SiteName, `Multi-Site Director: ${group?.Directors ?? ''}`]);
            currentRow++;

            worksheet.getRow(currentRow).values = ['Site Name', 'Position', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            worksheet.getRow(currentRow).font = { bold: true };
            currentRow++;

            // Insert blank row for staff details
            siteGroup.items.forEach((staff: any) => {
                worksheet.addRow([`${staff.FirstName}, ${staff.LastName}`, staff.SitePos, '____', '____', '____', '____', '____']);
                currentRow++;
            });

            // Add blank space between sites for better readability
        });

        // Add a blank row between sections
        currentRow++;
    });

    // Apply basic formatting for all rows
    worksheet.columns.forEach((column) => {
        column.width = 20;
    });
    worksheet.eachRow({ includeEmpty: false }, function (row) {
        row.alignment = { vertical: 'middle', horizontal: 'center' };
        row.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Return the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

// Helper function to group and sort data by district, site type, and site name
const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
    const grouped = data.reduce((acc: any, item: any) => {
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

    // Sorting grouped data by DIST_NAM, SiteType, and SiteName
    const sortedDistrictKeys = Object.keys(grouped).sort((a, b) => {
        const [distA, typeA] = a.split('-');
        const [distB, typeB] = b.split('-');

        // First, sort by DIST_NAM
        const distComparison = distA.toLowerCase().localeCompare(distB.toLowerCase());
        if (distComparison !== 0) return distComparison;

        // Then, sort by SiteType (1 for "Before," 2 for "During," 3 for "After")
        const siteTypeComparison = parseInt(typeA) - parseInt(typeB);
        return siteTypeComparison;
    });

    sortedDistrictKeys.forEach((districtKey: string) => {
        const sites = grouped[districtKey].sites;
        const sortedSiteKeys = Object.keys(sites).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        grouped[districtKey].sites = sortedSiteKeys.reduce((acc: any, key: string) => {
            acc[key] = sites[key];
            return acc;
        }, {});
    });

    return sortedDistrictKeys.map(key => grouped[key]);
};

const getSiteTypeLabel = (siteType: number) => {
    switch (siteType) {
        case 1: return "Before School Programs";
        case 2: return "During School Programs";
        case 3: return "After School Programs";
        default: return "";
    }
};

export default StaffScheduleBlankReportExcel;
