import React, { useState, useEffect } from 'react';
import { ITimesheetTable } from '../../interface/Personnel';
import moment from 'moment';
import { fetchAllDistrict } from '../../apis/districtsApi'
import { fetchAllSites } from '../../apis/sitesApi'
import { fetchTimesheetWithDateRange, bulkUpdateTimeSheetForm, fetchSchedular, getSchedularDataForPersonDate } from '../../apis/personnelApi';
import camelCase from "lodash/camelCase";
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import TimesheetPDF from '../pages/personnel/personnel-form/timesheetExcel&pdf/TimesheetPDF';
import TimesheetExcel from '../pages/personnel/personnel-form/timesheetExcel&pdf/TimesheetExcel';
import { getUserData } from "../../utils/utils";
interface TimesheetFormProps {
    onClose: () => void;
    isEditing?: boolean;
    personalId?: any;
    timeSheetData: { data: ITimesheetTable[]; totalItems: number } | undefined;
    currentPersonnel: any;
    refetch: any;
}
interface DateEntry {
    day: string;
    date: string;
}
const TimeSheetFormModal: React.FC<TimesheetFormProps> = ({
    onClose,
    isEditing = false,
    timeSheetData,
    personalId,
    currentPersonnel,
    refetch }) => {
    const [weekOffset, setWeekOffset] = useState(0);
    const [twoWeeksData, setTwoWeeksData] = useState<DateEntry[]>([]);
    const [editableData, setEditableData] = useState(timeSheetData?.data || []);
    const [districtData, setDistrictData] = useState<any>(null);
    const [allDistrictData, setAllDistrictData] = useState<any>(null);
    const [allSiteData, setAllSiteData] = useState<any>(null);
    const [schedularData, setSchedularData] = useState<any>([]);
    const [deletedSchedularData, setDeletedSchedularData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState<null | "excel" | "pdf">(null);
    const [totalLateness, setTotalLateness] = useState(0);
    const [totalLeftEarly, setTotalLeftEarly] = useState(0);
    const [additionalScheduleData, setAdditionalScheduleData] = useState<any[]>([]);
    const [endDate, setEndDate] = useState<any>(null);
    const [groupedData, setGroupedData] = useState<{ [key: string]: any[] }>({});
    const userData = getUserData();

    const isCurrentPeriod = () => weekOffset >= 0;
    const handleBack = () => {
        setWeekOffset(prev => prev - 2);
    };
    const handleForward = () => {
        if (!isCurrentPeriod()) {
            setWeekOffset(prev => prev + 2);
        }
    };
    const calculateAttendanceMetrics = (data: any) => {
        let lateness = 0;
        let absence = 0;
        let leftEarly = 0;

        data.forEach((entry: any) => {
            const { timeIn, timeOut, siteTimeIn, siteTimeOut, timeSheetDate, additionalStart, additionalStop } = entry;
            const timeInDate = timeIn ? new Date(`${timeSheetDate.substring(0, 10)}T${timeIn}`) : null;
            const timeOutDate = timeOut ? new Date(`${timeSheetDate.substring(0, 10)}T${timeOut}`) : null;
            const siteTimeInDate = new Date(`${timeSheetDate.substring(0, 10)}T${siteTimeIn}`);
            const siteTimeOutDate = new Date(`${timeSheetDate.substring(0, 10)}T${siteTimeOut}`);
            const additionalStartDate = additionalStart ? new Date(`${timeSheetDate.substring(0, 10)}T${additionalStart}`) : null;
            const additionalStopDate = additionalStop ? new Date(`${timeSheetDate.substring(0, 10)}T${additionalStop}`) : null;

            if (!timeInDate && !timeOutDate && !additionalStartDate && !additionalStopDate) {
                absence++;
            } else {
                if ((timeInDate && timeInDate > siteTimeInDate) || (additionalStartDate && additionalStartDate > siteTimeInDate)) {
                    lateness++;
                }
                if ((timeOutDate && timeOutDate < siteTimeOutDate) || (additionalStopDate && additionalStopDate < siteTimeOutDate)) {
                    leftEarly++;
                }
            }
        });

        return { lateness, absence, leftEarly };
    };
    const toCamelCaseKeys = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(toCamelCaseKeys);
        } else if (obj && typeof obj === "object") {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [camelCase(key), toCamelCaseKeys(value)])
            );
        }
        return obj;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentDate = moment().add(weekOffset, 'weeks');
                const startDate = currentDate.clone().startOf('isoWeek');
                const endDate = currentDate.clone().add(1, 'week').endOf('isoWeek');
                const formattedStartDate = startDate.format('MM-DD-YYYY');
                const formattedEndDate = endDate.format('MM-DD-YYYY');
                setEndDate(formattedEndDate);
                const timesheetRangeData = await fetchTimesheetWithDateRange(
                    personalId,
                    formattedStartDate,
                    formattedEndDate
                );
                const allDistrictData = await fetchAllDistrict();
                const districtMap = Object.fromEntries(
                    allDistrictData?.data.map((district: any) => [district.districtId, district.distNum])
                );
                const timesheetDataWithDistNumber = timesheetRangeData?.data.map(timesheet => ({
                    ...timesheet,
                    distNum: districtMap[timesheet.districtID] || null,
                }));
                const timesheetDataWithDistNum = toCamelCaseKeys(timesheetDataWithDistNumber);
                setEditableData(timesheetDataWithDistNum);
                const metrics = calculateAttendanceMetrics(timesheetDataWithDistNum);
                setTotalLateness(metrics.lateness);
                setTotalLeftEarly(metrics.leftEarly);
                const allSiteData = await fetchAllSites();
                setAllSiteData(allSiteData?.data || null);
                if (timesheetDataWithDistNum.length > 0) {
                    const matchingDistrict = allDistrictData.data.find(
                        x => x.districtId === timesheetRangeData.data[0]?.districtID
                    );
                    setDistrictData(matchingDistrict || null);
                    setAllDistrictData(allDistrictData?.data);
                } else {
                    setAllDistrictData(allDistrictData?.data);
                }
            } catch (error) {
                console.error("Error fetching timesheet data:", error);
            }
        };

        fetchData();
    }, [personalId, weekOffset]);

    useEffect(() => {
        const generateTwoWeeksData = () => {
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            const currentDate = moment().add(weekOffset, 'weeks');
            const startOfCurrentWeek = currentDate.clone().startOf('isoWeek');
            const twoWeeks = [];
            for (let i = 0; i < 5; i++) {
                const day = startOfCurrentWeek.clone().add(i, 'days');
                if (daysOfWeek.includes(day.format('ddd'))) {
                    twoWeeks.push({
                        day: day.format('ddd'),
                        date: day.format('MM-DD-YYYY'),
                    });
                }
            }
            const startOfNextWeek = startOfCurrentWeek.clone().add(1, 'week');
            for (let i = 0; i < 5; i++) {
                const day = startOfNextWeek.clone().add(i, 'days');
                if (daysOfWeek.includes(day.format('ddd'))) {
                    twoWeeks.push({
                        day: day.format('ddd'),
                        date: day.format('MM-DD-YYYY'),
                    });
                }
            }
            return twoWeeks;
        };
        const data = generateTwoWeeksData();
        console.log("Generated Two Weeks Data:", data);
        setTwoWeeksData(data);
    }, [weekOffset]);


    useEffect(() => {
        const fetchTimeSheetData = async (personalId: any) => {
            try {
                const schedularData = await fetchSchedular(personalId);
                if (schedularData) {
                    const regularData = schedularData?.data?.filter((item: any) =>
                        (item.paycode === null || item.paycode === '') &&
                        item.deletedDate === null
                    );
                    const additionalSchedule = schedularData?.data?.filter((item: any) =>
                        (item.paycode !== null && item.paycode !== '') && item.deletedDate === null
                    );
                    const combinedData = [...(regularData || []), ...(additionalSchedule || [])];
                    const deletedData = schedularData?.data?.filter((item: any) => item.deletedDate !== null);
                    setSchedularData(regularData);
                    setAdditionalScheduleData(additionalSchedule);
                    setDeletedSchedularData(deletedData);

                    const grouped = combinedData.reduce((acc: { [key: string]: any[] }, item) => {
                        const siteID = item.siteID;
                        if (!acc[siteID]) {
                            acc[siteID] = [];
                        }
                        acc[siteID].push(item);
                        return acc;
                    }, {});
                    setGroupedData(grouped);

                }
            } catch (error) {
                console.error("Error fetching timesheet data:", error);
            }
        };
        fetchTimeSheetData(personalId);
    }, [personalId, weekOffset]);


    const calculateHoursWorked = (
        timeIn: string | null,
        timeOut: string | null,
    ): number => {
        if (!timeIn || !timeOut) return 0;
        const timeInMoment = moment(timeIn || "", "HH:mm");
        const timeOutMoment = moment(timeOut || "", "HH:mm");
        let workedHours = timeOutMoment.diff(timeInMoment, "hours", true);
        return workedHours > 0 ? workedHours : 0;
    };
    const calculateAdditionalHour = (
        timeIn: string | null,
        timeOut: string | null,
    ): number => {
        if (!timeIn || !timeOut) return 0;
        const timeInMoment = moment(timeIn || "", "HH:mm");
        const timeOutMoment = moment(timeOut || "", "HH:mm");
        let workedHours = timeOutMoment.diff(timeInMoment, "hours", true);
        return workedHours > 0 ? workedHours : 0;
    };

    const calculateAdditionalHoursWorked = (startTime: string, stopTime: string): number => {
        if (!startTime || !stopTime) return 0;
    
        const [startH, startM, startS] = startTime.split(":").map(Number);
        const [stopH, stopM, stopS] = stopTime.split(":").map(Number);
    
        const startDate = new Date(0, 0, 0, startH, startM, startS);
        const stopDate = new Date(0, 0, 0, stopH, stopM, stopS);
    
        const diff = (stopDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;
    
        return parseFloat(diff.toFixed(2)) < 0 ? Math.abs(parseFloat(diff.toFixed(2))) + 12 :parseFloat(diff.toFixed(2)); // Round to 2 decimals
    };
    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        timesheetId: string | null,
        field: string,
        date: string,
        timesheetType: string,
        siteID: any
    ) => {
        let { value, type } = e.target;
        try {
            const scheduleData = await getSchedularDataForPersonDate(personalId, date);
            if (!scheduleData?.length) {
                console.warn('No schedule data found');
                toast.error(`No schedule data found on ${date}`);
                return;
            }

            let regularHour: any = null;
            let additionalHour: any = null;
            const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');

            scheduleData.forEach((row: any) => {
                if (!row.paycode) {
                    regularHour = row;
                } else {
                    additionalHour = row;
                }
            });

            if (type === 'time' && value) {
                value = `${value}:00`;
            }

            setEditableData((prevData: any[]) => {
                debugger;
                const dayMap: { [key: string]: string } = {
                    Mon: 'monday',
                    Tue: 'tuesday',
                    Wed: 'wednesday',
                    Thu: 'thursday',
                    Fri: 'friday',
                };
                const currentDay = moment(date).format('ddd');
                const dayKey = dayMap[currentDay];

                const scheduleForDay = timesheetType === 'hourWorked'
                    ? regularHour || scheduleData[0]
                    : additionalHour || scheduleData[0];
                const existingRowIndex = prevData.findIndex(
                    (row) =>
                        moment(row.timeSheetDate).isSame(moment(date), 'day') && row.siteId === siteID &&
                        row.paycode === (timesheetType === 'hourWorked' ? null : scheduleForDay?.paycode)
                );
                if (existingRowIndex !== -1) { 
                    console.log("scheduleId " + scheduleForDay.id);
                
                    return prevData.map((row, idx) =>
                        idx === existingRowIndex
                            ? {
                                ...row,
                                [field]: value,
                                siteTimeIn: scheduleForDay[`${dayKey}TimeIn`] || row.siteTimeIn,
                                siteTimeOut: scheduleForDay[`${dayKey}TimeOut`] || row.siteTimeOut,
                                scheduleId: scheduleForDay?.id ? scheduleForDay.id : null,
                                schedules: scheduleForDay.schedules || row.schedules,
                                distNumber: scheduleForDay?.distNumber ? scheduleForDay.distNumber : null,
                            }
                            : row
                    );
                } else {
                    // Add a new row if it doesn't exist
                    const newRow = {
                        districtID: allDistrictData?.find(
                            (district: any) => district.distNum === scheduleForDay.distNumber
                        )?.districtId || null,
                        distNum: scheduleForDay.distNumber,
                        siteId: siteID || null,
                        schoolID: null,
                        personID: scheduleForDay?.personID || null,
                        position: scheduleForDay?.position || null,
                        deviceID: null,
                        type: 0,
                        createdBy: null,
                        modifiedBy: null,
                        clockInLocal: null,
                        clockOutLocal: null,
                        notesHeader: null,
                        notesDetails: null,
                        siteTimeIn: scheduleForDay[`${dayKey}TimeIn`] || null,
                        siteTimeOut: scheduleForDay[`${dayKey}TimeOut`] || null,
                        externalEventId: null,
                        paycode: timesheetType === 'hourWorked' ? null : scheduleForDay?.paycode,
                        timesheetId: null,
                        timeSheetDate: formattedDate,
                        schedules: scheduleForDay.schedules || [],
                        [field]: value,
                        scheduleId: scheduleForDay?.id ? scheduleForDay.id : null,
                        distNumber: scheduleForDay?.distNumber ? scheduleForDay.distNumber : null,
                    };
                
                    return [...prevData, newRow];
                }
            });
            
            console.log("sdfsdfsdf"+editableData);
            debugger
        } catch (error) {
            console.error('Error updating timesheet:', error);
        }
    };

    const calculateTotalRegularHours = (data: any[], siteId : any): any => {
        var siteData = data.filter((x:any)=>x.siteId == siteId);
        return siteData.reduce((total, row) => {
            const hoursWorked = calculateHoursWorked(
                row.timeIn || "",
                row.timeOut || "",
            );
            return total + hoursWorked;
        }, 0);
    };

    const calculateTotalHours = (data: any[]): any => {
        return data.reduce((total, row) => {
            const hoursWorked = calculateHoursWorked(
                row.timeIn || "",
                row.timeOut || "",
            );
            return total + hoursWorked;
        }, 0);
    };
    const calculateAdditionalHours = (data: any[]): number => {
        debugger;
        return data.reduce((total, row) => {
            const hoursWorked = calculateAdditionalHoursWorked(
                row.additionalStart || "",
                row.additionalStop || "",
            );
            return total + hoursWorked;
        }, 0);
    };
    debugger;
    const regularTotalHours = calculateTotalHours(
        editableData.filter((row: any) => row.paycode === "" || row.paycode === null || row.paycode === undefined)
    );
    const additionalTotalHours = calculateAdditionalHours(
        editableData.filter((row: any) => row.paycode !== "" && row.paycode !== null && row.paycode !== undefined)
    );
debugger;
    const handleEditChange = async () => {
        setLoading(true);
        try {
            const transformedData = editableData.map((item: any) => {
                const { siteId, ...rest } = item;
                return {
                    ...rest,
                    siteID: siteId,
                };
            });
            const updatedTimesheets = await bulkUpdateTimeSheetForm(transformedData);
        } catch (error) {
            console.error('Error updating timesheets:', error);
        } finally {
            setLoading(false);
            refetch();
            onClose();
        }
    };

    const handleExportToPDF = async (timesheetData: any, currentPersonnel: any, regularData: any) => {
        try {
            setDownloadLoading("pdf");
            if (!timesheetData) {
                toast.error('No timesheet data available to export.');
                return;
            }
            try {
                //await TimesheetPDF(timesheetData, currentPersonnel, endDate, regularData);
                await TimesheetPDF(timesheetData, currentPersonnel, endDate, regularData, groupedData, weekOffset);
            } catch (error) {
                console.error('PDF generation error:', error);
                toast.error(error instanceof Error ? error.message : 'Failed to generate PDF file.');
            }

        } catch (error) {
            console.error('Unexpected error during PDF export:', error);
            toast.error('An unexpected error occurred while exporting the PDF.');
        } finally {
            setDownloadLoading(null);
        }
    }
    const handleExportToExcel = async (data: any, currentPersonnel: any, regularData: any) => {
        try {
            setDownloadLoading("excel");
            let workbookBuffer;
            let fileName = '';
            fileName = 'Timesheet_Excel.xlsx';
            workbookBuffer = await TimesheetExcel(data, currentPersonnel, endDate, regularData, groupedData);
            if (workbookBuffer) {
                const blob = new Blob([workbookBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, fileName);
            }
        } catch (error) {
            console.error('Error downloading Excel:', error);
            toast.error('Failed to download Excel file.');
        } finally {
            setDownloadLoading(null);
        }
    };
    // function syncEditableData(additionalScheduleData: any, editableData: any) {
    //     additionalScheduleData.forEach((additionalRecord: any) => {
    //         const isDateMatched = editableData.some((editableRecord: any) =>
    //             new Date(editableRecord.timeSheetDate).toISOString().split("T")[0] ===
    //             new Date(additionalRecord.date).toISOString().split("T")[0]
    //         );
    //         if (!isDateMatched && additionalRecord.paycode) {
    //             const newRecord = {
    //                 timesheetId: null,
    //                 districtID: null,
    //                 siteID: additionalRecord.siteID,
    //                 schoolID: null,
    //                 personID: additionalRecord.personID,
    //                 position: additionalRecord.position,
    //                 timeSheetDate: additionalRecord.date,
    //                 timeIn: '00:00:00',
    //                 timeOut: '00:00:00',
    //                 lunchIn: null,
    //                 lunchOut: null,
    //                 additionalStart: '',
    //                 additionalStop: '',
    //                 deviceID: null,
    //                 type: 0,
    //                 createdBy: additionalRecord.personID.toString(),
    //                 modifiedBy: additionalRecord.personID.toString(),
    //                 clockInLocal: null,
    //                 clockOutLocal: null,
    //                 notesHeader: additionalRecord.notes || null,
    //                 notesDetails: null,
    //                 siteTimeIn: additionalRecord.mondayTimeIn,
    //                 siteTimeOut: additionalRecord.mondayTimeOut,
    //                 externalEventId: null,
    //                 paycode: additionalRecord.paycode,
    //                 code: null,
    //                 personel: additionalRecord.personel || null,
    //                 site: additionalRecord.site || null,
    //                 distNum: additionalRecord.distNumber || null
    //             };
    //             editableData.push(newRecord);
    //         }
    //     });
    //     return editableData;
    // }
    // const updatedEditableData = syncEditableData(additionalScheduleData, editableData);
    return (
        <div className={`modal fade show  timeSheetpage editAsignment align-items-lg-start overflow-auto align-items-md-center align-items-start justify-content-center`}
            id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
            <div className="modal-dialog w-100">
                <div className="modal-content p-4">
                    <div className="modal-body p-lg-2 p-md-2 p-0">
                        <div className="formCard mt-0 p-0 border-0">
                            <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3">
                                <h3 className="text-nowrap formTitle m-0">Timesheet Form</h3>
                                <hr className="w-100" />
                                <div className="d-flex align-items-center TimeSheet justify-content-end gap-3">
                                    <button className='btn  btn-primary w-auto px-3' disabled={editableData.length == 0} onClick={() => handleExportToPDF(editableData, currentPersonnel, schedularData)} style={{ minWidth: '150px', maxWidth: '150px', height: '40px', cursor: 'pointer' }}>
                                        {downloadLoading === "pdf" ? (
                                            <span className="btnloader loader"></span>
                                        ) : (
                                            <span>Generate PDF</span>
                                        )}
                                    </button>
                                    <button className='btn  btn-primary w-auto px-3' disabled={editableData.length == 0} onClick={() => handleExportToExcel(editableData, currentPersonnel, schedularData)} style={{ minWidth: '150px', maxWidth: '150px', height: '40px', cursor: 'pointer' }}>
                                        {downloadLoading === "excel" ? (
                                            <span className="btnloader loader"></span>
                                        ) : (
                                            <span>
                                                Generate Excel
                                            </span>
                                        )}
                                    </button>
                                    <button className='btn  btn-primary w-auto px-3' onClick={handleBack} style={{ minWidth: '59px', maxWidth: '59px', height: '40px' }}>
                                        <svg viewBox="0 0 24 24" width={'24px'} height={'24px'} fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F"></path> </g></svg>
                                    </button>
                                    <button className={`btn btn-primary w-auto px-3 ${isCurrentPeriod() ? 'disabled' : ''}`} onClick={handleForward} disabled={isCurrentPeriod()} style={{ minWidth: '59px', maxWidth: '59px', height: '40px' }}>
                                        <svg viewBox="0 0 24 24" width={'24px'} height={'24px'} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#fff"></path> </g></svg>
                                    </button></div>

                                <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                </div>
                            </div>
                            <form className="DistrictForm">


                                {groupedData && Object.keys(groupedData).length > 0 ? (
                                    Object.entries(groupedData).map(([siteID, records]) => (

                                        <>
                                            <div className="mb-2 pt-3 row TimeSheetTitle">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                    <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                                        <label className="form-label mb-0" style={{ minWidth: '80px' }}>Name :</label>
                                                        <input
                                                            type="text"
                                                            className="form-control w-auto"
                                                            id="initialExpiration"
                                                            name="initialExpiration"
                                                            placeholder='Name'
                                                            value={`${records[0]?.personel?.firstname} ${records[0]?.personel?.lastname}`}
                                                            // value='JASON MONSANTO'
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                    <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                                        <label className="form-label mb-0" style={{ minWidth: '80px' }}>Position :</label>
                                                        <input
                                                            type="text"
                                                            className="form-control w-auto"
                                                            id="initialExpiration"
                                                            name="initialExpiration"
                                                            value={`${records[0]?.position || 'NA'}`}
                                                            //  value='Acting Director'
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                    <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                                        <label className="form-label mb-0" style={{ minWidth: '80px' }}>District :</label>
                                                        <input
                                                            type="text"
                                                            className="form-control w-auto"
                                                            id="initialExpiration"
                                                            name="initialExpiration"
                                                            value={`${records[0]?.distName || 'NA'}`}
                                                            // value='VALLEY STREAM 24'
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                    <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                                        <label className="form-label mb-0" style={{ minWidth: '80px' }}>Budget Code :</label>
                                                        <input
                                                            type="text"
                                                            className="form-control w-auto"
                                                            id="initialExpiration"
                                                            name="initialExpiration"
                                                            value={`${records[0]?.distNumber || 'NA'}`}
                                                            // value='344'
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                    <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                                        <label className="form-label mb-0" style={{ minWidth: '80px' }}>Program :</label>
                                                        <input
                                                            type="text"
                                                            className="form-control w-100"
                                                            id="initialExpiration"
                                                            name="initialExpiration"
                                                            value={`${records[0]?.site?.siteName || 'NA'}`}
                                                            // value='CARBONARO BEFORE1'
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row g-4">
                                                <div className='col-12 d-flex aling-items-start flex-lg-nowrap flex-md-wrap flex-wrap gap-3 w-100'>

                                                    {/* {schedularData?.some((schedule: any) =>
                                                                schedule?.some((timesheet: any) => !timesheet.paycode)
                                                            ) && ( */}
                                                    {
                                                        records.some((record: any) =>
                                                            !record.paycode || record.paycode === "" || record.paycode === undefined
                                                        ) && (
                                                            <div className='w-100'>
                                                                <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                                                    <h3 className="text-nowrap text-center formTitle m-0">Hours Worked</h3>
                                                                </div>
                                                                <div className="clockE mt-0">

                                                                    <table className="table m-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Day</th>
                                                                                <th>Date</th>
                                                                                <th>In</th>
                                                                                <th>Out</th>
                                                                                <th>Code</th>
                                                                                <th>#Hours</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {twoWeeksData.map(({ day, date }) => {
                                                                                const normalizedDate = moment(date).format("MM-DD-YYYY");
                                                                                let isAbsent = false;
                                                                                let reasonId = '';
                                                                                const rowData = editableData
                                                                                    .filter((row: any) => row.paycode === "" || row.paycode === null || row.paycode === undefined)
                                                                                    .find((row: any) => {
                                                                                        const rowTimeSheetDate = moment(row.timeSheetDate).format("MM-DD-YYYY");
                                                                                        if (rowTimeSheetDate === normalizedDate && records[0]?.siteID) {
                                                                                            isAbsent = row?.status === "Absent";
                                                                                            reasonId = row?.status === "Absent" ? row.reasonId : ''
                                                                                        }
                                                                                        return rowTimeSheetDate === normalizedDate && row.siteId == siteID;
                                                                                    });
                                                                                const schedule = schedularData?.filter((schedule: any) => {
                                                                                    const isWithinDateRange = moment(normalizedDate).isBetween(
                                                                                        moment(schedule?.startDate),
                                                                                        moment(schedule?.endDate),
                                                                                        'day',
                                                                                        '[]'
                                                                                    );
                                                                                    const dayMap: any = {
                                                                                        'Mon': 'monday',
                                                                                        'Tue': 'tuesday',
                                                                                        'Wed': 'wednesday',
                                                                                        'Thu': 'thursday',
                                                                                        'Fri': 'friday'
                                                                                    };
                                                                                    const fullDayName = dayMap[day];
                                                                                    const isDayScheduled = schedule[`${fullDayName}TimeIn`] !== null &&
                                                                                        schedule[`${fullDayName}TimeOut`] !== null;
                                                                                    return isWithinDateRange && isDayScheduled
                                                                                        && schedule.siteID === records[0]?.siteID;
                                                                                });
                                                                                const isRowDeleted = deletedSchedularData?.some((item: any) =>
                                                                                    moment(item.deletedDate).format("MM-DD-YYYY") === normalizedDate
                                                                                );
                                                                                const isRowEnabled = schedule && schedule.length > 0;
                                                                                const hoursWorked = rowData
                                                                                    ? calculateHoursWorked(rowData.timeIn, rowData.timeOut)
                                                                                    : 0;
                                                                                const isFieldDisabled =
                                                                                    !isRowEnabled ||
                                                                                    moment(normalizedDate).isAfter(moment(), 'day') ||
                                                                                    rowData?.reasonId;

                                                                                return (
                                                                                    <tr key={date}>
                                                                                        <td>{day}</td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={moment(date).format("MM-DD-YYYY")}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                className="form-control"
                                                                                                name="timeOut"
                                                                                                defaultValue={isAbsent ? "Absent" : rowData?.timeIn ? moment(rowData.timeIn, "HH:mm:ss").format("HH:mm") : ""}
                                                                                                onBlur={(e) => {
                                                                                                    if (isAbsent) return;
                                                                                                    const { value } = e.target;
                                                                                                    const formattedValue = value;
                                                                                                    handleChange(
                                                                                                        { target: { value: formattedValue, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                        rowData?.timesheetId, "timeIn", normalizedDate, "hourWorked", records[0]?.siteID
                                                                                                    );
                                                                                                }}
                                                                                                disabled={isFieldDisabled || isRowDeleted || isAbsent}
                                                                                            />

                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                className="form-control"
                                                                                                name="timeOut"
                                                                                                defaultValue={
                                                                                                    isAbsent
                                                                                                        ? "Absent"
                                                                                                        : rowData?.timeOut
                                                                                                            ? moment(rowData.timeOut, "HH:mm:ss").format("HH:mm")
                                                                                                            : ""
                                                                                                }
                                                                                                onBlur={(e) => {
                                                                                                    if (isAbsent) return;
                                                                                                    const { value } = e.target;
                                                                                                    const formattedValue = value;
                                                                                                    handleChange(
                                                                                                        { target: { value: formattedValue, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                        rowData?.timesheetId,
                                                                                                        "timeOut",
                                                                                                        normalizedDate,
                                                                                                        "hourWorked",
                                                                                                        records[0]?.siteID
                                                                                                    );
                                                                                                }}
                                                                                                disabled={isFieldDisabled || isRowDeleted || isAbsent}
                                                                                            />

                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={reasonId ? reasonId.toString() : rowData?.code || ""}
                                                                                                style={{ overflowWrap: "break-word" }}
                                                                                                disabled={isFieldDisabled || isRowDeleted}
                                                                                                readOnly
                                                                                                onChange={(e) => handleChange(e, rowData?.timesheetId, "code", normalizedDate, "hourWorked", records[0]?.siteID)}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                style={{ overflowWrap: "break-word" }}
                                                                                                value={rowData ? hoursWorked.toFixed(2) : ''}
                                                                                                disabled={true}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                                                    <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end justify-content-end">Total:
                                                                        <h3 className="text-nowrap text-start formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '80px' }}>
                                                                            {
                                                                                (Math.round(calculateTotalRegularHours(editableData, siteID)*4)/4).toFixed(2)
                                                                            } hours
                                                                            {/* {(Math.round(parseFloat(regularTotalHours?.toString().split('_')[0])*4)/4).toFixed(2)}
                                                                            {parseFloat(regularTotalHours?.toString().split('_')[1])}
                                                                            {(Math.round(regularTotalHours*4)/4).toFixed(2)} hours
                                                                            {`0 hours`} */}
                                                                        </h3>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    
                                                </div>

                                                <div className='col-12 d-flex aling-items-start flex-lg-nowrap flex-md-wrap flex-wrap gap-3 w-100'>
                                                {
                                                        records.some((record: any) =>
                                                            record.paycode && record.paycode !== ""
                                                        ) && (
                                                            <div className='w-100'>
                                                                <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                                                    <h3 className="text-nowrap  text-center formTitle m-0">Additional Hours / Extra Pay</h3>
                                                                </div>
                                                                <div className="clockE mt-0">
                                                                    <table className="table w-100 m-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Date
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Start
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Stop
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Explanation/Location
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Position
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Code
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    Budget Code
                                                                                </th>
                                                                                <th style={{ verticalAlign: "middle" }} className="text-center text-nowrap">
                                                                                    #Hours
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {twoWeeksData.map(({ day, date }) => {
                                                                                const normalizedDate = moment(date).format("MM-DD-YYYY");
                                                                                let isAbsent = false;
                                                                                let reasonId = '';
                                                                                const rowData = editableData
                                                                                    .filter((row: any) => row.paycode !== "" && row.paycode !== null && row.paycode !== undefined && records[0]?.siteID == row.siteId)
                                                                                    .find((row: any) => {
                                                                                        const rowTimeSheetDate = moment(row.timeSheetDate).format("MM-DD-YYYY");
                                                                                        if (rowTimeSheetDate === normalizedDate && records[0]?.siteID) {
                                                                                            isAbsent = row?.status === "Absent";
                                                                                            reasonId = row?.status === "Absent" ? row.reasonId : ''
                                                                                        }
                                                                                        return rowTimeSheetDate === normalizedDate && row?.siteId === records[0]?.siteID; // Added siteId check
                                                                                    });
                                                                                const additionalSchedule = additionalScheduleData?.filter((schedule: any) => {
                                                                                    const isDateMatch = moment(normalizedDate).isSame(moment(schedule?.date ? schedule?.date : schedule?.updatedDate), 'day');
                                                                                    const dayMap: any = {
                                                                                        'Mon': 'monday',
                                                                                        'Tue': 'tuesday',
                                                                                        'Wed': 'wednesday',
                                                                                        'Thu': 'thursday',
                                                                                        'Fri': 'friday'
                                                                                    };
                                                                                    const fullDayName = dayMap[day];
                                                                                    const isDayScheduled = schedule[`${fullDayName}TimeIn`] !== null &&
                                                                                        schedule[`${fullDayName}TimeOut`] !== null;

                                                                                    return isDateMatch && isDayScheduled && schedule.siteID === records[0]?.siteID;;
                                                                                });

                                                                                const isRowEnabled = additionalSchedule && additionalSchedule.length > 0;
                                                                                const isFieldDisabled =
                                                                                    !isRowEnabled ||
                                                                                    moment(normalizedDate).isAfter(moment(), 'day') ||
                                                                                    rowData?.reasonId;
                                                                                const hoursWorked = rowData
                                                                                    ? calculateAdditionalHour(rowData.additionalStart, rowData.additionalStop)
                                                                                    : 0;
                                                                                return (
                                                                                    <tr key={date}>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            <input
                                                                                                type="text"
                                                                                                value={moment(date).format("MM-DD-YYYY")}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            {/* <input
                                                                                                type={(!rowData?.timeIn && !rowData?.timeOut && !rowData?.additionalStart && !rowData?.additionalStop && rowData?.distNum) ? "text" : "time"}
                                                                                                value={(!rowData?.timeIn && !rowData?.timeOut && !rowData?.additionalStart && !rowData?.additionalStop ? "Absent" : moment(rowData.additionalStart, "HH:mm:ss").format("HH:mm") || "")}
                                                                                                disabled={isFieldDisabled}
                                                                                                onChange={(e) => handleChange(e, rowData?.timesheetId, "additionalStart", date, "additionalWorked", records[0]?.siteID)}
                                                                                            /> */}
                                                                                            <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                className="form-control"
                                                                                                name="additionalStart"
                                                                                                defaultValue={
                                                                                                    isAbsent
                                                                                                        ? "Absent"
                                                                                                        : rowData?.additionalStart
                                                                                                            ? moment(rowData.additionalStart, "HH:mm:ss").format("HH:mm")
                                                                                                            : ""
                                                                                                }
                                                                                                onBlur={(e) => {
                                                                                                    if (isAbsent) return;
                                                                                                    const { value } = e.target;
                                                                                                    const formattedValue = value; // Append ":00" to the time
                                                                                                    handleChange(
                                                                                                        { target: { value: formattedValue, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                        rowData?.timesheetId,
                                                                                                        "additionalStart",
                                                                                                        normalizedDate,
                                                                                                        "additionalWorked",
                                                                                                        records[0]?.siteID
                                                                                                    );
                                                                                                }}
                                                                                                disabled={isFieldDisabled || isAbsent}
                                                                                            />

                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            {/* <input
                                                                                                type={(!rowData?.timeIn && !rowData?.timeOut && !rowData?.additionalStart && !rowData?.additionalStop && rowData?.distNum) ? "text" : "time"}
                                                                                                value={(!rowData?.timeIn && !rowData?.timeOut && !rowData?.additionalStop ? "Absent" : moment(rowData.additionalStop, "HH:mm:ss").format("HH:mm") || "")}
                                                                                                disabled={isFieldDisabled}

                                                                                                onChange={(e) => handleChange(e, rowData?.timesheetId, "additionalStop", date, "additionalWorked", records[0]?.siteID)}
                                                                                            /> */}
                                                                                            <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                className="form-control"
                                                                                                name="additionalStop"
                                                                                                defaultValue={
                                                                                                    isAbsent
                                                                                                        ? "Absent"
                                                                                                        : rowData?.additionalStop
                                                                                                            ? moment(rowData.additionalStop, "HH:mm:ss").format("HH:mm")
                                                                                                            : ""
                                                                                                }
                                                                                                onBlur={(e) => {
                                                                                                    if (isAbsent) return;
                                                                                                    const { value } = e.target;
                                                                                                    const formattedValue = value; // Append ":00" to the time
                                                                                                    handleChange(
                                                                                                        { target: { value: formattedValue, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                        rowData?.timesheetId,
                                                                                                        "additionalStop",
                                                                                                        normalizedDate,
                                                                                                        "additionalWorked",
                                                                                                        records[0]?.siteID
                                                                                                    );
                                                                                                }}
                                                                                                disabled={isFieldDisabled || isAbsent}
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            <textarea
                                                                                                value={allSiteData?.find((site: any) => site.siteID === rowData?.siteId)?.siteName || ""}
                                                                                                readOnly
                                                                                                rows={4}
                                                                                                style={{ resize: "none" }}
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle", whiteSpace: "normal" }} className="text-center text-nowrap">
                                                                                            <textarea
                                                                                                style={{ resize: "none" }}
                                                                                                value={rowData?.position || ""}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            <input
                                                                                                type="text"
                                                                                                value={rowData?.paycode || ""}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            <input
                                                                                                type="text"
                                                                                                value={rowData?.distNum || ""}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ verticalAlign: "middle" }} className="text-center">
                                                                                            <input
                                                                                                type="text"
                                                                                                value={rowData ? hoursWorked.toFixed(2) : ''}
                                                                                                disabled={true}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                                                    <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end justify-content-end">Total:
                                                                        <h3 className="text-nowrap text-start formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '80px' }}>
                                                                            {/* {`0 hours`} */}
                                                                            {(Math.round(additionalTotalHours*4)/4).toFixed(2)} hours
                                                                        </h3>
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div className='row mb-3 mt-0 g-4 mx-0 px-0'>
                                                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <table className="table w-100 m-0 mt-2">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ verticalAlign: "middle", width: '50%' }} className="text-start text-nowrap">
                                                                        <label>
                                                                            <b>For documenting time not at work indicate</b>
                                                                        </label>
                                                                    </th>
                                                                    <th style={{ verticalAlign: "middle", width: '50%' }} className="text-start text-nowrap">
                                                                        <label></label>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-wrap">
                                                                        <label>
                                                                            Sick (Personal Illness or Immediate Family) /01
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-start">
                                                                        <label>
                                                                            Jury Duty /02
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-wrap">
                                                                        <label>
                                                                            Personal Business /03
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle", width: '50%' }} className="py-0 text-start">
                                                                        <label>
                                                                            Bereavement (Indicate Relationship) /04
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "middle", width: '50%' }} className="py-1 text-wrap">
                                                                        <label>
                                                                            School Closed (as Indicated on Calendar) /05
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle", width: '50%' }} className="py-1 text-start">
                                                                        <label>
                                                                            Emergency Closing<br />
                                                                            (Snow Days, other authorized emergencies) /06
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                                        <table className="table w-100 m-0 mt-2">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                                        <label>
                                                                            <b>Code</b>
                                                                        </label>
                                                                    </th>
                                                                    <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                                        <label>
                                                                            <b>Explanation / Location</b>
                                                                        </label>
                                                                    </th>
                                                                    <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                                        <label>
                                                                            <b>Code</b>
                                                                        </label>
                                                                    </th>
                                                                    <th style={{ verticalAlign: "middle" }} className="text-start text-nowrap">
                                                                        <label>
                                                                            <b>Explanation / Location</b>
                                                                        </label>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            1
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            Assigned Role of Acting Director
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            3
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            Group Leader assigned to role of Small Group
                                                                            Leader
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            2
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            Assigned to another program site Permanent
                                                                            sub assigned to a program outside of cluster
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            4
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            Group Leader assigned to role of Head of
                                                                            Group
                                                                        </label>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            22
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                            Assigned to another program site Permanent sub assigned to a program outside of cluster/double
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                        </label>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                        <label>
                                                                        </label>
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className='w-100'>
                                                    <hr />
                                                </div>
                                            </div>
                                        </>
                                    ))
                                ) : (
                                    <span className='align-items-center w-100 d-inline-flex justify-content-center'
                                        style={{ minHeight: '110px', fontSize: '20px' }}>Loading...</span>
                                )}
                                <div>
                                    {groupedData && Object.keys(groupedData).length > 0 ? (
                                        <>
                                            <div className='col-12 pt-lg-4 pt-md-3 pt-3 d-flex align-items-center gap-lg-4 gap-md-3 gap-3 flex-lg-nowrap flex-md-nowrap flex-sm-wrap flex-wrap'>
                                                <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                                    <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total:
                                                        <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>
                                                            {/* {0} hours */}
                                                            {(Math.round(((Math.round(regularTotalHours*4)/4) + additionalTotalHours)*4)/4).toFixed(2)} hours
                                                        </h3>
                                                    </h3>
                                                </div>
                                                <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                                    <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total Lateness:
                                                        <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>
                                                            {totalLateness}
                                                            {/* {0} */}
                                                        </h3>
                                                    </h3>
                                                </div>
                                                <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                                    <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total Left Early:
                                                        <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>
                                                            {totalLeftEarly}
                                                            {/* {0} */}
                                                        </h3>
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                                <button type='button' onClick={onClose} className="btn btn-transparent ps-3 pe-4">
                                                    Cancel
                                                </button>
                                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1" &&
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ps-3 pe-4"
                                                        onClick={handleEditChange}
                                                    >
                                                        {loading ? (
                                                            <span className="btnloader loader"></span>
                                                        ) : (
                                                            <span>Update</span>
                                                        )}
                                                    </button>
                                                }

                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>

                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default TimeSheetFormModal;
