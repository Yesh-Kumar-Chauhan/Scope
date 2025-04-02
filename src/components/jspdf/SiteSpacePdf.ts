import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { addPageNumber } from '../common/addPageNumber';

interface SiteSpaceProps {
    data: any[];
    setPdfBlob: (blob: Blob) => void;
}

const groupAndSortByDistrictSiteName = (data: any[]) => {
    // Sort the data by DIST_NAM and then by SITE_NAM
    const sortedData = data.sort((a, b) => {
        const distCompare = a.DIST_NAM.localeCompare(b.DIST_NAM);
        if (distCompare !== 0) return distCompare;
        return a.SITE_NAM.localeCompare(b.SITE_NAM);
    });

    // Group the data by DIST_NAM and SITE_NAM
    return sortedData.reduce((acc: any, item: any) => {
        const key = `${item.DIST_NAM}-${item.SITE_NAM}`;
        if (!acc[key]) {
            acc[key] = {
                DIST_NAM: item.DIST_NAM,
                SITE_NAM: item.SITE_NAM,
                items: []
            };
        }
        acc[key].items.push(item);
        return acc;
    }, {});
};

const SiteSpace: React.FC<SiteSpaceProps> = ({ data, setPdfBlob }) => {

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        let y = 14;
        doc.setFontSize(16);
        doc.text('Site Space', 14, y);
        y += 10;

        const groupedData = groupAndSortByDistrictSiteName(data);

        Object.entries(groupedData).forEach(([key, group]: [string, any]) => {
            if (y > 270) {
                doc.addPage();
                y = 14;
            }

            doc.setFontSize(12);
            doc.text(group.DIST_NAM, 14, y);
            y += 5;

            doc.setFontSize(10);
            doc.text(group.SITE_NAM, 16, y);
            y += 5;

            doc.text('Location', 14, y);
            doc.text('Capacity', 75, y);
            doc.text('Additional Location', 120, y);
            doc.text('Capacity', 180, y);
            
            group.items.forEach((item: any) => {
                y = checkPageBreak(doc, y + 10, 20);
                if (y > 270) {
                    doc.addPage();
                    y = 14;
                }

                addItemData(doc, item, y);
                y += 15;
            });

            y += 10;
        });

        doc.setFontSize(10);
        addPageNumber(doc);
        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
    };

    const addItemData = (doc: jsPDF, item: any, y: number) => {
        const rooms = [
            { roomNo: item.ROOM_NO, cap: item.CAP1, addLoc: item.ADDLOC, ascCap: item.ASCAP1 },
            { roomNo: item.ROOM_NO2, cap: item.CAP2, addLoc: item.ADDLOC2, ascCap: item.ASCAP2 },
            { roomNo: item.ROOM_NO3, cap: item.CAP3, addLoc: item.ADDLOC3, ascCap: item.ASCAP3 },
            { roomNo: item.ROOM_NO4, cap: item.CAP4, addLoc: item.ADDLOC4, ascCap: item.ASCAP4 },
        ];

        rooms.forEach(({ roomNo, cap, addLoc, ascCap }, index) => {
            if (roomNo || cap || addLoc || addLoc) {
                doc.text(roomNo || '', 14, y);
                doc.text(cap ? cap.toString() : '', 75, y);
                doc.text(addLoc || '', 120, y);
                doc.text(ascCap ? ascCap.toString() : '', 180, y);
                y += 5;
            }
        });

        doc.line(14, y, 196, y);
        y += 5;
    };

    const checkPageBreak = (doc: any, yOffset: any, requiredSpace = 20) => {
        const pageHeight = doc.internal.pageSize.height;
        if (yOffset + requiredSpace > pageHeight - 20) {
            doc.addPage();
            return 20;
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

export default SiteSpace;
