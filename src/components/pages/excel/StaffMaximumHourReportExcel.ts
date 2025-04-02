import ExcelJS from 'exceljs';
import moment from 'moment';

// Group and sort by DIST_NAM, SiteType, and SiteName
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

    const siteKey = item.SITE_NAM;
    if (!acc[districtKey].sites[siteKey]) {
      acc[districtKey].sites[siteKey] = {
        SiteName: item.SITE_NAM,
        items: []
      };
    }

    acc[districtKey].sites[siteKey].items.push(item);
    return acc;
  }, {});

  // Sorting grouped data by DIST_NAM and SiteType
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

const StaffMaximumHourReportExcel = async (data: any) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Staff Maximum Hours');

  // Add title
  worksheet.mergeCells('A1:C1');
  worksheet.getCell('A1').value = 'Staff Maximum Hours Report';
  worksheet.getCell('A1').alignment = { horizontal: 'center' };
  worksheet.getCell('A1').font = { size: 16, bold: true };

  // Add current date
  const todayDate = moment().format('DD-MM-YYYY');
  worksheet.mergeCells('A2:C2');
  worksheet.getCell('A2').value = `Date: ${todayDate}`;
  worksheet.getCell('A2').alignment = { horizontal: 'center' };

  // Group data
  const groupedData = groupByDistrictSiteTypeAndSiteName(data);
  let currentRow = 4;
  let lastDistrictName = '';
  let lastSiteType = -1;

  groupedData.forEach((group) => {
    // Insert District Name if it changes
    if (lastDistrictName !== group.DIST_NAM && group.DIST_NAM) {
      worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
      worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
      worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
      currentRow++;
      lastDistrictName = group.DIST_NAM;
    }

    // Print the site type label if it's different
    if (lastSiteType !== group.SiteType && group.SiteType) {
      worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
      worksheet.getCell(`A${currentRow}`).value = getSiteTypeLabel(group.SiteType);
      worksheet.getCell(`A${currentRow}`).font = { italic: true, bold: true };
      currentRow++;
      lastSiteType = group.SiteType;
    }

    // Iterate through each site within the group
    Object.values(group.sites).forEach((site: any) => {
      // Print the site name and header row
      if (site.SiteName) {
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = site.SiteName;
        worksheet.getCell(`A${currentRow}`).font = { italic: true };
        currentRow++;
      }

      // Add table headers for each site
      worksheet.getRow(currentRow).values = ['Name', 'Max Hours'];
      worksheet.getRow(currentRow).font = { bold: true };
      currentRow++;

      // Sort the staff items by last name before adding them
      site.items.sort((a: any, b: any) => a.LASTNAME.localeCompare(b.LASTNAME));

      // Iterate through each employee at the site
      site.items.forEach((item: any) => {
        worksheet.addRow([
          `${item.LASTNAME}, ${item.FIRSTNAME}`,
          item.MaxHours ? item.MaxHours.toString() : 'N/A'
        ]);
        currentRow++;
      });

      // Add a blank row between sites for readability
      currentRow++;
    });

    // Add a blank row between districts for better readability
    currentRow++;
  });

  // Apply basic formatting for all rows
  worksheet.columns.forEach((column) => {
    column.width = 25;
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

export default StaffMaximumHourReportExcel;
