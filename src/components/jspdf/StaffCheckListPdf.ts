import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface StaffCheckListPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const StaffCheckListPdf: React.FC<StaffCheckListPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Staff Check List', 14, 14);

        let yOffset = 20;

        const sortedData = data.sort((a: any, b: any) => {
            const dateA = a.DOEMP ? new Date(a.DOEMP).getTime() : 0;
            const dateB = b.DOEMP ? new Date(b.DOEMP).getTime() : 0;
            return dateB - dateA; // Reverse the order to have the latest date first
        });

        const tableHeaders = [['DOE', 'Name', 'Title', 'Medical Date', 'Foundations','Child Abuse', 'Elijahs Law', 'Site']];
        const tableData = sortedData.map((item: any) => [
            item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
            `${item.LASTNAME}, ${item.FIRSTNAME}`,
            item.SitePos,
            item.MEDICALEXP ? moment(item.MEDICALEXP).format('MM/DD/YYYY') : '',
            item.Foundations ? moment(item.Foundations).format('MM/DD/YYYY') : '',
            item.MATAPP ? moment(item.MATAPP).format('MM/DD/YYYY') : '',
            item.ELaw ? moment(item.ELaw).format('MM/DD/YYYY') : '',
            item.SITE_NAM,
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
                cellPadding:0.5,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center',
            },
            columnStyles: {
                0: { cellWidth: 20, halign: 'center' },
                1: { cellWidth: 40 },
                2: { cellWidth: 35 },
                3: { cellWidth: 28, halign: 'center' },
                4: { cellWidth: 25, halign: 'center' },
                5: { cellWidth: 25, halign: 'center' },
                6: { cellWidth: 25, halign: 'center' },
                7: { cellWidth: 70 }
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
                // doc.text(`Page ${doc.internal.getNumberOfPages()}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
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

export default memo(StaffCheckListPdf);