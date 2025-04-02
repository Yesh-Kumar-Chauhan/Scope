import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React, { useState } from 'react';
import SiteInfoReport from '../../pdf/SiteInfoReport';
import ScopeTimeSheetReport from '../../pdf/scope-timesheet/ScopeTimeSheetReport';
import ScopeEmployeeTimeSheet from '../../pdf/ScopeEmployeeTimeSheet';
import VisitsReport from '../../pdf/VisitsReport';
import StaffSalaryReport from '../../pdf/StaffSalaryReport';
// import SiteAddressList from '../../pdf/SiteAddressList';
import StaffExpirationAlpha from '../../pdf/StaffExpirationAlpha';
import SiteEmergencyInformation from '../../pdf/SiteEmergencyInformation';
import StaffDateEmployment from '../../pdf/StaffDateEmployment';
import StaffInfoLabels from '../../pdf/StaffInfoLabels';
import StaffInfoLabels2 from '../../pdf/StaffInfoLabels2';
import Timesheet from '../../pdf/Timesheet';
import SiteAddressListForCCC from '../../pdf/SiteAddressListForCCC';
import StaffBirthMonth from '../../pdf/StaffBirthMonth';
import StaffCheckList from '../../pdf/StaffCheckList';
import InServiceStaffTotals from '../../pdf/InServiceStaffTotals';
import SitePermitNumber from '../../pdf/SitePermitNumber';
import StaffWorkshops from '../../pdf/StaffWorkshops';
import CBC from '../../pdf/CBC';
// import StaffChecklist from '../../pdf/StaffCheckList';
import SiteAssignmentReport from '../../pdf/SiteAssignmentReport';
import StaffScheduleReport from '../../pdf/StaffScheduleReport';
import StaffEmailAddressesReport from '../../pdf/StaffEmailAddressesReport';
import WorkshopReport from '../../pdf/WorkshopReport';
import SitePhoneReport from '../../pdf/SitePhoneReport';
import StaffMATCPRReport from '../../pdf/StaffMATCPRReport';
import StaffMaximumHourReport from '../../pdf/StaffMaximumHourReport';
import StaffSignInGroupedReport from '../../pdf/StaffSignInGroupedReport';
import AttendanceTotalReport from '../../pdf/AttendanceTotalReport';
import StaffTrackingReport from '../../pdf/StaffTrackingReport';
import AttendanceTotalZeroReport from '../../pdf/AttendanceTotalZeroReport';
import StaffWaiverReport from '../../pdf/StaffWaiverReport';
import WaiverExpirationReport from '../../pdf/WaiverExpirationReport';
import ScopeSubstituteTimesheetReport from '../../pdf/ScopeSubstituteTimesheetReport';
import ScopeTrainerTimesheetReport from '../../pdf/ScopeTrainerTimesheetReport';
import StaffScheduleBlankReport from '../../pdf/StaffScheduleBlankReport';
import MatExpirationBySite from '../../pdf/MatExpirationBySite';
import FirstAidCPRExpirationBySiteReport from '../../pdf/FirstAidCPRExpirationBySiteReport';
import ScopePartTimeTimesheetReport from '../../pdf/ScopePartTimeTimesheetReport';
import StaffInserviceReport from '../../pdf/StaffInserviceReport';
import FirstAidExpirationReport from '../../pdf/FirstAidExpirationReport';
import MatExpirationReport from '../../pdf/MatExpirationReport';
import FingerprintWaiverAdditionalSiteReport from '../../pdf/FingerprintWaiverAdditionalSiteReport';
import Scope11Timesheet from '../../pdf/Scope11Timesheet';
import ContactsReport from '../../pdf/ContactsReport';
import PermitExpirationReport from '../../pdf/PermitExpirationReport';
import SiteSpace from '../../pdf/SiteSpace';
import EmergencyClosing from '../../pdf/EmergencyClosing';
import FoundationReport from '../../pdf/FoundationReport';
import FoundationEmptyReport from '../../pdf/FoundationEmptyReport';
import SitePhoneConpactReport from '../../pdf/SitePhoneConpactReport';
import EmergencyPhoneReport from '../../pdf/EmergencyPhoneReport';
import StaffSignInWithSiteReport from '../../pdf/StaffSignInWithSiteReport';
import CPRExpirationReport from '../../pdf/CPRExpirationReport';
import FirstAidChildAbuseCPRReport from '../../pdf/FirstAidChildAbuseCPRReport';
import NurseVisitReport from '../../pdf/NurseVisitReport';
import ChildAbuseExpirationReport from '../../pdf/ChildAbuseExpirationReport';
import SiteLicensorsReport from '../../pdf/SiteLicensorsReport';
import StaffAttendanceGroupReport from '../../pdf/StaffAttendanceGroupReport';
import SiteListForHCPReport from '../../pdf/SiteListForHCPReport';
import AttendanceTotalSummaryReport from '../../pdf/AttendanceTotalSummaryReport';
import StaffAttendanceReport from '../../pdf/StaffAttendanceReport';
import StaffScheduleWithInfoReport from '../../pdf/StaffScheduleWithInfoReport';
import SexualHarassmentReport from '../../pdf/SexualHarassmentReport';
import StaffSignInWithoutSiteReport from '../../pdf/StaffSignInWithoutSiteReport';
import ScopeEmployeeTimesheetWithoutNotes from '../../pdf/ScopeEmployeeTimesheetWithoutNotes';
import SiteInfoReportPDF from '../../jspdf/SiteInfoReportPDF';
import FirstAidCPRExpirationBySiteReportPdf from '../../jspdf/FirstAidCPRExpirationBySiteReport';
import MatExpirationBySitePdf from '../../jspdf/MatExpirationBySitePdf';
import SitePhoneReportPdf from '../../jspdf/SitePhoneReportPdf';
import StaffScheduleReportPdf from '../../jspdf/StaffScheduleReportPdf';
import ContactsReportPDF from '../../jspdf/ContactsReportPDF';
import AttendanceTotalReportPDF from '../../jspdf/AttendanceTotalReportPDF';
import AttendanceTotalZeroReportPDF from '../../jspdf/AttendanceTotalZeroReportPDF';
import AttendanceTotalSummaryReportPDF from '../../jspdf/AttendanceTotalSummaryReportPDF';
import CBCReportPDF from '../../jspdf/CBCReportPDF';
import MatExpirationPdf from '../../jspdf/MatExpirationPdf';
import StaffBirthMonthPdf from '../../jspdf/StaffBirthMonthPdf';
import StaffCheckListPdf from '../../jspdf/StaffCheckListPdf';
import SitePermitNumberPdf from '../../jspdf/SitePermitNumberPdf';
import SexualHarassmentPdf from '../../jspdf/SexualHarassmentPdf';
import StaffDateEmploymentPdf from '../../jspdf/StaffDateEmploymentPdf';
import ChildAbuseExpirationPdf from '../../jspdf/ChildAbuseExpirationPdf';
import CPRExpirationReportPDF from '../../jspdf/CPRExpirationReportPDF';
import EmergencyClosingPDF from '../../jspdf/EmergencyClosingPDF';
import EmergencyPhonePDF from '../../jspdf/EmergencyPhonePDF';
import StaffSalaryPdf from '../../jspdf/StaffSalaryPdf';
import StaffExpirationAlphaPdf from '../../jspdf/StaffExpirationAlphaPdf';
import SitePhoneCompactPdf from '../../jspdf/SitePhoneCompactPdf';
import SiteListForHCPReportPdf from '../../jspdf/SiteListForHCPReportPdf';
import NurseVisitPdf from '../../jspdf/NurseVisitPdf';
import FirstAidExpirationPdf from '../../jspdf/FirstAidExpirationPdf';
import StaffWaiverPdf from '../../jspdf/StaffWaiverPdf';
import StaffTrackingPdf from '../../jspdf/StaffTrackingPdf';
import StaffSigninWithSitePdf from '../../jspdf/StaffSigninWithSitePdf';
import FirstAidChildAbuseCPRJsPDF from '../../jspdf/FirstAidChildAbuseCPRJsPDF';
import StaffAttendancePdf from '../../jspdf/StaffAttendancePdf';
import FingerprintWaiverAdditionalSiteReportPdf from '../../jspdf/FingerprintWaiverAdditionalSiteReportPdf';
import FoundationReportPdf from '../../jspdf/FoundationReportPdf';
import StaffMaximumHourReportPdf from '../../jspdf/StaffMaximumHourReportPdf';
import SiteAddressList from '../../jspdf/SiteAddressList';
// Define the prop types for the ReportViewer component
interface ReportViewerProps {
    reportType: string | null;
    reportData: any;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ reportType, reportData }) => {



    const itemsPerPage = 100; // Set the number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => setCurrentPage((prev) => prev + 1);
    const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


    // Define a mapping of report types to their respective components
    // const reportComponents: { [key: string]: React.FC<any> } = {
    //     '1': SiteInfoReportPDF,
    //     '2': StaffScheduleReportPdf,
    //     // '2': StaffScheduleReport,
    //     '3': FirstAidCPRExpirationBySiteReportPdf,
    //     '4': MatExpirationBySitePdf,
    //     '5': SitePhoneReportPdf,
    //     '12': FingerprintWaiverAdditionalSiteReportPdf,
    //     '7': StaffMaximumHourReportPdf,
    //     '14': FirstAidExpirationPdf,
    //     '16': StaffSalaryPdf,
    //     '18': SiteListForHCPReportPdf,
    //     '20': MatExpirationPdf,
    //     '30': EmergencyPhonePDF,
    //     '32': SiteAddressList,
    //     '36': ContactsReportPDF,
    //     '38': CPRExpirationReportPDF,
    //     '37': StaffWaiverPdf,
    //     '39': StaffTrackingPdf,
    //     '43': StaffSigninWithSitePdf,
    //     '44': AttendanceTotalReportPDF,
    //     '45': FirstAidChildAbuseCPRJsPDF,
    //     '50': StaffExpirationAlphaPdf,
    //     '51': EmergencyClosingPDF,
    //     '53': FoundationReportPdf,
    //     '54': FoundationReportPdf,
    //     '78': AttendanceTotalZeroReportPDF,
    //     '62': AttendanceTotalSummaryReportPDF,
    //     '65': SitePhoneCompactPdf,
    //     '68': NurseVisitPdf,
    //     '88': CBCReportPDF,
    //     '69': ChildAbuseExpirationPdf,
    //     '71': StaffAttendancePdf,
    //     '72': StaffAttendancePdf,
    //     '73': StaffAttendancePdf,
    //     '74': StaffDateEmploymentPdf,
    //     '86': SexualHarassmentPdf,
    //     '92': SitePermitNumberPdf,
    //     '94': StaffCheckListPdf,
    //     '95': StaffBirthMonthPdf,
    // };

    const reportComponents: { [key: string]: React.FC<any> } = {
        '1': SiteInfoReport,
        '3': FirstAidCPRExpirationBySiteReport,
        '4': MatExpirationBySite,
        '5': SitePhoneReport,
        '7': StaffMaximumHourReport,
        '8': StaffScheduleBlankReport,
        '9': StaffSignInGroupedReport,
        '10': ScopePartTimeTimesheetReport,
        '11': StaffInserviceReport,
        '12': FingerprintWaiverAdditionalSiteReport,
        '13': WaiverExpirationReport,
        '14': FirstAidExpirationReport,
        '15': VisitsReport,
        '16': StaffSalaryReport,
        '18': SiteListForHCPReport,
        '20': MatExpirationReport,
        '22': StaffEmailAddressesReport,
        '23': ScopeEmployeeTimesheetWithoutNotes,
        '24': Scope11Timesheet,
        '25': ScopeSubstituteTimesheetReport,
        '26': ScopeTrainerTimesheetReport,
        '27': StaffMATCPRReport,
        '28': SiteAssignmentReport,
        '29': PermitExpirationReport,
        '30': EmergencyPhoneReport,
        '36': ContactsReport,
        '37': StaffWaiverReport,
        '38': CPRExpirationReport,
        '39': StaffTrackingReport,
        '42': StaffAttendanceGroupReport,
        '43': StaffSignInWithSiteReport,
        '44': AttendanceTotalReport,
        '45': FirstAidChildAbuseCPRReport,
        '49': SiteSpace,
        '51': EmergencyClosing,
        '52': StaffAttendanceGroupReport,
        '53': FoundationReport,
        '54': FoundationEmptyReport,
        '61': StaffAttendanceGroupReport,
        '62': AttendanceTotalSummaryReport,
        '65': SitePhoneConpactReport,
        '68': NurseVisitReport,
        '69': ChildAbuseExpirationReport,
        '70': SiteLicensorsReport,
        '71': StaffAttendanceReport,
        '72': StaffAttendanceReport,
        '73': StaffAttendanceReport,
        '78': AttendanceTotalZeroReport,
        '81': ScopeTimeSheetReport,
        '83': StaffScheduleWithInfoReport,
        '84': ScopeTimeSheetReport,
        '85': ScopeEmployeeTimesheetWithoutNotes,
        '86': SexualHarassmentReport,
        '87': StaffSignInWithoutSiteReport,
        '89': WorkshopReport,
        '91': ScopeEmployeeTimeSheet,
        '32': SiteAddressList,
        '50': StaffExpirationAlpha,
        '33': SiteEmergencyInformation,
        '74': StaffDateEmployment,
        '76': StaffInfoLabels,
        '77': StaffInfoLabels2,
        '80': Timesheet,
        '82': SiteAddressListForCCC,
        '88': CBC,
        '90': StaffWorkshops,
        '92': SitePermitNumber,
        '93': InServiceStaffTotals,
        '94': StaffCheckList,
        '95': StaffBirthMonth,
    };


    // Check if the reportType is valid and has a corresponding component
    const SelectedReportComponent = reportType && reportComponents[reportType] ? reportComponents[reportType] : null;

    // Guard against null reportData or SelectedReportComponent
    if (!SelectedReportComponent || !reportData) {
        return <div>No report available or invalid data.</div>;
    }


    const FullPdfDocument = () => (
        <SelectedReportComponent data={reportData} />
    );

    const DownloadFullPdfButton = () => (
        <PDFDownloadLink
            document={<FullPdfDocument />}
            fileName="full-document.pdf"
        >
            {/* {({ blob, url, loading, error }) =>
                loading ? 'Preparing PDF...' : 'Download Full PDF'
            } */}
            Download full file
        </PDFDownloadLink>  
    );

    const paginatedData = reportData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <>
            <button onClick={DownloadFullPdfButton}>download full file</button>

            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage * itemsPerPage >= reportData.length}>
                Next
            </button>
            <PDFViewer width="100%" height="270">
                <SelectedReportComponent data={paginatedData} />
            </PDFViewer>
            {/* <SelectedReportComponent data={reportData} /> */}
        </>

    );
};

export default ReportViewer;
