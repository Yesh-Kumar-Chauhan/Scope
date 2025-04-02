import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';
import { Theme } from '@fullcalendar/core/internal';

interface FoundationReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const FoundationReportPdf: React.FC<FoundationReportProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('MM/DD/YYYY');

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    const generatePDF = () => {
        const doc = new jsPDF('landscape', 'pt', 'a4'); // Landscape orientation
        let yPos = 40;

        // Title
        doc.setFontSize(18);
        doc.text('Foundations', 90, yPos, { align: 'center' });
        yPos += 20;

        // Table headers
        const tableColumnHeaders = [
            { header: 'Foundations', dataKey: 'foundations' },
            { header: 'Name', dataKey: 'name' },
            { header: 'District', dataKey: 'district' },
            { header: 'Site', dataKey: 'site' },
            { header: 'Position', dataKey: 'position' },
            { header: 'Employment', dataKey: 'employment' }
        ];

        // Table rows
        const tableRows = data.length > 0 ? data.map((item: any) => ({
            foundations: item?.Foundations ? moment(item?.Foundations).format('MM/DD/YYYY') : '',
            name: `${item?.LASTNAME || ''} ${item?.FIRSTNAME || ''}`,
            district: item?.DIST_NAM || '',
            site: item?.SITE_NAM || '',
            position: item?.SitePos || '',
            employment: item?.DOEMP ? moment(item?.DOEMP).format('MM/DD/YYYY') : ''
        })) : [];

        autoTable(doc, {
            head: [tableColumnHeaders.map(header => header.header)],
            body: tableRows.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
            startY: yPos,
            theme : 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 0.5,
                lineColor: 255,  // Set line color to white so that there are no borders
                lineWidth: 0,    // Remove the line borders from the body
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                lineWidth: 0.5,  // Keep the line width for the header
            },
            didDrawCell: (data: any) => {
                const isHeader = data.row.section === 'head';
                if (isHeader) {
                    // Draw only the bottom line under the header
                    doc.setDrawColor(0);  // Set to black for the header line
                    doc.setLineWidth(0.5); // Define line width for the header
                    doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Bottom border under header
                }
            },
        });
        

        // Footer with date
        doc.setFontSize(8);
        // doc.text(`Generated on: ${todayDate}`, 40, doc.internal.pageSize.height - 30);

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    return null; // Since we're auto-generating the PDF, no UI return is needed
}

export default FoundationReportPdf;
