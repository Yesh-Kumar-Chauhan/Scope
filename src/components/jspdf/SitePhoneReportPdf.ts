import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

// Group and sort by DIST_NAM
const groupByDistrict = (data: any) => {
    const grouped = data.reduce((acc: any, item: any) => {
        const key = item.DIST_NAM;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});

    // Sort by DIST_NAM alphabetically
    const sortedKeys = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
    return sortedKeys.map(key => grouped[key]);
};

interface SitePhoneReportPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const SitePhoneReportPdf: React.FC<SitePhoneReportPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF('portrait', 'mm', 'a4');

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 14;

        // Title
        doc.setFontSize(16);
        doc.text('Site Phone', margin, 20);

        const groupedData = groupByDistrict(data);
        const tableData: any[] = [];

        groupedData.forEach((group, index) => {
            // Add the column headers for each group with bold styling
            tableData.push([
                { content: `${group.DIST_NAM}`, styles: { fontStyle: 'bold' } },
                { content: 'Phone', styles: { fontStyle: 'bold' } },
                { content: 'Type', styles: { fontStyle: 'bold' } },
                { content: 'Email', styles: { fontStyle: 'bold' } },
                { content: 'Site Directors / Head of Group', styles: { fontStyle: 'bold' } }
            ]);
            // Sort and map site data within the same group
            group.items
                .sort((a: any, b: any) => {
                    const siteNameA = a.SiteName.toLowerCase();
                    const siteNameB = b.SiteName.toLowerCase();
                    return siteNameA.localeCompare(siteNameB);
                })
                .forEach((item: any) => {
                    tableData.push([
                        item.SiteName,
                        item.PHONE,
                        item.PHONE_TYPE,
                        item.ScopeEmail,
                        item.Directors
                    ]);
                });
        });

        // Use autoTable to generate the entire table with grouped headers
        autoTable(doc, {
            startY: 30, // Adjust the startY properly
            head: [], // Skip the head row, headers are part of the body
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 1.5,  // Reduced cell padding for more compact rows
                lineColor: 40,
                lineWidth: 0.05,  // Thinner lines between cells
                minCellHeight: 5  // Minimized cell height to reduce vertical spacing
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
            columnStyles: {
                0: { cellWidth: 40 }, 
                2: { cellWidth: 15 }, 
                3: { cellWidth: 55 }, 
            },
            didDrawCell: (data: any) => {
                doc.setDrawColor(0);
                doc.setLineWidth(0.05);  // Reducing line width to make cells more compact
            },
        });

        // Add page numbers and date at the bottom
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(todayDate, pageWidth - 30, pageHeight - 10); // Date at bottom right
            doc.text(`Page ${i} of ${pageCount}`, margin, pageHeight - 10); // Page number at bottom left
        }

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

export default memo(SitePhoneReportPdf);
