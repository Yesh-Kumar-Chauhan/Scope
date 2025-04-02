import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

// Group and sort by DIST_NAM and SITE_NAM
const groupByDistrictAndSiteType = (data: any) => {
    const grouped = data.reduce((acc: any, item: any) => {
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

    // Sort districts and sites alphabetically
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
        const [distA, siteA] = a.split('-');
        const [distB, siteB] = b.split('-');
        if (distA !== distB) return distA.localeCompare(distB);
        return siteA.localeCompare(siteB);
    });

    return sortedKeys.map(key => grouped[key]);
};

const FirstAidCPRExpirationBySiteReport = ({ data, setPdfBlob }: { data: any, setPdfBlob: (blob: Blob) => void; }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF('portrait', 'mm', 'a4');

        const pageHeight = doc.internal.pageSize.height;
        let yOffset = 20;
        const indentX = 18; // Define an indent value for site and table

        // Title
        doc.setFontSize(14);
        doc.text('First Aid/CPR Expiration by Site', 14, yOffset);
        yOffset += 10;

        const groupedData = groupByDistrictAndSiteType(data);
        let lastDistrictName = '';

        groupedData.forEach((group, index) => {
            const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;

            // Check if we need to add a new page
            if (yOffset > pageHeight - 20) {
                doc.addPage();
                yOffset = 20;
            }

            // Print District Name if it's new
            if (shouldPrintDistrictName && group.DIST_NAM) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(group.DIST_NAM.toString(), 14, yOffset); // No indentation for DIST_NAM
                doc.setFont('helvetica', 'normal');
                yOffset += 5;
                lastDistrictName = group.DIST_NAM;
            }

            // Print Site Name with indentation
            if (group.SITE_NAM) {
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text(group.SITE_NAM.toString(), indentX, yOffset); // Indentation for SITE_NAM
                doc.setFont('helvetica', 'normal');
                yOffset += 5;
            }

            // Print Director Info with the same indentation
            const directorText = `Multi-Site Director: ${data[0]?.Directors || ''}`;
            doc.setFont('helvetica', 'bold');
            doc.text(directorText.toString(), indentX, yOffset); // Director info also indented
            doc.setFont('helvetica', 'normal');
            yOffset += 5;

            // Table setup with indentation using `margin.left`
            const tableHeaders = [['First Aid', 'CPR', 'Mat Training', 'Child Abuse', 'Name', 'Position']];
            const tableData = group.items
            .sort((a: any, b: any) => {
                const lastNameA = a.LASTNAME.toLowerCase();
                const lastNameB = b.LASTNAME.toLowerCase();
                if (lastNameA < lastNameB) return -1;
                if (lastNameA > lastNameB) return 1;
        
                // If last names are equal, compare first names
                const firstNameA = a.FIRSTNAME.toLowerCase();
                const firstNameB = b.FIRSTNAME.toLowerCase();
                if (firstNameA < firstNameB) return -1;
                if (firstNameA > firstNameB) return 1;
        
                return 0;
            })
            .map((item: any) => [
                item.FIRSTAID ? moment(item.FIRSTAID).format('MM/DD/YYYY') : '',
                item.CPR ? moment(item.CPR).format('MM/DD/YYYY') : '',
                item.MATDATE ? moment(item.MATDATE).format('MM/DD/YYYY') : '',
                item.MATAPP ? moment(item.MATAPP).format('MM/DD/YYYY') : '',
                `${item.LASTNAME}, ${item.FIRSTNAME}`,
                item.SitePos ? item.SitePos : ''
            ]);
        

            autoTable(doc, {
                startY: yOffset,
                margin: { left: indentX }, // Indent the table to match the site name
                head: tableHeaders,
                body: tableData,
                theme: 'plain',
                styles: {
                    fontSize: 8,
                    cellPadding: 1, // Reduced padding for a more compact table
                    lineColor: 40,
                    lineWidth: 0.1,
                },
                headStyles: {
                    fontStyle: 'bold', // Bold headers
                    textColor: 0,
                    fillColor: false,
                },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 25 },
                    4: { cellWidth: 'auto' },
                    5: { cellWidth: 40 }
                },
                didDrawCell: (data: any) => {
                    if (data.section === 'head' || data.section === 'body') {
                        doc.setDrawColor(0);
                        doc.setLineWidth(0.1);
                        doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                        doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                        doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                        doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                    }
                },
                didDrawPage: (data: any) => {
                    // Update yOffset after drawing the table
                    yOffset = data.cursor.y + 10;
                }
            });
        });

        // Add page numbers and date at the bottom
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(todayDate, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10); // Date at bottom right
            doc.text(`Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10); // Page number at bottom left
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

export default memo(FirstAidCPRExpirationBySiteReport);
