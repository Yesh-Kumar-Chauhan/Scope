import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
interface StaffEmailAddressesReportPdfProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const groupByDistrictAndSiteType = (data: any[]) => {
    return data.reduce((acc, item) => {
        const districtKey = item.DIST_NAM;
        const siteType = getSiteTypeLabel(item.SiteType);
        const siteName = item.SiteName;

        if (!acc[districtKey]) {
            acc[districtKey] = {}; // Initialize district
        }

        if (!acc[districtKey][siteType]) {
            acc[districtKey][siteType] = {}; // Initialize site type
        }

        if (!acc[districtKey][siteType][siteName]) {
            acc[districtKey][siteType][siteName] = []; // Initialize site name
        }

        acc[districtKey][siteType][siteName].push(item); // Add staff details to the site
        return acc;
    }, {});
};

const getSiteTypeLabel = (siteType: number) => {
    switch (siteType) {
        case 1: return "Before School Programs";
        case 2: return "During School Programs";
        case 3: return "After School Programs";
        default: return "";
    }
};

const StaffEmailAddressesReportPdf: React.FC<StaffEmailAddressesReportPdfProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

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

        // Title
        doc.setFontSize(14);
        doc.text('Staff E-mail Addresses', margin, y);
        y += 7;

        // County
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(data[0]?.COUNTY === 'S' ? 'Suffolk' : 'Nassau', margin, y);
        y += 9;

        const groupedData = groupByDistrictAndSiteType(data);

        Object.keys(groupedData).forEach((district) => {
            if (y > pageHeight - 40) {
                doc.addPage();
                y = margin;
            }
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(`${district}`, margin, y);
            y += 7;
            // lastDistrictName = group.DIST_NAM;

            const siteTypes = groupedData[district];
            Object.keys(siteTypes).forEach((siteType) => {
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = margin;
                }
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text(siteType, margin + 3, y);
                y += 7;
                // lastSiteType = group.SiteType;


                const sites = siteTypes[siteType];
                Object.keys(sites).forEach((siteName) => {
                    if (y > pageHeight - 40) {
                        doc.addPage();
                        y = margin;
                    }
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`${siteName}`, margin + 5, y);
                    y += 6;

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`Multi-Site Director: ${data[0]?.Directors ? data[0]?.Directors : ''}`, margin + 5, y);
                    y += 5;

                    // const tableHeaders = [['Name', 'E-mail', 'Phone', 'Work']];
                    // const tableData = sites[siteName].map((item: any) => [
                    //     `${item.FIRSTNAME} ${item.LASTNAME}`,
                    //     item.EMAIL,
                    //     item.HOMEPHONE,
                    //     item.WORKPHONE
                    // ]);
                    const tableHeaders = [
                        { header: 'Name', dataKey: 'Name' },
                        { header: 'E-mail', dataKey: 'Email' },
                        { header: 'Phone', dataKey: 'Phone' },
                        { header: 'Work', dataKey: 'Work' },
                    ];

                    // Format the data for autoTable
                    const tableData = sites[siteName]
                        .map((item: any) => ({
                            Name: ` ${item.LASTNAME || ''}, ${item.FIRSTNAME || ''}`,
                            Email: item.EMAIL,
                            Phone: item.HOMEPHONE,
                            Work: item.WORKPHONE,
                        }))
                        .sort((a: { Name: string }, b: { Name: string }) =>
                            a.Name.localeCompare(b.Name)
                        );

                    autoTable(doc, {
                        startY: y,
                        head: [tableHeaders.map(col => col.header)],
                        body: tableData.map((row: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(row)),
                        theme: 'plain',
                        styles: {
                            fontSize: 8,
                            cellPadding: 2,
                            lineColor: 40,
                            lineWidth: 0.1,
                        },
                        headStyles: {
                            fontStyle: 'bold',
                            textColor: 0,
                            fillColor: false,
                            halign: 'center',
                        },
                        columnStyles: {
                            0: { cellWidth: 50 },
                            1: { cellWidth: 65 },
                            2: { cellWidth: 35 },
                            3: { cellWidth: 30 },
                        },
                        didDrawCell: (data: any) => {
                            doc.setDrawColor(0);
                            doc.setLineWidth(0.1);
                            doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                            doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                            doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                            doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                        },
                    });

                    y = (doc as any).lastAutoTable.finalY + 10;
                });
            });
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

export default memo(StaffEmailAddressesReportPdf);