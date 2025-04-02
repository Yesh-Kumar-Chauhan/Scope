import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface SiteLicensorsReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const SiteLicensorsReport: React.FC<SiteLicensorsReportProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });

        let currentY = 60;

        // Title
        doc.setFontSize(16);
        doc.text('Site Licensors', 40, currentY);
        currentY += 20;

        // Prepare the table data
        const tableBody = data
        .sort((a: any, b: any) => {
            const districtCompare = (a?.DIST_NAM || '').localeCompare(b?.DIST_NAM || '');
            if (districtCompare !== 0) return districtCompare;
            return (a?.SITE_NAM || '').localeCompare(b?.SITE_NAM || '');
        })
        .map((item: any) => [
            item?.DIST_NAM || '',
            item?.SITE_NAM || '',
            item?.PERMIT || '',
            item?.DSS_REP || '',
            item?.DSS_FON || ''
        ]);
    

        // Generate Table with AutoTable
        autoTable(doc, {
            head: [['District', 'Site', 'Permit#', 'Licensor', 'Phone']],
            body: tableBody,
            startY: currentY,
            margin: { left: 40, right: 40 },
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            didDrawCell: (data: any) => {
                if (data.section === 'head' && data.row.index === 0) {
                    // Draw underline after the first header row is drawn
                    const doc = data.doc;
                    const startX = data.cell.x; // X position of the cell
                    const startY = data.cell.y + data.cell.height; // Bottom Y position of the header cell
                    const endX = startX + data.cell.width; // End of the cell width
        
                    doc.setLineWidth(2); // Set line width for the underline
                    doc.setDrawColor(0, 0, 0); // Set line color to black
                    doc.line(startX, startY, endX, startY); // Draw underline
                }
            },
            didDrawPage: (data: { cursor: { y: number } }) => {
                currentY = data.cursor.y + 10;
            },
        });
        

        // Footer with date
        doc.setFontSize(10);
        doc.text(`Generated on ${todayDate}`, 40, doc.internal.pageSize.height - 30);

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything visually
};

export default SiteLicensorsReport;
