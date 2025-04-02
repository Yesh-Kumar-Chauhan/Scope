import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addPageNumber } from '../common/addPageNumber';

interface StaffInfoLabels2PdfProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const StaffInfoLabels2Pdf: React.FC<StaffInfoLabels2PdfProps> = ({ data, setPdfBlob }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Sort data by Firstname then Lastname
        const sortedData = data.sort((a, b) => {
            const firstNameCompare = a.Firstname.localeCompare(b.Firstname);
            if (firstNameCompare !== 0) return firstNameCompare;
            return a.Lastname.localeCompare(b.Lastname);
        });

        sortedData.forEach((staff, index) => {
            // Add a new page after 4 entries
            if (index > 0 && index % 8 === 0) {
                doc.addPage();
            }

            // Determine if filling left or right side of the page
            const isLeftSide = index % 2 === 0;
            const xOffset = isLeftSide ? 10 : 105; // Left (10) or right (105) side of the page
            let yOffset = 20 + Math.floor(index / 2) % 4 * 60; // Calculate yOffset based on the index
            
            // Check if a page break is needed
            yOffset = checkPageBreak(doc, yOffset, 60);

            // Populate the content for each staff member
            doc.setFontSize(8);

            // Labels bold, values normal
            doc.setFont('helvetica', 'bold');
            doc.text(`Name:`, xOffset, yOffset);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Firstname} ${staff.Lastname}`, xOffset + 10, yOffset);

            doc.setFont('helvetica', 'bold');
            doc.text(`Site:`, xOffset, yOffset + 5);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Site ?? ''}`, xOffset + 10, yOffset + 5);

            doc.setFont('helvetica', 'bold');
            doc.text(`DOH:`, xOffset + 60, yOffset + 5);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.DOH ? moment(staff.DOH).format('MM/DD/YYYY') : ''}`, xOffset + 70, yOffset + 5);

            doc.setFont('helvetica', 'bold');
            doc.text(`Title:`, xOffset, yOffset + 10);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Title}`, xOffset + 20, yOffset + 10);

            doc.setFont('helvetica', 'bold');
            doc.text(`Medical:`, xOffset, yOffset + 15);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Medical ? moment(staff.Medical).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 15);

            doc.setFont('helvetica', 'bold');
            doc.text(`CBC:`, xOffset + 60, yOffset + 15);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.CBC ? moment(staff.CBC).format('MM/DD/YYYY') : ''}`, xOffset + 70, yOffset + 15);

            doc.setFont('helvetica', 'bold');
            doc.text(`CPR/FA:`, xOffset, yOffset + 20);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.CPR ? moment(staff.CPR).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 20);

            doc.setFont('helvetica', 'bold');
            doc.text(`MAT:`, xOffset + 60, yOffset + 20);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.MATExpires ? moment(staff.MATExpires).format('MM/DD/YYYY') : ''}`, xOffset + 70, yOffset + 20);

            doc.setFont('helvetica', 'bold');
            doc.text(`H&S(5):`, xOffset, yOffset + 25);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Foundations ? moment(staff.Foundations).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 25);

            doc.setFont('helvetica', 'bold');
            doc.text(`H&S(15):`, xOffset + 60, yOffset + 25);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.Foundations15H ? moment(staff.Foundations15H).format('MM/DD/YYYY') : ''}`, xOffset + 75, yOffset + 25);

            doc.setFont('helvetica', 'bold');
            doc.text(`E. Law:`, xOffset, yOffset + 30);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.ELaw ? moment(staff.ELaw).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 30);

            doc.setFont('helvetica', 'bold');
            doc.text(`S. Harass:`, xOffset + 60, yOffset + 30);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.SHarass ? moment(staff.SHarass).format('MM/DD/YYYY') : ''}`, xOffset + 80, yOffset + 30);

            doc.setFont('helvetica', 'bold');
            doc.text(`ACES:`, xOffset, yOffset + 35);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.ACES ? moment(staff.ACES).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 35);

            doc.setFont('helvetica', 'bold');
            doc.text(`Left Alone:`, xOffset + 60, yOffset + 35);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.AloneWithChildren || ''}`, xOffset + 80, yOffset + 35);

            doc.setFont('helvetica', 'bold');
            doc.text(`Child Abuse:`, xOffset, yOffset + 40);
            doc.setFont('helvetica', 'normal');
            doc.text(`${staff.ChildAbuse ? moment(staff.ChildAbuse).format('MM/DD/YYYY') : ''}`, xOffset + 20, yOffset + 40);

            doc.setFont('helvetica', 'bold');
            doc.text(`Total Hrs: _____`, xOffset, yOffset + 45);
            doc.setFont('helvetica', 'bold');
            doc.text(`Hrs Needed: _____`, xOffset + 60, yOffset + 45);

            doc.setFont('helvetica', 'bold');
            doc.text(`Topics Needed: _____`, xOffset, yOffset + 50);
            doc.setFont('helvetica', 'bold');
            doc.text(`Date: ${moment(new Date()).format('MM/DD/YYYY')}`, xOffset + 60, yOffset + 50);

            // Add a gap after each entry
            yOffset += 10;
        });

        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    const checkPageBreak = (doc: any, yOffset: any, requiredSpace = 60) => {
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

export default StaffInfoLabels2Pdf;
