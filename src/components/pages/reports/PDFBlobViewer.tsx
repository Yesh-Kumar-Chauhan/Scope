import React, { memo, useEffect, useMemo } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core'; // Import Viewer and Worker
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css'; // Import default styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Import layout styles




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
import StaffScheduleBlankReport from '../../jspdf/StaffScheduleBlankReport';
import StaffSignInGroupedReport from '../../jspdf/StaffSignInGroupedReport';
import StaffInserviceReport from '../../jspdf/StaffInserviceReport';
import VisitsReport from '../../jspdf/VisitsReport';
import StaffAttendanceGroupReport from '../../jspdf/StaffAttendanceGroupReport';
import SiteLicensorsReport from '../../jspdf/SiteLicensorsReport';
import StaffWorkshops from '../../jspdf/StaffWorkshops';
import StaffScheduleWithInfoPdf from '../../jspdf/StaffScheduleWithInfoPdf';
import WaiverExpirationReportPdf from '../../jspdf/WaiverExpirationReportPdf';
import StaffEmailAddressesReportPdf from '../../jspdf/StaffEmailAddressesReportPdf';
import PermitExpirationReportPdf from '../../jspdf/PermitExpirationReportPdf';
import SiteSpacePdf from '../../jspdf/SiteSpacePdf';
import StaffInfoLabels1Pdf from '../../jspdf/StaffInfoLabels1Pdf';
import StaffInfoLabels2Pdf from '../../jspdf/StaffInfoLabels2Pdf';
import InServiceStaffTotalPdf from '../../jspdf/InServiceStaffTotalPdf';
import ScopePartTimeTimesheetReportPdf from '../../jspdf/ScopePartTimeTimesheetReportPdf';
import Scope11TimesheetPdf from '../../jspdf/Scope11TimesheetPdf';
import Scope21TimesheetPdf from '../../jspdf/Scope21TimesheetPdf';
import ScopeEmployeeTimesheetWithoutNoteCodePdf from '../../jspdf/ScopeEmployeeTimesheetWithoutNotesPdf';
import ScopeEmployeeTimeSheetPdf from '../../jspdf/ScopeEmployeeTimeSheetPdf';
import StaffMatCPRFaPdf from '../../jspdf/StaffMatCPRFaPdf';
import SiteAssignmentPdf from '../../jspdf/SiteAssignmentPdf';
import SiteAddressListCCCPdf from '../../jspdf/SiteAddressListCCCPdf';
import StaffSignInWithoutSitePdf from '../../jspdf/StaffSignInWithoutSitePdf';
import SiteEmergencyInformationPdf from '../../jspdf/SiteEmergencyInformationPdf';
import ScopeSubstituteTimesheetReportPdf from '../../jspdf/ScopeSubstituteTimesheetReportPdf';
import ScopeTrainerTimesheetReportPdf from '../../jspdf/ScopeTrainerTimesheetReportPdf';
import ScopeTimeSheet from '../../jspdf/ScopeTimeSheet';
import TimeSheetAggregate from '../../jspdf/TimeSheetAggregate';
// Create new plugin instance




const PdfViewerComponent = memo(({ pdfBlob }: { pdfBlob: any }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Memoize the object URL to prevent unnecessary re-renders
    const pdfUrl = useMemo(() => {
        if (pdfBlob) {
            return URL.createObjectURL(pdfBlob);
        }
        return null;
    }, [pdfBlob]);

    // Clean up the object URL when the component unmounts or pdfBlob changes
    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    return (
        <div style={{ height: '500px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                {pdfUrl && (
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                )}
            </Worker>
        </div>
    );
});

interface ReportViewerProps {
    reportType: string | null;
    reportData: any;
    formData: any
}


const PdfViewer: React.FC<ReportViewerProps> = ({ reportType, reportData, formData }) => {
    const [pdfBlob, setPdfBlob] = React.useState<any>(null);

    const reportComponents: { [key: string]: React.FC<any> } = {
        '1': SiteInfoReportPDF,
        '2': StaffScheduleReportPdf,
        '3': FirstAidCPRExpirationBySiteReportPdf,
        '4': MatExpirationBySitePdf,
        '5': SitePhoneReportPdf,
        '7': StaffMaximumHourReportPdf,
        '8': StaffScheduleBlankReport,
        '9': StaffSignInGroupedReport,
        '10':ScopePartTimeTimesheetReportPdf,
        '11': StaffInserviceReport,
        '12': FingerprintWaiverAdditionalSiteReportPdf,
        '13': WaiverExpirationReportPdf,
        '14': FirstAidExpirationPdf,
        '15': VisitsReport,
        '16': StaffSalaryPdf,
        '18': SiteListForHCPReportPdf,
        '20': MatExpirationPdf,
        '22': StaffEmailAddressesReportPdf,
        '23':ScopeEmployeeTimesheetWithoutNoteCodePdf,
        '24': Scope11TimesheetPdf,
        '25':ScopeSubstituteTimesheetReportPdf,
        '26':ScopeTrainerTimesheetReportPdf,
        '27': StaffMatCPRFaPdf,
        '28': SiteAssignmentPdf,
        '29': PermitExpirationReportPdf,
        '30': EmergencyPhonePDF,
        '32': SiteAddressList,
        '33': SiteEmergencyInformationPdf,
        '36': ContactsReportPDF,
        '38': CPRExpirationReportPDF,
        '37': StaffWaiverPdf,
        '39': StaffTrackingPdf,
        '42': StaffAttendanceGroupReport,
        '43': StaffSigninWithSitePdf,
        '44': AttendanceTotalReportPDF,
        '45': FirstAidChildAbuseCPRJsPDF,
        '49': SiteSpacePdf,
        '50': StaffExpirationAlphaPdf,
        '51': EmergencyClosingPDF,
        '52': StaffAttendanceGroupReport,
        '53': FoundationReportPdf,
        '54': FoundationReportPdf,
        '78': AttendanceTotalZeroReportPDF,
        '61': StaffAttendanceGroupReport,
        '62': AttendanceTotalSummaryReportPDF,
        '65': SitePhoneCompactPdf,
        '68': NurseVisitPdf,
        '70': SiteLicensorsReport,
        '80':Scope21TimesheetPdf,
        '82': SiteAddressListCCCPdf,
        '83': StaffScheduleWithInfoPdf,
        '88': CBCReportPDF,
        '90': StaffWorkshops,
        '69': ChildAbuseExpirationPdf,
        '71': StaffAttendancePdf,
        '72': StaffAttendancePdf,
        '73': StaffAttendancePdf,
        '74': StaffDateEmploymentPdf,
        '76':StaffInfoLabels1Pdf,
        '77':StaffInfoLabels2Pdf,
        '81':ScopeTimeSheet,
        '84':ScopeTimeSheet,
        '85':ScopeEmployeeTimesheetWithoutNoteCodePdf,
        '86': SexualHarassmentPdf,
        '87': StaffSignInWithoutSitePdf,
        '91':ScopeEmployeeTimeSheetPdf,
        '92': SitePermitNumberPdf,
        '93':InServiceStaffTotalPdf,
        '94': StaffCheckListPdf,
        '95': StaffBirthMonthPdf,
        '96': TimeSheetAggregate
    };


    // Check if the reportType is valid and has a corresponding component
    const SelectedReportComponent = reportType && reportComponents[reportType] ? reportComponents[reportType] : null;

    // Guard against null reportData or SelectedReportComponent
    if (!SelectedReportComponent || !reportData) {
        return <div>No report available or invalid data.</div>;
    }



    return <div>
        {/* Generate the PDF and set the Blob */}
        <SelectedReportComponent data={reportData} setPdfBlob={setPdfBlob} formData={formData} />

        {/* Display the PDF Viewer if Blob is ready */}
        {pdfBlob ? <PdfViewerComponent pdfBlob={pdfBlob} /> : <p>Loading PDF...</p>}
    </div>
};

export default memo(PdfViewer);
