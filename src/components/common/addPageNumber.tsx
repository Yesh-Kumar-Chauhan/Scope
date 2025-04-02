import moment from 'moment';

export function addPageNumber(doc: any) {
    const pageCount = doc.internal.getNumberOfPages();
    const currentDate = moment().format('MM/DD/YYYY'); // Format the date using moment.js
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        const dateX = 10; // Position 10mm from the left
        const dateY = doc.internal.pageSize.height - 10; // Position 10mm from the bottom
        doc.text(currentDate, dateX, dateY);

        const pageWidth = doc.internal.pageSize.width;
        const pageNumberText = 'Page ' + i + ' of ' + pageCount;
        const textWidth = doc.getTextWidth(pageNumberText);
        const pageNumberX = (pageWidth - textWidth) / 2;
        const pageNumberY = doc.internal.pageSize.height - 10; // Position 10mm from the bottom
        
        doc.text(pageNumberText, pageNumberX, pageNumberY);
    }
}
