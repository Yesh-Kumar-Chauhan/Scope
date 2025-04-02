import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';
interface VisitsReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const VisitsReport: React.FC<VisitsReportProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const sortData = (data: any[]) => {
        return data.sort((a, b) => {
            const siteA = a?.SITE_NAM || '';
            const siteB = b?.SITE_NAM || '';
            return siteA.localeCompare(siteB);
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4',
        });

        let currentY = 60;

        // Title
        doc.setFontSize(18);
        doc.text('Visits', 60, currentY);
        currentY += 20;

        // Sort the data by SITE_NAM
        const sortedData = sortData(data);

        // Prepare data for table
        const tableBody: any[] = [];

        sortedData.forEach((item: any) => {
            // Push main row data
            tableBody.push([
                item?.SITE_NAM || '',
                item?.date ? moment(item.date).format('MM/DD/YYYY') : '',
                item?.name || '',
                `${item?.OFFICAL ? 'Official, ' : ''}${item?.STAFFING ? 'Staffing, ' : ''}${item?.PROBLEM ? 'Problem, ' : ''}${item?.TRAINING ? 'Training, ' : ''}${item?.QUALITY ? 'Quality, ' : ''}${item?.OTHER ? 'Other, ' : ''}`,
            ]);

            // Push notes row data if available
            if (item?.NOTES) {
                tableBody.push([
                    { content: `Notes: ${item.NOTES}`, colSpan: 4},
                ]);
            }
        });

        // Generate the table with all data
        autoTable(doc, {
            head: [['Site', 'Date', 'Name', 'Reason']],
            body: tableBody,
            startY: currentY,
            margin: { left: 40, right: 40 },
            theme: 'plain',
            styles: {
                fontSize: 10,
                cellPadding: 3,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
        });

        // Footer with date
        doc.setFontSize(10);
        doc.text(`Generated on ${todayDate}`, 40, doc.internal.pageSize.height - 30);
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything visually
};

export default VisitsReport;
