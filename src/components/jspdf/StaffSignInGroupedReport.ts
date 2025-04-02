import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

// Helper function to group data by district and site name
const groupByDistrictAndSiteType = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

interface StaffSignInGroupedReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffSignInGroupedReport: React.FC<StaffSignInGroupedReportProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('MM/DD/YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Sort data by DIST_NAM then SITE_NAM
        const sortedData = data.sort((a: any, b: any) => {
            const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
            if (distCompare !== 0) return distCompare;
            return a.SITE_NAM.localeCompare(b.SITE_NAM);
        });

        const groupedData = groupByDistrictAndSiteType(sortedData);
        let lastDistrictName = '';

        doc.setFontSize(16);
        doc.text('Staff Sign In', 20, 20);

        let currentY = 40;
        const leftXOffset = 20;
        const rightXOffset = 110; // Adjust X position for right column
        const rowHeight = 5; // Height between rows
        const pageHeight = doc.internal.pageSize.height - 20; // Max page height minus bottom margin
        const signatureLine = '_______________'; // Reduced dash size for signature line

        let currentColumn = 'left'; // Track the current column

        Object.keys(groupedData).forEach((key: string) => {
            const group = groupedData[key];
            let xOffset = currentColumn === 'left' ? leftXOffset : rightXOffset;

            const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
            doc.setFont('helvetica', 'bold');
            if (shouldPrintDistrictName) {
                lastDistrictName = group.DIST_NAM;
                doc.setFontSize(12);
                doc.text(group.DIST_NAM, xOffset, currentY);
                currentY += rowHeight;
            }

            doc.setFontSize(10);
            doc.text(group.SITE_NAM, xOffset + 3, currentY);
            currentY += rowHeight;

            group.items.forEach((item: any) => {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                // Print Name and Signature lines
                doc.text(` ${item.LASTNAME} ${item.FIRSTNAME}`, xOffset + 5, currentY);
                doc.text(signatureLine, xOffset + 60, currentY); // Signature line
                currentY += rowHeight;

                // Check if we need to switch columns or add a new page
                if (currentY + rowHeight > pageHeight) {
                    if (currentColumn === 'left') {
                        // Switch to right column
                        currentColumn = 'right';
                        xOffset = rightXOffset;
                        currentY = 40; // Reset Y position for right column
                    } else {
                        // Add a new page
                        doc.addPage();
                        currentY = 40; // Reset Y position for the new page
                        currentColumn = 'left'; // Go back to left column
                        xOffset = leftXOffset;
                    }
                }
            });
        });

        // Add page numbers and today's date line
        const pageCount = doc.getNumberOfPages();

        // Footer
        doc.setFontSize(8);
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            // Add Today's Date line on every page at the top
            doc.text(`Today's Date: ______________`, 80, 30); // Adjust as per your position
            doc.text(`${todayDate}`, 20, doc.internal.pageSize.height - 10);
            doc.text(`Page ${i} of ${pageCount}`, 180, doc.internal.pageSize.height - 10);
        }
        // Save the PDF
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

export default StaffSignInGroupedReport;
