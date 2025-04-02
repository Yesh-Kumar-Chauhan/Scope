import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { SiteInfoExcel } from '../SiteInfoExcel';
import StaffSchedule from '../StaffSchedule';
import FirstAidCPRExpirationBySiteExcel from '../FirstAidCPRExpirationBySiteExcel';
import MatExpirationBySiteExcel from '../MatExpirationBySiteExcel';
import SitePhoneReportExcel from '../SitePhoneReportExcel';
import StaffMaximumHourReportExcel from '../StaffMaximumHourReportExcel';
import StaffScheduleBlankReportExcel from '../StaffScheduleBlankReportExcel';
import StaffSignInGroupedExcel from '../StaffSignInGroupedExcel';
import SCOPEPartTimeTimeSheet from '../SCOPEPartTime-TimeSheet';
import StaffInserviceExcel from '../StaffInserviceExcel';
import FingerprintWaiverAdditionalSitesExcel from '../FingerprintWaiverAdditionalSitesExcel';
import WaiverExpirationExcel from '../WaiverExpirationExcel';
import FirstAidExpirationExcel from '../FirstAidExpirationExcel';
import VisitsExcel from '../VisitsExcel';
import StaffSalariesExcel from '../StaffSalariesExcel';
import SiteListForHCPExcel from '../SiteListForHCPExcel';
import MatExpirationExcel from '../MatExpirationExcel';
import StaffEmailAddressExcel from '../StaffEmailAddressExcel';
import StaffMatCprFaExcel from '../StaffMatCprFaExcel'
import ScopeEmployeeTimeSheetWithoutCode from '../ScopeEmployeeTimeSheetWithoutCode';
import ScopeEmployeeTimesheetExcel from '../ScopeEmployeeTimesheetExcel'
import Scope11TimesheetExcel from '../Scope11TimesheetExcel';
import ScopeSubstituteTimesheetExcel from '../ScopeSubstituteTimesheetExcel';
import ScopeTrainerTimesheetExcel from '../ScopeTrainerTimesheetExcel';
import PermitExpirationExcel from '../PermitExpirationExcel';
import Scope21TimesheetExcel from '../Scope21TimesheetExcel';
import SiteAssignmentExcel from '../SiteAssignmentExcel';
import EmergencyPhoneExcel from '../EmergencyPhoneExcel';
import SiteAddressListExcel from '../SiteAddressListExcel';
import ContactsExcel from '../ContactsExcel';
import StaffWaiverExcel from '../StaffWaiverExcel';
import CPRExpirationExcel from '../CPRExpirationExcel';
import StaffTrackingExcel from '../StaffTrackingExcel';
import StaffAttendanceGroupExcel from '../StaffAttendanceGroupExcel';
import StaffSigninWithSiteExcel from '../StaffSigninWithSiteExcel';
import AttendanceTotalExcel from '../AttendanceTotalExcel';
import FirstAidChildAbuseCPRExcel from '../FirstAidChildAbuseCPRExcel';
import SiteSpaceExcel from '../SiteSpaceExcel';
import SiteExpirationAlphaExcel from '../SiteExpirationAlphaExcel';
import EmergencyClosingExcel from '../EmergencyClosingExcel';
import StaffAttendanceExcel from '../StaffAttendanceExcel';
import FoundationsExcel from '../FoundationsExcel';
import AttendanceTotalSummaryExcel from '../AttendanceTotalSummaryExcel';
import SitePhoneCompactExcel from '../SitePhoneCompactExcel';
import StaffBirthMonthExcel from '../StaffBirthMonthExcel';
import StaffCheckListExcel from '../StaffCheckListExcel';
import InserviceStaffTotalExcel from '../InserviceStaffTotalExcel';
import SitePermitNumberExcel from '../SitePermitNumberExcel';
import CBCExcel from '../CBCExcel';
import StaffSignInWithoutSite from '../StaffSignInWithoutSite';
import SexualHarassmentExcel from '../SexualHarassmentExcel';
import SiteLicensorsExcel from '../SiteLicensorsExcel';
import NurseVisitExcel from '../NurseVisitExcel';
import ChildAbuseExpirationExcel from '../ChildAbuseExpirationExcel';
import ScopeTimesheetWithoutNotesExcel from '../ScopeTimesheetWithoutNotesExcel';
import SiteAddressListCCCExcel from '../SiteAddressListCCCExcel';
import AttendanceTotalZeroReportExcel from '../AttendanceTotalZeroReportExcel';
import StaffDateEmploymentExcel from '../StaffDateEmploymentExcel';
import StaffInfoLabels1Excel from '../StaffInfoLabels1Excel';
import StaffInfoLabels2Excel from '../StaffInfoLabels2Excel';
import StaffWorkshopsExcel from '../StaffWorkshopsExcel';
import StaffScheduleWithInfoExcel from '../StaffScheduleWithInfoExcel';
import SiteEmergencyInformationExcel from '../SiteEmergencyInformationExcel';
import TimeSheetAggregateExcel from '../TimeSheetAggregateExcel';
export const DownloadExcel = async (reportType: string, reportData: any,formData:any) => {
    if (!reportData) {
        toast.error("No data available for the report.");
        return;
    }
    try {
        let workbookBuffer;
        let fileName = '';
        // Set file name based on report type
        switch (reportType) {
            case '1':
                fileName = 'Site_Information.xlsx';
                workbookBuffer = await SiteInfoExcel(reportData);
                break;
            case '2':
                fileName = 'StaffSchedule.xlsx';
                workbookBuffer = await StaffSchedule(reportData);
                break;
            case '3':
                fileName = 'FirstAidCPRExpirationBySite.xlsx';
                workbookBuffer = await FirstAidCPRExpirationBySiteExcel(reportData);
                break;
            case '4':
                fileName = 'MatExpirationBySite.xlsx';
                workbookBuffer = await MatExpirationBySiteExcel(reportData);
                break;
            case '5':
                fileName = 'SitePhoneReportExcel.xlsx';
                workbookBuffer = await SitePhoneReportExcel(reportData);
                break;
            case '7':
                fileName = 'StaffMaximumHourReport.xlsx';
                workbookBuffer = await StaffMaximumHourReportExcel(reportData);
                break;
            case '8':
                fileName = 'StaffScheduleBlankReport.xlsx';
                workbookBuffer = await StaffScheduleBlankReportExcel(reportData);
                break;
            case '9':
                fileName = 'StaffSignInGroupedExcel.xlsx';
                workbookBuffer = await StaffSignInGroupedExcel(reportData);
                break;
            case '10':
                fileName = 'SCOPEPartTimeTimeSheet.xlsx';
                workbookBuffer = await SCOPEPartTimeTimeSheet(reportData);
                break;
            case '11':
                fileName = 'StaffInserviceExcel.xlsx';
                workbookBuffer = await StaffInserviceExcel(reportData);
                break;
            case '12':
                fileName = 'FingerprintWaiverAdditionalSitesExcel.xlsx';
                workbookBuffer = await FingerprintWaiverAdditionalSitesExcel(reportData);
                break;
            case '13':
                fileName = 'WaiverExpirationExcel.xlsx';
                workbookBuffer = await WaiverExpirationExcel(reportData);
                break;
            case '14':
                fileName = 'FirstAidExpirationExcel.xlsx';
                workbookBuffer = await FirstAidExpirationExcel(reportData);
                break;
            case '15':
                fileName = 'VisitsExcel.xlsx';
                workbookBuffer = await VisitsExcel(reportData);
                break;
            case '16':
                fileName = 'StaffSalariesExcel.xlsx';
                workbookBuffer = await StaffSalariesExcel(reportData);
                break;
            case '18':
                fileName = 'SiteListForHCPExcel.xlsx';
                workbookBuffer = await SiteListForHCPExcel(reportData);
                break;
            case '20':
                fileName = 'MatExpirationExcel.xlsx';
                workbookBuffer = await MatExpirationExcel(reportData);
                break;
            case '22':
                fileName = 'StaffEmailAddressExcel.xlsx';
                workbookBuffer = await StaffEmailAddressExcel(reportData);
                break;
            case '23':
                fileName = 'ScopeEmployeeTimeSheetWithoutCode.xlsx';
                workbookBuffer = await ScopeEmployeeTimeSheetWithoutCode(reportData);
                break;
            case '24':
                fileName = 'Scope11TimesheetExcel.xlsx';
                workbookBuffer = await Scope11TimesheetExcel(reportData);
                break;
            case '25':
                fileName = 'ScopeSubstituteTimesheetExcel.xlsx';
                workbookBuffer = await ScopeSubstituteTimesheetExcel(reportData);
                break;
            case '26':
                fileName = 'ScopeTrainerTimesheetExcel.xlsx';
                workbookBuffer = await ScopeTrainerTimesheetExcel(reportData);
                break;
            case '27':
                fileName = 'StaffMatCprFaExcel.xlsx';
                workbookBuffer = await StaffMatCprFaExcel(reportData);
                break;
            case '28':
                fileName = 'SiteAssignmentExcel.xlsx';
                workbookBuffer = await SiteAssignmentExcel(reportData);
                break;
            case '29':
                fileName = 'PermitExpirationExcel.xlsx';
                workbookBuffer = await PermitExpirationExcel(reportData);
                break;
            case '30':
                fileName = 'EmergencyPhoneExcel.xlsx';
                workbookBuffer = await EmergencyPhoneExcel(reportData);
                break;
            case '32':
                fileName = 'SiteAddressListExcel.xlsx';
                workbookBuffer = await SiteAddressListExcel(reportData);
                break;
            case '33':
                fileName = 'SiteEmergencyInformationExcel.xlsx';
                workbookBuffer = await SiteEmergencyInformationExcel(reportData);
                break;
            case '36':
                fileName = 'ContactsExcel.xlsx';
                workbookBuffer = await ContactsExcel(reportData);
                break;
            case '37':
                fileName = 'StaffWaiverExcel.xlsx';
                workbookBuffer = await StaffWaiverExcel(reportData);
                break;
            case '38':
                fileName = 'CPRExpirationExcel.xlsx';
                workbookBuffer = await CPRExpirationExcel(reportData);
                break;
            case '39':
                fileName = 'StaffTrackingExcel.xlsx';
                workbookBuffer = await StaffTrackingExcel(reportData);
                break;
            case '42':
                fileName = 'StaffAttendanceGroupExcel.xlsx';
                workbookBuffer = await StaffAttendanceGroupExcel(reportData);
                break;
            case '43':
                fileName = 'StaffSigninWithSiteExcel.xlsx';
                workbookBuffer = await StaffSigninWithSiteExcel(reportData);
                break;
            case '44':
                fileName = 'AttendanceTotalExcel.xlsx';
                workbookBuffer = await AttendanceTotalExcel(reportData);
                break;
            case '45':
                fileName = 'FirstAidChildAbuseCPRExcel.xlsx';
                workbookBuffer = await FirstAidChildAbuseCPRExcel(reportData);
                break;
            case '49':
                fileName = 'SiteSpaceExcel.xlsx';
                workbookBuffer = await SiteSpaceExcel(reportData);
                break;
            case '50':
                fileName = 'SiteExpirationAlphaExcel.xlsx';
                workbookBuffer = await SiteExpirationAlphaExcel(reportData);
                break;
            case '51':
                fileName = 'EmergencyClosingExcel.xlsx';
                workbookBuffer = await EmergencyClosingExcel(reportData);
                break;
            case '52':
                fileName = 'StaffAttendanceGroupAllExcel.xlsx';
                workbookBuffer = await StaffAttendanceGroupExcel(reportData);
                break;
            case '53':
                fileName = 'FoundationsExcel.xlsx';
                workbookBuffer = await FoundationsExcel(reportData);
                break;
            case '54':
                fileName = 'FoundationsEmptyExcel.xlsx';
                workbookBuffer = await FoundationsExcel(reportData);
                break;
            case '61':
                fileName = 'StaffAttendanceEmptyExcel.xlsx';
                workbookBuffer = await StaffAttendanceGroupExcel(reportData);
                break;
            case '62':
                fileName = 'AttendanceTotalSummaryExcel.xlsx';
                workbookBuffer = await AttendanceTotalSummaryExcel(reportData);
                break;
            case '65':
                fileName = 'SitePhoneCompactExcel.xlsx';
                workbookBuffer = await SitePhoneCompactExcel(reportData);
                break;
            case '68':
                fileName = 'NurseVisitExcel.xlsx';
                workbookBuffer = await NurseVisitExcel(reportData);
                break;
            case '69':
                fileName = 'ChildAbuseExpirationExcel.xlsx';
                workbookBuffer = await ChildAbuseExpirationExcel(reportData);
                break;
            case '70':
                fileName = 'SiteLicensorsExcel.xlsx';
                workbookBuffer = await SiteLicensorsExcel(reportData);
                break;
            case '71':
                fileName = 'StaffAttendanceExcel.xlsx';
                workbookBuffer = await StaffAttendanceExcel(reportData);
                break;
            case '72':
                fileName = 'StaffAttendanceAllExcel.xlsx';
                workbookBuffer = await StaffAttendanceExcel(reportData);
                break;
            case '73':
                fileName = 'StaffAttendanceEmptyExcel.xlsx';
                workbookBuffer = await StaffAttendanceExcel(reportData);
                break;
            case '74':
                fileName = 'StaffDateEmploymentExcel.xlsx';
                workbookBuffer = await StaffDateEmploymentExcel(reportData);
                break;
            case '76':
                fileName = 'StaffInfoLabels1Excel.xlsx';
                workbookBuffer = await StaffInfoLabels1Excel(reportData);
                break;
            case '77':
                fileName = 'StaffInfoLabels2Excel.xlsx';
                workbookBuffer = await StaffInfoLabels2Excel(reportData);
                break;
            case '78':
                fileName = 'AttendanceTotalZeroReportExcel.xlsx';
                workbookBuffer = await AttendanceTotalZeroReportExcel(reportData);
                break;
            case '80':
                fileName = 'Scope21TimesheetExcel.xlsx';
                workbookBuffer = await Scope21TimesheetExcel(reportData);
                break;
            case '81':
                fileName = 'ScopeTimesheetExcel.xlsx';
                workbookBuffer = await ScopeTimesheetWithoutNotesExcel(reportData);
                break;
            case '84':
                fileName = 'ScopeTimesheetWithoutNotesExcel.xlsx';
                workbookBuffer = await ScopeTimesheetWithoutNotesExcel(reportData);
                break;
            case '82':
                fileName = 'SiteAddressListCCCExcel.xlsx';
                workbookBuffer = await SiteAddressListCCCExcel(reportData);
                break;
            case '83':
                fileName = 'StaffScheduleWithInfoExcel.xlsx';
                workbookBuffer = await StaffScheduleWithInfoExcel(reportData);
                break;
            case '85':
                fileName = 'ScopeEmployeeTimeSheetWithoutNotes.xlsx';
                workbookBuffer = await ScopeEmployeeTimeSheetWithoutCode(reportData);
                break;
            case '86':
                fileName = 'SexualHarassmentExcel.xlsx';
                workbookBuffer = await SexualHarassmentExcel(reportData);
                break;
            case '87':
                fileName = 'StaffSignInWithoutSite.xlsx';
                workbookBuffer = await StaffSignInWithoutSite(reportData);
                break;
            case '88':
                fileName = 'CBCExcel.xlsx';
                workbookBuffer = await CBCExcel(reportData);
                break;
            case '90':
                fileName = 'StaffWorkshopsExcel.xlsx';
                workbookBuffer = await StaffWorkshopsExcel(reportData);
                break;
            case '91':
                fileName = 'ScopeEmployeeTimesheetExcel.xlsx';
                workbookBuffer = await ScopeEmployeeTimesheetExcel(reportData);
                break;
            case '92':
                fileName = 'SitePermitNumberExcel.xlsx';
                workbookBuffer = await SitePermitNumberExcel(reportData);
                break;
            case '93':
                fileName = 'InserviceStaffTotalExcel.xlsx';
                workbookBuffer = await InserviceStaffTotalExcel(reportData);
                break;
            case '94':
                fileName = 'StaffCheckListExcel.xlsx';
                workbookBuffer = await StaffCheckListExcel(reportData);
                break;
            case '95':
                fileName = 'StaffBirthMonthExcel.xlsx';
                workbookBuffer = await StaffBirthMonthExcel(reportData);
                break;
            case '96':
                fileName = 'TimesheetAggregateExcel.xlsx';
                workbookBuffer = await TimeSheetAggregateExcel(reportData,formData);
                break;
            default:
                toast.info("Excel download is not available for this report type.");
                return;
        }

        if (workbookBuffer) {
            const blob = new Blob([workbookBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, fileName);
        }
    } catch (error) {
        console.error('Error downloading Excel:', error);
        toast.error('Failed to download Excel file.');
    }
}