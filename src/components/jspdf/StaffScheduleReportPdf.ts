import jsPDF from 'jspdf';
import moment from 'moment';
import { useEffect } from 'react';

interface StaffScheduleReportPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffScheduleReportPdf: React.FC<StaffScheduleReportPdfReportPDFProps> = ({ data, setPdfBlob }) => {

    // Group and sort the data by DIST_NAM and SiteName
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

    const getSiteTypeLabel = (siteType: any) => {
        switch (siteType) {
            case 1: return "Before School Programs";
            case 2: return "During School Programs";
            case 3: return "After School Programs";
            default: return "Unknown Site Type";
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF('portrait', 'mm', 'a4'); // A4 portrait
    
        const pageWidth = 210; // Total width for A4 portrait
        const pageHeight = 297; // Total height for A4 portrait
        const margin = 10; // Margin on both sides
        const usableWidth = pageWidth - margin * 2; // Usable width after subtracting margins
        const lineHeight = 4; // Line height
        const footerHeight = 15; // Space reserved for footer (date and page number)
        const fontSize = 8; // Font size for content
        let yPos = 10;  // Initial Y position
        const todayDate = moment().format('DD-MM-YYYY');
    
        // Title
        doc.setFontSize(10); // Reduced title font size
        doc.text('Staff Schedule', margin, yPos);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);  // Horizontal line under the title
        yPos += lineHeight * 1.5;
    
        // Group and sort the data
        const groupedData = groupByDistrictAndSiteType(data);
    
        // Sort by DIST_NAM
        const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));
    
        // Loop through sorted districts
        sortedDistrictKeys.forEach((district) => {
            // Print District Name (1st level)
            if (yPos > pageHeight - margin - footerHeight) {  // Reserve space for the footer
                doc.addPage();
                yPos = margin + lineHeight;  // Reset Y position on a new page
            }
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', 'bold');
            doc.text(district, margin, yPos); // No indentation for DIST_NAM
    
            const siteTypes = Object.keys(groupedData[district]);
          
            // Loop through site types for the district
            siteTypes.forEach((siteType) => {
                if (yPos > pageHeight - margin - footerHeight) {  // Reserve space for the footer
                    doc.addPage();
                    yPos = margin + lineHeight;  // Reset Y position on a new page
                }
                yPos += lineHeight;
                const siteTypeMargin = margin + 2; // Indent for Site Type
                doc.setFont('helvetica', 'bold');
                doc.text(siteType, siteTypeMargin, yPos); // Indented for site type
                yPos += lineHeight;
    
                const siteNames = Object.keys(groupedData[district][siteType]);
    
                // Loop through site names under the site type
                siteNames.forEach((siteName) => {
                    if (yPos > pageHeight - margin - footerHeight) {  // Reserve space for the footer
                        doc.addPage();
                        yPos = margin + lineHeight;  // Reset Y position on a new page
                    }
                    yPos += lineHeight;
                    doc.setFont('helvetica', 'bold');
                    const siteNameMargin = siteTypeMargin + 2; // Further indent for Site Name
                    doc.text(siteName, siteNameMargin, yPos); // Indented for site name
    
                    // Print headers for the weekdays
                    doc.setFont('helvetica', 'normal');
                    const headers = [
                        { text: 'Monday', x: margin + usableWidth * 0.42 },
                        { text: 'Tuesday', x: margin + usableWidth * 0.54 },
                        { text: 'Wednesday', x: margin + usableWidth * 0.66 },
                        { text: 'Thursday', x: margin + usableWidth * 0.78 },
                        { text: 'Friday', x: margin + usableWidth * 0.90 }
                    ];
    
                    headers.forEach((header) => {
                        doc.text(header.text, header.x, yPos);
                    });
                    yPos += lineHeight;
    
                    // Loop through staff data for the site
                    groupedData[district][siteType][siteName].forEach((staff: { FirstName: any; LastName: any; SitePos: any; MON_B: any; MON_E: any; TUE_B: any; TUE_E: any; WED_B: any; WED_E: any; THU_B: any; THU_E: any; FRI_B: any; FRI_E: any; }) => {
                        const { FirstName, LastName, SitePos, MON_B, MON_E, TUE_B, TUE_E, WED_B, WED_E, THU_B, THU_E, FRI_B, FRI_E } = staff;
    
                        // Print Staff Data, aligned with the headers
                        doc.text(`${FirstName} ${LastName}`, siteNameMargin, yPos); // Indent with site name
                        doc.text(SitePos, margin + usableWidth * 0.25, yPos); // Align with Site Position
                        doc.text(`${MON_B || ''} - ${MON_E || ''}`, margin + usableWidth * 0.42, yPos); // Align with Monday
                        doc.text(`${TUE_B || ''} - ${TUE_E || ''}`, margin + usableWidth * 0.54, yPos); // Align with Tuesday
                        doc.text(`${WED_B || ''} - ${WED_E || ''}`, margin + usableWidth * 0.66, yPos); // Align with Wednesday
                        doc.text(`${THU_B || ''} - ${THU_E || ''}`, margin + usableWidth * 0.78, yPos); // Align with Thursday
                        doc.text(`${FRI_B || ''} - ${FRI_E || ''}`, margin + usableWidth * 0.90, yPos); // Align with Friday
    
                        yPos += lineHeight;
    
                        // Page break if Y position is too close to the bottom (leaving space for the footer)
                        if (yPos > pageHeight - margin - footerHeight) {  // Reserve space for the footer
                            doc.addPage();
                            yPos = margin + lineHeight;  // Reset Y position on a new page
                        }
                    });
    
                    yPos += lineHeight;
                });
            });
        });
    
        // Add date and page number at the bottom
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(fontSize);
            doc.text(todayDate, pageWidth - margin - 40, pageHeight - margin - 2); // Date at bottom right
            doc.text(`Page ${i} of ${pageCount}`, margin, pageHeight - margin - 2); // Page number at bottom left
        }
    
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };
    

    // const generatePDF = () => {
    //     const doc = new jsPDF('portrait', 'mm', 'a4'); // A4 portrait
    
    //     const pageWidth = 210; // Total width for A4 portrait
    //     const pageHeight = 297; // Total height for A4 portrait
    //     const margin = 10; // Margin on both sides
    //     const usableWidth = pageWidth - margin * 2; // Usable width after subtracting margins
    //     const lineHeight = 4; // Reduced line height to fit more lines
    //     const fontSize = 8; // Reduced font size for more content
    //     let yPos = 10;  // Initial Y position
    //     const todayDate = moment().format('DD-MM-YYYY');
    
    //     // Title
    //     doc.setFontSize(10); // Reduced title font size
    //     doc.text('Staff Schedule', margin, yPos);
    //     doc.setLineWidth(0.5);
    //     doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);  // Horizontal line under the title
    //     yPos += lineHeight * 1.5;
    
    //     // Group and sort the data
    //     const groupedData = groupByDistrictAndSiteType(data);
    
    //     // Sort by DIST_NAM
    //     const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));
    
    //     // Loop through sorted districts
    //     sortedDistrictKeys.forEach((district) => {
    //         // Print District Name (1st level)
    //         doc.setFontSize(fontSize);
    //         doc.setFont('helvetica', 'bold');
    //         doc.text(district, margin, yPos); // No indentation for DIST_NAM
    //         // yPos += lineHeight;
    
    //         const siteTypes = Object.keys(groupedData[district]);
    
    //         // Loop through site types for the district
    //         siteTypes.forEach((siteType) => {
    //             // Print Site Type (2nd level, indented)
    //             yPos += lineHeight;
    //             // doc.setFont('helvetica', 'normal');
    //             const siteTypeMargin = margin + 2; // Indent for Site Type
    //             doc.setFont('helvetica', 'bold');
    //             doc.text(siteType, siteTypeMargin, yPos); // Indented for site type
    //             yPos += lineHeight;
    
    //             const siteNames = Object.keys(groupedData[district][siteType]);
    
    //             // Loop through site names under the site type
    //             siteNames.forEach((siteName) => {
    //                 yPos += lineHeight;
    //                 doc.setFont('helvetica', 'bold');
    //                 const siteNameMargin = siteTypeMargin + 2; // Further indent for Site Name
    //                 doc.text(siteName, siteNameMargin, yPos); // Indented for site name
    
    //                 // Print headers for the weekdays
    //                 doc.setFont('helvetica', 'normal');
    //                 const headers = [
    //                     { text: 'Monday', x: margin + usableWidth * 0.42 },
    //                     { text: 'Tuesday', x: margin + usableWidth * 0.54 },
    //                     { text: 'Wednesday', x: margin + usableWidth * 0.66 },
    //                     { text: 'Thursday', x: margin + usableWidth * 0.78 },
    //                     { text: 'Friday', x: margin + usableWidth * 0.90 }
    //                 ];
    
    //                 headers.forEach((header) => {
    //                     doc.text(header.text, header.x, yPos);
    //                 });
    //                 yPos += lineHeight;
    
    //                 // Loop through staff data for the site
    //                 groupedData[district][siteType][siteName].forEach((staff: { FirstName: any; LastName: any; SitePos: any; MON_B: any; MON_E: any; TUE_B: any; TUE_E: any; WED_B: any; WED_E: any; THU_B: any; THU_E: any; FRI_B: any; FRI_E: any; }) => {
    //                     const { FirstName, LastName, SitePos, MON_B, MON_E, TUE_B, TUE_E, WED_B, WED_E, THU_B, THU_E, FRI_B, FRI_E } = staff;
    
    //                     // Print Staff Data, aligned with the headers
    //                     doc.text(`${FirstName} ${LastName}`, siteNameMargin, yPos); // Indent with site name
    //                     doc.text(SitePos, margin + usableWidth * 0.25, yPos); // Align with Site Position
    //                     doc.text(`${MON_B || ''} - ${MON_E || ''}`, margin + usableWidth * 0.42, yPos); // Align with Monday
    //                     doc.text(`${TUE_B || ''} - ${TUE_E || ''}`, margin + usableWidth * 0.54, yPos); // Align with Tuesday
    //                     doc.text(`${WED_B || ''} - ${WED_E || ''}`, margin + usableWidth * 0.66, yPos); // Align with Wednesday
    //                     doc.text(`${THU_B || ''} - ${THU_E || ''}`, margin + usableWidth * 0.78, yPos); // Align with Thursday
    //                     doc.text(`${FRI_B || ''} - ${FRI_E || ''}`, margin + usableWidth * 0.90, yPos); // Align with Friday
    
    //                     yPos += lineHeight;
    
    //                     // Page break if Y position is too close to the bottom
    //                     if (yPos > pageHeight - margin * 2) {
    //                         doc.addPage();
    //                         yPos = margin + lineHeight;  // Reset Y position on a new page
    //                     }
    //                 });
    //                 yPos += lineHeight;
    //             });
    //         });
    //     });
    
    //     // Add date and page number at the bottom
    //     const pageCount = doc.getNumberOfPages();
    //     for (let i = 1; i <= pageCount; i++) {
    //         doc.setPage(i);
    //         doc.setFontSize(fontSize);
    //         doc.text(todayDate, pageWidth - margin - 40, pageHeight - margin); // Date at bottom right
    //         doc.text(`Page ${i} of ${pageCount}`, margin, pageHeight - margin); // Page number at bottom left
    //     }
    
    //     const pdfBlob = doc.output('blob');
    //     setPdfBlob(pdfBlob);
    // };
    

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything, it just generates the PDF
};

export default StaffScheduleReportPdf;
