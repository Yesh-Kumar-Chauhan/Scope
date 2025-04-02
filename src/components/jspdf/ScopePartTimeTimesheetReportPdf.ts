import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
import autoTable from 'jspdf-autotable';
interface ScopePartTimeTimesheetReportPdf {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}


const ScopePartTimeTimesheetReportPdf: React.FC<ScopePartTimeTimesheetReportPdf> = ({ data, setPdfBlob }) => {
    const generatePDF = (groupedByPersonID: any) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });

        const pageWidth = doc.internal.pageSize.width + 40;
        const margin = 14;

        Object.keys(groupedByPersonID).forEach((personID, personIndex) => {
            const siteData = groupedByPersonID[personID];

            // Loop through each SiteID under the PersonID
            Object.keys(siteData).forEach((siteID, siteIndex) => {
                const siteEmployees = siteData[siteID];
                siteEmployees.forEach((item: any, employeeIndex: any) => {
            let y = margin;

            const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
                doc.setLineWidth(0.3);
                doc.line(x1, y1, x2, y2);
            };
            doc.setFont("helvetica", "normal");
            doc.setFontSize(18);
            // Title
            doc.text("SCOPE Part Time - Time Sheet", margin, y);
            y += 8;

            doc.setFontSize(12);

            doc.text("Name:", margin, y);
            doc.text(`${item.LASTNAME}, ${item.FIRSTNAME} `, margin + 20, y);
            doc.text("Position:", pageWidth / 2, y);
            doc.text(item.Position || "", pageWidth / 2 + 30, y); // Use dynamic data
            y += 6; // Smaller gap for the next line

            doc.setTextColor(0, 0, 0);
            doc.text("District:", margin, y);
            doc.text(item.DistName || "", margin + 20, y); // Use dynamic data
            doc.text("Budget Code:", pageWidth / 2, y);
            doc.text(String(item.DistNumber) || "", pageWidth / 2 + 30, y); // Use dynamic data
            y += 6; // Smaller gap

            doc.text("Building:", margin, y);
            doc.text("", margin + 20, y);
            doc.text("Program:", pageWidth / 2, y);
            doc.text(item?.SiteName || "", pageWidth / 2 + 30, y); // Use dynamic data
            y += 6;

            doc.text("Schedule:", margin, y);
            doc.setFontSize(10);
            doc.text(item?.Schedule || "", margin + 20, y); // Use dynamic data
            doc.setFontSize(12);
            doc.text("Multi-Site Directors:", pageWidth / 2, y);
            doc.text(item?.Directors || "", pageWidth / 2 + 40, y); // Use dynamic data
            y += 6;

            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            doc.text("IMPORTANT NOTE:", margin, y);
            doc.setFont("helvetica", "normal");
            doc.text("You may be assigned additional hours or a location change which you must accommodate", margin + 40, y);
            y += 5;
            doc.text("in order to meet legally required staff to student ratio.", margin, y);
            doc.setTextColor(0, 0, 0);
            y += 10;


            const programHours = [
                ['Mon', '', '', '', '', '', ''],
                ['Tue', '', '', '', '', '', ''],
                ['Wed', '', '', '', '', '', ''],
                ['Thu', '', '', '', '', '', ''],
                ['Fri', '', '', '', '', '', ''],
                ['Mon', '', '', '', '', '', ''],
                ['Tue', '', '', '', '', '', ''],
                ['Wed', '', '', '', '', '', ''],
                ['Thu', '', '', '', '', '', ''],
                ['Fri', '', '', '', '', '', ''],
            ];

            const additionalHours = [
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
            ];
            autoTable(doc, {
                startY: y + 1,
                head: [['', 'Date', 'In', 'Out', 'Lunch In', 'Lunch Out', '#Hours']],
                body: programHours,
                theme: 'grid',
                margin: { right: 150 }, // Adjust as needed
                styles: {
                    fontSize: 8,
                    cellPadding: 1,
                    lineColor: 20,
                    lineWidth: 0.1,
                },
                headStyles: {
                    fontStyle: 'normal',
                    textColor: 0,
                    fillColor: false,
                },
            });
            doc.text("Program Hours", margin + 50, y - 4);
            doc.text("Additional Hours ", margin + 170, y - 5);
            doc.setFontSize(10);
            doc.text(`Maximum Weekly Program Hours ${String(item.Max_Hours ? item.Max_Hours : 0)}`, margin + 40, y);
            doc.text("(0.50 pre-approved inservices & late pick-up)", margin + 160, y);
            doc.setFontSize(12);
            autoTable(doc, {
                startY: y + 1,
                head: [['Date', 'Start', 'Stop', 'Explanation/Location', 'Code', '#Hours']],
                body: additionalHours,
                theme: 'grid',
                margin: { left: 150 }, // Adjust as needed
                styles: {
                    fontSize: 8,
                    cellPadding: 1,
                    lineColor: 40,
                    lineWidth: 0.1,
                },
                headStyles: {
                    fontStyle: 'normal',
                    textColor: 0,
                    fillColor: false,
                },
            });
            doc.setFontSize(10);
            doc.text("Program Hours:", margin + 60, y + 65);
            drawLine(margin + 90, y + 67, margin + 130, y + 67);

            doc.text("Total Absences:", margin, y + 75);
            drawLine(margin + 30, y + 75, margin + 70, y + 75);
            doc.text("Total Lateness:", margin + 80, y + 75);
            drawLine(margin + 110, y + 75, margin + 150, y + 75);

            doc.text("Total Left Early:", margin + 160, y + 75);
            drawLine(margin + 190, y + 75, margin + 230, y + 75);
            doc.text("I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated", margin, y + 85);

            y += 105; // Adjust this value as needed to position the new elements correctly

            // Employee Signature lines
            doc.setFontSize(10);
            doc.text("Employee Signature:", margin, y);
            drawLine(margin + 40, y, margin + 70, y);
            doc.text("Date:", margin + 100, y);
            drawLine(margin + 115, y, margin + 155, y);

            y += 10; // Space between signature lines

            doc.text("Employee Signature:", margin, y);
            drawLine(margin + 40, y, margin + 70, y);
            doc.text("Date:", margin + 100, y);
            drawLine(margin + 115, y, margin + 155, y);

            // SCOPE Office box
            doc.rect(margin + 160, y - 15, 20, 20);
            doc.text("SCOPE Office:", margin + 160, y - 20);

            // Additional Hours, Program Hours, Total Hours
            y -= 5; // Adjust vertical position
            doc.text("Additional Hours:", margin + 190, y - 10);
            drawLine(margin + 220, y - 10, margin + 255, y - 10);

            y += 10;
            doc.text("Program Hours:", margin + 190, y - 10);
            drawLine(margin + 220, y - 10, margin + 255, y - 10);


            y += 10;
            doc.text("Total Hours:", margin + 190, y - 10);
            drawLine(margin + 220, y - 10, margin + 255, y - 10);

            // Add page numbers
            if (
                employeeIndex < siteEmployees.length - 1 ||
                siteIndex < Object.keys(siteData).length - 1 ||
                personIndex < Object.keys(groupedByPersonID).length - 1
            ) {
                doc.addPage();
            }
        });
    });
});
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            const groupedByPersonID = data.reduce(
                (acc: { [personID: string]: { [siteID: string]: any[] } }, item: { PersonID: string; SiteID: string }) => {
                    const personID = item.PersonID;
                    const siteID = item.SiteID;

                    // Initialize the grouping for this PersonID if it doesn't exist
                    if (!acc[personID]) {
                        acc[personID] = {};
                    }

                    // Initialize the grouping for this SiteID within the PersonID if it doesn't exist
                    if (!acc[personID][siteID]) {
                        acc[personID][siteID] = [];
                    }

                    // Add the item to the appropriate group
                    acc[personID][siteID].push(item);

                    return acc;
                },
                {} // Initial value for the accumulator
            );
            generatePDF(groupedByPersonID);
        }
    }, [data]);

    return null;
};

export default memo(ScopePartTimeTimesheetReportPdf);