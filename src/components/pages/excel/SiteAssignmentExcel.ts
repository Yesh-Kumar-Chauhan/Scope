import ExcelJS from 'exceljs';
import moment from 'moment';

const SiteAssignmentExcel = async (data: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sites Assignments');

    // Add Title
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Sites Assignments';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 18, bold: true };

    let currentRow = 3;

    // Sort data by DIST_NAM
    const sortedData = [...data].sort((a, b) => a.DIST_NAM.localeCompare(b.DIST_NAM));

    sortedData.forEach((siteData) => {
        // Add District, Site, and Others header
        worksheet.getCell(`A${currentRow}`).value = 'District:';
        worksheet.getCell(`B${currentRow}`).value = siteData?.DIST_NAM || '';
        worksheet.getCell(`C${currentRow}`).value = 'Site:';
        worksheet.getCell(`D${currentRow}`).value = siteData?.SITE_NAM || '';
        worksheet.getCell(`E${currentRow}`).value = 'Others';
        currentRow += 1;

        // Add Table Headers
        const headerRow = worksheet.addRow(['', 'Name', 'Phones', 'Forms', 'E-mail']);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
        });
        currentRow += 1;

        // Add rows for each role
        const roles = [
            {
                role: 'District Manager',
                name: siteData?.FieldSupervisorName,
                phones: `Fax: ${siteData?.FieldSupervisorFax || ''}\nCell: ${siteData?.FieldSupervisorPhone || ''}\nOther: ${siteData?.FieldSupervisorOthers || ''} Ext: ${siteData?.FieldSupervisorExt || ''}`,
                forms: siteData?.FieldSupervisorForms,
                email: siteData?.FieldSupervisorEmail,
            },
            {
                role: 'Field Trainer',
                name: siteData?.FieldTrainerName,
                phones: `Fax: ${siteData?.FieldTrainerFax || ''}\nCell: ${siteData?.FieldTrainerPhone || ''}\nOther: ${siteData?.FieldTrainerOthers || ''} Ext: ${siteData?.FieldTrainerExt || ''}`,
                forms: siteData?.FieldTrainerForms,
                email: siteData?.FieldTrainerEmail,
            },
            {
                role: 'Registar',
                name: siteData?.RegistarName,
                phones: `Fax: ${siteData?.RegistarFax || ''}\nCell: ${siteData?.RegistarPhone || ''}\nOther: ${siteData?.RegistarOthers || ''} Ext: ${siteData?.RegistarExt || ''}`,
                forms: siteData?.RegistarForms,
                email: siteData?.RegistarEmail,
            },
            {
                role: 'Account Billing Clerk',
                name: siteData?.AccountBillingName,
                phones: `Fax: ${siteData?.AccountBillingFax || ''}\nCell: ${siteData?.AccountBillingPhone || ''}\nOther: ${siteData?.AccountBillingOthers || ''} Ext: ${siteData?.AccountBillingExt || ''}`,
                forms: siteData?.AccountBillingForms,
                email: siteData?.AccountBillingEmail,
            },
            {
                role: 'Timesheet Staffing',
                name: siteData?.StaffingAssistantName,
                phones: `Fax: ${siteData?.StaffingAssistantFax || ''}\nCell: ${siteData?.StaffingAssistantPhone || ''}\nOther: ${siteData?.StaffingAssistantOthers || ''} Ext: ${siteData?.StaffingAssistantExt || ''}`,
                forms: siteData?.StaffingAssistantForms,
                email: siteData?.StaffingAssistantEmail,
            },
            {
                role: 'Absences Substitutes',
                name: siteData?.SubstitutesName,
                phones: `Fax: ${siteData?.SubstitutesFax || ''}\nCell: ${siteData?.SubstitutesPhone || ''}\nOther: ${siteData?.SubstitutesOthers || ''} Ext: ${siteData?.SubstitutesExt || ''}`,
                forms: siteData?.SubstitutesForms,
                email: siteData?.SubstitutesEmail,
            },
            {
                role: 'SCOPE HHC',
                name: siteData?.HealthCareConsultantName,
                phones: `Fax: ${siteData?.HealthCareConsultantFax || ''}\nCell: ${siteData?.HealthCareConsultantPhone || ''}\nOther: ${siteData?.HealthCareConsultantOthers || ''} Ext: ${siteData?.HealthCareConsultantExt || ''}`,
                forms: siteData?.HealthCareConsultantForms,
                email: siteData?.HealthCareConsultantEmail,
            },
            {
                role: 'Food',
                name: siteData?.FoodContactName,
                phones: `Fax: ${siteData?.FoodContactFax || ''}\nCell: ${siteData?.FoodContactPhone || ''}\nOther: ${siteData?.FoodContactOthers || ''} Ext: ${siteData?.FoodContactExt || ''}`,
                forms: siteData?.FoodContactForms,
                email: siteData?.FoodContactEmail,
            },
            {
                role: 'Supply Contact',
                name: siteData?.SupplyContactName,
                phones: `Fax: ${siteData?.SupplyContactFax || ''}\nCell: ${siteData?.SupplyContactPhone || ''}\nOther: ${siteData?.SupplyContactOthers || ''} Ext: ${siteData?.SupplyContactExt || ''}`,
                forms: siteData?.SupplyContactForms,
                email: siteData?.SupplyContactEmail,
            },
            {
                role: 'Special Event Contact',
                name: siteData?.PettyCashSpecialEventContactName,
                phones: `Fax: ${siteData?.PettyCashSpecialEventContactFax || ''}\nCell: ${siteData?.PettyCashSpecialEventContactPhone || ''}\nOther: ${siteData?.PettyCashSpecialEventContactOthers || ''} Ext: ${siteData?.PettyCashSpecialEventContactExt || ''}`,
                forms: siteData?.PettyCashSpecialEventContactForms,
                email: siteData?.PettyCashSpecialEventContactEmail,
            },
            {
                role: 'SCOPE DSS',
                name: siteData?.SCOPEDSSName,
                phones: `Fax: ${siteData?.SCOPEDSSFax || ''}\nCell: ${siteData?.SCOPEDSSPhone || ''}\nOther: ${siteData?.SCOPEDSSOthers || ''} Ext: ${siteData?.SCOPEDSSExt || ''}`,
                forms: siteData?.SCOPEDSSForms,
                email: siteData?.SCOPEDSSEmail,
            },
            {
                role: 'Presenters/Photo IDs',
                name: siteData?.PresentersName,
                phones: `Fax: ${siteData?.PresentersFax || ''}\nCell: ${siteData?.PresentersPhone || ''}\nOther: ${siteData?.PresentersOthers || ''} Ext: ${siteData?.PresentersExt || ''}`,
                forms: siteData?.PresentersForms,
                email: siteData?.PresentersEmail,
            },
        ];

        roles.forEach((role) => {
            const row = worksheet.addRow([
                role.role,
                role.name,
                role.phones,
                role.forms,
                role.email,
            ]);

            row.getCell(1).font = { bold: true };
            row.getCell(1).alignment = { vertical: 'middle' };
            row.getCell(2).alignment = { vertical: 'middle' };
            row.getCell(3).alignment = { vertical: 'middle' };
            row.getCell(4).alignment = { vertical: 'middle' };
            row.getCell(5).alignment = { vertical: 'middle' };

            row.height = 60; // Increase row height for better readability of multiline phones
        });

        currentRow += 2; // Add space between sections
    });

    // Adjust column widths for better readability
    worksheet.columns = [
        { width: 25 }, // Role column
        { width: 25 }, // Name column
        { width: 40 }, // Phones column
        { width: 30 }, // Forms column
        { width: 30 }, // Email column
    ];

    // Return the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default SiteAssignmentExcel;
