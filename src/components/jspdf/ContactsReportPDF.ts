import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface ContactsReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const ContactsReportPDF: React.FC<ContactsReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
        });

        // Title
        doc.setFontSize(16);
        doc.text('Contacts Report', 14, 15);

        // Add some space after the title by setting `startY` to 30
        const startYPosition = 30;

        // Define the columns for the main data
        const columns = [
            { header: 'Site', dataKey: 'SITE_NAM' },
            { header: 'Date', dataKey: 'DATE' },
            { header: 'Name', dataKey: 'NAME' },
            { header: 'Contact', dataKey: 'CONTACT' },
            { header: 'Child', dataKey: 'CHILD' },
        ];

        // Format the data for autoTable, appending notes as a separate row spanning across all columns
        const tableData = data
            .sort((a: any, b: any) => (a.SITE_NAM || '').localeCompare(b.SITE_NAM || '')) // Sort by SITE_NAM before flatMap
            .flatMap((item: any) => ([
                // Main data row
                [
                    item.SITE_NAM,
                    item.DATE ? moment(item.DATE).format('MM/DD/YYYY') : '',
                    item.NAME,
                    item.CONTACT,
                    item.CHILD
                ],
                // Notes row spanning all columns
                [{
                    content: `Notes: ${item.SITUATION || 'No notes available'}`,
                    colSpan: 5,
                    styles: { textColor: [0, 0, 0] }
                    // styles: { textColor: [0, 0, 0], fontStyle: 'italic' }
                }]
            ]));


        // Generate the table using autoTable
        autoTable(doc, {
            startY: startYPosition, // Space after title
            head: [columns.map(x => x.header)],
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 2,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 40 },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' },
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
                doc.setFontSize(10);
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

export default ContactsReportPDF;
