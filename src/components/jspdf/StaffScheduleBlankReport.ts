import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';

interface StaffScheduleBlankReportProps {
  data: any;
  setPdfBlob: (blob: Blob) => void;
}

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

    const siteKey = item.SiteName;
    if (!acc[districtKey].sites[siteKey]) {
      acc[districtKey].sites[siteKey] = {
        SiteName: item.SiteName,
        items: []
      };
    }

    acc[districtKey].sites[siteKey].items.push(item);
    return acc;
  }, {});

  // Sorting grouped data by DIST_NAM, SiteType, and SiteName
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

const StaffScheduleBlankReport: React.FC<StaffScheduleBlankReportProps> = ({ data, setPdfBlob }) => {
  const todayDate = moment().format('DD-MM-YYYY');

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const groupedData = groupByDistrictSiteTypeAndSiteName(data);
    let lastDistrictName = '';
    let lastSiteType = -1;

    doc.setFontSize(16);
    doc.text('Staff Schedule', 40, 40);

    let currentY = 60;

    groupedData.forEach((group: any, index: number) => {
      const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
      const shouldPrintSiteType = lastSiteType !== group.SiteType;
      currentY += 15;
      if (shouldPrintDistrictName) {
        lastDistrictName = group.DIST_NAM;
        doc.setFontSize(12);
        doc.text(group.DIST_NAM, 40, currentY); // No indentation for district name
        currentY += 15;
      }

      if (shouldPrintSiteType) {
        lastSiteType = group.SiteType;
        doc.setFontSize(12);
        doc.text(getSiteTypeLabel(group.SiteType), 45, currentY); // Indentation for site type
        currentY += 15;
      }

      Object.keys(group.sites).forEach((siteKey: string) => {
        const siteGroup = group.sites[siteKey];

        // Indent the site name
        doc.setFontSize(10);
        doc.text(siteGroup.SiteName, 60, currentY);
        doc.text('Multi Site Director :', 250, currentY);
        currentY += 10;

        // Generate the table with additional indentation
        const body = [
          ...siteGroup.items.map((item: any) => [
            `${item.LastName}, ${item.FirstName}`,
            item?.SitePos,
            '___', '___', '___', '___', '___',
          ]),
          // Adding four rows with underscores for each column
          ['___', '___', '___', '___', '___', '___', '___'],
          ['___', '___', '___', '___', '___', '___', '___'],
          ['___', '___', '___', '___', '___', '___', '___'],
          ['___', '___', '___', '___', '___', '___', '___'],
        ];

        autoTable(doc, {
          head: [['', 'Position', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']],
          body: body,
          startY: currentY,
          theme:'plain',
          margin: { left: 60, right: 40 }, // Indentation added to the table
          styles: {
            fontSize: 8,
            cellPadding: 2,
            lineColor: 40,
            lineWidth: 0,
          },
          headStyles: {
            fontStyle: 'bold',
            textColor: 0,
            fillColor: false,
          },
          didDrawPage: (data: { cursor: { y: number; }; }) => {
            currentY = data.cursor.y + 10; // Set the currentY after the table is drawn
          },
        });
      });

      // Add a new page if necessary
      //   if (index < groupedData.length - 1) {
      //     doc.addPage();
      //     currentY = 40; // Reset Y position on new page
      //   }
    });

    // Add page numbers and date at the bottom
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(todayDate, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10); // Date at bottom right
      doc.text(`Page ${i} of ${pageCount}`, 40, doc.internal.pageSize.height - 10); // Page number at bottom left
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

export default StaffScheduleBlankReport;
