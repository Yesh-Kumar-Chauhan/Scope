import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface FirstAidExpirationPdfProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

// Function to sort data alphabetically by District and Site
// Function to sort data alphabetically by District, Site, and First Name
const sortData = (data: any[]) => {
    return data.sort((a, b) => {
        const districtA = a?.DIST_NAM || '';
        const districtB = b?.DIST_NAM || '';
        const siteA = a?.SITE_NAM || '';
        const siteB = b?.SITE_NAM || '';
        const firstNameA = a?.FIRSTNAME || '';
        const firstNameB = b?.FIRSTNAME || '';

        // First, compare districts
        const name = firstNameA.localeCompare(firstNameB);
        if (name !== 0) {
            return name;
        }
        const districtComparison = districtA.localeCompare(districtB);
        if (districtComparison !== 0) {
            return districtComparison;
        }

        // If districts are the same, compare sites
        const siteComparison = siteA.localeCompare(siteB);
        if (siteComparison !== 0) {
            return siteComparison;
        }

        // If sites are also the same, compare first names
    });
};


const FirstAidExpirationPdf: React.FC<FirstAidExpirationPdfProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Title
        doc.setFontSize(16);
        doc.text('First Aid Expiration', 9, 20);

        let yOffset = 30;

        const tableHeaders = [['Date', 'Name', 'District', 'Site', 'Position', 'Multi-Site Director']];

        // Sort the data by District and Site before generating the table
        const sortedData = sortData(data);

        const tableData = sortedData.map((data: any) => [
            data?.FIRSTAID ? moment(data?.FIRSTAID).format('MM/DD/YYYY') : '',
            `${data?.FIRSTNAME} ${data?.LASTNAME}`,
            data?.DIST_NAM,
            data?.SITE_NAM,
            data?.SitePos,
            data?.Directors
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
                1: { cellWidth: 40 },
                2: { cellWidth: 60 },
                3: { cellWidth: 60 },
                4: { cellWidth: 'auto' },
                5: { cellWidth: 'auto' }
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
            }
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

export default memo(FirstAidExpirationPdf);
