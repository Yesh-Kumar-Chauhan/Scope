import React, { memo, useEffect } from "react";
import jsPDF from "jspdf";
import moment from "moment";
import { addPageNumber } from "../common/addPageNumber";
import autoTable from "jspdf-autotable";

interface TimeSheetAggregate {
  data: any;
  setPdfBlob: (blob: Blob) => void;
  formData: any
}

const TimeSheetAggregate: React.FC<TimeSheetAggregate> = ({
  data,
  setPdfBlob,
  formData
}) => {
  const startDate = formData?.StartDate ?  moment(formData?.StartDate).format("DD-MM-YYYY") : null;
  const endDate = formData?.EndDate ? moment(formData?.EndDate).format("DD-MM-YYYY") : null;

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    let y = margin;
    // Title
    doc.setFontSize(16);
    doc.text("Timesheet Aggregate Report", 14, 13);
    y += 10;
    doc.setFontSize(9);
    doc.text("Date Range", margin+4, y);
    doc.text(`${startDate ?? ''} - ${endDate ?? ''}` , margin + 30, y);
    y += 4;

    // Define columns for the report
    const columns = [
      { header: "Employee name", dataKey: "FULLNAME" },
      { header: "District Name", dataKey: "DIST_NAM" },
      { header: "Site Name", dataKey: "SITE_NAM" },
      { header: "Total hours", dataKey: "WorkingHours" },
    ];
    const roundToQuarter = (value :number) => {
        return Math.round(value * 4) / 4; 
    };
    // Format the data for autoTable
    const tableData = data.timesheetAggregateData.map((item: any) => ({
      FULLNAME: `${item.FIRSTNAME || ""}, ${item.LASTNAME || ""}`, // Handle potential nulls
      DIST_NAM: item.DIST_NAM || "", // Default to empty string if null or undefined
      SITE_NAM: item.SITE_NAM || "", // Default to empty string if null or undefined
      WorkingHours:roundToQuarter(item.WorkingHours),
    }));

    const totalWorkingHours = tableData.reduce(
      (total : any, item:any) => total + (item.WorkingHours || 0),
      0
    );

    // Add the total row at the end of the tableData
    tableData.push({
      FULLNAME: "Total",
      DIST_NAM: "",
      SITE_NAM: "",
      WorkingHours: totalWorkingHours,
    });
    // Generate the table using autoTable
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: tableData.map(
        (row: { [s: string]: unknown } | ArrayLike<unknown>) =>
          Object.values(row)
      ),
      theme: "plain",
      startY: y,
      styles: {
        fontSize: 7,
        cellPadding: 1,
        lineColor: 40,
        lineWidth: 0.1,
      },
      headStyles: {
        fontStyle: "bold",
        fontSize: 9,
        textColor: 0,
        fillColor: false,
        halign: "center",
      },
      bodyStyles: {
        lineWidth: 0,
        // halign: 'center',
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 40 }, // Name
        1: { cellWidth: 50 }, // District
        2: { cellWidth: 50 }, // Site
        3: { cellWidth: 30 }, // WorkingHours
      },
      didDrawCell: (data: {
        section: string;
        cell: { x: number; y: number; width: any; height: any };
      }) => {
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);
        doc.line(
          data.cell.x,
          data.cell.y,
          data.cell.x + data.cell.width,
          data.cell.y
        ); // Top
        doc.line(
          data.cell.x,
          data.cell.y + data.cell.height,
          data.cell.x + data.cell.width,
          data.cell.y + data.cell.height
        ); // Bottom
        doc.line(
          data.cell.x,
          data.cell.y,
          data.cell.x,
          data.cell.y + data.cell.height
        ); // Left
        doc.line(
          data.cell.x + data.cell.width,
          data.cell.y,
          data.cell.x + data.cell.width,
          data.cell.y + data.cell.height
        ); // Right
      },
      didDrawPage: (data: { table: { body: string | any[] } }) => {
        // Draw bottom border for the last row
        if (data.table.body && data.table.body.length > 0) {
          const lastRow = data.table.body[data.table.body.length - 1];
          if (lastRow && lastRow.cells && lastRow.cells.length > 0) {
            const firstCell = lastRow.cells[0];
            const lastCell = lastRow.cells[lastRow.cells.length - 1];
            if (firstCell && lastCell) {
              doc.setLineWidth(0.3);
              doc.line(
                firstCell.x,
                firstCell.y + firstCell.height,
                lastCell.x + lastCell.width,
                lastCell.y + lastCell.height
              );
            }
          }
        }
      },
    });

    addPageNumber(doc);
    const pdfBlob = doc.output("blob");
    setPdfBlob(pdfBlob);
  };

  useEffect(() => {
    if (data) {
      generatePDF();
    }
  }, [data]);

  return null; // No visual component, generates the PDF automatically
};
export default memo(TimeSheetAggregate);
