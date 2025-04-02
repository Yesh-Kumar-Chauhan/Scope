import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface AttendanceTotalSummaryReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const AttendanceTotalSummaryReportPDF: React.FC<AttendanceTotalSummaryReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Attendance Total Summary Report', 14, 13);

        // Define columns for the report
        const columns = [
            { header: 'Staff Name', dataKey: 'StaffName' },
            { header: 'Employeed', dataKey: 'DOEMP' },
            { header: 'Site Name', dataKey: 'SITENAM' },
            { header: 'Absences', dataKey: 'TotalAbsences' },
            { header: 'Lateness', dataKey: 'TotalLateness' },
            { header: 'LeftEarly', dataKey: 'TotalLeftEarly' },
        ];

        // Format the data for autoTable
        const tableData = data.map((item: any) => ({
            StaffName: `${item.LastName}, ${item.FirstName}`,
            DOEMP: item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
            SITENAM: item.SITENAM,
            TotalAbsences: item.TotalAbsences,
            TotalLateness: item.TotalLateness,
            TotalLeftEarly: item.TotalLeftEarly,
        })).sort((a: { StaffName: string }, b: { StaffName: string }) =>
            a.StaffName.localeCompare(b.StaffName)
        );

        // Generate the table using autoTable
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
            theme: 'plain',
            startY: 17,
            styles: {
                fontSize: 9,
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
                0: { cellWidth: 55 },
                1: { cellWidth: 18, halign: 'center' },
                2: { cellWidth: 55 },
                3: { cellWidth: 18, halign: 'center' },
                4: { cellWidth: 18, halign: 'center' },
                5: { cellWidth: 18, halign: 'center' },
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

export default AttendanceTotalSummaryReportPDF;
