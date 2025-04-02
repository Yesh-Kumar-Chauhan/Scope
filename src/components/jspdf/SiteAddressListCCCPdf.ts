import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import { addPageNumber } from '../common/addPageNumber';

interface SiteAddressListCCCPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

// Group and sort by COUNTY, then DIST_NAM, and then Type
const groupByCountyDistrictAndType = (data: any[]) => {
    const grouped = data.reduce((acc: any, item: any) => {
        const countyKey = item.COUNTY;
        if (!acc[countyKey]) {
            acc[countyKey] = {
                COUNTY: item.COUNTY,
                districts: {},
            };
        }

        const districtKey = item.DIST_NAM;
        if (!acc[countyKey].districts[districtKey]) {
            acc[countyKey].districts[districtKey] = {
                DIST_NAM: item.DIST_NAM,
                types: {},
            };
        }

        const typeKey = item.Type;
        if (!acc[countyKey].districts[districtKey].types[typeKey]) {
            acc[countyKey].districts[districtKey].types[typeKey] = {
                Type: item.Type,
                sites: [],
            };
        }

        acc[countyKey].districts[districtKey].types[typeKey].sites.push(item);
        return acc;
    }, {});

    // Sort COUNTY, DIST_NAM, and Type alphabetically
    const sortedCountyKeys = Object.keys(grouped).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
    );

    sortedCountyKeys.forEach((countyKey: string) => {
        const districts = grouped[countyKey].districts;
        const sortedDistrictKeys = Object.keys(districts).sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );

        sortedDistrictKeys.forEach((districtKey: string) => {
            const types = districts[districtKey].types;
            const sortedTypeKeys = Object.keys(types).sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase())
            );
            districts[districtKey].types = sortedTypeKeys.reduce((acc: any, key: string) => {
                acc[key] = types[key];
                return acc;
            }, {});
        });

        grouped[countyKey].districts = sortedDistrictKeys.reduce((acc: any, key: string) => {
            acc[key] = districts[key];
            return acc;
        }, {});
    });

    return sortedCountyKeys.map(key => grouped[key]);
};

const SiteAddressListCCCPdf: React.FC<SiteAddressListCCCPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Title
        doc.setFontSize(14);
        doc.text('Site Address List', 14, 20);

        let yOffset = 30;
        const leftMargin = 14;
        const rightMargin = 110;
        const initialYOffset = 30;

        let currentColumn = 'left'; // Start with the left column

        // Adjust the page break logic for better control
        const checkPageBreak = (doc: any, yOffset: any, requiredSpace = 35) => {
            const pageHeight = doc.internal.pageSize.height;
            if (yOffset + requiredSpace > pageHeight - 20) {
                doc.addPage();
                return { yOffset: initialYOffset, currentColumn: 'left' }; // Reset yOffset for the new page and start with left column
            }
            return { yOffset, currentColumn };
        };

        const groupedData: any = groupByCountyDistrictAndType(data);

        // Loop through grouped data and handle left-right column logic
        groupedData.forEach((countyGroup: any) => {
            let margin = currentColumn === 'left' ? leftMargin : rightMargin;

            doc.setFont('helvetica', 'bold');

            // Print county name
            doc.setFontSize(12);
            doc.text(`${countyGroup.COUNTY} County`, margin, yOffset);
            yOffset += 7;

            Object.values(countyGroup.districts).forEach((district: any) => {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');

                doc.text(`${district.DIST_NAM}`, margin, yOffset);
                yOffset += 7;

                Object.values(district.types).forEach((type: any) => {
                    doc.setFont('helvetica', 'bold');
                    doc.text(`${type.Type}`, margin, yOffset);

                    const textWidth = doc.getTextWidth(`${type.Type}`);
                    doc.setDrawColor(0);
                    doc.line(margin, yOffset + 1, margin + textWidth, yOffset + 1);

                    yOffset += 7;

                    doc.setFont('helvetica', 'normal');

                    type.sites.forEach((site: any) => {
                        const requiredSpace = 35; // Estimate of space for site details
                        const result = checkPageBreak(doc, yOffset, requiredSpace);
                        yOffset = result.yOffset;

                        // Adjust margin if we're switching columns
                        if (result.currentColumn !== currentColumn) {
                            currentColumn = result.currentColumn;
                            margin = currentColumn === 'left' ? leftMargin : rightMargin;
                        }

                        // Print the site's details
                        doc.setFontSize(8);
                        doc.text(`${site.PERMIT || ''} ${site.SITE_NAM || ''}`, margin + 10, yOffset);
                        yOffset += 5;
                        doc.text(site.ADDR1 || '', margin + 10, yOffset);
                        yOffset += 5;
                        doc.text(site.ADDR2 || '', margin + 10, yOffset);
                        yOffset += 5;
                        doc.text(site.ADDR3 || '', margin + 10, yOffset);
                        yOffset += 5;

                        doc.setFont('helvetica', 'bold');
                        doc.text(`License Capacity:`, margin + 10, yOffset); // Bold label
                        doc.setFont('helvetica', 'normal');
                        doc.text(site.CAPACTIY?.toString() || '', margin + 40, yOffset); // Normal value
                        yOffset += 5;
                        
                        doc.setFont('helvetica', 'bold');
                        doc.text('Grade', margin + 10, yOffset); // Bold label
                        doc.setFont('helvetica', 'normal');
                        doc.text(site.GRADE_LVLS || '', margin + 40, yOffset); // Normal value
                        
                        yOffset += 5;

                        // Switch columns after filling left, then move to the right
                        if (currentColumn === 'left' && yOffset + requiredSpace > doc.internal.pageSize.height - 20) {
                            currentColumn = 'right';
                            margin = rightMargin;
                            yOffset = initialYOffset; // Reset yOffset for the right column
                        } else if (currentColumn === 'right' && yOffset + requiredSpace > doc.internal.pageSize.height - 20) {
                            doc.addPage(); // Add new page if both columns are filled
                            currentColumn = 'left'; // Start filling from the left column again
                            margin = leftMargin;
                            yOffset = initialYOffset;
                        }
                    });
                });
            });
        });

        // Add page numbers
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

export default memo(SiteAddressListCCCPdf);
