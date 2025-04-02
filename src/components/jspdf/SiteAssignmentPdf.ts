import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface SiteAssignmentPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const SiteAssignmentPdf: React.FC<SiteAssignmentPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        let yOffset = 20;   
        // Title
        doc.setFontSize(18);
        doc.text('Sites Assignments', 10,12);

        const sortedData = [...data].sort((a, b) => a.DIST_NAM.localeCompare(b.DIST_NAM));

        const addDistrictSiteAndOthers = (district: string, site: string) => {
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');

            const leftX = 15; // Left margin
            const centerX = doc.internal.pageSize.getWidth() / 2; // Center position
            const rightX = doc.internal.pageSize.getWidth() - 14; // Right margin

            // Set header text to bold
            doc.text(`District:`, leftX, yOffset);
            doc.setFont('helvetica', 'normal'); // Change to normal for the value
            doc.text(`${district ?? ''}`, leftX + 16, yOffset); // Adjust position for the value

            doc.setFont('helvetica', 'bold');
            doc.text(`Site:`, centerX, yOffset, { align: 'center' });
            doc.setFont('helvetica', 'normal');
            doc.text(`${site ?? ''}`, centerX + 6, yOffset); // Adjust position for the value

            doc.setFont('helvetica', 'bold');
            doc.text('Others', rightX, yOffset, { align: 'right' });
            yOffset += 5;
        };

        sortedData?.forEach((data: any, index: number) => {
            if (index > 0) {
                // Add new page for each new data row after the first one
                doc.addPage();
                yOffset = 20; // Reset yOffset for new page
            }

        addDistrictSiteAndOthers(data?.DIST_NAM, data?.SITE_NAM);
        
        // Table Headers
        const tableHeaders = [
            [
                '',
                'Name',
                'Phones',
                'Forms',
                'E-mail',
            ]
        ];

        // Table Body
        const tableBody = [
            [
                { content: 'District Manager', styles: { fontStyle: 'bold' } },
                data?.FieldSupervisorName,
                `Fax  ${data?.FieldSupervisorFax ?? ''} \nCell ${data?.FieldSupervisorPhone ?? ''} \nOther ${data?.FieldSupervisorOthers ?? ''}          Ext ${data?.FieldSupervisorExt ?? ''}`,
                data?.FieldSupervisorForms,
                data?.FieldSupervisorEmail,
            ],
            [
                { content: 'Field Trainer', styles: { fontStyle: 'bold' } },
                data?.FieldTrainerName,
                `Fax  ${data?.FieldTrainerFax ?? ''} \nCell ${data?.FieldTrainerPhone ?? ''} \nOther ${data?.FieldTrainerOthers ?? ''}          Ext ${data?.FieldTrainerExt ?? ''}`,
                data?.FieldTrainerForms,
                data?.FieldTrainerEmail,
            ],
            [
                { content: 'Registar', styles: { fontStyle: 'bold' } },
                data?.RegistarName,
                `Fax  ${data?.RegistarFax ?? ''} \nCell ${data?.RegistarPhone ?? ''} \nOther ${data?.RegistarOthers ?? ''}          Ext ${data?.RegistarExt ?? ''}`,
                data?.RegistarForms,
                data?.RegistarEmail,
            ],
            [
                { content: 'Account Billing Clerk', styles: { fontStyle: 'bold' } },
                data?.AccountBillingName,
                `Fax  ${data?.AccountBillingFax ?? ''} \nCell ${data?.AccountBillingPhone ?? ''} \nOther ${data?.AccountBillingOthers ?? ''}          Ext ${data?.AccountBillingExt ?? ''}`,
                data?.AccountBillingForms,
                data?.AccountBillingEmail,
            ],
            [
                { content: 'Timesheet Staffing', styles: { fontStyle: 'bold' } },
                data?.StaffingAssistantName,
                `Fax  ${data?.StaffingAssistantFax ?? ''} \nCell ${data?.StaffingAssistantPhone ?? ''} \nOther ${data?.StaffingAssistantOthers ?? ''}          Ext ${data?.StaffingAssistantExt ?? ''}`,
                data?.StaffingAssistantForms,
                data?.StaffingAssistantEmail,
            ],
            [
                { content: 'Absences Substitutes', styles: { fontStyle: 'bold' } },
                data?.SubstitutesName,
                `Fax  ${data?.SubstitutesFax ?? ''} \nCell ${data?.SubstitutesPhone ?? ''} \nOther ${data?.SubstitutesOthers ?? ''}          Ext ${data?.SubstitutesExt ?? ''}`,
                data?.SubstitutesForms,
                data?.SubstitutesEmail,
            ],
            [
                { content: 'SCOPE HHC', styles: { fontStyle: 'bold' } },
                data?.HealthCareConsultantName,
                `Fax  ${data?.HealthCareConsultantFax ?? ''} \nCell ${data?.HealthCareConsultantPhone ?? ''} \nOther ${data?.HealthCareConsultantOthers ?? ''}          Ext ${data?.HealthCareConsultantExt ?? ''}`,
                data?.HealthCareConsultantForms,
                data?.HealthCareConsultantEmail,
            ],
            [
                { content: 'Food', styles: { fontStyle: 'bold' } },
                data?.FoodContactName,
                `Fax  ${data?.FoodContactFax ?? ''} \nCell ${data?.FoodContactPhone ?? ''} \nOther ${data?.FoodContactOthers ?? ''}          Ext ${data?.FoodContactExt ?? ''}`,
                data?.FoodContactForms,
                data?.FoodContactEmail,
            ],
            [
                { content: 'Supply Contact', styles: { fontStyle: 'bold' } },
                data?.SupplyContactName,
                `Fax  ${data?.SupplyContactFax ?? ''} \nCell ${data?.SupplyContactPhone ?? ''} \nOther ${data?.SupplyContactOthers ?? ''}          Ext ${data?.SupplyContactExt ?? ''}`,
                data?.SupplyContactForms,
                data?.SupplyContactEmail,
            ],
            [
                { content: 'Special Event Contact', styles: { fontStyle: 'bold' } },
                data?.PettyCashSpecialEventContactName,
                `Fax  ${data?.PettyCashSpecialEventContactFax ?? ''} \nCell ${data?.PettyCashSpecialEventContactPhone ?? ''} \nOther ${data?.PettyCashSpecialEventContactOthers ?? ''}          Ext ${data?.PettyCashSpecialEventContactExt ?? ''}`,
                data?.PettyCashSpecialEventContactForms,
                data?.PettyCashSpecialEventContactEmail,
            ],
            [
                { content: 'SCOPE DSS', styles: { fontStyle: 'bold' } },
                data?.SCOPEDSSName,
                `Fax  ${data?.SCOPEDSSFax ?? ''} \nCell ${data?.SCOPEDSSPhone ?? ''} \nOther ${data?.SCOPEDSSOthers ?? ''}          Ext ${data?.SCOPEDSSExt ?? ''}`,
                data?.SCOPEDSSForms,
                data?.SCOPEDSSEmail,
            ],
            [
                { content: 'Presenters/Photo IDs', styles: { fontStyle: 'bold' } },
                data?.PresentersName,
                `Fax  ${data?.PresentersFax ?? ''} \nCell ${data?.PresentersPhone ?? ''} \nOther ${data?.PresentersOthers ?? ''}          Ext ${data?.PresentersExt ?? ''}`,
                data?.PresentersForms,
                data?.PresentersEmail,
            ],
            [
                '',
                '',
                '',
                '',
                '',
            ],
        ];

        // Table Styling: Enhanced border and formatting to match the exact design
        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableBody,
            theme: 'plain',
            styles: {
                fontSize: 7,
                cellPadding: 2,
                lineColor: [0, 0, 0],  // Set line color to black for all borders
                lineWidth: 0.5,        // Increase line width for bolder borders
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: [0, 0, 0],
                fillColor: [255, 255, 255],  // Ensure white background for header
                halign: 'center',              // Align headers to the left
            },
            bodyStyles: {
                fillColor: [255, 255, 255],  // Ensure white background for body
                textColor: [0, 0, 0],        // Black text for table body
                lineColor: [0, 0, 0],        // Black borders for body cells
            },
            columnStyles: {
                0: { cellWidth: 50 },  // Adjust cell widths for proper alignment
                1: { cellWidth: 40 },
                2: { cellWidth: 60 },
                3: { cellWidth: 60 },
                4: { cellWidth: 60 },
            },
            willDrawCell: (data: { row: { height: number; }; }) => {
                const pageHeight = doc.internal.pageSize.height;
                if (yOffset + data.row.height > pageHeight - 20) {
                    doc.addPage(); // Add a new page if it doesn't fit
                    yOffset = 20;  // Reset yOffset for the new page
                }
            }
        });
        yOffset = (doc as any).lastAutoTable.finalY + 10;
    });
        
        // doc.save('Sites-Assignments-report.pdf');
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null;
};

export default memo(SiteAssignmentPdf);
