import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface FingerprintWaiverAdditionalSiteReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const FingerprintWaiverAdditionalSiteReportPdf: React.FC<FingerprintWaiverAdditionalSiteReportProps> = ({ data, setPdfBlob }) => {
    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    const generatePDF = () => {
        const sortedData = data.sort((a: any, b: any) => {
            const districtComparison = a.DIST_NAM.localeCompare(b.DIST_NAM);
            if (districtComparison !== 0) return districtComparison;
            return a.SITE_NAM.localeCompare(b.SITE_NAM);
        });

        const doc = new jsPDF({
            orientation: 'portrait',
        });

        const tableColumnHeaders = [
            { header: '', dataKey: 'checkbox' },
            { header: 'Permit#', dataKey: 'permit' },
            { header: 'District', dataKey: 'district' },
            { header: 'Facility / Provider / Agency - Name and Address', dataKey: 'facility' }
        ];

        const tableRows = sortedData.length > 0 ? sortedData.map((item: any) => ([
            '',
            item?.PERMIT || '',
            item?.DIST_NAM || '',
            `${item?.SITE_NAM || ''}, ${item?.ADDR1 || ''}, ${item?.ADDR2 || ''}`
        ])) : [];

        const drawPageContent = (doc: jsPDF, isFirstPage: boolean) => {
            let yPos = 20;

            if (isFirstPage) {
                doc.setFontSize(16);
                doc.text('Fingerprint Waiver - Additional Sites', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
                yPos += 10;
            }

            doc.setFontSize(10);
            doc.text('Use this form to eliminate the need to complete a separate waiver request for multiple sites', 45, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.text('Name:', 15, yPos);
            doc.line(28, yPos, 70, yPos);

            doc.text('D.O.B:', 75, yPos);
            doc.line(90, yPos, 98, yPos);
            doc.text('/', 100, yPos);
            doc.line(105, yPos, 113, yPos);
            doc.text('/', 115, yPos);
            doc.line(120, yPos, 128, yPos);

            doc.text('NYSID Number (if Known):', 130, yPos);
            doc.line(175, yPos, 195, yPos);
            yPos += 8;
            doc.text('Additional Sites (list individually): Check the box next to the programs you need to be associated with', 20, yPos);
            // yPos += 5
            doc.setLineWidth(0);
            if (isFirstPage) {
            doc.line(14, yPos+6, 195, yPos+6); 
            }else{
            doc.line(14, yPos+17, 195, yPos+17); 

            }
           
            return yPos;
        };

        autoTable(doc, {
            head: [tableColumnHeaders.map(x => x.header)],
            body: tableRows,
            startY: drawPageContent(doc, true),
            theme : 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 2,
                lineColor: 40,
                lineWidth: 0,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            didDrawPage: (data:any) => {
                const isFirstPage = data.pageNumber === 1;

                // Draw the page content
                drawPageContent(doc, isFirstPage);

                if (!isFirstPage) {
                    // For pages after the first, position the table closer to the "Additional Sites" text
                    const pageHeight = doc.internal.pageSize.height;
                    const tableHeight = data.table.height;
                    const marginBottom = 1;
                    const startY = pageHeight - tableHeight - marginBottom;
                    data.settings.startY = startY - 15; // Reduced gap here (previously -5)
                    doc.setFontSize(8);
                    if (typeof startY === 'number' && !isNaN(startY)) {
                        doc.text('Additional Sites (list individually): Check the box next to the programs you need to be associated with', 20, startY - 25); // Reduced gap here (previously -20)
                    }
                }
            },
            didDrawCell: (data: { column: { index: number; }; row: { index: number; }; cell: { x: number; y: number; }; }) => {
                if (data.column.index === 0 && data.row.index >= 0) {
                    doc.rect(data.cell.x + 1, data.cell.y + 2, 2, 2);
                }
            },
            margin: { top: 50 },
        });
        
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    return null;
}

export default FingerprintWaiverAdditionalSiteReportPdf;