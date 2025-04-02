import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface SiteListForHCPReportPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const SiteListForHCPReportPdf: React.FC<SiteListForHCPReportPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    // Sorting data first by DIST_NAM (district) then by SiteName
    const sortData = (data: any[]) => {
        return data.sort((a, b) => {
            const districtA = a?.DIST_NAM || '';
            const districtB = b?.DIST_NAM || '';
            const siteA = a?.SiteName || '';
            const siteB = b?.SiteName || '';

            // First compare by district, if equal, compare by site name
            const districtComparison = districtA.localeCompare(districtB);
            if (districtComparison !== 0) {
                return districtComparison;
            }
            return siteA.localeCompare(siteB);
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });

        // Title
        doc.setFontSize(16);
        doc.text('Site List For HCP', 14, 20);

        let yOffset = 30;

        // Sort the data by district and site
        const sortedData = sortData(data);

        const tableHeaders = [['District', 'Program', 'Address', 'Scope Phone', 'Scope E-mail', 'Site Director']];
        const tableData = sortedData.map((data: any) => [
            data?.DIST_NAM,
            data?.SiteName,
            `${data?.ADDR2} ${data?.ADDR3}`,
            data?.PHONE,
            data?.ScopeEmail,
            `${data?.FIRSTNAME} ${data?.LASTNAME}`,
        ]);

        // Check if there's enough space on the current page
        if (yOffset + 10 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yOffset = 20; // Reset yOffset for the new page
        }

        autoTable(doc, {
            startY: yOffset,
            head: tableHeaders,
            body: tableData,
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
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 50 },
                2: { cellWidth: 70},
                3: { cellWidth: 'auto' },
                4: { cellWidth: 40 },
            },
            didDrawCell: (data: any) => {
                doc.setDrawColor(0);
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            },
            didDrawPage: (data: any) => {
                doc.setFontSize(10);
            },
        });

        yOffset = (doc as any).lastAutoTable.finalY + 10; // Update yOffset for the next table
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

export default memo(SiteListForHCPReportPdf);
