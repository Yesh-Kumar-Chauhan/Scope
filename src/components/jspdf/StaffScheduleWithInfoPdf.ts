import jsPDF from 'jspdf';
import moment from 'moment';
import { useEffect } from 'react';

interface StaffScheduleWithInfoPdfReportPDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffScheduleWithInfoPdf: React.FC<StaffScheduleWithInfoPdfReportPDFProps> = ({ data, setPdfBlob }) => {
    const footerHeight = 15; // Height reserved at the bottom for the footer

    const groupByDistrictSiteTypeAndSiteName = (data: any[]) => {
        return data.reduce((acc, item) => {
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
    };

    const getSiteTypeLabel = (siteType: any) => {
        switch (siteType) {
            case 1: return "Before School Programs";
            case 2: return "During School Programs";
            case 3: return "After School Programs";
            default: return "";
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        const todayDate = moment().format('DD-MM-YYYY');

        // Title
        doc.setFontSize(14);
        doc.text('Staff Schedule', 14, 20);

        // Group the data by district and site type
        const groupedData = groupByDistrictSiteTypeAndSiteName(data);
        let lastDistrictName = '';

        let yPos = 35;  // Initial Y position
        const rowHeight = 5;

        // Sort grouped data by DIST_NAM and SiteName
        const sortedDistrictKeys = Object.keys(groupedData).sort((a, b) => {
            const [distA] = a.split('-');
            const [distB] = b.split('-');
            return distA.localeCompare(distB);
        });

        sortedDistrictKeys.forEach((districtKey) => {
            const group = groupedData[districtKey];
            const sortedSiteKeys = Object.keys(group.sites).sort((a, b) => a.localeCompare(b));

            // Print District Name if it hasn't been printed
            if (lastDistrictName !== group.DIST_NAM) {
                lastDistrictName = group.DIST_NAM;
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.text(group.DIST_NAM, 14, yPos);  // Bold DIST_NAM
                yPos += rowHeight;
            }

            // Print Site Type (bold and indented)
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(getSiteTypeLabel(group.SiteType), 16, yPos);
            yPos += rowHeight;

            sortedSiteKeys.forEach((siteKey) => {
                const siteGroup = group.sites[siteKey];

                // Print Site Name (bold and indented)
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(8);
                doc.text(`${siteGroup.SiteName}`, 18, yPos);

                // Table Header
                doc.setFont('helvetica', 'normal');  // Reset font to normal
                const headers = [
                    { text: ``, x: 18 },
                    { text: '', x: 62 },
                    { text: 'MAT Expiration', x: 90 },
                    { text: 'Left Alone', x: 120 },
                    { text: 'Monday', x: 150 },
                    { text: 'Tuesday', x: 180 },
                    { text: 'Wednesday', x: 210 },
                    { text: 'Thursday', x: 240 },
                    { text: 'Friday', x: 270 }
                ];

                headers.forEach((header) => {
                    doc.text(header.text, header.x, yPos);
                });
                yPos += rowHeight;

                // Loop through staff data for the site
                const sortedStaffItems = siteGroup.items.sort((a: { LastName: string; }, b: { LastName: any; }) => a.LastName.localeCompare(b.LastName));

                // Loop through staff data for the site
                sortedStaffItems.forEach((staff: { FirstName: any; LastName: any; SitePos: any; MATDATE: any; AloneWithChildren: any; MON_B: any; MON_E: any; TUE_B: any; TUE_E: any; WED_B: any; WED_E: any; THU_B: any; THU_E: any; FRI_B: any; FRI_E: any; }) => {
                    const { FirstName, LastName, SitePos, MATDATE, AloneWithChildren, MON_B, MON_E, TUE_B, TUE_E, WED_B, WED_E, THU_B, THU_E, FRI_B, FRI_E } = staff;

                    // Print Staff Data, aligned with the headers
                    doc.text(`${LastName} ${FirstName}`, 18, yPos); // Align with Site Name
                    doc.text(SitePos, 62, yPos); // Align with Site Position
                    doc.text(MATDATE ? moment(MATDATE).format('MM/DD/YYYY') : '', 90, yPos);
                    doc.text(AloneWithChildren == true ? 'Yes' : 'No', 120, yPos);
                    doc.text(`${MON_B || ''} - ${MON_E || ''}`, 150, yPos); // Align with Monday
                    doc.text(`${TUE_B || ''} - ${TUE_E || ''}`, 180, yPos); // Align with Tuesday
                    doc.text(`${WED_B || ''} - ${WED_E || ''}`, 210, yPos); // Align with Wednesday
                    doc.text(`${THU_B || ''} - ${THU_E || ''}`, 240, yPos); // Align with Thursday
                    doc.text(`${FRI_B || ''} - ${FRI_E || ''}`, 270, yPos); // Align with Friday

                    // Move to the next row
                    yPos += rowHeight;

                    // Check if we're too close to the bottom and need a new page
                    if (yPos > 190 - footerHeight) { // Adjust based on reserved footer space
                        doc.addPage();
                        yPos = 35;  // Reset Y position on a new page
                    }
                });
                yPos += rowHeight;
            });
        });

        // Add date and page number at the bottom, ensuring it doesn't overlap with the content
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(todayDate, 260, doc.internal.pageSize.height - 10); // Adjust for bottom margin
            doc.text(`Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10); // Adjust for bottom margin
        }

        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything, it just generates the PDF
};

export default StaffScheduleWithInfoPdf;
