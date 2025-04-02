import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface StaffSignInWithoutSitePdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffSignInWithoutSitePdf: React.FC<StaffSignInWithoutSitePdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let yOffset = 32; // Adjusted Y position to avoid overlapping

        // Title on the first page
        doc.setFontSize(14);
        doc.text('Staff Sign In', 14, 15);

        // "Today's Date" reduced in size and positioned higher
        doc.setFontSize(8);
        doc.text(`Today's Date: ____________________`, pageWidth / 2, 28, { align: 'center' });

        const sortedData = data.sort((a: any, b: any) => {
            const nameA = `${a.LastName}, ${a.FirstName}`.toLowerCase();
            const nameB = `${b.LastName}, ${b.FirstName}`.toLowerCase();
            return nameA.localeCompare(nameB);
        })

        const tableHeaders = [['Name', 'District', 'Signature']];
        const tableData = sortedData.map((item: any) => [
            `${item.LastName}, ${item.FirstName}`,
            item.DIST_NAM,
            '',
        ]);

        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 0.3,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
                halign: 'center',
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 61 }, 
                1: { cellWidth: 61 },  
                2: { cellWidth: 61 },  
            },
        });
        addPageNumber(doc);
        // Set PDF blob output
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

export default memo(StaffSignInWithoutSitePdf);
