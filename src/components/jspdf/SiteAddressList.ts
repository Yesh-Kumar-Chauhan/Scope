import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import { addPageNumber } from '../common/addPageNumber';

interface SiteAddressListReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

// Group and sort by COUNTY, DIST_NAM, and Type
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
    });

    return sortedCountyKeys.map(key => grouped[key]);
};

const SiteAddressList: React.FC<SiteAddressListReportPDFProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Title
        doc.setFontSize(16);
        doc.text('Site Address List', 14, 20);

        let yOffset = 30;
        let lastCounty = '';
        let lastDistrictName = '';
        let currentColumn = 'left'; // Start with the left column
        const leftMargin = 14;
        const rightMargin = 110;
        const initialYOffset = 30;

        // Ensure that this checks both page breaks and switching columns
        const checkPageBreak = (doc: any, yOffset: any, currentColumn: string, requiredSpace = 35) => {
            const pageHeight = doc.internal.pageSize.height;
            if (yOffset + requiredSpace > pageHeight - 20) {
                if (currentColumn === 'left') {
                    // Switch to the right column
                    return { yOffset: initialYOffset, column: 'right' };
                } else {
                    // Add a new page and start from the left column
                    doc.addPage();
                    return { yOffset: initialYOffset, column: 'left' };
                }
            }
            return { yOffset, column: currentColumn };
        };

        const groupedData: any = groupByCountyDistrictAndType(data);

        groupedData.forEach((countyGroup: any) => {
            // Print county name if it has changed
            if (lastCounty !== countyGroup.COUNTY) {
                ({ yOffset, column: currentColumn } = checkPageBreak(doc, yOffset, currentColumn, 10));
                let margin = currentColumn === 'left' ? leftMargin : rightMargin;

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(14);
                doc.text(`${countyGroup.COUNTY} County`, margin, yOffset);
                yOffset += 7;
                lastCounty = countyGroup.COUNTY;
            }

            Object.values(countyGroup.districts).forEach((district: any) => {
                // Print district name if it has changed
                if (lastDistrictName !== district.DIST_NAM) {
                    ({ yOffset, column: currentColumn } = checkPageBreak(doc, yOffset, currentColumn, 10));
                    let margin = currentColumn === 'left' ? leftMargin : rightMargin;

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(12);
                    doc.text(`${district.DIST_NAM}`, margin, yOffset);
                    yOffset += 7;
                    lastDistrictName = district.DIST_NAM;
                }

                Object.values(district.types).forEach((type: any) => {
                    // Print type
                    ({ yOffset, column: currentColumn } = checkPageBreak(doc, yOffset, currentColumn, 10));
                    let margin = currentColumn === 'left' ? leftMargin : rightMargin;

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    doc.text(`${type.Type}`, margin, yOffset);

                    // Underline the text by drawing a line beneath it
                    const textWidth = doc.getTextWidth(`${type.Type}`);
                    doc.setDrawColor(0);
                    doc.line(margin, yOffset + 1, margin + textWidth, yOffset + 1);
                    yOffset += 7;

                    doc.setFont('helvetica', 'normal');

                    type.sites.forEach((site: any) => {
                        const requiredSpace = 35;
                        ({ yOffset, column: currentColumn } = checkPageBreak(doc, yOffset, currentColumn, requiredSpace));
                        margin = currentColumn === 'left' ? leftMargin : rightMargin;

                        // Print the site's details
                        doc.setFontSize(10);
                        doc.text(`${site.SITE_NUM || ''} ${site.SITE_NAM || ''}`, margin + 10, yOffset);
                        yOffset += 5;
                        doc.text(site.ADDR1 || '', margin + 10, yOffset);
                        yOffset += 5;
                        doc.text(site.ADDR2 || '', margin + 10, yOffset);
                        yOffset += 5;
                        doc.text(site.ADDR3 || '', margin + 10, yOffset);
                        yOffset += 5;

                        doc.text('School phone:', margin + 10, yOffset);
                        doc.text(site.SCHFONE || '', margin + 60, yOffset);
                        yOffset += 5;

                        doc.text('Program phone:', margin + 10, yOffset);
                        doc.text(site.PHONE || '', margin + 60, yOffset);
                        yOffset += 5;

                        doc.text('Start time:', margin + 10, yOffset);
                        doc.text(site.START_TIME || '', margin + 60, yOffset);
                        yOffset += 10;
                    });
                });
            });
        });

        // Add page numbers and date at the bottom
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

export default memo(SiteAddressList);
    