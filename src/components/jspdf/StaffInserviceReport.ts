import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';
// Helper functions to group data and calculate total hours
const groupByDistrictSiteTypeAndTraining = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}-${item.FIRSTNAME}-${item.LASTNAME}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                FIRSTNAME: item.FIRSTNAME,
                LASTNAME: item.LASTNAME,
                trainings: {}
            };
        }
        if (!acc[key].trainings[item.TRAINING]) {
            acc[key].trainings[item.TRAINING] = {
                TRAINING: item.TRAINING,
                items: []
            };
        }
        acc[key].trainings[item.TRAINING].items.push(item);
        return acc;
    }, {});
};

const calculateTotalHours = (items: any[] = []) => {
    return items.reduce((sum, item) => sum + (parseFloat(item.HOURS) || 0), 0);
};

const calculateTotalHoursForGroupByData = (groupedData: any) => {
    return Object.keys(groupedData).reduce((sum, key) => {
        const trainingItems = Object.values(groupedData[key].trainings)
            .flatMap((training: any) => training.items);
        return sum + calculateTotalHours(trainingItems);
    }, 0);
};

const calculateTotalHoursForAllData = (data: any[]) => {
    return calculateTotalHours(data);
};

interface StaffInserviceReportProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const StaffInserviceReport: React.FC<StaffInserviceReportProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF('portrait', 'pt', 'a4');

        // Sort data by DIST_NAM then by SITE_NAM
        const sortedData = data.sort((a: { DIST_NAM: string; SITE_NAM: string }, b: { DIST_NAM: string; SITE_NAM: string }) => {
            const districtComparison = a.DIST_NAM.localeCompare(b.DIST_NAM);
            if (districtComparison !== 0) return districtComparison;
            return a.SITE_NAM.localeCompare(b.SITE_NAM);
        });


        const groupedData = groupByDistrictSiteTypeAndTraining(sortedData);
        let lastDistrictName = '';
        let lastSiteName = '';
        let lastFullName = '';

        const totalHoursForAllData = calculateTotalHoursForAllData(sortedData);
        let currentY = 60;

        doc.setFontSize(16);
        doc.text('Staff Inservice', 25, currentY);
        currentY += 20;

        Object.keys(groupedData).forEach((key: string, index: number) => {
            const group = groupedData[key];

            const shouldPrintDistrictName = lastDistrictName !== group.DIST_NAM;
            const shouldPrintSiteName = lastSiteName !== group.SITE_NAM;
            const shouldPrintFullName = lastFullName !== `${group.FIRSTNAME} ${group.LASTNAME}`;

            if (shouldPrintDistrictName) {
                lastDistrictName = group.DIST_NAM;
                doc.setFontSize(12);
                doc.text(group.DIST_NAM, 30, currentY);
                currentY += 15;
            }

            if (shouldPrintSiteName) {
                lastSiteName = group.SITE_NAM;
                doc.setFontSize(12);
                doc.text(group.SITE_NAM, 35, currentY);
                currentY += 10;
            }

            if (shouldPrintFullName) {
                lastFullName = `${group.FIRSTNAME} ${group.LASTNAME}`;
                doc.setFontSize(10);
                currentY += 10;

                autoTable(doc, {
                    head: [[`${group.FIRSTNAME} ${group.LASTNAME}`, '', 'Employed', 'First Aid', 'CPR', 'Abuse']],
                    body: [
                        [
                            sortedData[0]?.SitePos,
                            `Total:${totalHoursForAllData}`,
                            sortedData[0]?.DOEMP ? moment(sortedData[0]?.DOEMP).format('MM/DD/YYYY') : '',
                            sortedData[0]?.FIRSTAID ? moment(sortedData[0]?.FIRSTAID).format('MM/DD/YYYY') : '',
                            sortedData[0]?.CPR ? moment(sortedData[0]?.CPR).format('MM/DD/YYYY') : '',
                            sortedData[0]?.MATAPP ? moment(sortedData[0]?.MATAPP).format('MM/DD/YYYY') : '',
                        ]
                    ],
                    startY: currentY,
                    theme: 'plain',
                    margin: { left: 40, right: 40 },
                    styles: { fontSize: 8, cellPadding: 2 },
                    headStyles: {
                        fontStyle: 'bold',
                        textColor: 0,
                        fillColor: false,
                    },
                    didDrawPage: (data: { cursor: { y: number } }) => {
                        currentY = data.cursor.y + 10; // Adjust the position after the table
                    },
                });

                currentY += 10;
            }

            Object.keys(group.trainings).forEach((trainingKey) => {
                const training = group.trainings[trainingKey];
                const trainingTotalHours = calculateTotalHours(training.items);

                // Training section header 
                doc.setFontSize(10);
                doc.text(`${training.TRAINING}`, 40, currentY);
                currentY += 10;

                // Table for training details
                autoTable(doc, {
                    head: [['Workshop', 'Hours', 'Date', 'Topic', 'Sponsor']],
                    body: training.items.map((item: any) => [
                        item.TRAINING,
                        item.HOURS,
                        item.DATE ? moment(item.DATE).format('MM/DD/YYYY') : '',
                        item.TopicName,
                        item.SPONSOR,
                    ]),
                    theme: 'plain',
                    startY: currentY,
                    margin: { left: 40, right: 40 },
                    styles: { fontSize: 8, cellPadding: 2, lineWidth: 0.1 },
                    headStyles: {
                        fontStyle: 'bold',
                        textColor: 0,
                        fillColor: false,
                    },
                    didDrawPage: (data: { cursor: { y: number } }) => {
                        currentY = data.cursor.y + 10; // Adjust the position after the table
                    },

                });

                currentY += 10; // Add some space after the table
            });

            // Add a new page if necessary
            if (index < Object.keys(groupedData).length - 1) {
                doc.addPage();
                currentY = 40; // Reset Y position on new page
            }
        });

        // Footer with total hours and date
        doc.setFontSize(10);
        // doc.text(`Generated on ${todayDate}`, 40, doc.internal.pageSize.height - 30);
        doc.text(`Total Hours: ${totalHoursForAllData}`, 40, doc.internal.pageSize.height - 30);

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

export default StaffInserviceReport;
