import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface SexualHarassmentPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const SexualHarassmentPdf: React.FC<SexualHarassmentPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Sexual Harassment', 14, 15);

        let yOffset = 20;

        const sortedData = data.sort((a: any, b: any) => {
            const nameA = `${a.LASTNAME} ${a.FIRSTNAME}`.toLowerCase();
            const nameB = `${b.LASTNAME} ${b.FIRSTNAME}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        const tableHeaders = [['District', 'Site', 'Name', 'Harassment  I', 'Harassment II']];
        const tableData = sortedData.map((item: any) => [
            item.DIST_NAM,
            item.SITE_NAM,
            `${item.LASTNAME}, ${item.FIRSTNAME}`,
            item.SHarassmentExp ? moment(item.SHarassmentExp).format('MM/DD/YYYY') : '',
            item.SHarassmentExp2 ? moment(item.SHarassmentExp2).format('MM/DD/YYYY') : '',
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
                // fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center',
            },
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 40 },
                2: { cellWidth: 45 },
                3: { cellWidth: 25,halign: 'center' },
                4: { cellWidth: 25,halign: 'center' }
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

export default memo(SexualHarassmentPdf);