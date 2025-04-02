import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface CPRExpirationReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const CPRExpirationReportPDF: React.FC<CPRExpirationReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
        });

        // Title
        doc.setFontSize(16);
        doc.text('CPR Expiration', 14, 15);

        // Define the columns for the table
        const columns = [
            { header: 'Name', dataKey: 'Name' },
            { header: 'Position', dataKey: 'Position' },
            { header: 'CPR', dataKey: 'CPR' },
        ];

        // Format the data for autoTable
        const tableData = data
            .map((item: any) => ({
                Name: `${item.LastName}, ${item.FirstName}`,
                Position: item.SitePos,
                CPR: item.CPR ? moment(item.CPR).format('MM/DD/YYYY') : '',
            }))
            .sort((a: { Name: string; }, b: { Name: any; }) => a.Name.localeCompare(b.Name)); // Sort by Name


        // Generate the table using autoTable
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
            theme: 'plain',
            startY: 25,
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
            },
            columnStyles: {
                0: { cellWidth: 80 },  // Name
                1: { cellWidth: 60 },  // Position
                2: { cellWidth: 50 },  // CPR Expiration
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

export default CPRExpirationReportPDF;
