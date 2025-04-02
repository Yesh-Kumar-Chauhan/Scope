import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface StaffSigninWithSitePdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const StaffSigninWithSitePdf: React.FC<StaffSigninWithSitePdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.width;
        // Title
        doc.setFontSize(16);
        doc.text('Staff Sign In', 14, 15);

        doc.setFontSize(10);
        doc.text(`Today's Date:_____________________`, pageWidth / 2, 30, { align: 'center' });
        
        let yOffset = 35;

        const sortedData = data.sort((a: any, b: any) => {
            const nameA = `${a.LASTNAME} ${a.FIRSTNAME}`.toLowerCase();
            const nameB = `${b.LASTNAME} ${b.FIRSTNAME}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        const tableHeaders = [['Name', '', 'District', 'Site']];
        const tableData = sortedData.map((item: any) => [
            `${item.LASTNAME}, ${item.FIRSTNAME}`,
            '',
            item.DIST_NAM,
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
                fontSize: 8,
                cellPadding: 1,
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
                0: { cellWidth: 41 },
                1: { cellWidth: 41 },
                2: { cellWidth: 41 },
                3: { cellWidth: 60 },
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

export default memo(StaffSigninWithSitePdf);