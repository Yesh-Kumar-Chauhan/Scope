import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface StaffAttendancePdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffAttendancePdf: React.FC<StaffAttendancePdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Staff Attendance', 14, 20);

        let yOffset = 30;

        const tableHeaders = [['Date', 'Name', 'District', 'Site name', 'Absent', 'Reason', 'Notes']];

        // Sort the data by LASTNAME, then DIST_NAM, then SITENAM
        const sortedData = data.sort((a: any, b: any) => {
            // Sort by LASTNAME
            const lastNameCompare = (a.LASTNAME || '').localeCompare(b.LASTNAME || '');
            if (lastNameCompare !== 0) return lastNameCompare;

            // Sort by DIST_NAM
            const districtCompare = (a.DIST_NAM || '').localeCompare(b.DIST_NAM || '');
            if (districtCompare !== 0) return districtCompare;

            // Sort by SITENAM
            return (a.SITENAM || '').localeCompare(b.SITENAM || '');
        });

        // Prepare table data after sorting
        const tableData = sortedData.map((item: any) => [
            item.DATE ? moment(item?.DATE).format('MM/DD/YYYY') : '',
            `${item.LASTNAME ? item.LASTNAME + ',':'' } ${item.FIRSTNAME ?? ''}`,
            item.DIST_NAM || '',
            item.SITENAM || '',
            item.Absent || '',
            item.Reason || '',
            item.Notes || '',
        ]);

        if (yOffset + 10 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yOffset = 20; // Reset yOffset for the new page
        }

        // Generate table with sorted data
        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 2,
                lineWidth: 0, // No internal lines
                overflow: 'linebreak', // Enable text wrapping
            },
            headStyles: {
                fontStyle: 'bold',
                fillColor: false, // No fill color
                textColor: 0, // Black text color
            },
            columnStyles: {
                0: { cellWidth: 30 },  // Date
                1: { cellWidth: 40 },  // Name
                2: { cellWidth: 50 },  // District
                3: { cellWidth: 50 },  // Site name
                4: { cellWidth: 30 },  // Absent
                5: { cellWidth: 'auto' },  // Reason
                6: { cellWidth: 'auto' },  // Notes - Auto adjust or set a wider width, text will wrap
            },
            willDrawCell: (data: { row: { section: string; index: number; }; cursor: { y: any; }; cell: { height: any; }; }) => {
                // This hook will handle the header cell
                if (data.row.section === 'head') {
                    const headY = data.cursor.y; // Y position of the header
                    const headHeight = data.cell.height; // Height of the header row
                    if (data.row.index === 0) {
                        // Draw a line under the first header row
                        doc.setDrawColor(0, 0, 0);
                        doc.setLineWidth(0.5); // Line thickness
                        doc.line(14, headY + headHeight, doc.internal.pageSize.width - 14, headY + headHeight); // Draw the line under header
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

export default memo(StaffAttendancePdf);
