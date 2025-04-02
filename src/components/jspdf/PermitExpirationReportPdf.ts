import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface PermitExpirationPdfProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const groupByExpirationDate = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = item.EXPIRES;
        if (!acc[key]) {
            acc[key] = {
                EXPIRES: item.EXPIRES,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const PermitExpirationReportPdf: React.FC<PermitExpirationPdfProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageHeight = doc.internal.pageSize.height;
        const margin = 14;
        let y = margin;

        doc.setFontSize(14);
        doc.text('Permit Expiration', margin, y);
        y += 10;

        const sortedData = [...data].sort((a, b) => moment(a.EXPIRES).diff(moment(b.EXPIRES)));

        const groupedData = groupByExpirationDate(sortedData);

        Object.keys(groupedData).forEach((key) => {
            const group = groupedData[key];

            if (y > pageHeight - 40) {
                doc.addPage();
                y = margin;
            }

            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(moment(group.EXPIRES).format('MM/DD/YYYY'), margin, y);
            y += 5;

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text('Number District Name', margin+5, y);
            doc.text('Number Site Name', 80, y);
            doc.text('PERMIT#', 150, y);
            y += 4;

            group.items.forEach((item: any) => {
                if (y > pageHeight - 20) {
                    doc.addPage();
                    y = margin;
                }

                doc.text(`${item.DIST_NUM} ${item.DIST_NAM}`, margin+10,y);
                doc.text(`${item.SITE_NUM} ${item.SITE_NAM}`, 80, y);
                doc.text(item.PERMIT, 150, y);
                y += 5;
            });

            y += 3; // Add some space between groups
        });
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data && data.length > 0) {
            generatePDF();
        }
    }, [data]);

    return null;
};

export default memo(PermitExpirationReportPdf);