import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface SitePermitNumberPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const SitePermitNumberPdf: React.FC<SitePermitNumberPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait', // Ensuring portrait mode
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Site Permit Number', 14, 20);

        let yOffset = 30;

        const tableHeaders = [['Permit#', 'District', 'Site', 'Expiration', 'Licensor']];
        const tableData = data.map((item: any) => [
            item.Permit,
            item.DIST_NAM,
            item.SITE_NAM,
            item.EXPIRES ? moment(item.EXPIRES).format('MM/DD/YYYY') : '',
            item.DSS_REP,
        ]);

        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 0.5,
                lineColor: 40,
                lineWidth: 0,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            columnStyles: {
                0: { cellWidth: 25 }, // Permit #
                1: { cellWidth: 45 }, // District
                2: { cellWidth: 55 }, // Site
                // 3: { cellWidth: 35 }, // Expiration
                // 4: { cellWidth: 55 }  // Licensor
            },
            didDrawCell: (data: any) => {
                const isHeader = data.row.section === 'head';
                if (isHeader) {
                    // Draw only the bottom horizontal line under the header
                    doc.setDrawColor(0);
                    doc.setLineWidth(0.5);
                    doc.line(
                        data.cell.x, 
                        data.cell.y + data.cell.height, 
                        data.cell.x + data.cell.width, 
                        data.cell.y + data.cell.height
                    ); // Bottom border under header
                }
            },
            didDrawPage: () => {
                doc.setFontSize(10);
            }
        });

        yOffset = (doc as any).lastAutoTable.finalY + 10; // Update yOffset for the next table

        // Add page numbers
        addPageNumber(doc);

        // Create PDF blob
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

export default memo(SitePermitNumberPdf);
