import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffScheduleWithInfoExcel = async (data: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Schedule');

    // Add the title to the worksheet
    worksheet.mergeCells('A1:I1');
    worksheet.getCell('A1').value = 'Staff Schedule';
    worksheet.getCell('A1').font = { size: 14, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    let currentRow = 3;

    // Group the data by district, site type, and site name
    const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
        return data.reduce((acc, item) => {
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

    const getSiteTypeLabel = (siteType: any) => {
        switch (siteType) {
            case 1: return "Before School Programs";
            case 2: return "During School Programs";
            case 3: return "After School Programs";
            default: return "";
        }
    };

    const groupedData = groupByDistrictSiteTypeAndSiteName(data);
    let lastDistrictName = '';

    // Sort grouped data by DIST_NAM and SiteName
    const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => {
        const [distA] = a.split('-');
        const [distB] = b.split('-');
        return distA.localeCompare(distB);
    });

    sortedDistrictKeys.forEach((districtKey) => {
        const group = groupedData[districtKey];
        const sortedSiteKeys = Object.keys(group.sites).sort((a, b) => a.localeCompare(b));

        // Print District Name if it hasn't been printed
        if (lastDistrictName !== group.DIST_NAM) {
            lastDistrictName = group.DIST_NAM;
            worksheet.mergeCells(`A${currentRow}:I${currentRow}`);
            worksheet.getCell(`A${currentRow}`).value = group.DIST_NAM;
            worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 12 };
            worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'left' };
            currentRow++;
        }

        // Print Site Type
        worksheet.mergeCells(`A${currentRow}:I${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = getSiteTypeLabel(group.SiteType);
        worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 11 };
        worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'left' };
        currentRow++;

        sortedSiteKeys.forEach((siteKey) => {
            const siteGroup = group.sites[siteKey];

            // // Print Site Name
            // worksheet.mergeCells(`A${currentRow}:I${currentRow}`);
            // worksheet.getCell(`A${currentRow}`).value = siteGroup.SiteName;
            // worksheet.getCell(`A${currentRow}`).font = { bold: true, size: 10 };
            // worksheet.getCell(`A${currentRow}`).alignment = { horizontal: 'left' };
            currentRow++;

            // Add Table Header
            const headers = [
               `${siteGroup.SiteName}`, 'Title', 'MAT Expiration', 'Left Alone', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
            ];
            worksheet.addRow(headers).eachCell((cell) => {
                cell.font = { bold: true };
                cell.alignment = { horizontal: 'center' };
            });
            currentRow++;

            // Sort staff items by LastName
            const sortedStaffItems = siteGroup.items.sort((a: { LastName: string; }, b: { LastName: any; }) =>
                a.LastName.localeCompare(b.LastName)
            );

            // Add rows for each staff member
            sortedStaffItems.forEach((staff: { LastName: any; FirstName: any; SitePos: any; MATDATE: moment.MomentInput; AloneWithChildren: boolean; MON_B: any; MON_E: any; TUE_B: any; TUE_E: any; WED_B: any; WED_E: any; THU_B: any; THU_E: any; FRI_B: any; FRI_E: any; }) => {
                worksheet.addRow([
                    `${staff.LastName} ${staff.FirstName}`,
                    staff.SitePos,
                    staff.MATDATE ? moment(staff.MATDATE).format('MM/DD/YYYY') : '',
                    staff.AloneWithChildren === true ? 'Yes' : 'No',
                    `${staff.MON_B || ''} - ${staff.MON_E || ''}`,
                    `${staff.TUE_B || ''} - ${staff.TUE_E || ''}`,
                    `${staff.WED_B || ''} - ${staff.WED_E || ''}`,
                    `${staff.THU_B || ''} - ${staff.THU_E || ''}`,
                    `${staff.FRI_B || ''} - ${staff.FRI_E || ''}`
                ]).eachCell((cell) => {
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                currentRow++;
            });

            // Add a blank row after each site for readability
            currentRow++;
        });

        // Add a blank row after each district for readability
        currentRow++;
    });

    // Apply border styles for better readability
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
        { width: 15 }, // MAT Expiration
        { width: 10 }, // Left Alone
        { width: 15 }, // Monday
        { width: 15 }, // Tuesday
        { width: 15 }, // Wednesday
        { width: 15 }, // Thursday
        { width: 15 }, // Friday
    ];

    // Generate the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffScheduleWithInfoExcel;
