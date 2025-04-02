import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface EmergencyPhonePDFProps {
    data: any;
    setPdfBlob: (blob: Blob) => void;
}

const EmergencyPhonePDF: React.FC<EmergencyPhonePDFProps> = ({ data, setPdfBlob }) => {
    const todayDate = moment().format('DD-MM-YYYY');

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
        });

        // Sort data only by district (DIST_NAM) in alphabetical order
        const sortedData = [...data].sort((a, b) => {
            const districtA = a.DIST_NAM.toLowerCase();
            const districtB = b.DIST_NAM.toLowerCase();
            
            if (districtA < districtB) return -1;
            if (districtA > districtB) return 1;
            return 0;
        });

        sortedData.forEach((siteData: any, index: number) => {
            // Add the title
            doc.setFontSize(16);
            doc.text(`Emergency Phone Report`, 14, 15);

            const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width

            // Helper function to center text
            const centerText = (doc: jsPDF, text: string, yPosition: number) => {
                const textWidth = doc.getTextWidth(text); // Get the text width
                const xPosition = (pageWidth - textWidth) / 2; // Calculate the centered X position
                doc.text(text, xPosition, yPosition);
            };

            // Add site-specific information below the title
            doc.setFontSize(12);
            centerText(doc, `${siteData?.SITE_NUM} ${siteData?.SITE_NAM}`, 25);
            centerText(doc, 'SCOPE Information', 32);
            doc.setFontSize(10);
            centerText(doc, `${siteData?.DIST_NAM} / ${siteData?.ADDR1 ? siteData?.ADDR1 : 'N/A'}`, 38);

            // Additional Contact Information
            doc.setFontSize(10);
            centerText(doc, `SCOPE program phone number: ${siteData?.PHONE ? siteData?.PHONE : ''}`, 45);
            centerText(doc, `Home School phone number: ${siteData?.SCHFONE ? siteData?.SCHFONE : ''}`, 50);
            centerText(doc, `Home School fax# number: ${siteData?.SFAX ? siteData?.SFAX : ''}`, 55);

            // Left table: Emergency Contacts
            const leftTable = [
                ['SCOPE Admin Office', '(631)360-0800'],
                ['SCOPE Beyond Office Hours', '(631)942-8054'],
                ['Long Island Regional Office', '(631)240-2560'],
                ['Suffolk Child Care Council', '(631)462-0303'],
                ['Nassau Child Care Council', '(516)358-9250'],
                ['Suffolk Soc. Ser. Day Care Unit', '(631)853-3666'],
                ['Nassau Soc. Ser. Day Care Unit', '(516)227-7976'],
                ['Department of health', '(631)852-5999'],
                ['Child Protective Services', ' (800)635-1522'],
                ['School Transportation', '631-893-7915'],
                ['Fire Department', '631-226-1212'],
                ['Police', '631-854-8700'],
                ['School Security', ''],
            ];

            // Right table: Emergency Numbers
            const rightTable = [
                ['Ambulance', '631-226-1212'],
                ['Hospital', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
                ['', ''],
            ];

            // Create parallel tables
            addParallelTables(doc, leftTable, rightTable);

            // Add page break after each site (except last)
            if (index < sortedData.length - 1) {
                doc.addPage();
            }
        });
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    const addParallelTables = (doc: jsPDF, leftTable: any[], rightTable: any[]) => {
        const startY = 65; // Adjusted Y position to start after the contact info

        // Add left table
        autoTable(doc, {
            head: [['Contact', 'Phone']],
            body: leftTable,
            startY: startY,
            margin: { left: 14 }, 
            theme:'plain',
            tableWidth: 90, 
            styles: {
                fontSize: 8,
                cellPadding: 3,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
        });

        // Add right table
        autoTable(doc, {
            head: [['Emergency', '911']],
            body: rightTable,
            startY: startY,
            theme:'plain',
            margin: { left: 110 }, // Adjust left margin for the right table
            tableWidth: 90, // Width of the right table
            styles: {
                fontSize: 8,
                cellPadding: 3,
                lineColor: 40,
                lineWidth: 0.1,
            },
            headStyles: {
                fontStyle: 'bold',
                textColor: 0,
                fillColor: false,
            },
        });
    };

    useEffect(() => {
        if (data) {
            generatePDF();
        }
    }, [data]);

    return null; // This component doesn't render anything visually
};

export default EmergencyPhonePDF;
