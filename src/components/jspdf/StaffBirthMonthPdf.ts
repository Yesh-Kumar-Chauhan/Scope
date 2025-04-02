import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface StaffBirthMonthPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const StaffBirthMonthPdf: React.FC<StaffBirthMonthPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    // const StaffBirthMonthPdf = ({ data }: { data: any }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        let yOffset = 20;

        // Title
        doc.setFontSize(14);
        doc.text('Staff Birth Month', 14, 13);

        const sortedData = data.sort((a: any, b: any) => {
            const fullNameA = `${a.LASTNAME}, ${a.FIRSTNAME}`.toLowerCase();
            const fullNameB = `${b.LASTNAME}, ${b.FIRSTNAME}`.toLowerCase();
        
            return fullNameA.localeCompare(fullNameB); // Sort alphabetically by full name
        });

        const tableHeaders = [['DOB', 'Name', 'District', 'Site', 'Position']];
        const tableData = sortedData.map((item: any) => [
            item.DOB ? moment(item.DOB).format('MM/DD/YYYY') : '',
            `${item.LASTNAME}, ${item.FIRSTNAME}`,
            item.DIST_NAM,
            item.SITE_NAM,
            item.SitePos
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
                cellPadding: 0.1,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                // fontStyle: 'bold',
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
                0: { cellWidth: 20, halign: 'center' }, // Adjusted column widths
                1: { cellWidth: 45 },
                2: { cellWidth: 40 },
                3: { cellWidth: 45 },
                4: { cellWidth: 35 },
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

export default memo(StaffBirthMonthPdf);