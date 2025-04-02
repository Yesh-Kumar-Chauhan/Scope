import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface AttendanceTotalReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const AttendanceTotalReportPDF: React.FC<AttendanceTotalReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Attendance Total Report', 14, 15); // Start at (40,40) to leave margin space

        // Define columns for the report
        const columns = [
            { header: 'Absences', dataKey: 'TotalAbsences' },
            { header: 'Lateness', dataKey: 'TotalLateness' },
            { header: 'Left Early', dataKey: 'TotalLeftEarly' },
            { header: 'Staff Name', dataKey: 'StaffName' },
            { header: 'Title', dataKey: 'SitePos' },
            { header: 'Site Name', dataKey: 'SITENAM' },
            { header: 'Employed', dataKey: 'DOEMP' },
            { header: 'Notes', dataKey: 'Notes' },
        ];

        // Format the data for autoTable
        const tableData = data
            .map((item: any) => ({
                TotalAbsences: item.TotalAbsences,
                TotalLateness: item.TotalLateness,
                TotalLeftEarly: item.TotalLeftEarly,
                StaffName: `${item.LastName || ''}, ${item.FirstName || ''}`, // Handle potential nulls in names
                SitePos: item.SitePos,
                SITENAM: item.SITENAM,
                DOEMP: item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
                Notes: item.Notes || 'No notes',
            }))
            .sort((a: { StaffName: string }, b: { StaffName: string }) =>
                a.StaffName.localeCompare(b.StaffName)
            );

        // Generate the table using autoTable
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
            theme: 'plain',
            startY: 20, // Start the table below the title
            styles: {
                fontSize: 10,
                cellPadding: 0.5,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                halign: 'center'
                // fillColor: [220, 220, 220], // Light gray background for the header
            },
            columnStyles: {
                0: { cellWidth: 20,halign: 'center' },  // Absences
                1: { cellWidth: 20,halign: 'center' },  // Lateness
                2: { cellWidth: 20,halign: 'center' },  // LeftEarly
                3: { cellWidth: 45 },  // Staff Name
                4: { cellWidth: 40 },  // Title
                5: { cellWidth: 50 },  // Site Name
                6: { cellWidth: 20,halign: 'center' },  // Employeed
                7: { cellWidth: 55 },  // Notes
            },
            // margin: { top: 60, left: 40, right: 40 }, // Set margins for the page
        });

        // Footer - Date and Page Number
        // const pageCount = doc.getNumberOfPages();
        // doc.setFontSize(10);
        // for (let i = 1; i <= pageCount; i++) {
        //     doc.setPage(i);
        //     doc.text(`Date: ${todayDate}`, 40, doc.internal.pageSize.height - 30); // Date at bottom left
        //     doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 30); // Page number at bottom right
        // }
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

export default AttendanceTotalReportPDF;
