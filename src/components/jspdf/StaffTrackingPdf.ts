import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface StaffTrackingPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}
const StaffTrackingPdf: React.FC<StaffTrackingPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('Staff Tracking', 14, 20);

        let yOffset = 30;

        
        const sortedData = [...data].sort((a, b) => {
            if (a.LastName < b.LastName) return -1;
            if (a.LastName > b.LastName) return 1;
            return 0;
        });
        
        const tableHeaders = [['Name', 'Site', 'Title', 'S.H.Exp', 'Clear. Rec', 'FP Ret.', 'SEL', 'DOH']];
        
        const tableData = sortedData.length > 0 ? sortedData.map((item: any) => [
            `${item.LastName} ${item.FirstName}`,  
            item.SITE_NAM || '',                  
            item.SitePos || '',                   
            item.SHarassmentExp ? moment(item.SHarassmentExp).format('MM/DD/YYYY') : '', 
            item.CLEARREC ? moment(item.CLEARREC).format('MM/DD/YYYY') : '',            
            item.STATE_FPR ? moment(item.STATE_FPR).format('MM/DD/YYYY') : '',          
            item.SEL ? moment(item.SEL).format('MM/DD/YYYY') : '',                    
            item.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',                 
        ]) : [];

        // Check if there's enough space on the current page
        if (yOffset + 10 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yOffset = 20; // Reset yOffset for the new page
        }

        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableData,
            theme: 'plain',
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
                0: { cellWidth: 45 },
                1: { cellWidth: 50 },
                2: { cellWidth: 50 },
                3: { cellWidth: 30 },
                4: { cellWidth: 'auto' }
            },
            didDrawCell: (data: any) => {
                doc.setDrawColor(0);
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            },
            didDrawPage: (data: any) => {
                doc.setFontSize(10);
            }
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

export default memo(StaffTrackingPdf);