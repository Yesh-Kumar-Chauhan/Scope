import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getReport, fetchLookup, fetchPersonnelSearch } from '../../../apis/personnelApi';
import { getSiteDataByDistrictId } from '../../../apis/sitesApi';
import axiosInstance from '../../../utils/axiosConfig';
import Select from 'react-select';
import { fetchAllDistrict } from '../../../apis/districtsApi';
import { fetchAllSites } from '../../../apis/sitesApi';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { getUserData } from "../../../utils/utils";
import { bulkUpdateTimeSheetForm, getSchedularDataForPersonDate } from '../../../apis/personnelApi';
interface DateEntry {
    day: string;
    date: string;
}

interface BulkTimeSheetFormProps {
    initialData: DateEntry[]; // Define the expected shape of the `data` prop
    allDistricts: any
}

const BulkTimeSheetForm: React.FC<BulkTimeSheetFormProps> = ({ initialData, allDistricts }) => {
    const [groupedData, setGroupedData] = useState<Record<number, any[]>>({});
    const [allData, setAllData] = useState<any>({});
    const [twoWeeksData, setTwoWeeksData] = useState<DateEntry[]>([]);
    const [editableData, setEditableData] = useState([]);
    const [allDistrictData, setAllDistrictData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState(initialData);
    const userData = getUserData();

    const groupSchedulesBySiteId = (person: any) => {
        if (!person || !person.schedules) {
            return [];
        }
        const siteIdMap: any = {};
        person.schedules.forEach((schedule: any) => {
            if (schedule && schedule.siteId !== undefined) {
                if (!siteIdMap[schedule.siteId]) {
                    siteIdMap[schedule.siteId] = {
                        siteId: schedule.siteId,
                        firstName: person.firstname,
                        personId: person.personId,
                        lastName: person.lastname,
                        position: schedule.position,
                        distName: schedule.distName,
                        distNumber: schedule.distNumber,
                        siteName: schedule.siteName,
                        schedules: [schedule],
                        attandance: person.attendance
                    };
                } else {
                    siteIdMap[schedule.siteId].schedules.push(schedule);
                }
            }
        });
        return Object.values(siteIdMap);
    };
    // useE
    const updateDataGlobally = (updatedData: any[]) => {
        setData(updatedData);
    };
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const calculateAttendanceMetrics = (data: any) => {
        let lateness = 0;
        let absence = 0;
        let leftEarly = 0;

        data.forEach((entry: any) => {
            const { timeIn, timeOut, siteTimeIn, siteTimeOut, timeSheetDate, additionalStart, additionalStop } = entry;

            // Convert time strings to Date objects
            const timeInDate = timeIn ? new Date(`${timeSheetDate?.substring(0, 10)}T${timeIn}`) : null;
            const timeOutDate = timeOut ? new Date(`${timeSheetDate?.substring(0, 10)}T${timeOut}`) : null;
            const siteTimeInDate = new Date(`${timeSheetDate?.substring(0, 10)}T${siteTimeIn}`);
            const siteTimeOutDate = new Date(`${timeSheetDate?.substring(0, 10)}T${siteTimeOut}`);
            const additionalStartDate = additionalStart ? new Date(`${timeSheetDate?.substring(0, 10)}T${additionalStart}`) : null;
            const additionalStopDate = additionalStop ? new Date(`${timeSheetDate?.substring(0, 10)}T${additionalStop}`) : null;

            // Check for absence
            if (!timeInDate && !timeOutDate && !additionalStartDate && !additionalStopDate) {
                absence++;
            } else {
                // Check for lateness
                if ((timeInDate && timeInDate > siteTimeInDate) || (additionalStartDate && additionalStartDate > siteTimeInDate)) {
                    lateness++;
                }
                // Check for leaving early
                if ((timeOutDate && timeOutDate < siteTimeOutDate) || (additionalStopDate && additionalStopDate < siteTimeOutDate)) {
                    leftEarly++;
                }
            }
        });

        return { lateness, absence, leftEarly };
    };
    useEffect(() => {
        const generateTwoWeeksData = () => {
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            const currentDate = moment();
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
        setTwoWeeksData(data);
    }, [data, initialData]);

    // const calculateHoursWorked = (
    //     timeIn: string | null,
    //     timeOut: string | null,
    // ): number => {
    //     if (!timeIn || !timeOut) return 0; // Ensure required fields are present

    //     const timeInMoment = moment(timeIn || "", "HH:mm");
    //     const timeOutMoment = moment(timeOut || "", "HH:mm");
    //     let workedHours = timeOutMoment.diff(timeInMoment, "hours", true); // Calculate hours
    //     return workedHours > 0 ? workedHours : 0; // Ensure non-negative hours
    // };
    const calculateAdditionalHour = (
        timeIn: string | null,
        timeOut: string | null,
    ): number => {
        if (!timeIn || !timeOut) return 0; // Ensure required fields are present

        const timeInMoment = moment(timeIn || "", "HH:mm");
        const timeOutMoment = moment(timeOut || "", "HH:mm");
        let workedHours = timeOutMoment.diff(timeInMoment, "hours", true); // Calculate hours
        return workedHours > 0 ? workedHours : 0; // Ensure non-negative hours
    };
    const isRowEnabled = (schedule: any, date: any) => {
        const normalizedDate = moment(date);
        const isWithinDateRange = normalizedDate.isBetween(
            moment(schedule.startDate),
            moment(schedule.endDate),
            'day',
            '[]'
        );

        const dayMap: any = {
            Mon: 'monday', Tue: 'tuesday', Wed: 'wednesday',
            Thu: 'thursday', Fri: 'friday'
        };
        const dayName = dayMap[moment(date).format('ddd')];

        const isDayScheduled =
            schedule[`${dayName}TimeIn`] !== 'N/A' &&
            schedule[`${dayName}TimeOut`] !== 'N/A';

        return isWithinDateRange && isDayScheduled && !normalizedDate.isAfter(moment(), 'day');
    };

    // const [isAbsent,setIsAbsent]=useState(false);
    const findMatchingTimesheet = (attendance: any, schedules: any, date: any, siteId: any, type: string) => {
        const attendanceData = attendance;
        const normalizedDate = moment(date).format('MM-DD-YYYY');
        

        for (const schedule of schedules) {
            if (schedule.siteId !== siteId) continue;
            const matchingTimesheet = schedule.timesheets.find((ts: any) => {
                const isRegular = (ts.paycode === "" || ts.paycode === null || ts.paycode === undefined);
                const isAdditional = (ts.paycode !== null && ts.paycode !== "");
                // Check date match and type condition
                return moment(ts.timeSheetDate).format('MM-DD-YYYY') === normalizedDate &&
                    ((type === 'regular' && isRegular) || (type === 'additional' && isAdditional));
            });

            if (matchingTimesheet) return matchingTimesheet;
        }

        return null;
    };

    const calculateHoursWorked = (timeIn: any, timeOut: any) => {
        if (!timeIn || !timeOut) return 0;
        const start = moment(timeIn, 'HH:mm:ss');
        const end = moment(timeOut, 'HH:mm:ss');
        return moment.duration(end.diff(start)).asHours();
    };

    // const handleChange = async (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     timesheetID: string | null,
    //     field: string,
    //     date: string,
    //     timesheetType: string,
    //     personId: any,
    //     siteId:any
    // ) => {
    //     if (!personId) {
    //         console.warn('No personId provided');
    //         return;
    //     }
    //     let { value, type } = e.target;
    //     try {
    //         const scheduleData = await getSchedularDataForPersonDate(personId, date);
    //         if (!scheduleData?.length) {
    //             console.warn('No schedule data found');
    //             toast.error(`No schedule data found on ${date}`);
    //             return;
    //         }

    //         let regularHour: any = null;
    //         let additionalHour: any = null;
    //         const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');

    //         scheduleData.forEach((row: any) => {
    //             if (!row.paycode) {
    //                 regularHour = row;
    //             } else {
    //                 additionalHour = row;
    //             }
    //         });

    //         if (type === "time" && value) {
    //             value = value.length === 5 ? `${value}:00` : value;
    //         }

    //         setGroupedData((prevData: Record<number, any[]>) => {
    //             const dayMap: { [key: string]: string } = {
    //                 'Mon': 'monday',
    //                 'Tue': 'tuesday',
    //                 'Wed': 'wednesday',
    //                 'Thu': 'thursday',
    //                 'Fri': 'friday',
    //             };

    //             const currentDay = moment(date).format('ddd');
    //             const dayKey = dayMap[currentDay];

    //             const scheduleForDay = timesheetType === 'hourWorked'
    //                 ? regularHour || scheduleData[0]
    //                 : additionalHour || scheduleData[0];

    //             const existingPersonData = prevData[personId] || [];

    //             const timesheetIndex = existingPersonData.findIndex(
    //                 (timesheet: any) =>
    //                     moment(timesheet.timeSheetDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') &&
    //                     (timesheetType === 'hourWorked' ? !timesheet.paycode : timesheet.paycode)
    //             );

    //             if (timesheetIndex !== -1) {
    //                 // Update existing timesheet
    //                 const currentSchedules = existingPersonData[timesheetIndex].schedules || [];
    //                 const newSchedules = scheduleForDay.schedules || [];

    //                 const updatedTimesheet = {
    //                     ...existingPersonData[timesheetIndex],
    //                     [field]: value,
    //                     siteTimeIn: scheduleForDay[`${dayKey}TimeIn`] || existingPersonData[timesheetIndex].siteTimeIn,
    //                     siteTimeOut: scheduleForDay[`${dayKey}TimeOut`] || existingPersonData[timesheetIndex].siteTimeOut,
    //                     schedules: currentSchedules.length > 0
    //                         ? currentSchedules.map((schedule: any) => ({
    //                             ...schedule,
    //                             [`${dayKey}TimeIn`]: scheduleForDay[`${dayKey}TimeIn`] || schedule[`${dayKey}TimeIn`],
    //                             [`${dayKey}TimeOut`]: scheduleForDay[`${dayKey}TimeOut`] || schedule[`${dayKey}TimeOut`]
    //                         }))
    //                         : newSchedules
    //                 };

    //                 const updatedPersonData = [...existingPersonData];
    //                 updatedPersonData[timesheetIndex] = updatedTimesheet;

    //                 return {
    //                     ...prevData,
    //                     [personId]: updatedPersonData,
    //                 };
    //             } else {
    //                 // Create new timesheet
    //                 const newRow = {
    //                     districtID: allDistrictData?.find((district: any) =>
    //                         district.distNum === scheduleForDay.distNumber
    //                     )?.districtId || null,
    //                     distNum: scheduleForDay.distNumber,
    //                     siteID: scheduleForDay?.siteID || null,
    //                     siteName: scheduleForDay?.siteName || null,
    //                     schoolID: null,
    //                     personID: scheduleForDay?.personID || null,
    //                     position: scheduleForDay?.position || null,
    //                     deviceID: null,
    //                     type: 0,
    //                     createdBy: null,
    //                     modifiedBy: null,
    //                     clockInLocal: null,
    //                     clockOutLocal: null,
    //                     notesHeader: null,
    //                     notesDetails: null,
    //                     siteTimeIn: scheduleForDay[`${dayKey}TimeIn`] || null,
    //                     siteTimeOut: scheduleForDay[`${dayKey}TimeOut`] || null,
    //                     externalEventId: null,
    //                     paycode: timesheetType === 'hourWorked' ? null : scheduleForDay?.paycode,
    //                     timesheetID: null,
    //                     timeSheetDate: formattedDate,
    //                     schedules: timesheetType === 'hourWorked'
    //                         ? regularHour?.schedules || []
    //                         : additionalHour?.schedules || [],
    //                     [field]: value,
    //                 };

    //                 return {
    //                     ...prevData,
    //                     [personId]: [...existingPersonData, newRow],
    //                 };
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error updating timesheet:', error);
    //     }
    // };

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        timesheetID: string | null,
        field: string,
        date: string,
        timesheetType: string,
        personId: any,
        siteId: any,
    ) => {
                  const dayMap: { [key: string]: string } = {
                    'Mon': 'monday',
                    'Tue': 'tuesday',
                    'Wed': 'wednesday',
                    'Thu': 'thursday',
                    'Fri': 'friday',
                };

                  const currentDay = moment(date).format('ddd');
                const dayKey = dayMap[currentDay];

                

        if (!personId || !siteId) {
            console.warn('No personIdsiteTimeInor siteId provided');
            return;
        }
        let { value, type } = e.target;
        try {
            const scheduleData = await getSchedularDataForPersonDate(personId, date);
            if (!scheduleData?.length) {
                console.warn('No schedule data found');
                toast.error(`No schedule data found on ${date}`);
                return;
            }

            // Format time value
            if (type === "time" && value) {
                value = value.length === 5 ? `${value}:00` : value;
            }

            const updatedData = data.map((person: any) => {
                if (person.personId !== personId) return person; // Skip unrelated persons

                // Update the schedules for the matching person
                const updatedSchedules = person.schedules.map((schedule: any) => {
                    if (schedule.siteId !== siteId) return schedule; // Skip unrelated sites

                    const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');

                    // Check for matching timesheet
                    const matchingTimesheetIndex = schedule.timesheets.findIndex(
                        (timesheet: any) =>
                            moment(timesheet.timeSheetDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') &&
                            (timesheetType === 'hourWorked' ? !timesheet.paycode : timesheet.paycode)
                    );

                    if (matchingTimesheetIndex !== -1) {
                        // Update existing timesheet
                        const updatedTimesheets = [...schedule.timesheets];
                        updatedTimesheets[matchingTimesheetIndex] = {
                            ...updatedTimesheets[matchingTimesheetIndex],
                            [field]: value,
                        };

                        return {
                            ...schedule,
                            timesheets: updatedTimesheets,
                        };
                    } else {
                        // Create new timesheet
                        const newTimesheet = {
                            timesheetID: null,
                            personId,
                            siteId,
                            timeSheetDate: formattedDate,
                            [field]: value,
                            paycode: timesheetType === 'hourWorked' ? null : schedule.paycode,
                            position: schedule.position,
                            siteTimeIn: schedule[`${dayKey}TimeIn`],
                            siteTimeOut: schedule[`${dayKey}TimeOut`],
                            //siteTimeIn: schedule.mondayTimeIn || null,
                            //siteTimeOut: schedule.mondayTimeOut || null,
                            schedules: [],
                        };

                        return {
                            ...schedule,
                            timesheets: [...schedule.timesheets, newTimesheet],
                        };
                    }
                });

                return {
                    ...person,
                    schedules: updatedSchedules,
                };
            });

            // Call global updater function
            updateDataGlobally(updatedData);
        } catch (error) {
            console.error('Error updating timesheet:', error);
        }
    };


    const calculateTotalHours = (data: any[]): number => {
        return data.reduce((total, row) => {
            const hoursWorked = calculateHoursWorked(
                row.timeIn || "",
                row.timeOut || "",
            );
            return total + hoursWorked;
        }, 0);
    };
    const calculateAdditionalHours = (data: any[]): number => {
        return data.reduce((total, row) => {
            const hoursWorked = calculateHoursWorked(
                row.additionalStart || "",
                row.additionalStop || "",
            );
            return total + hoursWorked;
        }, 0);
    };

    const regularTotalHours = calculateTotalHours(
        editableData.filter((row: any) => row.paycode === "" || row.paycode === null || row.paycode === undefined)
    );
    const additionalTotalHours = calculateAdditionalHours(
        editableData.filter((row: any) => row.paycode !== "" && row.paycode !== null && row.paycode !== undefined)
    );
    const prepareSubmissionData = (data: any[]) => {
        const submissionArray: any[] = [];

        data.forEach((person: any) => {
            person.schedules.forEach((schedule: any) => {
                schedule.timesheets.forEach((timesheet: any) => {
                    const { districtId, siteId, siteName, schoolID, personId, position,
                        deviceID, type, createdBy, modifiedBy, clockInLocal, clockOutLocal,
                        notesHeader, notesDetails, siteTimeIn, siteTimeOut, externalEventId,
                        paycode, timesheetId, timeSheetDate, ...dynamicFields
                    } = timesheet;
                    // Add to the submission array
                    submissionArray.push({
                        districtId, siteID: siteId, siteName, schoolID, personId,
                        position, deviceID, type, createdBy, modifiedBy, clockInLocal, clockOutLocal,
                        notesHeader, notesDetails, siteTimeIn, siteTimeOut, externalEventId,
                        paycode, timesheetId, timeSheetDate, ...dynamicFields,
                    });
                });
            });
        });

        return submissionArray;
    };
    const submitEditChange = async () => {
        setLoading(true);
        try {
            const submissionData = prepareSubmissionData(data);

            if (submissionData.length === 0) {
                console.warn('No timesheets to submit.');
                toast.error('No timesheets to submit.');
                return;
            }

            // Step 2: Call the edit API with the prepared data
            const response = await bulkUpdateTimeSheetForm(submissionData);
        } catch (error) {
            console.error('Error submitting timesheets:', error);
            toast.error('An error occurred while submitting timesheets.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="DashboardPage py-3">
            {data.map((personData: any) => {
                const groupedSites = groupSchedulesBySiteId(personData);
                console.log("groupedSitesgroupedSites", groupedSites)
                return (
                    <div key={personData.personId}>
                        {groupedSites.map((siteGroup: any, siteIndex: number) => (
                            <>
                                <div key={siteIndex} className='timeSheetpage editAsignment'>
                                    <div className="formCard mt-0 p-0 border-0">
                                        <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3">
                                            <form className="DistrictForm w-100">
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
                                                                value={`${siteGroup?.firstName} ${siteGroup.lastName}`}
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
                                                                value={`${siteGroup?.position}`}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-end">
                                                        <div className="mb-0 w-100 d-flex align-items-center gap-3">
                                                            <label className="form-label mb-0" style={{ minWidth: '80px' }}>District :</label>
                                                            <input
                                                                type="text"
                                                                className="form-control w-100"
                                                                id="initialExpiration"
                                                                name="initialExpiration"
                                                                value={`${siteGroup?.distName}`}
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
                                                                value={`${siteGroup?.distNumber}`}
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
                                                                value={`${siteGroup?.siteName}`}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row g-4">
                                                    <div className='col-12 '>
                                                        <div className='d-flex aling-items-start flex-lg-nowrap flex-md-wrap flex-wrap gap-3 w-100 overflow-auto'>
                                                            {siteGroup.schedules.some((schedule: any) => schedule.paycode == "N/A"
                                                                // schedule.schedules.some((timesheet: any) => !timesheet.paycode)
                                                            ) && (<div className='w-100'>
                                                                <div className="FormTitleWithdivider mt-2 mb-2 position-relative">
                                                                    <h3 className="text-nowrap text-center formTitle m-0">Hours Worked</h3>
                                                                    {/* <h3 className="text-nowrap text-center formTitle m-0">(Record Actual time worked)</h3> */}
                                                                </div>
                                                                <div className="clockE mt-0">

                                                                    <table className="table  m-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Day</th>
                                                                                <th>Date</th>
                                                                                <th>In</th>
                                                                                <th>Out</th>
                                                                                {/* <th>Lunch Out</th> */}
                                                                                {/* <th>Code</th> */}
                                                                                <th>#Hours</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {twoWeeksData.map(({ day, date }) => {
                                                                                const normalizedDate = moment(date).format('MM-DD-YYYY');
                                                                                const relevantSchedule = siteGroup?.schedules.find((schedule: any) =>
                                                                                    isRowEnabled(schedule, normalizedDate)
                                                                                );
                                                                                let isAbsent: any
                                                                                if (siteGroup?.attandance.length > 0) {
                                                                                    isAbsent = siteGroup?.attandance?.find((att: any) => {
                                                                                        return moment(att.date).format("MM-DD-YYYY") === normalizedDate && siteGroup?.attandance.siteid == siteGroup.siteId  && siteGroup.siteId && !att.paycode;
                                                                                    });
                                                                                }
                                                                                const matchingTimesheet = findMatchingTimesheet(siteGroup?.attandance, siteGroup?.schedules, normalizedDate, siteGroup.siteId, 'regular');
                                                                                const hoursWorked = matchingTimesheet
                                                                                    ? calculateHoursWorked(matchingTimesheet?.timeIn, matchingTimesheet?.timeOut)
                                                                                    : 0;
                                                                                return (
                                                                                    <tr key={normalizedDate}>
                                                                                        <td>{day}</td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={normalizedDate}
                                                                                                readOnly
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            {/* <input
                                                                                                // type={ "time"}
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                value={isAbsent ? "Absent" : (matchingTimesheet?.timeIn ? moment(matchingTimesheet.timeIn, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                disabled={!relevantSchedule || isAbsent}
                                                                                                onBlur={(e) => handleChange(e, matchingTimesheet?.timesheetID, "timeIn", normalizedDate, "hourWorked", siteGroup?.personId, siteGroup.siteId)}
                                                                                                // onChange={(e) => handleChange(e, matchingTimesheet?.timesheetID, "timeIn", normalizedDate, "hourWorked", siteGroup?.personId, siteGroup.siteId)}
                                                                                            /> */}
                                                                                            <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                defaultValue={isAbsent ? "Absent" : (matchingTimesheet?.timeIn ? moment(matchingTimesheet.timeIn, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                disabled={!relevantSchedule || isAbsent}
                                                                                                onBlur={(e) => {
                                                                                                    if (isAbsent) return;
                                                                                                    const { value } = e.target;
                                                                                                    handleChange(
                                                                                                        { target: { value, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                        matchingTimesheet?.timesheetID,
                                                                                                        "timeIn",
                                                                                                        normalizedDate,
                                                                                                        "hourWorked",
                                                                                                        siteGroup?.personId,
                                                                                                        siteGroup.siteId
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            {/* <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                value={isAbsent ? "Absent" : (matchingTimesheet?.timeOut ? moment(matchingTimesheet.timeOut, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                disabled={!relevantSchedule || isAbsent}
                                                                                                onChange={(e) => handleChange(e, matchingTimesheet?.timesheetID, "timeOut", normalizedDate, "hourWorked", siteGroup?.personId, siteGroup.siteId)}
                                                                                            /> */}
                                                                                            <input
                                                                                                type={isAbsent ? "text" : "time"}
                                                                                                defaultValue={isAbsent ? "Absent" : (matchingTimesheet?.timeOut ? moment(matchingTimesheet.timeOut, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                disabled={!relevantSchedule || isAbsent}
                                                                                                onBlur={(e) => {
                                                                                                    if (isAbsent) return;
                                                                                                    const { value } = e.target;
                                                                                                    handleChange(
                                                                                                        { target: { value, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                        matchingTimesheet?.timesheetID,
                                                                                                        "timeOut",
                                                                                                        normalizedDate,
                                                                                                        "hourWorked",
                                                                                                        siteGroup?.personId,
                                                                                                        siteGroup.siteId
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </td>
                                                                                        {/* <td>
                                                                                            <input
                                                                                                style={{ overflowWrap: "break-word" }}
                                                                                                type="text"
                                                                                                value={isAbsent?.reasonId || ''}
                                                                                                disabled={!relevantSchedule}
                                                                                                readOnly
                                                                                                onChange={(e) => handleChange(e, matchingTimesheet?.timesheetID, "code", normalizedDate, "hourWorked", siteGroup?.personId, siteGroup.siteId)}
                                                                                            />
                                                                                        </td> */}
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                style={{
                                                                                                    overflowWrap: "break-word",
                                                                                                }}
                                                                                                // value={rowData ? hoursWorked.toFixed(2) : ''}
                                                                                                // disabled={true}
                                                                                                // readOnly
                                                                                                value={hoursWorked.toFixed(2)}
                                                                                                disabled
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
                                                                        <h3 className="text-nowrap text-start formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '80px' }}>{`${regularTotalHours.toFixed(2)}hours`}</h3>
                                                                    </h3>
                                                                </div>

                                                            </div>
                                                                )}
                                                        </div>
                                                      
                                                        <div className='col-12 '>
                                                        <div className='d-flex aling-items-start flex-lg-nowrap flex-md-wrap flex-wrap gap-3 w-100 overflow-auto'>
                                                            {siteGroup.schedules.some((schedule: any) =>schedule.paycode != "N/A") && (
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
                                                                                        const relevantSchedule = personData?.schedules.find((schedule: any) =>
                                                                                            isRowEnabled(schedule, normalizedDate)
                                                                                        );

                                                                                        // Find matching timesheet
                                                                                        let isAbsent: any
                                                                                        if (siteGroup?.attandance.length > 0) {
                                                                                            isAbsent = siteGroup?.attandance?.find((att: any) => {
                                                                                                return moment(att.date).format("MM-DD-YYYY") === normalizedDate  && siteGroup.siteId;
                                                                                            });
                                                                                        }
                                                                                        
                                                                                        
                                                                                        let additionalSiteAttendanceData: any
                                                                                        if (siteGroup?.attandance.length > 0) {
                                                                                            debugger;
                                                                                            additionalSiteAttendanceData = siteGroup?.attandance?.find((att: any) => {
                                                                                                return att.siteid == siteGroup.siteId;
                                                                                            });
                                                                                        }
                                                                                        const matchingTimesheet = findMatchingTimesheet(siteGroup.attendance, personData?.schedules, normalizedDate, siteGroup.siteId, 'additional');

                                                                                        const hoursWorked = matchingTimesheet
                                                                                            ? calculateHoursWorked(matchingTimesheet.timeIn, matchingTimesheet.timeOut)
                                                                                            : 0;
                                                                                        return (
                                                                                            <tr key={date}>
                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        value={moment(date).format("MM-DD-YYYY")}
                                                                                                        readOnly
                                                                                                    />
                                                                                                </td>

                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    {/* <input
                                                                                                        type={isAbsent ? "text" : "time"}
                                                                                                        value={isAbsent ? "Absent" : (matchingTimesheet?.additionalStart ? moment(matchingTimesheet.additionalStart, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                        disabled={!relevantSchedule || isAbsent}
                                                                                                        onChange={(e) =>
                                                                                                            handleChange(
                                                                                                                e,
                                                                                                                matchingTimesheet?.timesheetID,
                                                                                                                "additionalStart",
                                                                                                                date,
                                                                                                                "additionalWorked",
                                                                                                                siteGroup?.personId,
                                                                                                                siteGroup.siteId
                                                                                                            )
                                                                                                        }
                                                                                                    /> */}
                                                                                                    <input
                                                                                                        type={isAbsent ? "text" : "time"}
                                                                                                        defaultValue={isAbsent ? "Absent" : (matchingTimesheet?.additionalStart ? moment(matchingTimesheet.additionalStart, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                        disabled={!relevantSchedule || isAbsent}
                                                                                                        onBlur={(e) => {
                                                                                                            if (isAbsent) return;
                                                                                                            const { value } = e.target;
                                                                                                            handleChange(
                                                                                                                { target: { value, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                                matchingTimesheet?.timesheetID,
                                                                                                                "additionalStart",
                                                                                                                date,
                                                                                                                "additionalWorked",
                                                                                                                siteGroup?.personId,
                                                                                                                siteGroup.siteId
                                                                                                            );
                                                                                                        }}
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    {/* <input
                                                                                                        type={isAbsent ? "text" : "time"}
                                                                                                        value={isAbsent ? "Absent" : (matchingTimesheet?.additionalStop ? moment(matchingTimesheet.additionalStop, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                        disabled={!relevantSchedule || isAbsent}
                                                                                                        onChange={(e) =>
                                                                                                            handleChange(
                                                                                                                e,
                                                                                                                matchingTimesheet?.timesheetID,
                                                                                                                "additionalStop",
                                                                                                                date,
                                                                                                                "additionalWorked",
                                                                                                                siteGroup?.personId,
                                                                                                                siteGroup.siteId
                                                                                                            )
                                                                                                        }
                                                                                                    /> */}
                                                                                                    <input
                                                                                                        type={isAbsent ? "text" : "time"}
                                                                                                        defaultValue={isAbsent ? "Absent" : (matchingTimesheet?.additionalStop ? moment(matchingTimesheet.additionalStop, "HH:mm:ss").format("HH:mm") : "")}
                                                                                                        disabled={!relevantSchedule || isAbsent}
                                                                                                        onBlur={(e) => {
                                                                                                            if (isAbsent) return;
                                                                                                            const { value } = e.target;
                                                                                                            handleChange(
                                                                                                                { target: { value, type: "time" } } as React.ChangeEvent<HTMLInputElement>,
                                                                                                                matchingTimesheet?.timesheetID,
                                                                                                                "additionalStop",
                                                                                                                date,
                                                                                                                "additionalWorked",
                                                                                                                siteGroup?.personId,
                                                                                                                siteGroup.siteId
                                                                                                            );
                                                                                                        }}
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    <textarea
                                                                                                        value={matchingTimesheet?.siteName || ""}
                                                                                                        readOnly
                                                                                                        rows={4}
                                                                                                        style={{ resize: "none" }}
                                                                                                    />
                                                                                                </td>
                                                                                                <td
                                                                                                    className="text-center text-nowrap"
                                                                                                    style={{ verticalAlign: "middle", whiteSpace: "normal" }}
                                                                                                >
                                                                                                    <textarea
                                                                                                        value={matchingTimesheet?.position || ""}
                                                                                                        readOnly
                                                                                                        rows={4}
                                                                                                        style={{ resize: "none" }}
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        value={isAbsent?additionalSiteAttendanceData?.paycode:matchingTimesheet?.paycode}
                                                                                                        readOnly
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        value={matchingTimesheet?.districtName || ""}
                                                                                                        readOnly
                                                                                                    />
                                                                                                </td>
                                                                                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        value={matchingTimesheet ? hoursWorked.toFixed(2) : ""}
                                                                                                        readOnly
                                                                                                        disabled
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
                                                                                    {`${additionalTotalHours.toFixed(2)}hours`}</h3>
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                          </div>
                                                        </div>


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
                                                                                {/* 4 */}
                                                                            </label>
                                                                        </td>
                                                                        <td style={{ verticalAlign: "middle" }} className="text-start  text-wrap">
                                                                            <label>
                                                                                {/* Group Leader assigned to role of Head of
                                                                         Group */}
                                                                            </label>
                                                                        </td>

                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 pt-lg-4 pt-md-3 pt-3 d-flex align-items-center gap-lg-4 gap-md-3 gap-3 flex-lg-nowrap flex-md-nowrap flex-sm-wrap flex-wrap'>
                                                        <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                                            <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total:
                                                                <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>

                                                                    {(regularTotalHours + additionalTotalHours).toFixed(2)} hours</h3>
                                                            </h3>
                                                        </div>
                                                        <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                                            <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total Lateness:
                                                                <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>
                                                                    {/* {metrics?.lateness} */}
                                                                    {0}
                                                                </h3>
                                                            </h3>
                                                        </div>
                                                        <div className="FormTitleWithdivider mt-0 mb-0 position-relative">
                                                            <h3 className="text-nowrap text-end formTitle m-0 d-flex align-items-end gap-2 justify-content-start">Total Left Early:
                                                                <h3 className="text-nowrap text-center formTitle m-0 ms-1" style={{ borderBottom: '1px solid #000', minWidth: '120px' }}>
                                                                    {/* {metrics?.leftEarly} */}
                                                                    {0}
                                                                </h3>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                                    {/* <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                    onClick={() =>
                                                        handleUpdate(
                                                            personData.personId,
                                                            siteGroup.siteId
                                                        )
                                                    }
                                                    >
                                                        Update
                                                    </button> */}
                                                    {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ps-3 pe-4"
                                                        onClick={() => submitEditChange()}
                                                    >
                                                        {loading ? (
                                                            <span className="btnloader loader"></span>
                                                        ) : (
                                                            <span>Update</span>
                                                        )}
                                                    </button>
            }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-100'>
                                    <hr />
                                </div>



                            </>
                            // ) : (
                            //     ''
                            // )}
                            //                         </>
                        ))
                        }
                    </div>
                )
            })}
        </section>
    );
};

export default BulkTimeSheetForm;