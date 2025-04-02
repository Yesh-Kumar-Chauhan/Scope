import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface StaffMatCPRFaPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffMatCPRFaPdf: React.FC<StaffMatCPRFaPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const sortedData = data?.slice().sort((a: any, b: any) => {
            const nameA = `${a?.FIRSTNAME || ''} ${a?.LASTNAME || ''}`.toUpperCase();
            const nameB = `${b?.FIRSTNAME || ''} ${b?.LASTNAME || ''}`.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        let yOffset = 20;
        let pageCount = 1;

        // Title
        doc.setFontSize(18);
        doc.text('Staff MAT/ CPR/ FA', 14, 20);
        yOffset += 5;

        sortedData?.forEach((data: any) => {
            // Table Headers
            const tableHeaders = [
                [
                    `Name: \n${data?.FIRSTNAME}, ${data?.LASTNAME}`,
                    'A = Add\nR = Remove\nC = Change',
                    'MAT \nExp date',
                    'CPR \nExp date',
                    'First Aid \nExp date',
                    'HHC \nInitials',
                    'Date'
                ]   
            ];

            // Table Body
            const tableBody = [
                [
                    'Original',
                    { content: 'Add', styles: { fontStyle: 'bold' } },
                    { content: data?.MATDATE ? moment(data?.MATDATE).format('MM/DD/YYYY') : '', styles: { fontStyle: 'bold' }, rowSpan: 2 }, // Merging two rows
                    { content: data?.CPR ? moment(data?.CPR).format('MM/DD/YYYY') : '', styles: { fontStyle: 'bold' }, rowSpan: 2 },
                    { content: data?.FIRSTAID ? moment(data?.FIRSTAID).format('MM/DD/YYYY') : '', styles: { fontStyle: 'bold' }, rowSpan: 2 },
                    { content: '', rowSpan: 2 },
                    { content: '', rowSpan: 2 }
                ],
                ['Language', '', '', '', '', '', ''],
                ['Renewal', '', '', '', '', '', ''],
                ['Renewal', '', '', '', '', '', ''],
                ['Renewal', '', '', '', '', '', '']
            ];

            if (yOffset + 60 > doc.internal.pageSize.height - 20) {
                doc.addPage();
                yOffset = 20;
                pageCount++;
            }

            // Table Styling: Enhanced border and formatting to match the exact design
            autoTable(doc, {
                startY: yOffset,
                head: tableHeaders,
                body: tableBody,
                theme: 'plain',
                styles: {
                    fontSize: 9,
                    cellPadding: 2,
                    lineColor: [0, 0, 0],  // Set line color to black for all borders
                    lineWidth: 0.3, 
                    minCellHeight: 4,      // Reduce cell height to fit more rows
                    // halign: 'center', 
                },
                headStyles: {
                    fontStyle: 'bold',
                    textColor: [0, 0, 0],
                    fillColor: [255, 255, 255],  // Ensure white background for header
                    halign: 'left',              // Align headers to the left
                },
                bodyStyles: {
                    fillColor: [255, 255, 255],  // Ensure white background for body
                    textColor: [0, 0, 0],        // Black text for table body
                    lineColor: [0, 0, 0],        // Black borders for body cells
                },
                columnStyles: {
                    0: { cellWidth: 42 },  // Reduce widths to fit portrait mode
                    1: { cellWidth: 23 },
                    2: { cellWidth: 22 },
                    3: { cellWidth: 22 },
                    4: { cellWidth: 22 },
                    5: { cellWidth: 22 },
                    6: { cellWidth: 22 }
                },
                didDrawCell: (data: any) => {
                    // Ensure each cell has the desired border style and size
                    doc.setDrawColor(0);
                    doc.setLineWidth(0.3); // Thicker borders to match the design
                    doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                    doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                    doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                    doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                },
            });
            yOffset = (doc as any).lastAutoTable.finalY + 10;

        });

        const verticalText = 'APPENDIX H 0 ONLY COMPLETE THIS SECTION IF THE PROGRAM WILL ADMINISTER MEDICATION';
        let startX = doc.internal.pageSize.getWidth() - 30; // Starting point on the far-right
        let startY = 50; // Starting Y position for the text
        const lineHeight = 2; // Line height between each letter

        // Calculate the height of the text to determine the border size
        const textHeight = verticalText.length * lineHeight;
        const textWidth = 5; // Width of the text column

        for (let i = 1; i <= pageCount; i++) {
            // Draw a rectangle for the border around the vertical text
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.rect(startX + 15, startY -25, textWidth, textHeight + 81); // Add a border with padding

            // doc.saveGraphicsState();
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setPage(i);
            doc.text(verticalText, startX +19 , startY + 180, {
                angle: 90, // Rotates the text by 90 degrees clockwise
                // align: 'center', // Aligns the text to the center
            });
        }

        // doc.save('Staff-Mat/CPR/FA-report.pdf');
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

export default memo(StaffMatCPRFaPdf);
