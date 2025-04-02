import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

// Function to sort data by Mat Expire (MATDATE)
const sortDataByMatExpire = (data: any[]) => {
    return data.sort((a, b) => {
        const matExpireA = a?.MATDATE ? moment(a.MATDATE).toDate() : new Date(0); // Use a default date for null/undefined values
        const matExpireB = b?.MATDATE ? moment(b.MATDATE).toDate() : new Date(0);

        return matExpireA.getTime() - matExpireB.getTime();
    });
};

const MatExpirationPdf = ({ data, setPdfBlob }: { data: any, setPdfBlob: (blob: Blob) => void; }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('MAT Expiration', 14, 20);

        const tableHeaders = [['Mat Start', 'Mat Expire', 'Name', 'District', 'Site Name', 'Position', 'Multi-Site Director']];

        // Sort the data by Mat Expire (MATDATE) before generating the table
        const sortedData = sortDataByMatExpire(data);

        const tableData = sortedData.map((item: any) => [
            item.MatStart ? moment(item?.MatStart).format('MM/DD/YYYY') : '',
            item.MATDATE ? moment(item?.MATDATE).format('MM/DD/YYYY') : '',
            `${item.FIRSTNAME} ${item.LASTNAME}`,
            item.DIST_NAM,
            item.SITE_NAM,
            item.SitePos,
            item.Directors,
        ]);

        autoTable(doc, {
            startY: 25,
            head: tableHeaders,
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 10,
                cellPadding: 1,
                lineWidth: 0, // No internal lines
            },
            headStyles: {
                fillColor: [255, 255, 255], // No fill color
                textColor: [0, 0, 0], // Black text color
                fontStyle: 'bold',
            },
            bodyStyles: {
                lineWidth: 0, // No lines between body rows
            },
            didDrawPage: (data: any) => {
                const headY = data.settings.startY; // Y-position where the header starts
                const headHeight = data.table.head[0].height; // Height of the header

                doc.setLineWidth(0.5); // Set the thickness of the line

                if (data.pageNumber === 1) {
                    doc.line(14, headY + headHeight, 290, headY + headHeight);
                } else {
                    const contentStartY = data.settings.margin.top;
                    doc.line(14, contentStartY + 10, 290, contentStartY + 10);
                }
            }
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

    return null;
};

export default memo(MatExpirationPdf);
