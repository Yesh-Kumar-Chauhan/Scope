import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface ChildAbuseExpirationPdfProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const ChildAbuseExpirationPdf: React.FC<ChildAbuseExpirationPdfProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Child Abuse Expiration', 14, 13);

        let yOffset = 20;

        const tableHeaders = [['Date', 'Name', 'District', 'Site', 'Position']];
        const tableData = data
            .map((item: any) => [
                item.MATAPP ? moment(item.MATAPP).format('YYYY-MM-DD') : '',
                `${item.LASTNAME}, ${item.FIRSTNAME}`,
                item.DIST_NAM || '', // Default to empty string if null or undefined
                item.SITE_NAM || '', // Default to empty string if null or undefined
                item.SitePos
            ])
            .sort((a: any[], b: any[]) => {
                const siteCompare = (a[3] || '').localeCompare(b[3] || ''); // Compare DIST_NAM (index 2)
                if (siteCompare !== 0) {
                    return siteCompare; // Sort by DIST_NAM first
                }
                return (a[2] || '').localeCompare(b[2] || ''); // Compare SITE_NAM (index 3) if DIST_NAM is the same
            });

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
                cellPadding: 0,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center',
            },
            bodyStyles: {
                lineWidth: 0,
                // halign: 'center', 
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 19, halign: 'center' },  // Date
                1: { cellWidth: 40 },  // Name
                2: { cellWidth: 45 },  // District
                3: { cellWidth: 45 },  // Site
                4: { cellWidth: 35 },  // Position
            },
            didDrawCell: (data: { section: string; cell: { x: number; y: number; width: any; height: any; }; }) => {
                doc.setDrawColor(0);
                if (data.section === 'head') {
                    // Draw all borders for header cells
                    doc.setLineWidth(0.3);
                    doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y); // Top
                    doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Bottom
                    doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Left
                    doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Right
                } else {
                    // Draw only left and right borders for body cells
                    doc.setLineWidth(0.3);
                    doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Left
                    doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Right
                }
            },
            didDrawPage: (data: { table: { body: string | any[]; }; }) => {
                // Draw bottom border for the last row
                if (data.table.body && data.table.body.length > 0) {
                    const lastRow = data.table.body[data.table.body.length - 1];
                    if (lastRow && lastRow.cells && lastRow.cells.length > 0) {
                        const firstCell = lastRow.cells[0];
                        const lastCell = lastRow.cells[lastRow.cells.length - 1];
                        if (firstCell && lastCell) {
                            doc.setLineWidth(0.3);
                            doc.line(firstCell.x, firstCell.y + firstCell.height,
                                lastCell.x + lastCell.width,
                                lastCell.y + lastCell.height);
                        }
                    }
                }
            },
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

export default memo(ChildAbuseExpirationPdf);