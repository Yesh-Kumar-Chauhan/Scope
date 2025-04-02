import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber'

interface SitePhoneCompactPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const SitePhoneCompactPdf: React.FC<SitePhoneCompactPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        // Title
        doc.setFontSize(16);
        doc.text('Site Phone', 11, 15);
        let yOffset = 20;

        const sortedData = data.sort((a: any, b: any) => {
            const nameA = `${a.SiteName}`.toLowerCase();
            const nameB = `${b.SiteName}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        const tableHeaders = [['Site', 'Phone', 'Type', 'Email', 'Site Directors / Head of Group']];
        const tableData = sortedData.map((data: any) => [
            data?.SiteName,
            data?.PHONE,
            data?.PHONE_TYPE,
            data?.ScopeEmail,
            data?.Directors,
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
                fontSize: 9,
                cellPadding: 1,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center'
            },
            columnStyles: {
                0: { cellWidth: 75 },
                1: { cellWidth: 25, halign: 'center' },
                2: { cellWidth: 13, halign: 'center' },
                3: { cellWidth: 85 },
                4: { cellWidth: 65 },
            },
            didDrawCell: (data: any) => {
                doc.setDrawColor(0);
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            },
            didDrawPage: (data: any) => {
                doc.setFontSize(10);
            }
        });

        yOffset = (doc as any).lastAutoTable.finalY + 10;
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

export default memo(SitePhoneCompactPdf);