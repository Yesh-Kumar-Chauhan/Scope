import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface EmergencyClosingPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const EmergencyClosingPDF: React.FC<EmergencyClosingPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Emergency Closing', 14, 15);

        // Define the columns for the table
        const columns = [
            { header: 'Date', dataKey: 'Date' },
            { header: 'District', dataKey: 'DIST_NAM' },
            { header: 'Staff Paid', dataKey: 'STAFF_ALL' },
            { header: 'Parent Credit', dataKey: 'PARENT_CR' },
            { header: 'Make-Up Day', dataKey: 'MakeUpDay' }
        ];

        // Format the data for autoTable with notes included in the same table
        const tableData = data
            .sort((a: any, b: any) => (a.DIST_NAM || '').localeCompare(b.DIST_NAM || '')) // Sort by DIST_NAM
            .flatMap((item: any) => {
                const mainRow = [
                    item.Date ? moment(item.Date).format('MM/DD/YYYY') : '',
                    item.DIST_NAM,
                    item.STAFF_ALL ? 'Yes' : 'No',
                    item.PARENT_CR ? 'Yes' : 'No',
                    item.MakeUpDay ? 'Yes' : 'No',
                ];

                // Check if the notes exist, append it as a row
                const notesRow = item.Notes ? [`Notes: ${item.Notes}`, '', '', '', ''] : null;

                // Return both the main row and the notes row (if available)
                return notesRow ? [mainRow, notesRow] : [mainRow];
            });


        // Generate the table using autoTable
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData,
            theme: 'plain',
            startY: 30,
            styles: {
                fontSize: 8,
                cellPadding: 3,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            // columnStyles: {
            //     0: { cellWidth: 30 },  // Date
            //     1: { cellWidth: 60 },  // District
            //     2: { cellWidth: 30 },  // Staff Paid
            //     3: { cellWidth: 40 },  // Parent Credit
            //     4: { cellWidth: 30 },  // Make-Up Day
            // },
            didDrawCell: (data: any) => {
                const row = data.row.raw;

                // If the row is a Notes row, add a manually-drawn dotted line above it
                if (row[0].startsWith('Notes:')) {
                    // Style the notes row
                    data.cell.styles.fontStyle = 'italic'; // Italicize the notes text
                    data.cell.colSpan = 5; // Make the Notes row span all columns
                }
            }
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

export default EmergencyClosingPDF;
