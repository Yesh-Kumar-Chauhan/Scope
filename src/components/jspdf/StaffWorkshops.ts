import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';

interface StaffWorkshopsPdfProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

// Helper to group by DIST_NAM and SITE_NAM
const groupByDistrictAndSite = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        if (!acc[item.DIST_NAM]) {
            acc[item.DIST_NAM] = {};
        }
        if (!acc[item.DIST_NAM][item.SITE_NAM]) {
            acc[item.DIST_NAM][item.SITE_NAM] = [];
        }
        acc[item.DIST_NAM][item.SITE_NAM].push(item);
        return acc;
    }, {});
};

const StaffWorkshops: React.FC<StaffWorkshopsPdfProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4',
        });

        const pageHeight = doc.internal.pageSize.height; // Get page height
        let currentY = 60;

        // Title
        doc.setFontSize(16);
        doc.text('Workshops Report', 40, currentY);
        currentY += 20;

        // Group data by DIST_NAM and SITE_NAM
        const groupedData = groupByDistrictAndSite(data);

        // Iterate over each district
        Object.keys(groupedData).forEach((district: string) => {
            // Add background and bold text for district
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            // For dark gray background color
            doc.setFillColor(169, 169, 169); // Dark gray color (RGB: 169, 169, 169)
            // Set gray background color
            doc.rect(40, currentY - 8, 765, 16, 'F'); // Create a filled rectangle for background
            doc.text(`${district}`, 45, currentY); // Print district name on top of the gray background
            currentY += 15;

            // Iterate over each site within the district
            Object.keys(groupedData[district]).forEach((site: string) => {
                // Check if there's enough space for new content on the current page
                if (currentY + 60 > pageHeight - 30) {
                    doc.addPage(); // Add a new page
                    currentY = 40; // Reset Y position for new page
                }

                // Add background and bold text for site
                doc.setFontSize(10);
                // For dark gray background color
                doc.setFillColor(169, 169, 169); // Dark gray color (RGB: 169, 169, 169)
                // Set light gray background for site
                doc.rect(40, currentY - 8, 765, 16, 'F'); // Create a filled rectangle for background
                doc.text(`${site}`, 45, currentY); // Print site name on top of the light gray background
                currentY += 10;

                const siteData = groupedData[district][site];

                if (siteData.length) {
                    // Sort the siteData by LASTNAME before mapping
                    const sortedSiteData = siteData.sort((a: any, b: any) => {
                        const lastNameA = a.LASTNAME?.toLowerCase() || '';
                        const lastNameB = b.LASTNAME?.toLowerCase() || '';
                        return lastNameA.localeCompare(lastNameB);
                    });

                    // Prepare the table data for each site
                    const tableBody = sortedSiteData.map((item: any) => [
                        `${item.LASTNAME ?? ''} ${item.FIRSTNAME ?? ''}`,
                        item?.Title || '',
                        item?.DOEMP ? moment(item.DOEMP).format('MM/DD/YYYY') : '',
                        item?.FIRSTAID ? moment(item.FIRSTAID).format('MM/DD/YYYY') : '',
                        item?.MATAPP ? moment(item.MATAPP).format('MM/DD/YYYY') : '',
                        item?.MATDATE ? moment(item.MATDATE).format('MM/DD/YYYY') : '',
                        item?.SHarassmentExp ? moment(item.SHarassmentExp).format('MM/DD/YYYY') : '',
                        item?.Foundations ? moment(item.Foundations).format('MM/DD/YYYY') : '',
                        item?.Foundations15H ? moment(item.Foundations15H).format('MM/DD/YYYY') : '',
                        item?.ACES ? moment(item.ACES).format('MM/DD/YYYY') : '',
                        item?.ELaw ? moment(item.ELaw).format('MM/DD/YYYY') : '',
                    ]);

                    // Generate Table with AutoTable
                    autoTable(doc, {
                        head: [['', 'Title', 'Employed', 'First Aid', 'Abuse', 'Mat Exp.', 'S.Haras.', 'H&S 5', 'H&S 15', 'ACES', 'ELaw']],
                        body: tableBody,
                        startY: currentY,
                        margin: { left: 40, right: 40 },
                        theme: 'plain',
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
                        },
                        didDrawPage: (data: { cursor: { y: number } }) => {
                            currentY = data.cursor.y + 10; // Update current Y position after the table
                        },
                    });

                    // currentY += 10; // Add some space after the table
                }

            });
        });

        // Add page numbers and the date on each page
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(todayDate, 260, doc.internal.pageSize.height - 10); // Adjust for bottom margin
            doc.text(`Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10); // Adjust for bottom margin
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

export default StaffWorkshops;
