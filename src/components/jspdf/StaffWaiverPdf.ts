import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface StaffWaiverPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffWaiverPdf: React.FC<StaffWaiverPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Staff Waiver', 14, 20);

        let yOffset = 30;

        const tableHeaders = [['Name', 'District', 'Site', 'Received', 'PERMIT']];

        // Sort data by DIST_NAM, SITE_NAM, and LASTNAME with fallback values
        const sortedData = data.sort((a: any, b: any) => {
            const distA = a.DIST_NAM || ''; // Fallback to empty string if null/undefined
            const distB = b.DIST_NAM || '';
            const distCompare = distA.localeCompare(distB);
            if (distCompare !== 0) return distCompare;

            const siteA = a.SITE_NAM || '';
            const siteB = b.SITE_NAM || '';
            const siteCompare = siteA.localeCompare(siteB);
            if (siteCompare !== 0) return siteCompare;

            const lastNameA = a.LASTNAME || '';
            const lastNameB = b.LASTNAME || '';
            return lastNameA.localeCompare(lastNameB);
        });

        const tableData = sortedData.map((item: any) => [
            `${item.LASTNAME} ${item.FIRSTNAME}`,
            item.DIST_NAM,
            item.SITE_NAM,
            item.RECEIVED ? moment(item.RECEIVED).format('MM/DD/YYYY') : '',
            item.PERMIT,
        ]);

        // Check if there's enough space on the current page
        if (yOffset + 10 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yOffset = 20; // Reset yOffset for the new page
        }

        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 2,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 50 },
                2: { cellWidth: 60 },
                3: { cellWidth: 40 },
                4: { cellWidth: 'auto' }
            },
            didDrawCell: (data: any) => {
                doc.setDrawColor(0);
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            },
            didDrawPage: (data: any) => {
                // Add page number at the bottom
                doc.setFontSize(10);
            }
        });

        yOffset = (doc as any).lastAutoTable.finalY + 10; // Update yOffset for the next table

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

export default memo(StaffWaiverPdf);
