import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface StaffDateEmploymentPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const StaffDateEmploymentPdf: React.FC<StaffDateEmploymentPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Staff Date of Employment', 14, 15);

        let yOffset = 20;

        const sortedData = data.sort((a: any, b: any) => {
            const dateA = a.DOEMP ? moment(a.DOEMP) : null;
            const dateB = b.DOEMP ? moment(b.DOEMP) : null;

            if (dateA && dateB) {
                return dateB.diff(dateA); // Sort by DOE in descending order (latest first)
            } else if (dateA) {
                return 1; // Place rows with no DOE last
            } else if (dateB) {
                return -1; // Place rows with DOE first
            }
            return 0;
        })

        const tableHeaders = [['DOE', 'Name', 'Title', 'Medical Date', 'Foundations', 'District', 'Site']];
        const tableData = sortedData.map((item: any) => [
            item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
            `${item.LASTNAME}, ${item.FIRSTNAME}`,
            item.SitePos,
            item.MEDICALEXP ? moment(item.MEDICALEXP).format('MM/DD/YYYY') : '',
            item.Foundations ? moment(item.Foundations).format('MM/DD/YYYY') : '',
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
                fontSize: 10,
                cellPadding: 1,
                lineColor: 40,
                lineWidth: 0.2,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center',
            },
            columnStyles: {
                0: { cellWidth: 25, halign: 'center', },
                1: { cellWidth: 45 },
                2: { cellWidth: 33 },
                3: { cellWidth: 28, halign: 'center', },
                4: { cellWidth: 25, halign: 'center', },
                5: { cellWidth: 52 },
                6: { cellWidth: 65 },
            },
            didDrawCell: (data: any) => {
                doc.setDrawColor(0);
                doc.setLineWidth(0.2);
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

export default memo(StaffDateEmploymentPdf);