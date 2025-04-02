import React, { memo, useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface StaffInfoLabels1PdfProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const StaffInfoLabels1Pdf: React.FC<StaffInfoLabels1PdfProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Sort data by Lastname then Firstname
        const sortedData = data.sort((a, b) => {
            const lastNameCompare = a.Lastname.localeCompare(b.Lastname);
            if (lastNameCompare !== 0) return lastNameCompare;
            return a.Firstname.localeCompare(b.Firstname);
        });

        sortedData.forEach((staff, index) => {
            if (index > 0 && index % 8 === 0) {
                doc.addPage();
            }

            // Check if we are on the left or right side of the page
            const isLeftSide = index % 2 === 0;
            const xOffset = isLeftSide ? 10 : 105; // Adjust the x position for left (10) and right (105) sides
            let yOffset = 20 + Math.floor(index / 2) % 4 * 55;

            // Check for page break
            yOffset = checkPageBreak(doc, yOffset, 55);

            // Labels bold, values normal
            doc.setFontSize(10);

            doc.setFont('helvetica', 'bold');
            doc.text('Name:', xOffset, yOffset);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Lastname} ${staff.Firstname}`, xOffset + 20, yOffset);

            doc.setFont('helvetica', 'bold');
            doc.text('Site:', xOffset, yOffset + 5);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Site ?? ''}`, xOffset + 20, yOffset + 5);

            doc.setFont('helvetica', 'bold');
            doc.text('DOH:', xOffset, yOffset + 10);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.DOH ? moment(staff.DOH).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 10);

            doc.setFont('helvetica', 'bold');
            doc.text('Title:', xOffset, yOffset + 15);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Title}`, xOffset + 20, yOffset + 15);

            doc.setFont('helvetica', 'bold');
            doc.text('Medical:', xOffset, yOffset + 20);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Medical ? moment(staff.Medical).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 20);

            doc.setFont('helvetica', 'bold');
            doc.text('CBC:', xOffset + 40, yOffset + 20);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.CBC ? moment(staff.CBC).format('MM/DD/YYYY') : ''}`, xOffset + 60, yOffset + 20);

            doc.setFont('helvetica', 'bold');
            doc.text('CPR/FA:', xOffset, yOffset + 25);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.CPR ? moment(staff.CPR).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 25);

            doc.setFont('helvetica', 'bold');
            doc.text('MAT:', xOffset + 40, yOffset + 25);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.MATExpires ? moment(staff.MATExpires).format('MM/DD/YYYY') : ''}`, xOffset + 60, yOffset + 25);

            doc.setFont('helvetica', 'bold');
            doc.text('H&S(5):', xOffset, yOffset + 30);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Foundations ? moment(staff.Foundations).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 30);

            doc.setFont('helvetica', 'bold');
            doc.text('H&S(15):', xOffset + 40, yOffset + 30);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Foundations15H ? moment(staff.Foundations15H).format('MM/DD/YYYY') : ''}`, xOffset + 60, yOffset + 30);

            doc.setFont('helvetica', 'bold');
            doc.text('Left Alone:', xOffset, yOffset + 35);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.AloneWithChildren || ''}`, xOffset + 20, yOffset + 35);

            doc.setFont('helvetica', 'bold');
            doc.text('Child Abuse:', xOffset + 40, yOffset + 35);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.ChildAbuse ? moment(staff.ChildAbuse).format('MM/DD/YYYY') : ''}`, xOffset + 63, yOffset + 35);

            doc.setFont('helvetica', 'bold');
            doc.text('ACES:', xOffset, yOffset + 40);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.ACES ? moment(staff.ACES).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 40);

            doc.setFont('helvetica', 'bold');
            doc.text('E. Law:', xOffset + 40, yOffset + 40);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.ELaw ? moment(staff.ELaw).format('MM/DD/YYYY') : ''}`, xOffset + 60, yOffset + 40);
        });

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    const checkPageBreak = (doc: any, yOffset: any, requiredSpace = 55) => {
        const pageHeight = doc.internal.pageSize.height;
        if (yOffset + requiredSpace > pageHeight - 20) {
            doc.addPage();
            return 10; // Reset yOffset for new page
        }
        return yOffset;
    };

    useEffect(() => {
        if (data && data.length > 0) {
            generatePDF();
        }
    }, [data]);

    return null;
};

export default memo(StaffInfoLabels1Pdf);
