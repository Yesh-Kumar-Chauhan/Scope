import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';
import autoTable from 'jspdf-autotable';

interface ScopeTimeSheet {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const ScopeTimeSheet: React.FC<ScopeTimeSheet> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });
        const sortedData = [...data.scopeTimesheetData].sort((a, b) => 
            a.FullName.localeCompare(b.FullName)
        );
        // Group data by PersonID
        const groupedByPerson =sortedData.reduce((acc: any, entry: any) => {
            if (!acc[entry.PersonID]) {
                acc[entry.PersonID] = [];
            }
            acc[entry.PersonID].push(entry);
            return acc;
        }, {});

        Object.entries(groupedByPerson).forEach(([personId, personEntries]: any, personIndex: number) => {
            if (personIndex > 0) {
                doc.addPage();
            }

            // Group entries by WeekNumber for this person
            const groupedByWeek = personEntries.reduce((acc: any, entry: any) => {
                if (!acc[entry.WeekNumber]) {
                    acc[entry.WeekNumber] = [];
                }
                acc[entry.WeekNumber].push(entry);
                return acc;
            }, {});

            const firstEntry = personEntries[0];
            const pageWidth = doc.internal.pageSize.width;
            const margin = 10;
            let y = margin;

            // Header information (only once per person)
            doc.setFont("helvetica", "normal");
            doc.setFontSize(18);
            doc.text("SCOPE Time Sheet", margin, y);
            y += 8;
            doc.setFontSize(12);
            doc.text("Name:", margin, y);
            doc.text(firstEntry.FullName || '', margin + 20, y);
            doc.text("Position:", pageWidth / 2, y);
            doc.text(firstEntry.Position || '', pageWidth / 2 + 30, y);
            y += 6;

            doc.text("District:", margin, y);
            doc.text(firstEntry.DistrictName, margin + 20, y);
            doc.text("Budget Code:", pageWidth / 2, y);
            doc.text(String(firstEntry.DIST_NUM || ''), pageWidth / 2 + 30, y);
            y += 6;

            doc.text("Building:", margin, y);
            doc.text(``, margin + 22, y);
            doc.text("Program:", pageWidth / 2, y);
            doc.text(firstEntry.SiteName || '', pageWidth / 2 + 30, y);
            y += 6;

            doc.text("Schedule:", margin, y);
            doc.text(firstEntry.Schedule || '', margin + 20, y);
            y += 8;

            // Generate tables for each week
            Object.entries(groupedByWeek).forEach(([weekNumber, weekEntries]: any, weekIndex: number) => {
                if (weekIndex > 0) {
                    y += 10; // Add some space between weeks
                }
                y += 5;
                if (y + 5 > doc.internal.pageSize.height - 10) {
                    doc.addPage();
                    y = 20; 
                }
                doc.setFont("helvetica", "bold");
                doc.text(`Week# ${weekNumber}`, margin, y);
                doc.setFont("helvetica", "normal");
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text("Program Hours", margin + 100, y);
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.text("Maximum Weekly Program Hours.", margin + 90, y + 5);
                y += 10;

                // Timesheet table for this week
                const tableData = weekEntries.flatMap((entry: any) => {
                    const row = [
                        entry.SiteName || '',
                        entry.TimeSheetDate ? moment(entry.TimeSheetDate).format('MM/DD/YYYY') : '', // Date
                        entry.TimeIn ? moment(entry.TimeIn, 'HH:mm:ss').format('hh:mm A') : '',
                        entry.ClockInLocal ? moment(entry.ClockInLocal, 'HH:mm:ss').format('hh:mm A') : '',
                        entry.TimeOut ? moment(entry.TimeOut, 'HH:mm:ss').format('hh:mm A') : '',
                        entry.ClockOutLocal ? moment(entry.ClockOutLocal, 'HH:mm:ss').format('hh:mm A') : '',
                        //entry.LunchOut ? moment(entry.LunchOut, 'HH:mm:ss').format('hh:mm A') : '',
                        //entry.LunchIn ? moment(entry.LunchIn, 'HH:mm:ss').format('hh:mm A') : '',
                        entry.AdditionalStart ? moment(entry.AdditionalStart, 'HH:mm:ss').format('hh:mm A') : '',
                        entry.AdditionalStop ? moment(entry.AdditionalStop, 'HH:mm:ss').format('hh:mm A') : '',
                        '', // Empty placeholders (for future use or to maintain table structure)
                        '',
                        (entry.WorkingHours + entry.AdditionalHours).toFixed(2) // Calculated total hours
                    ];


                    // Add notes row if NotesHeader exists for this entry
                    if (entry.NotesHeader) {
                        return [
                            row,
                            [
                                { content: entry.NotesHeader ? entry.NotesHeader : '', colSpan: 1, styles: { fontStyle: 'bold' } },
                                { content: entry.NotesDetails ? entry.NotesDetails : '', colSpan: 12, styles: { textColor: '#474747' } }
                            ]
                        ];
                    }
                    return [row];
                });

                autoTable(doc, {
                    head: [['Program', 'Date', 'Clock In', 'System In', 'Clock Out', 'System Out', 'Start', 'End', 'Explanation', 'Code', 'Hours']],
                    //head: [['Program', 'Date', 'Clock In', 'System In', 'Clock Out', 'System Out', 'Lunch Out', 'Lunch In', 'Start', 'End', 'Explanation', 'Code', 'Hours']],
                    body: tableData,
                    startY: y,
                    theme: 'grid',
                    styles: {
                        fontSize: 8,
                        cellPadding: 1,
                        lineColor: 40,
                        lineWidth: 0.1,
                    },
                    headStyles: {
                        fontStyle: 'bold',
                        textColor: 0,
                        fillColor: false,
                    },
                    columnStyles: {
                        0: { cellWidth: 30 },
                        1: { cellWidth: 20 },
                        2: { cellWidth: 20 },
                        3: { cellWidth: 20 },
                        4: { cellWidth: 20 },
                        5: { cellWidth: 20 },
                        //6: { cellWidth: 20 },
                        //7: { cellWidth: 20 },
                        6: { cellWidth: 20 },
                        7: { cellWidth: 20 },
                        8: { cellWidth: 25 },
                        9: { cellWidth: 15 },
                        10: { cellWidth: 15 }
                    },
                    pageBreak: 'auto',
                });

                y = (doc as any).lastAutoTable.finalY + 10;
                y += 5;
            });

            const maxPageHeight = doc.internal.pageSize.height; // Height of the page in mm
            const lineHeight = 10; // Estimate for line height

            // Check if space is available before adding total hours and signature sections
            const checkAndAddPage = (y: number) => {
                if (y + lineHeight > maxPageHeight - margin) {
                    doc.addPage();
                    y = margin; // Reset y to the top margin
                }
                return y;
            };

            const totalProgramHours = personEntries.reduce((sum: any, entry: any) => sum + entry.WorkingHours, 0);
            const totalAdditionalHours = personEntries.reduce((sum: any, entry: any) => sum + entry.AdditionalHours, 0);
            const totalHours = totalProgramHours + totalAdditionalHours;
            y = checkAndAddPage(y); 
            doc.text(`Program Hours:${totalHours.toFixed(2)}`, margin + 140, y - 5);
            // Totals and signature lines (once per person, after all weeks)
            doc.text("Total Absences:", margin, y);
            y = checkAndAddPage(y); 
            doc.line(margin + 30, y + 1, pageWidth / 3 - 10, y + 1);
            doc.text("Total Lateness:", pageWidth / 3, y);
            doc.line(pageWidth / 3 + 30, y + 1, 2 * pageWidth / 3 - 10, y + 1);
            doc.text("Total Left early:", 2 * pageWidth / 3, y);
            doc.line(2 * pageWidth / 3 + 30, y + 1, pageWidth - margin, y + 1);
            y += 10;
            y = checkAndAddPage(y); 

            // Certification and signatures
            doc.setFontSize(9);
            doc.text("I certify that the above account is true and correct and that the services performed were rendered to SCOPE on the dates and hours stated.", margin, y);
            y += 10;
            y = checkAndAddPage(y); 
            doc.text("Employee Signature:", margin, y);
            doc.line(margin + 40, y, pageWidth / 3.5, y);
            doc.text("Date:", pageWidth / 3, y);
            doc.line(pageWidth / 2, y, pageWidth / 2.5 - margin, y);
            y += 10;
            y = checkAndAddPage(y); 
            doc.text("Verification Signature:", margin, y);
            doc.line(margin + 40, y, pageWidth / 3.5, y);
            doc.text("Date:", pageWidth / 3, y);
            doc.line(pageWidth / 2, y, pageWidth / 2.5 - margin, y);
            doc.text("(for Program Hours)", margin, y + 5);
            y = checkAndAddPage(y); 
            // SCOPE Office box
            doc.rect(pageWidth - 125, y - 5, 30, 20);
            doc.text("SCOPE Office:", pageWidth - 125, y - 10);

            y = checkAndAddPage(y); 
            doc.text("Program Hours:", margin + 200, y);
            doc.text(`${totalProgramHours.toFixed(2)} Hours`, margin + 225, y);
            y += 5;
            doc.text("Additional Hours:", margin + 200, y);
            doc.text(`${totalAdditionalHours.toFixed(2)} Hours`, margin + 225, y);
            y += 5;
            doc.text("Total Hours:", margin + 200, y);
            doc.text(`${totalHours.toFixed(2)} Hours`, margin + 225, y);
            y += 10;
            y = checkAndAddPage(y); 
        });

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

export default memo(ScopeTimeSheet);