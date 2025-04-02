import ExcelJS from 'exceljs';
import moment from 'moment';

const StaffMatCprFaExcel = async (reportData: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff MAT CPR FA');

    // Set column widths
    worksheet.columns = [
        { width: 30 },  // Name
        { width: 15 },  // A = Add, R = Remove, C = Change
        { width: 15 },  // MAT Exp date
        { width: 15 },  // CPR Exp date
        { width: 15 },  // First Aid Exp date
        { width: 15 },  // HHC Initials
        { width: 15 },  // Date
    ];

    // Add title
    worksheet.mergeCells('A1:G1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Staff MAT CPR FA';
    titleCell.font = { size: 14, bold: true };
    titleCell.alignment = { horizontal: 'center' };

    let currentRow = 3;

    // Sort data by FIRSTNAME, LASTNAME
    const sortedData = reportData.sort((a, b) => {
        const nameA = `${a.FIRSTNAME} ${a.LASTNAME}`.toUpperCase();
        const nameB = `${b.FIRSTNAME} ${b.LASTNAME}`.toUpperCase();
        return nameA.localeCompare(nameB);
    });

    // Loop through each staff member's data
    sortedData.forEach((staff) => {
        // Add header row for each staff member
        const headerRow = worksheet.addRow([
            `Name:\n${staff.FIRSTNAME}, ${staff.LASTNAME}`,
            'A = Add\nR = Remove\nC = Change',
            'MAT\nExp date',
            'CPR\nExp date',
            'First Aid\nExp date',
            'HHC\nInitials',
            'Date'
        ]);

        headerRow.height = 50;
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });

        currentRow += 1;

        // Add data rows
        const dataRows = [
            [
                'Original',
                'Add',
                staff.MATDATE ? moment(staff.MATDATE).format('DD/MM/YYYY') : '',
                staff.CPR ? moment(staff.CPR).format('DD/MM/YYYY') : '',
                staff.FIRSTAID ? moment(staff.FIRSTAID).format('DD/MM/YYYY') : '',
                '',
                ''
            ],
            ['Language', '', '', '', '', '', ''],
            ['Renewal', '', '', '', '', '', ''],
            ['Renewal', '', '', '', '', '', ''],
            ['Renewal', '', '', '', '', '', '']
        ];

        // Add each data row to the worksheet
        dataRows.forEach((row) => {
            const dataRow = worksheet.addRow(row);
            dataRow.eachCell((cell) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            });
            currentRow += 1;
        });

        // Add a space between each staff member's section
        currentRow += 1;
    });

    // Apply borders to all cells
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Generate the Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default StaffMatCprFaExcel;
