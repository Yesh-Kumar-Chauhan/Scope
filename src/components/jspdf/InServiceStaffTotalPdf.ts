import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface InServiceStaffTotalPdfProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const InServiceStaffTotalPdf: React.FC<InServiceStaffTotalPdfProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Inservice Staff Totals', 14, 20);
        doc.setFontSize(11);

        // Group data by district
        const groupedData = groupByDistrict(data);

        // Sort district names alphabetically
        const sortedDistricts = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));

        let yOffset = 35;

        // Iterate over sorted districts
        sortedDistricts.forEach((key) => {
            const group = groupedData[key];

            // Add group title
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(group.DIST_NAM, 12, yOffset);
            yOffset += 2; // Add some space after the district name

            const tableHeaders = [['Name', 'Title', 'From', 'To', 'Total Inservice Hours', 'Topics']];
            const tableData = group.items
                .sort((a: any, b: any) => a.LASTNAME.localeCompare(b.LASTNAME)) // Sort by LASTNAME
                .map((item: any) => [
                    `${item.LASTNAME ?? ''} ${item.FIRSTNAME ?? ''}`,
                    item.SitePos,
                    item.FromDate ? moment(item.FromDate).format('MM/DD/YYYY') : '',
                    item.ToDate ? moment(item.ToDate).format('MM/DD/YYYY') : '',
                    item.TotalInserviceHours,
                    item.Topics,
                ]);


            autoTable(doc, {
                startY: yOffset,
                head: tableHeaders,
                body: tableData,
                theme: 'plain',
                styles: {
                    fontSize: 7, // Reduce font size to make rows more compact
                    cellPadding: 0.5, // Reduce cell padding for tighter rows
                    lineColor: 40,
                    lineWidth: 0,
                },
                headStyles: {
                    fontStyle: 'bold',
                    textColor: 0,
                    fillColor: false,
                },
                columnStyles: {
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 'auto' },
                    3: { cellWidth: 'auto' },
                    4: { cellWidth: 'auto' },
                    5: { cellWidth: 'auto' }
                },
                didDrawCell: (data: any) => {
                    const { column, row, cell } = data;
                    const isHeader = row.section === 'head';
                    const isFirstColumn = column.index === 0;
                    const isLastColumn = column.index === data.table.columns.length - 1;
                    const isFirstRow = row.index === 0;
                    const isLastRow = row.index === data.table.body.length - 1;

                    // Draw borders only for the header and the outer table boundaries
                    doc.setDrawColor(0);
                    doc.setLineWidth(0.1);

                    // Draw a top and bottom line for the header
                    if (isHeader) {
                        doc.line(cell.x, cell.y, cell.x + cell.width, cell.y); // Top border
                        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height); // Bottom border
                    }

                    // Draw vertical lines for each column (both for headers and body)
                    doc.line(cell.x, cell.y, cell.x, cell.y + cell.height); // Left vertical line
                    doc.line(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height); // Right vertical line

                    // Draw outer borders (top and bottom) for the body
                    if (!isHeader) {
                        if (isFirstRow) doc.line(cell.x, cell.y, cell.x + cell.width, cell.y); // Top border of the first row
                        if (isLastRow) doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height); // Bottom border of the last row
                    }
                },
                didDrawPage: (data: any) => {
                    doc.setFontSize(8);
                }
            });


            yOffset = (doc as any).lastAutoTable.finalY + 5; // Update yOffset for the next table
        });

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    const groupByDistrict = (data: any[]) => {
        return data.reduce((acc: any, item: any) => {
            const key = `${item.DIST_NAM}`;
            if (!acc[key]) {
                acc[key] = {
                    DIST_NAM: item.DIST_NAM,
                    items: []
                };
            }
            acc[key].items.push(item);
            return acc;
        }, {});
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null;
};

export default memo(InServiceStaffTotalPdf);
