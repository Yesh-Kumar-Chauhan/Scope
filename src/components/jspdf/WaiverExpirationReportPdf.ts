import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface WaiverExpirationReportPDFProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const sortData = (data: any[]) => {
    return data.sort((a, b) => {
        const districtComparison = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (districtComparison !== 0) {
            return districtComparison;
        }
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });
};

const groupByWaiver = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = moment(item.WAIVEREXP).format('YYYY-MM-DD');
        if (!acc[key]) {
            acc[key] = {
                WAIVEREXP: item.WAIVEREXP,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const WaiverExpirationReportPdf: React.FC<WaiverExpirationReportPDFProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 14;
        let y = margin;

        const addPage = () => {
            doc.addPage();
            y = margin;
        };

        // Set font styles
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);

        // Add title
        doc.text("Waiver Expiration", margin-5, y);
        y += 10;

        // Add headers
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("District Number/District Name", margin, y);
        doc.text("Site Number Site Name", pageWidth / 2, y);
        y += 8;

        // Sort the data before grouping
        const sortedData = sortData(data);

        // Group sorted data by waiver expiration date
        const groupedData = groupByWaiver(sortedData);

        // Sort the grouped data by date in descending order
        const sortedGroupKeys = Object.keys(groupedData).sort((a, b) => moment(a).diff(moment(b)));

        // Iterate through sorted grouped data
        sortedGroupKeys.forEach((key) => {
            const group = groupedData[key];

            // Add WAIVEREXP date
            doc.setFontSize(13);
            doc.setFont("helvetica", "bold");
            doc.text(moment(group.WAIVEREXP).format('MM/DD/YYYY'), margin-5, y);
            y += 8;

            // Add group items
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            group.items.forEach((item: any) => {
                y = checkPageBreak(doc, y, 10);
                if (y > pageHeight - margin) {
                    addPage();
                }
                doc.text(`${item.DIST_NUM} ${item.DIST_NAM}`, margin+15, y);
                doc.text(`${item.SITE_NUM} ${item.SITE_NAM}`, pageWidth / 2 +15, y);
                y += 6;
            });

            y += 4; // Add some space between groups
        });

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    const checkPageBreak = (doc: any, yOffset: any, requiredSpace = 20) => {
        const pageHeight = doc.internal.pageSize.height;
        if (yOffset + requiredSpace > pageHeight - 20) {
            doc.addPage();
            return 20; // Reset yOffset for new page
        }
        return yOffset;
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null;
};

export default memo(WaiverExpirationReportPdf);