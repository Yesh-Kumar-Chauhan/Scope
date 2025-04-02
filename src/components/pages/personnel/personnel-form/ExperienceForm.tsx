// export default ExperienceForm 
import React, { useEffect, useState } from 'react'
import Calendar from '../../../calender/Calendar'
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../store/modalSlice';
import { ModalType } from '../../../../types/modal';
import { ICalendar, IPersonnel } from '../../../../interface/Personnel';
import { fetchSchedular, updatePersonnel, getScheduleByPersonAndDateRange } from '../../../../apis/personnelApi';
import { deleteSchedules } from '../../../../apis/schedularTimesheetApi'
import moment from 'moment';
import { useModalCallback } from '../../../../contexts/ModalCallbackContext';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { useFetchSchedular } from '../../../../hooks/personnel/schedular/useFetchSchedular';
import { getUserData } from "../../../../utils/utils";

interface Position {
    id: number;
    positionId: number;
    position: string;
    type: string;
}
interface ExperienceFormProps {
    personnelFormData: IPersonnel;
    errors: any;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    positionsData: any;
    setPersonnelFormData: any;
}
const ExperienceForm: React.FC<any> = ({ personnelFormData, errors, handleChange, positionsData, setPersonnelFormData }) => {
    const [events, setEvents] = useState<any[]>([]);
    const [schedules, setSchedules] = useState<any>({});
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const userData = getUserData();
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });
    const dispatch = useDispatch();
    const [selectedSiteTypeValue, setSelectedSiteTypeValue] = useState('beforeSchool');
    const { getCallback, setCallback } = useModalCallback();
    const { data: schedular, isLoading, isError, error, refetch } = useFetchSchedular("", 1, 20, personnelFormData?.personalID,
    );
    var schedularLength = schedular?.data?.length || 0;

    const getColorForEvent = (title: string) => {
        switch (title) {
            case 'Before':
                return { backgroundColor: '#8ECAE6', textColor: '#000000' }; // Blue with black text
            case 'During':
                return { backgroundColor: '#FB8500', textColor: '#000000' }; // Orange with black text
            case 'After':
                return { backgroundColor: '#FFB703', textColor: '#000000' }; // Yellow with black text
            default:
                return { backgroundColor: '#A9A9A9', textColor: '#000000' }; // Gray with black text
        }
    };

    const getColorForAdditionalEvent = (title: string) => {
        switch (title) {
            case 'Before':
                return { backgroundColor: '#D1EFFF', textColor: '#000000' }; // Light blue
            case 'During':
                return { backgroundColor: '#FFD8A8', textColor: '#000000' }; // Light orange
            case 'After':
                return { backgroundColor: '#FFE5A3', textColor: '#000000' }; // Light yellow
            default:
                return { backgroundColor: '#F0F0F0', textColor: '#000000' }; // Very light gray
        }
    };


    const bindSchedulesToCalender = async () => {
        if (!personnelFormData.personalID) return;
        const schedules = await fetchSchedular(personnelFormData.personalID);
        if (!schedules.data.length) return setEvents([]);

        let newEvents: any = [];
        let currentSchedule: any = [];
        const datesToSkipForUpdated = new Set(
            schedules.data
                .filter((s) => s.updatedDate && !s.deletedDate)  // Only schedules with a specific date
                .map((s) => `${moment(s.updatedDate).format('YYYY-MM-DD')}-${s.deletedSiteType}`) // Format as "YYYY-MM-DD-siteType"
        );

        // Collect dates to skip with their siteType
        const datesToSkipForDeleted = new Set(
            schedules.data
                .filter((s) => s.deletedDate)  // Only schedules with a specific date
                .map((s) => `${moment(s.deletedDate).format('YYYY-MM-DD')}-${s.deletedSiteType}`) // Format as "YYYY-MM-DD-siteType"
        );

        schedules.data.forEach((schedule) => {
            // Case 1: If there's a single date, add it as a one-day event
            if (schedule.date && !schedule.deletedDate && !schedule.updatedDate) {
                const { backgroundColor, textColor } = getColorForAdditionalEvent(schedule.siteType);

                const dayOfWeek = moment(schedule.date).format('dddd').toLowerCase(); // Get day of the week in lowercase
                const timeInField = `${dayOfWeek}TimeIn`;
                const timeOutField = `${dayOfWeek}TimeOut`;

                // Skip if it's Saturday or Sunday
                if (dayOfWeek === 'saturday' || dayOfWeek === 'sunday') return;

                const startTime = moment(schedule.date).format('YYYY-MM-DD') + 'T' + (schedule[timeInField] || '00:00');
                const endTime = moment(schedule.date).format('YYYY-MM-DD') + 'T' + (schedule[timeOutField] || '23:59');
                const timeIn = moment(schedule[timeInField], 'HH:mm:ss').format('hh:mm A') || '12:00 AM';
                const timeOut = moment(schedule[timeOutField], 'HH:mm:ss').format('hh:mm A') || '11:59 PM';

                newEvents.push({
                    // title: `${schedule.siteType} School`,
                    title: `${schedule.siteType} School\nTime : ${timeIn} - ${timeOut}`,
                    start: startTime,
                    end: endTime,
                    backgroundColor,
                    textColor,
                    // backgroundColor: "#8cff8c", // Customize color as needed
                    extendedProps: {
                        ...schedule
                    }
                });
            }

            if (schedule.updatedDate && !schedule.deletedDate) {
                const { backgroundColor, textColor } = getColorForAdditionalEvent(schedule.siteType);

                const dayOfWeek = moment(schedule.updatedDate).format('dddd').toLowerCase(); // Get day of the week in lowercase
                const timeInField = `${dayOfWeek}TimeIn`;
                const timeOutField = `${dayOfWeek}TimeOut`;

                // Skip if it's Saturday or Sunday
                if (dayOfWeek === 'saturday' || dayOfWeek === 'sunday') return;

                const startTime = moment(schedule.updatedDate).format('YYYY-MM-DD') + 'T' + (schedule[timeInField] || '00:00');
                const endTime = moment(schedule.updatedDate).format('YYYY-MM-DD') + 'T' + (schedule[timeOutField] || '23:59');
                const timeIn = moment(schedule[timeInField], 'HH:mm:ss').format('hh:mm A') || '12:00 AM';
                const timeOut = moment(schedule[timeOutField], 'HH:mm:ss').format('hh:mm A') || '11:59 PM';
                newEvents.push({
                    title: `${schedule.siteType} School\nTime : ${timeIn} - ${timeOut}`,
                    // title: `${schedule.siteType} School`,
                    // title: `${schedule.notes}`,
                    start: startTime,
                    end: endTime,
                    backgroundColor,
                    textColor,
                    // backgroundColor: "#8cff8c", // Customize color as needed
                    extendedProps: {
                        ...schedule
                    }
                });
            }

            // Case 2: If both startDate and endDate are available, create recurring events within the range,
            // only if `date` is not present
            if (!schedule.updatedDate && !schedule.deletedDate && !schedule.date && schedule.startDate && schedule.endDate) {
                let current = moment(schedule.startDate);
                const end = moment(schedule.endDate);
                const { backgroundColor, textColor } = getColorForEvent(schedule.siteType);

                // Loop through each day from startDate to endDate and add events
                while (current.isSameOrBefore(end, 'day')) {
                    const currentDate = current.format('YYYY-MM-DD');
                    const dayOfWeek = current.format('dddd').toLowerCase(); // Get day of the week in lowercase
                    const timeInField = `${dayOfWeek}TimeIn`;
                    const timeOutField = `${dayOfWeek}TimeOut`;

                    // Skip this day if timeIn or timeOut is null
                    if (!schedule[timeInField] || !schedule[timeOutField]) {
                        current.add(1, 'day');
                        continue;
                    }

                    // Skip if it's Saturday or Sunday
                    if (dayOfWeek === 'saturday' || dayOfWeek === 'sunday') {
                        current.add(1, 'day');
                        continue;
                    }

                    // Skip the current date if both the date and siteType match in datesToSkip
                    if (datesToSkipForUpdated.has(`${currentDate}-${schedule.siteType}`)) {
                        current.add(1, 'day');
                        continue;
                    }

                    // Skip the current date if both the date and siteType match in datesToSkip
                    if (datesToSkipForDeleted.has(`${currentDate}-${schedule.siteType}`)) {
                        current.add(1, 'day');
                        continue;
                    }

                    currentSchedule = schedule;

                    const startTime = currentDate + 'T' + (schedule[timeInField] || '00:00');
                    const endTime = currentDate + 'T' + (schedule[timeOutField] || '23:59');
                    const timeIn = moment(schedule[timeInField], 'HH:mm:ss').format('hh:mm A') || '12:00 AM';
                    const timeOut = moment(schedule[timeOutField], 'HH:mm:ss').format('hh:mm A') || '11:59 PM';
                    newEvents.push({
                        title: `${schedule.siteType} School\nTime : ${timeIn} - ${timeOut}`,
                        //title: `${schedule.siteType} School`,
                        start: startTime,
                        end: endTime,
                        backgroundColor,
                        textColor,
                        extendedProps: {
                            ...schedule
                        }
                    });

                    // Move to the next day
                    current.add(1, 'day');
                }

                setSchedules(currentSchedule);
            }
        });
        // Set the new events in state to display on the calendar
        setEvents(newEvents);
    };



    useEffect(() => {
        bindSchedulesToCalender(); // Call the async function
    }, [personnelFormData]); // Make sure to add dependencies


    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleTypeChange = (event: any) => {
        setSelectedSiteTypeValue(event.target.value); // Update selected value based on dropdown selection
    };

    const handleEventClick = (event: any) => {
        // Destructure directly with defaults
        const { personel, site, ...initialData } = event._def.extendedProps || {};

        // Format clicked date in UTC to avoid time zone shifts
        const clickedDate = event._instance?.range?.start
            ? moment.utc(event._instance.range.start).format('YYYY-MM-DD')
            : '';

        // Set up the `schedularId` only if the date exists
        const schedularId = initialData?.date || initialData.updatedDate ? initialData.id : null;
        const dayOfWeek = moment(clickedDate).format('dddd').toLowerCase(); // e.g., 'monday'


        // Update `initialData` with `clickedDate`
        const updatedData = {
            ...initialData,
            ...(clickedDate && { date: clickedDate, updatedDate: clickedDate, deletedDate: clickedDate }),
            deletedSiteType: !initialData?.date ? initialData.siteType : initialData.deletedSiteType,
            mondayTimeIn: dayOfWeek === 'monday' ? initialData.mondayTimeIn : null,
            mondayTimeOut: dayOfWeek === 'monday' ? initialData.mondayTimeOut : null,
            tuesdayTimeIn: dayOfWeek === 'tuesday' ? initialData.tuesdayTimeIn : null,
            tuesdayTimeOut: dayOfWeek === 'tuesday' ? initialData.tuesdayTimeOut : null,
            wednesdayTimeIn: dayOfWeek === 'wednesday' ? initialData.wednesdayTimeIn : null,
            wednesdayTimeOut: dayOfWeek === 'wednesday' ? initialData.wednesdayTimeOut : null,
            thursdayTimeIn: dayOfWeek === 'thursday' ? initialData.thursdayTimeIn : null,
            thursdayTimeOut: dayOfWeek === 'thursday' ? initialData.thursdayTimeOut : null,
            fridayTimeIn: dayOfWeek === 'friday' ? initialData.fridayTimeIn : null,
            fridayTimeOut: dayOfWeek === 'friday' ? initialData.fridayTimeOut : null,
        };

        setCallback(() => bindSchedulesToCalender());
        // Dispatch the modal with all necessary props
        dispatch(openModal({
            modalType: 'SCHEDULAR-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: updatedData,
                personalId: personnelFormData.personalID,
                isEditingSchedular: true,
                schedularId: schedularId,
                dayOfWeek
            }
        }));
    };

    const customEventContent = (eventInfo: any) => {
        const siteTypeColors: { [key: string]: string } = {
            Before: 'bg-blue-200',
            After: 'bg-green-200',
            During: 'bg-yellow-200',
        };

        return (
            <div className={`p-1 ${siteTypeColors[eventInfo.event.extendedProps.siteType] || 'bg-gray-200'}`}>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        );
    };

    const handleNewSchedular = (e: any) => {
        e.preventDefault();

        const initialData: ICalendar = {
            personID: personnelFormData.personalID,
            siteType: (schedules.siteType) || 'Before',
            paycodeRequired: false,
        }
        // Ensure loadEvents is passed with the argument
        setCallback(() => bindSchedulesToCalender()); // Pass formData if required by loadEvents

        dispatch(openModal({
            modalType: 'SCHEDULAR-TIMESHEET-MODAL' as ModalType,
            modalProps: {
                initialData: initialData,
                personalId: personnelFormData.personalID,
                currentSchedule: schedules
            }
        }));
    };

    const handlePersonalExperienceModal = (e: any) => {
        e.preventDefault();

        // Ensure loadEvents is passed with the argument
        setCallback(() => bindSchedulesToCalender());
        dispatch(openModal({
            modalType: 'PERSONAL_EXPERIENCE-MODAL' as ModalType,
            modalProps: {
                initialData: personnelFormData,
                isEditing: personnelFormData.personalID ? true : false,
                personnelFormData,
                handleChange,
                errors,
                positionsData,
                setPersonnelFormData,
            }
        }));
    };

    const handleUpdateDefaultSchedular = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const personal = await updatePersonnel(personnelFormData.personalID, personnelFormData);
        if (!personal) return;
        // loadEvents();
        bindSchedulesToCalender();
    }
    const getDayOfWeek = (dateString: string) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(dateString);
        return days[date.getUTCDay()];
    };

    // const formatTime = (timeString: string) => {
    //     const [hours, minutes] = timeString.split(':').map(Number);
    //     const period = hours >= 12 ? 'PM' : 'AM';
    //     const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    //     return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    // };

    const getCurrentWeekRange = () => {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay();
        const lastDayOfWeek = firstDayOfWeek + 6;

        const startDate = new Date(today.setDate(firstDayOfWeek)).toISOString().split('T')[0];
        const endDate = new Date(today.setDate(lastDayOfWeek)).toISOString().split('T')[0];

        return { startDate, endDate };
    };

    const showDeleteConfirmation = (e: React.MouseEvent) => {
        e.preventDefault();
        setConfirmationProps({
            message: 'Are you sure you want to delete schedules?',
            onConfirm: async () => {
                try {
                    setLoading(true);
                    await deleteSchedules(personnelFormData?.personalID);
                    await refetch();
                    bindSchedulesToCalender();
                    setConfirmationOpen(false);
                    setSchedules({});
                } catch (error) {
                    console.error('Failed to delete schedule:', error);
                } finally {
                    setLoading(false);
                }
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };
    return (
        <div className="pt-0">
            <div className="pageTableInner">
                <div className="tab-pane fade show active pb-4" id="nav-experience" role="tabpanel" aria-labelledby="nav-experience-tab" tabIndex={0}>
                    <div className="row justify-content-center m-0">
                        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService2" &&
                            <div className='col-12 d-flex align-items-center justify-content-end gap-4'>
                                {/* <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center gap-2 ps-3 pe-4"
                                onClick={(e) => handlePersonalExperienceModal(e)}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#fff" stroke-width="1.5"></circle> <path opacity="0.5" d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z" stroke="#fff" stroke-width="1.5"></path> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                Experience
                            </button> */}
                                {/* <button
                                type="button"
                                disabled={!personnelFormData.personalID}
                                className="btn btn-primary d-flex align-items-center gap-2 ps-3 pe-4"
                                onClick={(e) => handleExportSchedular(e)}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 14L12 4M12 4L15 7M12 4L9 7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                Export
                            </button> */}
                                <button
                                    type="button"
                                    disabled={!personnelFormData.personalID}
                                    className="btn btn-primary d-flex align-items-center gap-2 ps-3 pe-4"
                                    onClick={(e) => handleNewSchedular(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                                            fill="white" />
                                    </svg>
                                    New Schedule
                                </button>
                                <button
                                    type="button"
                                    onClick={showDeleteConfirmation}
                                    className="btn btn-primary d-flex align-items-center gap-2 ps-3 pe-4"
                                    style={{ cursor: 'pointer' }}
                                    disabled={events.length == 0}
                                >
                                    {loading ? (
                                        <span className="btnloader loader"></span>
                                    ) : (
                                        <>
                                            <span> Clear Schedule</span>
                                        </>
                                    )}
                                </button>
                                {/* <button
                                type="button"
                                disabled={!personnelFormData.personalID}
                                className="btn btn-primary d-flex align-items-center gap-2 ps-3 pe-4"
                                onClick={(e) => handleNewSchedular(e)}>
                                Clear Schedule
                            </button> */}
                                <button
                                    type="button"
                                    disabled={!personnelFormData.personalID}
                                    className="btn btn-outline d-flex align-items-center gap-2 ps-3 pe-4"
                                    onClick={(e) => handleUpdateDefaultSchedular(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M13.8001 19.5516H19.8001M4.2002 19.5516L8.56618 18.6719C8.79796 18.6252 9.01077 18.511 9.17791 18.3438L18.9516 8.56477C19.4202 8.09591 19.4199 7.33592 18.9509 6.86746L16.8805 4.79939C16.4117 4.33112 15.6521 4.33144 15.1837 4.8001L5.40896 14.5802C5.24214 14.7471 5.12824 14.9594 5.0815 15.1907L4.2002 19.5516Z" stroke="#023047" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Update
                                </button>
                            </div>
                        }
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                            {/* <form className="DistrictForm">
                                <div className="row g-4">
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                        <label className="form-label mb-2">Type :</label>
                                        <select
                                            className="form-select fw-normal"
                                            id="sitE_NAM_B"
                                            name="sitE_NAM_B"
                                            onChange={handleTypeChange}
                                            value={selectedSiteTypeValue}
                                        >
                                            <option value="beforeSchool">Before School</option>
                                            <option value="duringSchool">During School</option>
                                            <option value="afterSchool">After School</option>
                                        </select>
                                    </div>
                                    {renderForm()}
                                </div>
                            </form> */}

                        </div>
                        <div className='col-lg-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4'>
                            <Calendar
                                events={events}
                                onEventClick={handleEventClick}
                                eventContent={customEventContent}
                            />
                        </div>
                    </div >
                </div >
            </div>
            <ConfirmationModal
                isOpen={confirmationOpen}
                message={confirmationProps.message}
                onConfirm={confirmationProps.onConfirm}
                onCancel={confirmationProps.onCancel}
                title="Delete Schedule"
            />
        </div>

    );
}

export default ExperienceForm


