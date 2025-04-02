import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

const SiteEmergencyInformationPdf = ({ data, setPdfBlob }: { data: any, setPdfBlob: any }) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const safeTextSplit = (text: string) => {
      if (typeof text === 'string') {
        return text.split('\n');
      }
      return [String(text)];
    };

    // Sort data by DIST_NAM and SITE_NAM
    const sortedData = data.sort((a: any, b: any) => {
      const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
      if (distCompare !== 0) return distCompare;
      return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    // Loop through the data for each district and site, creating a page for each
    sortedData.forEach((siteData: any, index: number) => {
      if (index > 0) {
        doc.addPage(); // Add a new page after the first one
      }

      // Set font styles for each page
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      // Title
      doc.text("Site Emergency Information", 14, 20);

      // School information
      doc.setFontSize(10);
      doc.text(`${siteData.DIST_NAM}`, 14, 30);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`${siteData.SITE_NUM} ${siteData.SITE_NAM}      ${siteData.PERMIT}`, 14, 40);
      doc.text(`${siteData.ADDR1}`, 14, 45);
      doc.text(`${siteData.ADDR2}`, 14, 50);
      doc.text(`${siteData.ADDR3}`, 14, 55);
      doc.text(`Location: ${siteData.ROOM_NO}`, 14, 60);
      doc.text(`Capacity: ${siteData.CAPACTIY}`, 14, 65);

      // Grade Level and SCOPE Phone
      doc.text(`Grade Level ${siteData.GRADE_LVLS}`, 120, 40);
      doc.text(`SCOPE Phone ${siteData.PHONE}`, 120, 45);
      doc.text(`Land Line Phone Location: ${siteData.LNDLNLOC}`, 120, 50);
      doc.text(`Outside Safe Place: ${siteData.OSSPLACE}`, 120, 55);

      // Approved Spaces table
      autoTable(doc, {
        head: [['Approved Spaces', 'Space Capacity', 'Additional Approved Space', 'Space Capacity']],
        body: [
          [`${siteData.ROOM_NO}`, `${siteData.CAP1}`, `${siteData.ADDLOC}`, `${siteData.ASCAP1}`],
          [`${siteData.ROOM_NO2}`, `${siteData.CAP2}`, `${siteData.ADDLOC2}`, `${siteData.ASCAP2}`],
          [`${siteData.ROOM_NO3}`, `${siteData.CAP3}`, `${siteData.ADDLOC3}`, `${siteData.ASCAP3}`],
          [`${siteData.ROOM_NO4}`, `${siteData.CAP4}`, `${siteData.ADDLOC4}`, `${siteData.ASCAP4}`],
        ],
        theme: 'plain',
        startY: 70,
        styles: {
          fontSize: 8,
          cellPadding: 1.5, // Reduce padding inside cells
          lineHeight: 1,
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      });

      // Get dynamic Y position after the table
      let yPos = (doc as any).lastAutoTable.finalY + 10; // Add some padding

      // Principal and School contact info
      doc.setFont("helvetica", "bold");
      doc.text("Principal", 14, yPos);
      yPos += 5;
      doc.setFont("helvetica", "normal");
      doc.text(`${siteData.PRINCIPAL}`, 14, yPos);
      // yPos += 5;

      doc.setFont("helvetica", "bold");
      doc.text("School Phone", 80, yPos - 5);
      doc.setFont("helvetica", "normal");
      doc.text(`${siteData.SCHFONE}`, 80, yPos);
      // yPos += 5;

      doc.setFont("helvetica", "bold");
      doc.text("School Fax", 140, yPos - 5);
      doc.setFont("helvetica", "normal");
      doc.text(`${siteData.SFAX}`, 140, yPos);
      yPos += 10;

      // Police and Fire information
      const emergencyInfo = [
        { title: "Police", info: `${siteData.PADR1} \n${siteData.PADR2} \n${siteData.PADR3} \n${siteData.PPHONE}` },
        { title: "Evacuation One", info: `${siteData.EADR1} \n${siteData.EADR2} \n${siteData.EADR3} \n${siteData.EPHONE}` },
        { title: "Fire", info: `${siteData.FADR1} \n${siteData.FADR2} \n${siteData.FADR3} \n${siteData.FPHONE}` },
        { title: "Evacuation Two", info: `${siteData.EADR1} \n${siteData.EADR2} \n${siteData.EADR3} \n${siteData.EPHONE}` }
      ];

      emergencyInfo.forEach((item, index) => {
        doc.setFont("helvetica", "bold");
        doc.text(item.title, index % 2 === 0 ? 14 : 120, yPos);
        doc.setFont("helvetica", "normal");
        const infoLines = safeTextSplit(item.info);
        infoLines?.forEach((line: string | string[], lineIndex: number) => {
          doc.text(line, index % 2 === 0 ? 14 : 120, yPos + 5 + (lineIndex * 5));
        });
        if (index % 2 !== 0) yPos += 30;
      });

      // Additional contact information
      yPos += 10;
      const additionalInfo = [
        { label: "Security:", value: siteData.SECURITY },
        { label: "Transportation:", value: siteData.TRANSPORT },
        { label: "Shelter-in-Place location:", value: siteData.SAFEPLACE },
      ];

      additionalInfo.forEach(item => {
        doc.setFont("helvetica", "bold");
        doc.text(`${item.label}`, 14, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`${item.value}`, 50, yPos);
        yPos += 7;
      });

      // Ambulance information
      doc.setFont("helvetica", "bold");
      doc.text("Ambulance:", 122, yPos - 7);
      doc.setFont("helvetica", "normal");
      doc.text(`${siteData.SECPHONE}`, 140, yPos - 21);
      doc.text(`${siteData.TPPHONE}`, 140, yPos - 14);
      doc.text(`${siteData.AMBPHONE}`, 140, yPos - 7);
      yPos += 10;

      // Lock down procedure and additional emergency information
      const lockInfo = [
        { label: "Lock down procedure:", value: siteData.LOCKDOWN },
        { label: "Additional Emergency Information:", value: siteData.ADDEMGINFO },
      ];

      lockInfo.forEach(item => {
        doc.setFont("helvetica", "bold");
        doc.text(`${item.label}`, 14, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`${item.value}`, 70, yPos);
        yPos += 7;
      });
    });

    addPageNumber(doc);
    setPdfBlob(doc.output('blob'));
  };

  useEffect(() => {
    if (data) {
      generatePDF();
    }
  }, [data]);

  return null;
};

export default memo(SiteEmergencyInformationPdf);
