import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface StaffAttendanceGroupReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const groupByName = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.FIRSTNAME}-${item.LASTNAME}`;
        if (!acc[key]) {
            acc[key] = {
                FIRSTNAME: item.FIRSTNAME,
                LASTNAME: item.LASTNAME,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const calculateTotals = (group: any) => {
    const totalLateness = group.items.filter((item: any) => item.Absent === 'Arrived Late').length;
    const totalLeftEarly = group.items.filter((item: any) => item.Absent === 'Left Early').length;
    const total = group.items.length;

    return {
        totalLateness,
        totalLeftEarly,
        total,
    };
};

const StaffAttendanceGroupReport: React.FC<StaffAttendanceGroupReportProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4',
        });

        let currentY = 60;

        // Title
        doc.setFontSize(16);
        doc.text('Staff Attendance', 40, currentY);
        currentY += 20;

        // Group and sort by name (LASTNAME, FIRSTNAME)
        const groupedData = groupByName(data);
        const sortedGroupKeys = Object.keys(groupedData).sort((a, b) => {
            const [firstNameA, lastNameA] = a.split('-');
            const [firstNameB, lastNameB] = b.split('-');
            const lastNameCompare = lastNameA.localeCompare(lastNameB);
            return lastNameCompare === 0 ? firstNameA.localeCompare(firstNameB) : lastNameCompare;
        });

        sortedGroupKeys.forEach((key: string, index: number) => {
            const group = groupedData[key];
            const { totalLateness, totalLeftEarly, total } = calculateTotals(group);

            // Print Staff Name
            doc.setFontSize(12);
            doc.text(`${group.LASTNAME}, ${group.FIRSTNAME}`, 40, currentY);
            currentY += 15;

            // Table Data Preparation
            // Sort group items by DIST_NAM and SITENAM before preparing the table body
            const tableBody = group.items
                .sort((a: any, b: any) => {
                    const distNameA = a.DIST_NAM?.toString() || ''; // Provide default empty string
                    const distNameB = b.DIST_NAM?.toString() || ''; // Provide default empty string
                    const distNameCompare = distNameA.localeCompare(distNameB);
                    if (distNameCompare !== 0) return distNameCompare;

                    const siteNameA = a.SITENAM || ''; // Provide default empty string
                    const siteNameB = b.SITENAM || ''; // Provide default empty string
                    return siteNameA.localeCompare(siteNameB);
                })
                .map((item: any) => [
                    item?.DATE ? moment(item.DATE).format('MM/DD/YYYY') : '',
                    item?.DIST_NAM || '',
                    item?.SITENAM || '',
                    item?.Absent || '',
                    item?.Reason || '',
                    item?.Notes || '',
                ]);


            // Generate Table
            // Generate Table
            // Generate Table
            autoTable(doc, {
                head: [['Date', 'District', 'Site', 'Absent', 'Reason', 'Notes']],
                body: tableBody,
                startY: currentY,
                margin: { left: 40, right: 40 },
                theme: 'plain',
                styles: { fontSize: 10, cellPadding: 0.5 },
                headStyles: { fontStyle: 'bold', textColor: 0, fillColor: false },
                columnStyles: {
                    0: { cellWidth: 'auto' }, // Date column
                    1: { cellWidth: 'auto' }, // District column
                    2: { cellWidth: 'auto' }, // Site column
                    3: { cellWidth: 'auto' }, // Absent column
                    4: { cellWidth: 'auto' }, // Reason column
                    5: { cellWidth: 'auto' }, // Notes column
                },
                didDrawCell: (data: any) => {
                    if (data.section === 'head') {
                        const doc = data.doc;
                        const startX = data.cell.x;
                        const startY = data.cell.y + data.cell.height;
                        const endX = startX + data.cell.width;

                        doc.setLineWidth(0.5);
                        doc.setDrawColor(0, 0, 0);
                        doc.line(startX, startY, endX, startY);
                    }
                },
                didDrawPage: (data: { cursor: { y: number } }) => {
                    currentY = data.cursor.y + 10;
                },
            });




            // Draw HR line before total
            doc.setLineWidth(0.5);
            doc.line(40, currentY, doc.internal.pageSize.width - 40, currentY);
            currentY += 10;

            // Add totals
            autoTable(doc, {
                body: [
                    [`Total Lateness: ${totalLateness}`, `Total Left Early: ${totalLeftEarly}`, `Total: ${total}`]
                ],
                startY: currentY,
                margin: { left: 40, right: 40 },
                styles: { fontSize: 10, cellPadding: 3 },
                theme: 'plain',
                didDrawPage: (data: { cursor: { y: number } }) => {
                    currentY = data.cursor.y + 10;
                },
            });

            // Add a new page if necessary
            // if (index < sortedGroupKeys.length - 1) {
            //     doc.addPage();
            //     currentY = 60;
            // }
        });

        // Footer with date and page number
        doc.setFontSize(10);
        doc.text(`Generated on ${todayDate}`, 40, doc.internal.pageSize.height - 30);

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything visually
};

export default StaffAttendanceGroupReport;
