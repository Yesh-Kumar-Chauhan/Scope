import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber'
const NurseVisitPdf = ({ data, setPdfBlob }: { data: any, setPdfBlob: (blob: Blob) => void; }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Nurse Visit Report', 14, 15);

        let yOffset = 20;

        const sortedData = data.sort((a: any, b: any) => {
            const nameA = `${a.DIST_NAM}`.toLowerCase();
            const nameB = `${b.DIST_NAM}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        const tableHeaders = [['District', 'Site', 'Visit 1', 'Visit 2', 'Visit 2']];
        const tableData = sortedData.map((data: any) => [
            data?.DIST_NAM,
            data?.SITE_NAM,
            data?.NURSEVISIT ? moment(data?.NURSEVISIT).format('MM/DD/YYYY') : '',
            data?.NURSEVISI2 ? moment(data?.NURSEVISI2).format('MM/DD/YYYY') : '',
            data?.NURSEVISI3 ? moment(data?.NURSEVISI3).format('MM/DD/YYYY') : '',
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
                cellPadding: 0.5,
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
                1: { cellWidth: 60 },
                2: { cellWidth: 20, halign: 'center', },
                3: { cellWidth: 20, halign: 'center', },
                4: { cellWidth: 20, halign: 'center', },
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

export default memo(NurseVisitPdf);