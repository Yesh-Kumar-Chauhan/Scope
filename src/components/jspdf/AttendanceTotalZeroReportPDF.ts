import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface AttendanceTotalZeroReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const AttendanceTotalZeroReportPDF: React.FC<AttendanceTotalZeroReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Attendance Total Report - Zero', 14, 13);

        // Define columns for the report
        const columns = [
            { header: 'Absences', dataKey: 'TotalAbsences' },
            { header: 'Lateness', dataKey: 'TotalLateness' },
            { header: 'LeftEarly', dataKey: 'TotalLeftEarly' },
            { header: 'Staff Name', dataKey: 'StaffName' },
            { header: 'Title', dataKey: 'SitePos' },
            { header: 'Site', dataKey: 'SITENAM' },
            { header: 'Employeed', dataKey: 'DOEMP' },
            { header: 'Notes', dataKey: 'Notes' },
        ];

        // Format the data for autoTable
        const tableData = data.map((item: any) => ({
            TotalAbsences: item.TotalAbsences,
            TotalLateness: item.TotalLateness,
            TotalLeftEarly: item.TotalLeftEarly,
            StaffName: `${item.LastName}, ${item.FirstName}`,
            SitePos: item.SitePos,
            SITENAM: item.SITENAM,
            DOEMP: item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
            Notes: item.Notes || '',
        })).sort((a: { StaffName: string }, b: { StaffName: string }) =>
            a.StaffName.localeCompare(b.StaffName)
        );

        // Generate the table using autoTable
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
            theme: 'plain',
            startY: 20,
            styles: {
                fontSize: 10,
                cellPadding: 0.5,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center',
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

export default AttendanceTotalZeroReportPDF;
