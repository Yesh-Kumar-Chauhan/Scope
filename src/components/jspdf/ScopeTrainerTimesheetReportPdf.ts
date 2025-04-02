import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
import autoTable from 'jspdf-autotable';
interface ScopeTrainerTimesheetReportPdf {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}


const ScopeTrainerTimesheetReportPdf: React.FC<ScopeTrainerTimesheetReportPdf> = ({ data, setPdfBlob }) => {
    const generatePDF = (groupedByPersonID: any) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });
        Object.keys(groupedByPersonID).forEach((personID, personIndex) => {
            const siteData = groupedByPersonID[personID];

            // Loop through each SiteID under the PersonID
            Object.keys(siteData).forEach((siteID, siteIndex) => {
                const siteEmployees = siteData[siteID];
                siteEmployees.forEach((item: any, employeeIndex: any) => {
                    const pageWidth = doc.internal.pageSize.width + 40;
                    const pageWidth1 = doc.internal.pageSize.width - 40; // Adjust width for margin
                    const pageHeight = doc.internal.pageSize.height - 20; // Adjust height for margin
                    const margin = 10;
                    let y = margin;

                    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
                        doc.setLineWidth(0.3);
                        doc.line(x1, y1, x2, y2);
                    };
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(18);
                    // Title
                    doc.text("SCOPE Trainer - Time Sheet", margin, y);
                    y += 8;

                    doc.setFontSize(12);

                    doc.text("Name:", margin, y);
                    doc.text(`${item.LASTNAME}, ${item.FIRSTNAME}`, margin + 20, y);
                    doc.text("Position:", pageWidth / 2, y);
                    doc.text(`${item.Position}`, pageWidth / 2 + 30, y);
                    y += 6; // Smaller gap for the next line

                    // doc.text("District:", margin, y);
                    // doc.text(`${item.DIST_NAM}`, margin + 20, y);
                    doc.text("Max Hours:", margin, y);
                    doc.text(`${String(item.Max_Hours ? item.Max_Hours : 0)} a week`, margin + 22, y);
                    doc.text("Budget Code:", pageWidth / 2, y);
                    doc.text(String(item.DistNumber) || "", pageWidth / 2 + 30, y); // Use dynamic data
                    y += 6; // Smaller gap

                    // doc.text("Program:", pageWidth / 2, y);
                    // doc.text(`${item.SITE_NAM}`, pageWidth / 2 + 30, y);
                    // y += 6;

                    doc.text("Schedule:", margin, y);
                    doc.text(`${item?.Schedule ? item?.Schedule : ''}`, margin + 20, y);
                    y += 6;
                    doc.text("Comment:", margin, y);

                    // doc.setFontSize(12);
                    // doc.setFont("helvetica", "normal");
                    // doc.text("IMPORTANT NOTE:", margin, y+5);
                    // doc.setFont("helvetica", "normal");
                    // doc.text("You may be assigned additional hours or a location change which you must accommodate in order to meet legally ", margin + 40, y+5);
                    // doc.text("required staff to student ratio.", margin + 40, y+10);
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
                        startY: y + 14,
                        head: [['', 'Date', 'In', 'Out', 'Lunch In', 'Lunch Out', '#Hours']],
                        body: programHours,
                        theme: 'grid',
                        margin: { right: 150 }, // Adjust as needed
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
                    doc.setFont("helvetica", "bold");
                    doc.text("Program Hours", margin + 50, y + 8);
                    doc.text("Additional Hours", margin + 170, y + 8);
                    doc.setFontSize(10);
                    doc.text(`Maximum Weekly Program Hours ${String(item.Max_Hours ? item.Max_Hours : 0)}`, margin + 40, y + 12);
                    doc.text("(0.50 pre-approved inservices & late pick-up)", margin + 160, y + 12);
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(12);
                    autoTable(doc, {
                        startY: y + 14,
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
                    addBottomTable(doc);
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
    const addBottomTable = (doc: jsPDF) => {
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        let y = pageHeight - 60; // Adjust this value to position the table correctly

        // Left side of the table
        const leftTableBody = [
            ['For documenting time not at work indicate', ''],
            ['Sick (Personal Illness or Immediate Family)', 'Jury Duty'],
            ['Personal Business', 'Bereavement (Indicate Relationship)'],
            ['School Closed (as Indicated on Calendar)', 'Emergency Closing\n(Snow Days, other authorized emergencies)']
        ];

        autoTable(doc, {
            startY: y - 10,
            body: leftTableBody,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 1,
                lineColor: 40,
                lineWidth: 0.1,
                halign: 'left',
            },
            columnStyles: {
                0: { cellWidth: 70 },
                1: { cellWidth: 70 },
            },
            didParseCell: (data: any) => {
                // Merge cells for the first row
                if (data.row.index === 0) {
                    if (data.column.index === 0) {
                        // Set the text for the merged cell
                        data.cell.text[0] = leftTableBody[0][0]; // Text for the merged cell
                        data.cell.styles.halign = 'center'; // Center the text
                        // Set the rowSpan for merging effect
                        data.cell.styles.rowSpan = 1; // Keep as 1
                        data.cell.styles.colSpan = 2; // Span across both columns
                    } else if (data.column.index === 1) {
                        // Hide the second cell's text for the first row
                        data.cell.text[0] = ''; // Clear the text
                        data.cell.styles.cellWidth = 0; // Set width to 0 to avoid visual space
                    }
                }
            },
        });

        const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
            doc.setLineWidth(0.3);
            doc.line(x1, y1, x2, y2);
        };
        // Add "Total:" text above tables
        doc.setFontSize(10);
        doc.text('Total:', 100, y - 15);
        drawLine(margin + 105, y - 15, margin + 135, y - 15);
        doc.text('Total:', 230, y - 15);
        drawLine(margin + 230, y - 15, margin + 260, y - 15);
        y += 50;

        doc.setFontSize(6);
        doc.text('Total Absences:', 10, y - 25);
        drawLine(margin + 18, y - 25, margin + 45, y - 25);

        doc.text('Total Lateness:', 70, y - 25);
        drawLine(margin + 75, y - 25, margin + 100, y - 25);

        doc.text('Total Left Early:', 120, y - 25);
        drawLine(margin + 125, y - 25, margin + 150, y - 25);
        doc.text('I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated', 10, y - 20);

        doc.text('Employee Signature:', 10, y - 15);
        drawLine(margin + 20, y - 15, margin + 90, y - 15);

        doc.text('Date:', 120, y - 15);
        drawLine(margin + 120, y - 15, margin + 150, y - 15);

        doc.text('Verfication Signature:', 10, y - 10);
        drawLine(margin + 20, y - 10, margin + 90, y - 10);

        doc.text('Date:', 120, y - 10);
        drawLine(margin + 120, y - 10, margin + 150, y - 10);
        doc.setFontSize(8);
        doc.rect(margin + 200, y - 50, 60, 25);
        doc.text('Total Hours:', 220, y - 45);
        doc.text('For Office Use Only:', 220, y - 27);




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

export default memo(ScopeTrainerTimesheetReportPdf);