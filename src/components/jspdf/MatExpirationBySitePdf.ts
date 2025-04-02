import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';

interface MatExpirationBySiteProps {
  data: any[];
  setPdfBlob: (blob: Blob) => void;
}

// Group and sort by DIST_NAM and SITE_NAM
const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
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

  // Sort by DIST_NAM and SITE_NAM alphabetically
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const [distA, siteA] = a.split('-');
    const [distB, siteB] = b.split('-');
    if (distA !== distB) return distA.localeCompare(distB);
    return siteA.localeCompare(siteB);
  });

  return sortedKeys.map(key => grouped[key]);
};

const MatExpirationBySitePdf: React.FC<MatExpirationBySiteProps> = ({ data, setPdfBlob }) => {
  useEffect(() => {
    if (data) {
      generatePDF(data);
    }
  }, [data]);

  const generatePDF = (data: any[]) => {
    const doc = new jsPDF('portrait', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const todayDate = moment().format('DD-MM-YYYY');

    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Mat Expiration by Site', margin, margin + 10);

    // Table headers
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const headers = ['Mat Start', 'Mat Expire', 'Name', 'Position'];
    const headerY = margin + 20;
    const columnWidths = [30, 30, 60, 90];
    let currentX = margin;

    headers.forEach((header, index) => {
      doc.text(header, currentX + 3, headerY);
      currentX += columnWidths[index];
    });

    // Horizontal line under headers
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(margin, headerY + 2, pageWidth - margin, headerY + 2);

    let yPosition = headerY + 7; // Reduced vertical space after header
    const lineHeight = 5; // Reduce the vertical space between rows

    const groupedData = groupByDistrictSiteTypeAndSiteName(data);
    let lastDistrictName = '';

    groupedData.forEach((group: any) => {
      // Check if we need to add a new page
      if (yPosition + 30 > pageHeight - margin) {
        doc.addPage();
        yPosition = margin + 20;
      }

      // Print district name if it has changed
      if (lastDistrictName !== group.DIST_NAM) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(group.DIST_NAM, margin, yPosition); // No indentation for district name
        yPosition += lineHeight + 2; // Added slight space after district name
        lastDistrictName = group.DIST_NAM;
      }

      // Print site name with indentation
      doc.setFontSize(11);
      //doc.setFont('helvetica', 'normal');
      doc.text(group.SITE_NAM, margin + 3, yPosition); // Indented for site name
      yPosition += lineHeight;

      // Print Multi-Site Director with further indentation
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(`Multi-Site Director:`, margin + 3, yPosition); // Further indentation for director info
      yPosition += lineHeight;

      group.items.forEach((item: any, index: number) => {
        // Check if we need to add a new page
        if (yPosition + 20 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin + 20;
        }

        // Print item data with more indentation
        doc.setFontSize(9);
        currentX = margin + 3; // More indentation for item data
        [
          item.MatStart ? moment(item.MatStart).format('MM/DD/YYYY') : '',
          item.MATDATE ? moment(item.MATDATE).format('MM/DD/YYYY') : '',
          `${item.FIRSTNAME || ''}, ${item.LASTNAME || ''}`,
          item.SitePos || ''
        ].forEach((cell, cellIndex) => {
          doc.text(cell, currentX, yPosition);
          currentX += columnWidths[cellIndex];
        });
        yPosition += lineHeight;
      });

      yPosition += lineHeight / 2; // Add some space between groups
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

  return null;
};

export default MatExpirationBySitePdf;
