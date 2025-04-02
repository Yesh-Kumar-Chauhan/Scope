import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface CBCReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const CBCReportPDF: React.FC<CBCReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('CBC', 14, 13);


        const sortedData = data.sort((a: any, b: any) => {
            const nameA = `${a.SITE_NAM}`.toLowerCase();
            const nameB = `${b.SITE_NAM}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        // Define columns for the report
        const columns = [
            { header: 'Date', dataKey: 'CBC' },
            { header: 'Name', dataKey: 'Name' },
            { header: 'District', dataKey: 'DIST_NAM' },
            { header: 'Site', dataKey: 'SITE_NAM' },
            { header: 'Position', dataKey: 'SitePos' },
        ];

        // Format the data for autoTable
        const tableData = sortedData
            .map((item: any) => ({
                CBC: item.CBC ? moment(item.CBC).format('MM/DD/YYYY') : '',
                Name: `${item.LASTNAME || ''}, ${item.FIRSTNAME || ''}`, // Handle potential nulls
                DIST_NAM: item.DIST_NAM || '', // Default to empty string if null or undefined
                SITE_NAM: item.SITE_NAM || '', // Default to empty string if null or undefined
                SitePos: item.SitePos,
            }))

        // Generate the table using autoTable
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
            theme: 'plain',
            startY: 17,
            styles: {
                fontSize: 9,
                cellPadding: 0.1,
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
                0: { cellWidth: 20,halign: 'center', },  // Date
                1: { cellWidth: 40 },  // Name
                2: { cellWidth: 40 },  // District
                3: { cellWidth: 50 },  // Site
                4: { cellWidth: 40 },  // Position
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

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // No visual component, generates the PDF automatically
};

export default CBCReportPDF;
