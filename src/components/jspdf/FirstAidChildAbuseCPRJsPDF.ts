import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';
interface FirstAidChildAbuseCPRJsPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const FirstAidChildAbuseCPRJsPDF: React.FC<FirstAidChildAbuseCPRJsPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    useEffect(() => {
        if (data) {
            console.log('data for jsPDF', data);
            generatePDF();
        }
    }, [data]);

    const generatePDF = () => {
        const doc = new jsPDF('portrait', 'pt', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const todayDate = moment().format('DD-MM-YYYY');
    
        const addHeader = (doc: jsPDF) => {
            doc.setFontSize(14);
            doc.text("First Aid, Child Abuse, CPR", 40, 40);
            doc.setFontSize(10);
        };
    
        let yPos = 60; // Initial position for the table after the header on the first page
    
        const sortedData = [...data].sort((a, b) => {
            if (a.FIRSTNAME < b.FIRSTNAME) return -1;
            if (a.FIRSTNAME > b.FIRSTNAME) return 1;
            return 0;
        });
    
        const tableColumnHeaders = [
            { header: 'Name', dataKey: 'name' },
            { header: 'First Aid', dataKey: 'firstAid' },
            { header: 'Child Abuse', dataKey: 'childAbuse' },
            { header: 'CPR', dataKey: 'cpr' }
        ];
    
        const tableRows = sortedData.length > 0 ? sortedData.map((item: any) => ([
            `${item?.FIRSTNAME}, ${item?.LASTNAME}`,
            item?.FIRSTAID ? moment(item?.FIRSTAID).format('MM/DD/YYYY') : '',
            item?.MATAPP ? moment(item?.MATAPP).format('MM/DD/YYYY') : '',
            item?.CPR ? moment(item?.CPR).format('MM/DD/YYYY') : ''
        ])) : [];
    
        // Use autoTable to generate the table with custom hooks for each page
        autoTable(doc, {
            head: [tableColumnHeaders.map(col => col.header)],
            body: tableRows,
            startY: yPos,
            theme: 'grid',
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
                halign: 'center',
            },
            margin: { top: 70 }, // Set margin for the first page
            didDrawPage: (data:any) => {
                addHeader(doc); // Add header on each page
            },
            willDrawCell: (data:any) => {
                // Adjust the Y position for the table in subsequent pages
                if (data.row.index > 0) {
                    data.settings.margin.top = 60; // Adjust margin from the second page onward
                }
            },
        });
    
        addPageNumber(doc);
        doc.setFontSize(8);
        doc.text(`Generated on: ${todayDate}`, 40, doc.internal.pageSize.height - 20);
    
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };
    
    return null;
}

export default FirstAidChildAbuseCPRJsPDF;
