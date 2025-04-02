import ExcelJS from 'exceljs';
import moment from 'moment';

const SiteEmergencyInformationExcel = async (data: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Site Emergency Information');

    // Sort data by DIST_NAM and SITE_NAM
    const sortedData = data.sort((a, b) => {
        const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (distCompare !== 0) return distCompare;
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    sortedData.forEach((siteData, index) => {
        if (index > 0) {
            worksheet.addRow([]); // Add a blank row between different site data
        }

        // Add title
        const titleRow = worksheet.addRow(['Site Emergency Information']);
        worksheet.mergeCells(`A${titleRow.number}:D${titleRow.number}`);
        titleRow.getCell(1).font = { bold: true, size: 14 };
        titleRow.getCell(1).alignment = { horizontal: 'center' };

        // School information
        const districtRow = worksheet.addRow([`${siteData.DIST_NAM}`]);
        districtRow.font = { bold: true, size: 10 };

        worksheet.addRow([`${siteData.SITE_NUM} ${siteData.SITE_NAM} ${siteData.PERMIT}`]);
        worksheet.addRow([`${siteData.ADDR1}`]);
        worksheet.addRow([`${siteData.ADDR2}`]);
        worksheet.addRow([`${siteData.ADDR3}`]);
        worksheet.addRow([`Location: ${siteData.ROOM_NO}`, `Capacity: ${siteData.CAPACTIY}`]);
        worksheet.addRow([`Grade Level: ${siteData.GRADE_LVLS}`, `SCOPE Phone: ${siteData.PHONE}`]);
        worksheet.addRow([`Land Line Phone Location: ${siteData.LNDLNLOC}`, `Outside Safe Place: ${siteData.OSSPLACE}`]);

        // Add table headers for approved spaces
        const spaceHeaderRow = worksheet.addRow(['Approved Spaces', 'Space Capacity', 'Additional Approved Space', 'Space Capacity']);
        spaceHeaderRow.font = { bold: true };

        // Add approved spaces data
        const spaces = [
            [siteData.ROOM_NO, siteData.CAP1, siteData.ADDLOC, siteData.ASCAP1],
            [siteData.ROOM_NO2, siteData.CAP2, siteData.ADDLOC2, siteData.ASCAP2],
            [siteData.ROOM_NO3, siteData.CAP3, siteData.ADDLOC3, siteData.ASCAP3],
            [siteData.ROOM_NO4, siteData.CAP4, siteData.ADDLOC4, siteData.ASCAP4],
        ];
        spaces.forEach((row) => worksheet.addRow(row));

        // Principal and School contact info
        worksheet.addRow(['Principal', 'School Phone', 'School Fax']).font = { bold: true };
        worksheet.addRow([siteData.PRINCIPAL, siteData.SCHFONE, siteData.SFAX]);

        // Emergency contacts
        const emergencyInfo = [
            ['Police', `${siteData.PADR1} ${siteData.PADR2} ${siteData.PADR3} ${siteData.PPHONE}`],
            ['Evacuation One', `${siteData.EADR1} ${siteData.EADR2} ${siteData.EADR3} ${siteData.EPHONE}`],
            ['Fire', `${siteData.FADR1} ${siteData.FADR2} ${siteData.FADR3} ${siteData.FPHONE}`],
            ['Evacuation Two', `${siteData.EADR1} ${siteData.EADR2} ${siteData.EADR3} ${siteData.EPHONE}`],
        ];
        emergencyInfo.forEach(([title, info]) => {
            const row = worksheet.addRow([title, info]);
            row.font = { bold: true };
        });

        // Additional information
        const additionalInfo = [
            ['Security:', siteData.SECURITY],
            ['Transportation:', siteData.TRANSPORT],
            ['Shelter-in-Place location:', siteData.SAFEPLACE],
        ];
        additionalInfo.forEach(([label, value]) => {
            const row = worksheet.addRow([label, value]);
            row.font = { bold: true };
        });

        // Ambulance information
        worksheet.addRow(['Ambulance:', siteData.SECPHONE, siteData.TPPHONE, siteData.AMBPHONE]).font = { bold: true };

        // Lock down procedure and additional emergency information
        worksheet.addRow(['Lock down procedure:', siteData.LOCKDOWN]);
        worksheet.addRow(['Additional Emergency Information:', siteData.ADDEMGINFO]).font = { bold: true };
    });

    // Adjust column widths for better readability
    worksheet.columns = [
        { width: 30 }, // Label column
        { width: 40 }, // Value column 1
        { width: 30 }, // Value column 2
        { width: 30 }, // Value column 3
    ];

    // Add borders for all cells
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Generate the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SiteEmergencyInformationExcel;
