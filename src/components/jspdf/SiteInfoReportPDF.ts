import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
const SiteInfoReportPDF = ({ data, setPdfBlob }: { data: any, setPdfBlob: any }) => {
    const todayDate = moment().format('MM-DD-YYYY');

    // data = data.slice(0, 500)

    // Group and sort the data by DIST_NAM and SITE_NAM
    const groupByDistrict = (data: any) => {
        const grouped = data.reduce((acc: any, item: any) => {
            const key = item.DIST_NAM;
            if (!acc[key]) {
                acc[key] = {
                    DIST_NAM: item.DIST_NAM,
                    items: []
                };
            }
            acc[key].items.push(item);
            return acc;
        }, {});

        // Sort districts alphabetically
        const sortedDistricts = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

        // Return sorted data with sorted site names within each district
        return sortedDistricts.map(districtKey => {
            const district = grouped[districtKey];
            district.items = groupBySiteName(district.items); // Sort site names within each district
            return district;
        });
    };

    const groupBySiteName = (items: any[]) => {
        const grouped = items.reduce((acc, item) => {
            const key = item.SITE_NAM;
            if (!acc[key]) {
                acc[key] = {
                    SITE_NAM: item.SITE_NAM,
                    siteItems: [],
                };
            }
            acc[key].siteItems.push(item);
            return acc;
        }, {});

        // Sort site names alphabetically
        return Object.keys(grouped).sort((a, b) => a.localeCompare(b)).map(siteKey => grouped[siteKey]);
    };

    const generatePDF = () => {
        let index = 0;
        try {
            const doc = new jsPDF('portrait', 'mm', 'a4');
            const pageWidth = 210; // A4 width
            const pageHeight = 297; // A4 height
            const margin = 10;
            const usableWidth = pageWidth - 2 * margin;
            const lineHeight = 5;
            let yPos = 20; // Initial vertical position for content

            const groupedData: any = groupByDistrict(data); // Grouping data by district
            const rowHeight = 30;  // Height for each row (increased a bit for content)

            const checkPageEnd = (currentYPos: number, additionalHeight = 0) => {
                if (currentYPos + additionalHeight + rowHeight >= pageHeight - margin * 2) {
                    doc.addPage();
                    return margin + lineHeight; // Reset Y position for new page
                }
                return currentYPos;
            };

            groupedData.forEach((district: any) => {
                const { items, DIST_NAM } = district;

                console.log('district', district);
                // Title
                doc.setFontSize(16);
                yPos = checkPageEnd(yPos);
                doc.text('Site Information', 14, yPos);

                // Horizontal line below the title (HR-like line)
                yPos += 5
                doc.setLineWidth(0.5); // Set the thickness of the line
                doc.line(14, yPos, 200, yPos); // Draw the line (X1, Y1, X2, Y2)

                // District and Program Info
                doc.setFontSize(8);

                // District and Program on separate lines
                yPos += 5
                doc.text(`District: ${items[0]?.siteItems[0]?.DIST_NUM} ${items[0]?.siteItems[0]?.DIST_NAM}`, 14, yPos);


                items.forEach((site: any) => {
                    const { siteItems, SITE_NAM } = site;

                    yPos += 5
                    doc.text(`Program: ${siteItems[0]?.SITE_NUM} ${siteItems[0]?.SITE_NAM}`, 14, yPos);

                    // Hours and Permit# on the same line
                    yPos += 5
                    doc.text(`Hours: ${siteItems[0]?.START_TIME} - ${siteItems[0]?.STOP_TIME}`, 14, yPos);
                    doc.text(`Permit#: ${siteItems[0]?.PERMIT}`, 125, yPos);

                    // Start Date and siteItems Liaison# on the same line
                    const startDate = siteItems[0]?.START_DATE ? moment(siteItems[0]?.START_DATE).format('MM-DD-YYYY') : '';
                    yPos += 5
                    doc.text(`Start: ${startDate}`, 14, yPos);
                    doc.text(`District Liaison#: ${siteItems[0]?.LIAISON}`, 125, yPos);

                    // Scope Email and Address
                    yPos += 5
                    doc.text(`Scope Email: ${siteItems[0]?.ScopeEmail}`, 14, yPos);
                    yPos += 5
                    doc.text(`${siteItems[0]?.ADDR1}`, 40, yPos);
                    yPos += 5
                    doc.text(`${siteItems[0]?.ADDR2}`, 40, yPos);
                    yPos += 5
                    doc.text(`${siteItems[0]?.ADDR3}`, 40, yPos);
                    doc.text(`Principal Name: ${siteItems[0]?.PRINCIPAL}`, 125, yPos - 15);
                    doc.text(`Principal Email: ${siteItems[0]?.PRINCIPAL}`, 125, yPos - 10);

                    // School Phone and Fax
                    yPos += 5
                    doc.text(`School Phone:  ${siteItems[0]?.SCHFONE}`, 14, yPos);
                    doc.text(`School Fax: ${siteItems[0]?.SFAX}`, 125, yPos);

                    // Emergency Department, Fire Department, and Police Department - All on one row
                    doc.setFontSize(8);
                    yPos += 10
                    doc.setFont('helvetica', 'bold');
                    doc.text('Emergency Department', 14, yPos);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    yPos += 5
                    doc.text(`${siteItems[0]?.EADR1}`, 14, yPos);
                    yPos += 5
                    doc.text(`${siteItems[0]?.EADR2}`, 14, yPos);
                    yPos += 5
                    doc.text(`${siteItems[0]?.EADR3} ${siteItems[0]?.PHONE}`, 14, yPos);

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Fire Department', 80, yPos - 15);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    doc.text(`${siteItems[0]?.FADR1}`, 80, yPos - 10);
                    doc.text(`${siteItems[0]?.FADR2}`, 80, yPos - 5);
                    doc.text(`${siteItems[0]?.FADR3} ${siteItems[0]?.FPHONE}`, 80, yPos);

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Police Department', 150, yPos - 15);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    doc.text(`${siteItems[0]?.PADR1}`, 150, yPos - 10);
                    doc.text(`${siteItems[0]?.PADR2}`, 150, yPos - 5);
                    doc.text(`${siteItems[0]?.PADR3} ${siteItems[0]?.PPHONE}`, 150, yPos);

                    doc.setFontSize(8);
                    // doc.setFont('normal');

                    // New Section: Scope Cell Phone and Fees
                    doc.setFontSize(8);
                    yPos += 20
                    // Scope Cell Phone and Fees header
                    doc.text('Scope Cell Phone:', 14, yPos);
                    doc.text(`${siteItems[0]?.PHONE}`, 50, yPos);

                    // Fees section: Full, Min, Daily, AM/PM headers
                    doc.text('Fees:', 90, yPos);
                    doc.text('Full', 110, yPos - 5);
                    doc.text('Min', 130, yPos - 5);
                    doc.text('Daily', 150, yPos - 5);
                    doc.text('AM/PM', 170, yPos - 5);

                    // Fees section values
                    doc.text(`${siteItems[0]?.FULL}`, 110, yPos); // Full
                    doc.text(`${siteItems[0]?.MIN}`, 130, yPos);  // Min
                    doc.text(`${siteItems[0]?.DAILY}`, 150, yPos);  // Daily
                    doc.text(`${siteItems[0]?.AMPM}`, 170, yPos);  // AM/PM



                    // New Section: Approved Spaces, Space Capacity, Additional Approved Spaces, Space Capacity
                    doc.setFontSize(8);
                    yPos += 10
                    doc.setFont('helvetica', 'bold');
                    doc.text('Approved Spaces', 14, yPos); // Title for Approved Spaces
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    yPos += 5
                    doc.text(`${siteItems[0]?.ROOM_NO}`, 14, yPos);
                    yPos += 5 // Room 1
                    doc.text(`${siteItems[0]?.ROOM_NO2}`, 14, yPos);
                    yPos += 5  // Room 2
                    doc.text(`${siteItems[0]?.ROOM_NO3}`, 14, yPos);
                    yPos += 5 // Room 3
                    doc.text(`${siteItems[0]?.ROOM_NO4}`, 14, yPos);  // Room 4

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Space Capacity', 60, yPos - 20);  // Title for Space Capacity
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    doc.text(`${siteItems[0]?.CAP1}`, 60, yPos - 15);  // Capacity 1
                    doc.text(`${siteItems[0]?.CAP2}`, 60, yPos - 10);  // Capacity 2
                    doc.text(`${siteItems[0]?.CAP3}`, 60, yPos - 5);  // Capacity 3
                    doc.text(`${siteItems[0]?.CAP4}`, 60, yPos);  // Capacity 4

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Additional Approved Spaces', 100, yPos - 20);  // Title for Additional Approved Spaces
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    doc.text(`${siteItems[0]?.ADDLOC}`, 100, yPos - 15);  // Additional location 1
                    doc.text(`${siteItems[0]?.ADDLOC2}`, 100, yPos - 10);  // Additional location 2
                    doc.text(`${siteItems[0]?.ADDLOC3}`, 100, yPos - 5);  // Additional location 3
                    doc.text(`${siteItems[0]?.ADDLOC4}`, 100, yPos);  // Additional location 4

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('Space Capacity', 160, yPos - 20);  // Title for the second Space Capacity
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    doc.text(`${siteItems[0]?.ASCAP1}`, 160, yPos - 15);  // Second capacity 1
                    doc.text(`${siteItems[0]?.ASCAP2}`, 160, yPos - 10);  // Second capacity 2
                    doc.text(`${siteItems[0]?.ASCAP3}`, 160, yPos - 5);  // Second capacity 3
                    doc.text(`${siteItems[0]?.ASCAP4}`, 160, yPos);  // Second capacity 4

                    // License Capacity and Phone Type
                    yPos = checkPageEnd(yPos); // Check if new page is needed
                    yPos += 10
                    doc.text('License Capacity:', 14, yPos);
                    doc.text(`${siteItems[0]?.CAPACTIY}`, 60, yPos);
                    doc.text('Phone Type:', 100, yPos);
                    doc.text(`${siteItems[0]?.PHONE_TYPE}`, 140, yPos);

                    // Grade and Scope Available
                    yPos += 5;
                    yPos = checkPageEnd(yPos);
                    doc.text('Grade:', 14, yPos);
                    doc.text(`${siteItems[0]?.GRADE_LVLS}`, 60, yPos);
                    doc.text('Scope Available:', 100, yPos);
                    doc.text(`${siteItems[0]?.TIME_AVAIL}`, 140, yPos);

                    // OCFS Phone and OCFS Rep
                    yPos += 5;
                    yPos = checkPageEnd(yPos);
                    doc.text('OCFS Phone:', 14, yPos);
                    doc.text(`${siteItems[0]?.DSS_FON}`, 60, yPos);
                    doc.text('OCFS Rep:', 100, yPos);
                    doc.text(`${siteItems[0]?.DSS_REP}`, 140, yPos);

                    // Transport Phone and Transport
                    yPos += 5;
                    yPos = checkPageEnd(yPos);
                    doc.text('Transport Phone:', 14, yPos);
                    doc.text(`${siteItems[0]?.TPPHONE}`, 60, yPos);
                    doc.text('Transport:', 100, yPos);
                    doc.text(`${siteItems[0]?.TRANSPORT}`, 140, yPos);

                    // District Manager and Registrar
                    yPos += 5;
                    yPos = checkPageEnd(yPos);
                    doc.text('District Manager:', 14, yPos);
                    doc.text(`${siteItems[0]?.FieldSupervisorName}`, 60, yPos);
                    doc.text('Registrar:', 100, yPos);
                    doc.text(`${siteItems[0]?.RegistarName}`, 140, yPos);

                    // Scope Field Trainer and Account Billing
                    yPos += 5;
                    yPos = checkPageEnd(yPos);
                    doc.text('Scope Field Trainer:', 14, yPos);
                    doc.text(`${siteItems[0]?.FieldTrainerName}`, 60, yPos);
                    doc.text('Account Billing:', 100, yPos);
                    doc.text(`${siteItems[0]?.AccountBillingName}`, 140, yPos);

                    // HCC (Health Care Consultant)
                    yPos += 5;
                    yPos = checkPageEnd(yPos);
                    doc.text('HCC:', 14, yPos);
                    doc.text(`${siteItems[0]?.HealthCareConsultantName}`, 60, yPos);

                    // Notes Section
                    yPos += 10; // Adjust Y position after the previous section
                    yPos = checkPageEnd(yPos); // Check if a new page is needed


                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(8);
                    doc.text('Notes:', 14, yPos);
                    doc.setFont('helvetica', 'normal');

                    yPos += 5;
                    doc.setFontSize(8);

                    if (siteItems && siteItems.length > 0) {
                        siteItems.forEach((x: any) => {
                            if (x.NOTES) {
                                yPos = checkPageEnd(yPos);
                                doc.text(x.NOTES, 14, yPos);
                                yPos += 5;
                            }
                        });
                    }

                    // Staff List Section
                    yPos += 20; // Adjust Y position after the Notes section
                    yPos = checkPageEnd(yPos); // Check if a new page is needed

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(8);
                    doc.text('Staff List:', 14, yPos);
                    doc.setFont('helvetica', 'normal');

                    yPos += 5;
                    doc.setFontSize(8);

                    const columnWidths = [45, 50, 50, 45];  // Adjusted column widths to fit page width
                    const marginLeft = 14;  // Left margin of the document

                    if (siteItems && siteItems.length > 0) {
                        siteItems.forEach((x: any) => {
                            yPos = checkPageEnd(yPos); // Ensure page break if necessary

                            // Define X positions for each column
                            const column1X = marginLeft;
                            const column2X = column1X + columnWidths[0];
                            const column3X = column2X + columnWidths[1];
                            const column4X = column3X + columnWidths[2];

                            // Draw the borders for each row
                            // Row Borders
                            doc.rect(column1X, yPos, columnWidths[0], rowHeight); // First column
                            doc.rect(column2X, yPos, columnWidths[1], rowHeight); // Second column
                            doc.rect(column3X, yPos, columnWidths[2], rowHeight); // Third column
                            doc.rect(column4X, yPos, columnWidths[3], rowHeight); // Fourth column

                            // First Column (Staff Details)
                            doc.text(`${x.FIRSTNAME} ${x.LASTNAME}`, column1X + 2, yPos + 5);
                            doc.text(x.SitePos ? x.SitePos : '', column1X + 2, yPos + 10);
                            doc.text(x.STREET ? x.STREET : '', column1X + 2, yPos + 15);
                            doc.text(`${x.CITY}, ${x.STATE}, ${x.ZIPCODE}`, column1X + 2, yPos + 20);

                            // Second Column (Phones)
                            doc.text('Home:', column2X + 2, yPos + 5);
                            doc.text(`${x.HOMEPHONE}`, column2X + 20, yPos + 5);
                            doc.text('Work:', column2X + 2, yPos + 10);
                            doc.text(`${x.WORKPHONE}`, column2X + 20, yPos + 10);
                            doc.text('Other:', column2X + 2, yPos + 15);
                            doc.text(`${x.OTHERPHONE}`, column2X + 20, yPos + 15);
                            doc.text('NYSID#:', column2X + 2, yPos + 20);
                            doc.text(`${x.NYSID}`, column2X + 20, yPos + 20);
                            doc.text('A. W. Children:', column2X + 2, yPos + 25);
                            doc.text(`${x.AloneWithChildren ? 'YES' : 'NO'}`, column2X + 30, yPos + 25);

                            // Third Column (Expiration Dates)
                            doc.text('Fingerprint:', column3X + 2, yPos + 5);
                            doc.text(`${x.STATE_FPR ? moment(x.STATE_FPR).format('MM-DD-YYYY') : ''}`, column3X + 30, yPos + 5);
                            doc.text('Medical:', column3X + 2, yPos + 10);
                            doc.text(`${x.MEDICALEXP ? moment(x.MEDICALEXP).format('MM-DD-YYYY') : ''}`, column3X + 30, yPos + 10);
                            doc.text('Foundations:', column3X + 2, yPos + 15);
                            doc.text(`${x.Foundations ? moment(x.Foundations).format('MM-DD-YYYY') : ''}`, column3X + 30, yPos + 15);
                            doc.text('CPR Expires:', column3X + 2, yPos + 20);
                            doc.text(`${x.CPR ? moment(x.CPR).format('MM-DD-YYYY') : ''}`, column3X + 30, yPos + 20);
                            doc.text('F. A. Expires:', column3X + 2, yPos + 25);
                            doc.text(`${x.FIRSTAID ? moment(x.FIRSTAID).format('MM-DD-YYYY') : ''}`, column3X + 30, yPos + 25);

                            // Fourth Column (Other Expirations)
                            doc.text('Mat Expires:', column4X + 2, yPos + 5);
                            doc.text(`${x.MATDATE ? moment(x.MATDATE).format('MM-DD-YYYY') : ''}`, column4X + 25, yPos + 5);
                            doc.text('ACES:', column4X + 2, yPos + 10);
                            doc.text(`${x.ACES ? moment(x.ACES).format('MM-DD-YYYY') : ''}`, column4X + 25, yPos + 10);
                            doc.text('E. Law:', column4X + 2, yPos + 15);
                            doc.text(`${x.ELaw ? moment(x.ELaw).format('MM-DD-YYYY') : ''}`, column4X + 25, yPos + 15);

                            // Increase yPos for the next staff member and ensure a page break if needed
                            yPos += rowHeight;  // Adding space between rows
                        });
                    }

                    doc.addPage();
                    yPos = 20;
                })
            });


            // Add page numbers and date at the bottom
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(todayDate, pageWidth - margin - 40, pageHeight - margin - 2); // Date at bottom right
                doc.text(`Page ${i} of ${pageCount}`, margin, pageHeight - margin - 2); // Page number at bottom left
            }

            const pdfBlob = doc.output('blob');
            setPdfBlob(pdfBlob);
        } catch (error) {
            console.log('site info error at index : ', index);
            console.log('site info error at index and data: ', data);
            console.log('site info error', error);
        }

    };





    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything, it just generates the PDF
};

export default memo(SiteInfoReportPDF);
