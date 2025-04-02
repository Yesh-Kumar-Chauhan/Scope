import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

// Group and sort by DIST_NAM, SiteType, and SiteName
const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
  const grouped = data.reduce((acc: any, item: any) => {
    const districtKey = `${item.DIST_NAM}-${item.SiteType}`;
    if (!acc[districtKey]) {
      acc[districtKey] = {
        DIST_NAM: item.DIST_NAM,
        SiteType: item.SiteType,
        sites: {}
      };
    }

    const siteKey = item.SITE_NAM;
    if (!acc[districtKey].sites[siteKey]) {
      acc[districtKey].sites[siteKey] = {
        SiteName: item.SITE_NAM,
        items: []
      };
    }

    acc[districtKey].sites[siteKey].items.push(item);
    return acc;
  }, {});

  // Sorting grouped data by DIST_NAM and SiteType
  const sortedDistrictKeys = Object.keys(grouped).sort((a, b) => {
    const [distA, typeA] = a.split('-');
    const [distB, typeB] = b.split('-');

    // First, sort by DIST_NAM
    const distComparison = distA.toLowerCase().localeCompare(distB.toLowerCase());
    if (distComparison !== 0) return distComparison;

    // Then, sort by SiteType (1 for "Before," 2 for "During," 3 for "After")
    const siteTypeComparison = parseInt(typeA) - parseInt(typeB);
    return siteTypeComparison;
  });

  sortedDistrictKeys.forEach((districtKey: string) => {
    const sites = grouped[districtKey].sites;
    const sortedSiteKeys = Object.keys(sites).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    grouped[districtKey].sites = sortedSiteKeys.reduce((acc: any, key: string) => {
      acc[key] = sites[key];
      return acc;
    }, {});
  });

  return sortedDistrictKeys.map(key => grouped[key]);
};

const getSiteTypeLabel = (siteType: number) => {
  switch (siteType) {
    case 1: return "Before School Programs";
    case 2: return "During School Programs";
    case 3: return "After School Programs";
    default: return "";
  }
};

interface StaffMaximumHourReportPdfReportPDFProps {
  data: any;
  setPdfBlob: (blob: Blob) => void;
}

const StaffMaximumHourReportPdf: React.FC<StaffMaximumHourReportPdfReportPDFProps> = ({ data, setPdfBlob }) => {
  const todayDate = moment().format('DD-MM-YYYY');

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Title
    doc.setFontSize(12);
    doc.text('Staff Maximum Hours', 14, 15);

    let yOffset = 25;
    let lastDistrictName = '';
    let lastSiteType = -1;
    const groupedData: any = groupByDistrictSiteTypeAndSiteName(data);
    let currentColumn = 'left'; // Start with the left column
    const leftMargin = 14;
    const rightMargin = 110; // Right margin for the second column
    const initialYOffset = 25; // Starting point for yOffset

    // Ensure that this checks both page breaks and switching columns
    const checkPageBreak = (doc: any, yOffset: any, currentColumn: string, requiredSpace = 20) => {
      const pageHeight = doc.internal.pageSize.height;
      if (yOffset + requiredSpace > pageHeight - 20) {
        if (currentColumn === 'left') {
          // Switch to the right column
          return { yOffset: initialYOffset, column: 'right' }; // Reset yOffset for the right column
        } else {
          // Add a new page and start from the left column
          doc.addPage();
          return { yOffset: initialYOffset, column: 'left' }; // Reset yOffset for the new page
        }
      }
      return { yOffset, column: currentColumn };
    };

    Object.keys(groupedData).forEach((key: string, index) => {
      const group = groupedData[key];

      // Set the appropriate margin depending on the current column
      let margin = currentColumn === 'left' ? leftMargin : rightMargin;

      // Check if district name has changed and ensure it's printed only once
      if (lastDistrictName !== group.DIST_NAM && group.DIST_NAM) {
        doc.setFontSize(10);
        doc.text(String(group.DIST_NAM), margin, yOffset);
        yOffset += 6;
        lastDistrictName = group.DIST_NAM;
      }

      // Print the site type label if it's different
      if (lastSiteType !== group.SiteType && group.SiteType) {
        doc.setFontSize(9);
        doc.text(getSiteTypeLabel(group.SiteType), margin + 5, yOffset);
        yOffset += 6;
        lastSiteType = group.SiteType;
      }

      // Iterate through each site within the group
      Object.values(group.sites).forEach((site: any) => {
        // Print the site name and header row
        if (site.SiteName) {
          doc.setFontSize(8);
          doc.text(String(site.SiteName), margin + 10, yOffset);
          doc.text('Max', margin + 70, yOffset);
          yOffset += 6;
        }

        // Iterate through each employee at the site
        site.items.forEach((item: any) => {
          const result = checkPageBreak(doc, yOffset, currentColumn); // Check page break and column switch
          yOffset = result.yOffset;
          currentColumn = result.column;
          margin = currentColumn === 'left' ? leftMargin : rightMargin; // Adjust margin

          const lastName = item.LASTNAME || 'N/A';
          const firstName = item.FIRSTNAME || 'N/A';
          const maxHours = item.MaxHours ? item.MaxHours.toString() : 'N/A';

          doc.text(`${lastName}, ${firstName}`, margin + 15, yOffset);
          doc.text(maxHours, margin + 70, yOffset);
          yOffset += 6;
        });
      });

      yOffset += 5; // Add space between entries
    });

    // Add page number and date
    addPageNumber(doc);
    doc.setFontSize(8);
    doc.text(todayDate, 14, doc.internal.pageSize.height - 10); // Date at bottom left

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

export default memo(StaffMaximumHourReportPdf);
