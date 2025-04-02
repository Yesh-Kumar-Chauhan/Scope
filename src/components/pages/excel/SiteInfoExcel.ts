import ExcelJS from 'exceljs';
import moment from 'moment';

export const SiteInfoExcel = async (data: any) => {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Site Information');

  const boldStyle = { bold: true, size: 12 };
  const headerBoldStyle = { bold: true, size: 15 };


  // Group and sort the data by district and site name
  const groupByDistrict = (data: any) => {
    const grouped = data.reduce((acc: any, item: any) => {
      const key = item.DIST_NAM;
      if (!acc[key]) {
        acc[key] = {
          DIST_NAM: item.DIST_NAM,
          items: [],
        };
      }
      acc[key].items.push(item);
      return acc;
    }, {});

    const sortedDistricts = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
    return sortedDistricts.map((districtKey) => {
      const district = grouped[districtKey];
      district.items = groupBySiteName(district.items);
      return district;
    });
  };

  const groupBySiteName = (items: any[]) => {
    const grouped = items.reduce((acc, item) => {
      const key = item.SITE_NAM;
      if (!acc[key]) {
        acc[key] = {
          SITE_NAM: item.SITE_NAM,
          siteItems: [],
        };
      }
      acc[key].siteItems.push(item);
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort((a, b) => a.localeCompare(b))
      .map((siteKey) => grouped[siteKey]);
  };

  // Add data to the worksheet
  const groupedData = groupByDistrict(data);

  groupedData.forEach((district) => {
    const { DIST_NAM, items } = district;

    // District Header
    const row1 = worksheet.addRow([``, ``, ``, ``, ``, ``, `Site Information`]);
    row1.font = headerBoldStyle;
    worksheet.addRow(['', '']);
    worksheet.addRow(['', '']);
    const row3 = worksheet.addRow(['', '', 'District:', DIST_NAM]);
    row3.getCell(3).font = boldStyle;

    items.forEach((site: { SITE_NAM: any; siteItems: any; }) => {
      const { SITE_NAM, siteItems } = site;

      // Site Header
      const programRow = worksheet.addRow(['', '', 'Program:', SITE_NAM]);
      programRow.getCell(3).font = boldStyle;

      // Site Information
      worksheet.addRow(['', '', 'Hours:', `${siteItems[0]?.START_TIME} - ${siteItems[0]?.STOP_TIME}`, '', '', '', '', '', '', 'Permit#:', siteItems[0]?.PERMIT, '']);
      worksheet.addRow(['', '', 'Start:', moment(siteItems[0]?.START_DATE).format('MM-DD-YYYY'), '', '', '', '', '', '', 'District Liaison#:', siteItems[0]?.LIAISON, '']);
      worksheet.addRow(['', '', 'Scope Email:', siteItems[0]?.ScopeEmail, '', '', '', '', '', '', 'Principal Name:', siteItems[0]?.PRINCIPAL, '']);
      worksheet.addRow(['', '', '', siteItems[0]?.ADDR1, '', '', '', '', '', '', 'Principal Email:', siteItems[0]?.PEMAIL, '']);
      worksheet.addRow(['', '', '', siteItems[0]?.ADDR2, '']);
      worksheet.addRow(['', '', '', siteItems[0]?.ADDR3, '']);

      worksheet.addRow([]); // Add an empty row before the section

      // Emergency Section
      const emergencyRow = worksheet.addRow(['', '', 'Emergency Department', '', '', '', 'Fire Department', '', '', '', 'Police Department', '']);
      emergencyRow.getCell(3).font = boldStyle; // Bold "Emergency Department"
      emergencyRow.getCell(7).font = boldStyle; // Bold "Fire Department"
      emergencyRow.getCell(11).font = boldStyle; // Bold "Police Department"

      // Emergency Details Rows
      worksheet.addRow(['', '', siteItems[0]?.EADR1, '', '', '', siteItems[0]?.FADR1, '', '', '', siteItems[0]?.PADR1, '']);
      worksheet.addRow(['', '', siteItems[0]?.EADR2, '', '', '', siteItems[0]?.FADR2, '', '', '', siteItems[0]?.PADR2, '']);
      worksheet.addRow(['', '', siteItems[0]?.EADR3, '', '', '', siteItems[0]?.FADR3, '', '', '', siteItems[0]?.PADR3, '']);
      worksheet.addRow(['', '', siteItems[0]?.PHONE, '', '', '', siteItems[0]?.FPHONE, '', '', '', siteItems[0]?.PPHONE, '']);

      worksheet.addRow([]);
      // Approved Spaces and Capacities
      worksheet.addRow(['', '', 'Approved Spaces', '', '', 'Space Capacity', '', '', 'Additional Approved Spaces', '', '', 'Space Capacity', '']);
      worksheet.addRow(['', '', siteItems[0]?.ROOM_NO, '', '', siteItems[0]?.CAP1, '', '', siteItems[0]?.ADDLOC, '', '', siteItems[0]?.ASCAP1, '']);
      worksheet.addRow(['', '', siteItems[0]?.ROOM_NO2, '', '', siteItems[0]?.CAP2, '', '', siteItems[0]?.ADDLOC2, '', '', siteItems[0]?.ASCAP2, '']);
      worksheet.addRow(['', '', siteItems[0]?.ROOM_NO3, '', '', siteItems[0]?.CAP3, '', '', siteItems[0]?.ADDLOC3, '', '', siteItems[0]?.ASCAP3, '']);
      worksheet.addRow(['', '', siteItems[0]?.ROOM_NO4, '', '', siteItems[0]?.CAP4, '', '', siteItems[0]?.ADDLOC4, '', '', siteItems[0]?.ASCAP4, '']);

      worksheet.addRow([]);
      // Other Site Details
      worksheet.addRow(['', '', 'License Capacity:', siteItems[0]?.CAPACTIY, '', '', '', '', 'Phone Type:', siteItems[0]?.PHONE_TYPE, '']);
      worksheet.addRow(['', '', 'Grade:', siteItems[0]?.GRADE_LVLS, '', '', '', '', 'Scope Available:', siteItems[0]?.TIME_AVAIL, '']);
      worksheet.addRow(['', '', 'OCFS Phone:', siteItems[0]?.DSS_FON, '', '', '', '', 'OCFS Rep:', siteItems[0]?.DSS_REP, '']);
      worksheet.addRow(['', '', 'Transport Phone:', siteItems[0]?.TPPHONE, '', '', '', '', 'Transport:', siteItems[0]?.TRANSPORT, '']);
      worksheet.addRow(['', '', 'District Manager:', siteItems[0]?.FieldSupervisorName, '', '', '', '', 'Registrar:', siteItems[0]?.RegistarName, '']);
      worksheet.addRow(['', '', 'Scope Field Trainer:', siteItems[0]?.FieldTrainerName, '', '', '', '', 'Account Billing:', siteItems[0]?.AccountBillingName, '']);
      worksheet.addRow(['', '', 'HCC:', siteItems[0]?.HealthCareConsultantName, '']);

      worksheet.addRow([]);
      // Notes Section
      const notesExist = siteItems.some((item: any) => item?.NOTES);
      const notesRow = worksheet.addRow(['', '', 'Notes:', notesExist ? '' : 'N/A']);
      notesRow.getCell(3).font = boldStyle;
      if (notesExist) {
        siteItems.forEach((item: { NOTES: any; }) => {
          if (item.NOTES) {
            worksheet.addRow(['', '', item.NOTES]);
          }
        });
      }

      worksheet.addRow([]); // Add an empty row before the section

      // Staff List Section Header
      const staffListHeaderRow = worksheet.addRow(['', '', 'Staff List:']);
      staffListHeaderRow.getCell(3).font = boldStyle;

      // Add staff data rows
      siteItems.forEach((staff: { FIRSTNAME: any; LASTNAME: any; HOMEPHONE: any; STATE_FPR: moment.MomentInput; MATDATE: moment.MomentInput; SitePos: any; WORKPHONE: any; MEDICALEXP: moment.MomentInput; ACES: moment.MomentInput; STREET: any; OTHERPHONE: any; Foundations: moment.MomentInput; ELaw: moment.MomentInput; CITY: any; STATE: any; ZIPCODE: any; NYSID: any; CPR: moment.MomentInput; AloneWithChildren: any; FIRSTAID: moment.MomentInput; }) => {
        worksheet.addRow(['', '', `${staff?.FIRSTNAME} ${staff?.LASTNAME}`, '', 'Home:', staff?.HOMEPHONE, '', 'Fingerprint:', staff?.STATE_FPR ? moment(staff?.STATE_FPR).format('MM-DD-YYYY') : '', '', 'Mat Expires:', staff?.MATDATE ? moment(staff?.MATDATE).format('MM-DD-YYYY') : '', '']);
        worksheet.addRow(['', '', staff?.SitePos, '', 'Work:', staff?.WORKPHONE, '', 'Medical:', staff?.MEDICALEXP ? moment(staff?.MEDICALEXP).format('MM-DD-YYYY') : '', '', 'ACES:', staff?.ACES ? moment(staff?.ACES).format('MM-DD-YYYY') : '', '']);
        worksheet.addRow(['', '', staff?.STREET, '', 'Other:', staff?.OTHERPHONE, '', 'Foundations:', staff?.Foundations ? moment(staff?.Foundations).format('MM-DD-YYYY') : '', '', 'E. Law:', staff?.ELaw ? moment(staff?.ELaw).format('MM-DD-YYYY') : '', '']);
        worksheet.addRow(['', '', `${staff?.CITY},${staff?.STATE},${staff?.ZIPCODE}`, '', 'NYSID#:', staff?.NYSID, '', 'CPR Expires:', staff?.CPR ? moment(staff?.CPR).format('MM-DD-YYYY') : '', '', '', '', '']);
        worksheet.addRow(['', '', '', '', 'A. W. Children:', staff?.AloneWithChildren ? 'Yes' : 'No', '', 'F. A. Expires:', staff?.FIRSTAID ? moment(staff?.FIRSTAID).format('MM-DD-YYYY') : '', '']);
        worksheet.addRow(['', '']); // Add an empty row between staff entries
      });


      worksheet.addRow([]); // Add an empty row after the section


      worksheet.addRow(['', '']); // Add an empty row between sites
    });
  });

  // Write to a buffer and return the binary data
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
