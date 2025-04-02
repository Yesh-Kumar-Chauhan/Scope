import React, { useEffect, useState } from 'react'
import { useSchedularForm } from '../../hooks/personnel/schedular/useSchedularForm'
import { ICalendar } from '../../interface/Personnel';
import { getLookUpPositions, getSitesByType } from '../../apis/personnelApi';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';
import ConfirmationModal from './ConfirmationModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserData } from "../../utils/utils";

interface SchedularFormProps {
    initialData?: ICalendar;
    onClose: () => void;
    refetch: () => void;
    isEditingSchedular: boolean;
    personalId: number;
    schedularId: number;
    dayOfWeek: string;
    currentSchedule: ICalendar;
}

const SchedularTimesheetModal: React.FC<SchedularFormProps> = ({ initialData = {} as ICalendar, personalId, onClose, isEditingSchedular, refetch, schedularId, dayOfWeek, currentSchedule }) => {
    const [positionsData, setPositionsData] = useState<any>({});
    const [sites, setSites] = useState<any>([]);
    const [position, setPosition] = useState<any>([]);
    const [selectedScheduleType, setSelectedScheduleType] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [initialScheduleType, setInitialScheduleType] = useState<string>('');
    const [scheduleTypeGroup, setScheduleTypeGroup] = useState("Regular");
    const userData = getUserData();


    const handleCloseMainModal = () => {
        onClose();
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    const {
        calendarFormData,
        setCalendarFormData,
        handleChange,
        handleSubmit,
        errors,
        setErrors,
        loading
    } = useSchedularForm(initialData, personalId, ((currentSchedule && currentSchedule?.id && scheduleTypeGroup == "Regular") ? true : isEditingSchedular), refetch, handleCloseMainModal, (isEditingSchedular ? schedularId ?? 0 : (currentSchedule && currentSchedule.id && scheduleTypeGroup == "Regular") ? currentSchedule.id : 0)
        // } = useSchedularForm(initialData, personalId, ((currentSchedule && currentSchedule?.id && selectedScheduleType != '1day') ? true : isEditingSchedular), refetch, handleCloseMainModal, (isEditingSchedular ? schedularId ?? 0 : (currentSchedule && currentSchedule.id && selectedScheduleType != '1day') ? currentSchedule.id : 0)
        , setIsModalOpen, selectedScheduleType, scheduleTypeGroup);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [confirmationProps, setConfirmationProps] = useState({
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const positionsData = await getLookUpPositions();
                const sitesTypesData = await getSitesByType();
                const combinedData = {
                    positions: positionsData,
                    sitesTypes: sitesTypesData
                };
                // Set the combined data into state
                setPositionsData(combinedData);
            } catch (error) {
                console.error("Error fetching positions:", error);
            }
        };

        // setCalendarFormData((state) => ({
        //     ...state,
        //     startDate: new Date().toISOString().split("T")[0],
        //     endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split("T")[0],
        // }));

        fetchPositions();

        bindRegularSchedule()
    }, []);

    useEffect(() => {
        if (calendarFormData.siteType == 'Before') {
            setSites(positionsData?.sitesTypes?.data?.beforeSites)
            setPosition(positionsData?.positions?.data?.beforePositions)

        } else if (calendarFormData.siteType == 'During') {
            setSites(positionsData?.sitesTypes?.data?.duringSites)
            setPosition(positionsData?.positions?.data?.duringPositions)

        } else if (calendarFormData.siteType == 'After') {
            setSites(positionsData?.sitesTypes?.data?.afterSites)
            setPosition(positionsData?.positions?.data?.afterPositions)
        }

    }, [calendarFormData.siteType, positionsData]);

    const bindRegularSchedule = () => {
        if (currentSchedule && Object.keys(currentSchedule).length) {
            const { startDate, endDate } = currentSchedule;
            const today = new Date().toISOString().split("T")[0];

            let scheduleType = '';

            // Ensure startDate and endDate are valid before using them
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);

                if (startDate === endDate) {
                    scheduleType = '1day';
                } else if (end.getTime() - start.getTime() === 7 * 24 * 60 * 60 * 1000) {
                    scheduleType = '1week';
                } else if (start.getMonth() + 1 === end.getMonth() && start.getFullYear() === end.getFullYear()) {
                    scheduleType = '1month';
                } else if (start.getFullYear() + 1 === end.getFullYear()) {
                    scheduleType = '1year';
                } else if (start.getFullYear() + 5 === end.getFullYear()) {
                    scheduleType = '5year';
                } else {
                    scheduleType = 'custom';
                }
            } else {
                // Handle the case where dates are missing
                console.error('Start date or end date is invalid');
                scheduleType = 'custom';
            }

            setInitialScheduleType(scheduleType);
            setSelectedScheduleType(scheduleType);
            setCalendarFormData(currentSchedule);
        }
    };

    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleScheduleRadioChange = (event: any) => {
        setScheduleTypeGroup(event.target.value)
        setCalendarFormData((state) => ({
            ...state,
            scheduleType: event.target.value,
            date: event.target.value === 'Additional' ? new Date().toISOString().split("T")[0] : '',
        }));

        if (event.target.value === 'Additional') {
            setSelectedScheduleType("1day");
        }
    }

    const handleScheduleTypeChange = (type: any) => {
        const today = new Date().toISOString().split("T")[0];
        let endDate = '';

        switch (type) {
            case '1day':
                endDate = today;
                break;
            case '1week':
                endDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0];
                break;
            case '1month':
                endDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0];
                break;
            case '1year':
                endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0];
                break;
            case '5year':
                endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split("T")[0];
                break;
            case 'custom':
                endDate = '';
                break;
        }

        setSelectedScheduleType(type);
        setCalendarFormData((state) => ({
            ...state,
            startDate: today,
            endDate: endDate,
            date: scheduleTypeGroup === 'Additional' ? today : '',
            paycodeRequired: scheduleTypeGroup === 'Additional' ? true : false,
            // date: type === '1day' ? today : '',
            // paycodeRequired: type === '1day' ? true : false,
        }));
    };

    const showConfirmationModal = (action: string, e: React.MouseEvent) => {
        e.preventDefault();
        const message = action === 'submit'
            ? 'Are you sure you want to submit this schedule?'
            : 'Are you sure you want to delete this schedule?';

        setConfirmationProps({
            message,
            onConfirm: async () => {
                setConfirmationOpen(false);
                const validationResult = await handleSubmit(e, false);
                // Close the modal only if there is no validation or API error
                if (validationResult) {
                    handleCloseMainModal();
                }
            },
            onCancel: () => {
                setConfirmationOpen(false);
            },
        });
        setConfirmationOpen(true);
    };

    const formatScheduleType = (type: any) => {
        switch (type) {
            case '1day':
                return 'Schedule for a day';
            case '1week':
                return '1 Week';
            case '1month':
                return '1 Month';
            case '1year':
                return '1 Year';
            case '5year':
                return '5 Years';
            case 'custom':
                return 'Custom Range';
            default:
                return 'Pick a Schedule';
        }
    };

    console.log('calendarFormData from modal', calendarFormData);

    const isWeekday = (date: any) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // Disable Saturday (6) and Sunday (0)
    };

    const selectedDateDay = calendarFormData.date ? moment(calendarFormData.date).format('dddd').toLowerCase() : null;
    return (
        <>
            <div className={`modal fade show timesheetModal editAsignment align-items-lg-start overflow-auto align-items-md-start align-items-start justify-content-center`}
                id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
                <div className="modal-dialog w-100">
                    <div className="modal-content p-4">
                        <div className="modal-body p-lg-2 p-md-2 p-0">
                            <div className="formCard mt-0 p-0 border-0">
                                <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                    <h3 className="text-nowrap formTitle m-0">{isEditingSchedular ? 'Update Schedule' : 'New Schedule'}</h3>
                                    <hr className="w-100" />
                                    <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseMainModal} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <form className="DistrictForm">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="radio"
                                                        id="siteType"
                                                        name="siteType"
                                                        className="form-check-input"
                                                        onChange={handleChange}
                                                        // checked={calendarFormData.siteType || false}
                                                        checked={calendarFormData.siteType === 'Before'}
                                                        value="Before"
                                                    // disabled={isEditingSchedular}
                                                    />
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    {errors?.siteType && (
                                                        <div className="text-danger">
                                                            {errors?.siteType?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>

                                                <label className="form-label m-0" style={{ fontWeight: calendarFormData.siteType === 'Before' ? 'bold' : 'normal' }}>Before School</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="d-flex align-items-center gap-2 mb-3">

                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="radio"
                                                        id="siteType"
                                                        name="siteType"
                                                        className="form-check-input"
                                                        onChange={handleChange}
                                                        // checked={calendarFormData.siteType || false}
                                                        checked={calendarFormData.siteType === 'During'}
                                                        value="During" // Added value for identification
                                                    // disabled={isEditingSchedular}
                                                    />
                                                    <div className="checked">
                                                        {/* SVG for checked state */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        {/* SVG for unchecked state */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: calendarFormData.siteType === 'During' ? 'bold' : 'normal' }}>During School</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                            <div className="d-flex align-items-center gap-2 mb-3    ">
                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="radio"
                                                        id="siteType"
                                                        // name="siteType"
                                                        name="siteType"
                                                        className="form-check-input"
                                                        onChange={handleChange}
                                                        // checked={calendarFormData.siteType || false}
                                                        checked={calendarFormData.siteType === 'After'}
                                                        value="After" // Added value for identification
                                                    // disabled={isEditingSchedular}
                                                    />
                                                    <div className="checked">
                                                        {/* SVG for checked state */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        {/* SVG for unchecked state */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <label className="form-label m-0" style={{ fontWeight: calendarFormData.siteType === 'After' ? 'bold' : 'normal' }}>After School</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <label className="form-label mb-2">Site</label>
                                            <select
                                                className="form-select"
                                                id="siteID"
                                                name="siteID"
                                                onChange={handleChange}
                                                value={calendarFormData.siteID}
                                            >
                                                <option >Select Sites</option>
                                                {sites?.map((sites: any) => (
                                                    <option key={sites.siteID} value={sites.siteID}>
                                                        {sites.siteName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors?.siteID && (
                                                <div className="text-danger">
                                                    {errors?.siteID?._errors[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <label className="form-label mb-2">Position</label>
                                            <select
                                                className="form-select"
                                                id="position"
                                                name="position"
                                                onChange={handleChange}
                                                value={calendarFormData.position}
                                            >
                                                <option value="">Select Position</option>
                                                {position?.map((position: any) => (
                                                    <option key={position.positionId} value={position.position}>
                                                        {position.position}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors?.position && (
                                                <div className="text-danger">
                                                    {errors?.position?._errors[0]}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="mb-3">
                                                <label className="form-label mb-2">Notes:</label>
                                                <input type="text" className="form-control" id="notes"
                                                    name="notes"
                                                    value={calendarFormData.notes} onChange={handleChange} />
                                                {errors?.notes && (
                                                    <div className="text-danger">
                                                        {errors?.notes?._errors[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className='d-flex gap-3 align-items-center flex-wrap'>
                                            <div className="d-flex align-items-center gap-2 mb-3">

                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="radio"
                                                        id="regularType"
                                                        name="scheduleTypeGroup"
                                                        value="Regular"
                                                        className="form-check-input"
                                                        onChange={handleScheduleRadioChange}
                                                        checked={scheduleTypeGroup === "Regular"}
                                                    />
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    {errors?.siteType && (
                                                        <div className="text-danger">
                                                            {errors?.siteType?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                <label className="form-label m-0" >Regular</label>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mb-3">

                                                <div className="inputDesign position-relative">
                                                    <input
                                                        type="radio"
                                                        id="additionalType"
                                                        name="scheduleTypeGroup"
                                                        value="Additional"
                                                        className="form-check-input"
                                                        onChange={handleScheduleRadioChange}
                                                        checked={scheduleTypeGroup === "Additional"}
                                                    />
                                                    <div className="checked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="Unchecked">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                            <path d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    {errors?.siteType && (
                                                        <div className="text-danger">
                                                            {errors?.siteType?._errors[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                <label className="form-label m-0" >Additional</label>
                                            </div>
                                        </div>


                                        {
                                            !isEditingSchedular && (
                                                <div className="col-md-12 col-12 mb-3">
                                                    <label className="form-label mb-2">Pick a Schedule</label>
                                                    <select
                                                        className="form-select"
                                                        id="scheduleType"
                                                        name="scheduleType"
                                                        onChange={(e) => handleScheduleTypeChange(e.target.value)}
                                                        value={selectedScheduleType || ''}
                                                    >
                                                        {/* <option >Select A Schedule</option> */}
                                                        {scheduleTypeGroup === "Regular" ? (
                                                            <>
                                                                {/* <option value="1day">Schedule for a day</option> */}
                                                                <option
                                                                    value=""
                                                                // disabled={selectedScheduleType !== '1week' && initialScheduleType !== '1week' && !!(Object.keys(currentSchedule).length)}
                                                                >
                                                                    Select a schedule
                                                                </option>
                                                                <option
                                                                    value="1week"
                                                                    disabled={selectedScheduleType !== '1week' && initialScheduleType !== '1week' && !!(Object.keys(currentSchedule).length)}
                                                                >
                                                                    1 Week
                                                                </option>
                                                                <option
                                                                    value="1month"
                                                                    disabled={selectedScheduleType !== '1month' && initialScheduleType !== '1month' && !!(Object.keys(currentSchedule).length)}
                                                                >
                                                                    1 Month
                                                                </option>
                                                                <option
                                                                    value="1year"
                                                                    disabled={selectedScheduleType !== '1year' && initialScheduleType !== '1year' && !!(Object.keys(currentSchedule).length)}
                                                                >
                                                                    1 Year
                                                                </option>
                                                                <option
                                                                    value="5year"
                                                                    disabled={selectedScheduleType !== '5year' && initialScheduleType !== '5year' && !!(Object.keys(currentSchedule).length)}
                                                                >
                                                                    5 Years
                                                                </option>
                                                                <option
                                                                    value="custom"
                                                                    disabled={selectedScheduleType !== 'custom' && initialScheduleType !== 'custom' && !!(Object.keys(currentSchedule).length)}
                                                                >
                                                                    Custom Date
                                                                </option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="1day">Schedule for a day</option>
                                                                <option value="1week">1 Week</option>
                                                                <option value="1month">1 Month</option>
                                                            </>
                                                        )}
                                                        {/* <option value="1day">Schedule for a day</option>
                                                        <option
                                                            value="1week"
                                                            disabled={selectedScheduleType !== '1week' && initialScheduleType !== '1week' && !!(Object.keys(currentSchedule).length)}
                                                        >
                                                            1 Week
                                                        </option>
                                                        <option
                                                            value="1month"
                                                            disabled={selectedScheduleType !== '1month' && initialScheduleType !== '1month' && !!(Object.keys(currentSchedule).length)}
                                                        >
                                                            1 Month
                                                        </option>
                                                        <option
                                                            value="1year"
                                                            disabled={selectedScheduleType !== '1year' && initialScheduleType !== '1year' && !!(Object.keys(currentSchedule).length)}
                                                        >
                                                            1 Year
                                                        </option>
                                                        <option
                                                            value="5year"
                                                            disabled={selectedScheduleType !== '5year' && initialScheduleType !== '5year' && !!(Object.keys(currentSchedule).length)}
                                                        >
                                                            5 Years
                                                        </option>
                                                        <option
                                                            value="custom"
                                                            disabled={selectedScheduleType !== 'custom' && initialScheduleType !== 'custom' && !!(Object.keys(currentSchedule).length)}
                                                        >
                                                            Custom Date
                                                        </option> */}
                                                    </select>

                                                </div>
                                            )
                                        }

                                        {
                                            (selectedScheduleType && selectedScheduleType != '1day') && (
                                                <>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="mb-2">
                                                            <label className="form-label mb-2">StartDate:</label>
                                                            <DatePicker
                                                                selected={calendarFormData.startDate ? new Date(calendarFormData.startDate) : null}
                                                                onChange={(date) => {
                                                                    if (date) {
                                                                        const formattedDate = date.toISOString().split("T")[0]; // Format date as yyyy-MM-dd

                                                                        // Create a custom event-like object
                                                                        handleChange({
                                                                            target: {
                                                                                name: "startDate",
                                                                                value: formattedDate,
                                                                                type: "text",
                                                                            },
                                                                        } as unknown as React.ChangeEvent<HTMLInputElement>);
                                                                    }
                                                                }}
                                                                filterDate={isWeekday} // Disable weekends
                                                                dateFormat="dd-MM-yyyy"
                                                                className="form-control w-100"
                                                            />
                                                            {/* <input type="date" className="form-control" id="date"
                                                                name="startDate"
                                                                value={formatDate(calendarFormData.startDate)} onChange={handleChange} /> */}
                                                            {errors?.startDate && (
                                                                <div className="text-danger">
                                                                    {errors?.startDate?._errors[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="mb-2">
                                                            <label className="form-label mb-2">EndDate:</label>
                                                            <DatePicker
                                                                selected={calendarFormData.endDate ? new Date(calendarFormData.endDate) : null}
                                                                onChange={(date) => {
                                                                    if (date) {
                                                                        const formattedDate = date.toISOString().split("T")[0]; // Format date as yyyy-MM-dd

                                                                        // Create a custom event-like object
                                                                        handleChange({
                                                                            target: {
                                                                                name: "endDate",
                                                                                value: formattedDate,
                                                                                type: "text",
                                                                            },
                                                                        } as unknown as React.ChangeEvent<HTMLInputElement>);
                                                                    }
                                                                }}
                                                                filterDate={isWeekday} // Disable weekends
                                                                dateFormat="dd-MM-yyyy"
                                                                className="form-control w-100"
                                                            />
                                                            {/* <input type="date" className="form-control" id="date"
                                                                name="endDate"
                                                                value={formatDate(calendarFormData.endDate)} onChange={handleChange} /> */}
                                                            {errors?.endDate && (
                                                                <div className="text-danger">
                                                                    {errors?.endDate?._errors[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                        {
                                            selectedScheduleType == '1day' && (
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label mb-2 w-100">Date:</label>
                                                        <DatePicker
                                                            selected={calendarFormData.date ? new Date(calendarFormData.date) : null}
                                                            onChange={(date) => {
                                                                if (date) {
                                                                    const formattedDate = date.toISOString().split("T")[0]; // Format date as yyyy-MM-dd

                                                                    // Create a custom event-like object
                                                                    handleChange({
                                                                        target: {
                                                                            name: "date",
                                                                            value: formattedDate,
                                                                            type: "text",
                                                                        },
                                                                    } as unknown as React.ChangeEvent<HTMLInputElement>);
                                                                }
                                                            }}
                                                            filterDate={isWeekday} // Disable weekends
                                                            dateFormat="dd-MM-yyyy"
                                                            className="form-control"
                                                        />

                                                        {/* <input type="date" className="form-control" id="date"
                                                            name="date"
                                                            value={formatDate(calendarFormData.date)} onChange={handleChange} /> */}
                                                        {errors?.date && (
                                                            <div className="text-danger">
                                                                {errors?.date?._errors[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            ((isEditingSchedular && calendarFormData?.paycodeRequired) || (!isEditingSchedular && scheduleTypeGroup == 'Regular' && calendarFormData?.paycodeRequired) || scheduleTypeGroup == 'Additional') && (
                                                // ((isEditingSchedular && calendarFormData.paycode) || calendarFormData.paycodeRequired) && (
                                                <>
                                                    <div className={`col-12 ${isEditingSchedular ? 'col-lg-12 col-md-12 col-sm-12 ' : 'col-lg-6 col-md-6 col-sm-6 '}`}>
                                                        <div className="mb-3">
                                                            <label className="form-label mb-2">PayCodes</label>
                                                            <select className="form-control" id="additionalStopStatic"
                                                                name="paycode"
                                                                value={calendarFormData.paycode} onChange={handleChange} >
                                                                <option value="">Select PayCode</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="22">22</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                            {errors?.paycode && (
                                                                <div className="text-danger">
                                                                    {errors?.paycode?._errors[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                        {
                                            (selectedScheduleType && selectedScheduleType != '1day') && (<div className='col-12'>
                                                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                                                    <div key={day} className='row g-2 mt-0'>
                                                        <div className='col-lg-3 d-flex align-items-center pt-lg-4 col-md-12 col-sm-12 col-12'>
                                                            <label className="form-label mb-0 fw-bold mt-lg-2">{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                                                        </div>
                                                        <div className='col-lg-8 offset-lg-1 col-md-12 col-12'>
                                                            <div className='row'>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                                                                    <label className="form-label mb-2">In:</label>
                                                                    {/* <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name={`${day}TimeIn`}
                                                                        value={calendarFormData[`${day}TimeIn`]}
                                                                        onChange={handleChange}
                                                                    /> */}
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name={`${day}TimeIn`}
                                                                        defaultValue={calendarFormData[`${day}TimeIn`]} // Use defaultValue for uncontrolled input
                                                                        onBlur={(e) => {
                                                                            const { name, value } = e.target;
                                                                            setCalendarFormData((prevData) => ({
                                                                                ...prevData,
                                                                                [name]: `${value}:00`,
                                                                            }));
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                                                                    <label className="form-label mb-2">Out:</label>
                                                                    {/* <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name={`${day}TimeOut`}
                                                                        value={calendarFormData[`${day}TimeOut`]}
                                                                        onChange={handleChange}
                                                                    /> */}
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name={`${day}TimeOut`}
                                                                        defaultValue={calendarFormData[`${day}TimeOut`]} // Use defaultValue for uncontrolled input
                                                                        onBlur={(e) => {
                                                                            const { name, value } = e.target;
                                                                            setCalendarFormData((prevData) => ({
                                                                                ...prevData,
                                                                                [name]: `${value}:00`,
                                                                            }));
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>)
                                        }

                                        {/* Render time fields only for the selected day */}
                                        {(selectedScheduleType == '1day' || isEditingSchedular) && (
                                            <div className='row g-2 mt-2'>
                                                <div className='col-lg-3 d-flex align-items-center pt-lg-4 col-md-12 col-sm-12 col-12'>
                                                    <label className="form-label mb-0 fw-bold mt-lg-2">{selectedDateDay ? selectedDateDay.charAt(0).toUpperCase() + selectedDateDay.slice(1) : 'Not selected'}:</label>
                                                </div>
                                                <div className='col-lg-8 offset-lg-1 col-md-12 col-12'>
                                                    <div className='row'>
                                                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                                                            <label className="form-label mb-2">In:</label>
                                                            {/* <input
                                                                type="time"
                                                                className="form-control"
                                                                name={`${selectedDateDay}TimeIn`}
                                                                value={calendarFormData[`${selectedDateDay}TimeIn`]}
                                                                onChange={handleChange}
                                                            /> */}
                                                            <input
                                                                type="time"
                                                                className="form-control"
                                                                name={`${selectedDateDay}TimeIn`}
                                                                defaultValue={calendarFormData[`${selectedDateDay}TimeIn`]} // Use defaultValue for uncontrolled input
                                                                onBlur={(e) => {
                                                                    const { name, value } = e.target;
                                                                    setCalendarFormData((prevData) => ({
                                                                        ...prevData,
                                                                        [name]: `${value}:00`,
                                                                    }));
                                                                }}

                                                            />
                                                        </div>
                                                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                                                            <label className="form-label mb-2">Out:</label>
                                                            <input
                                                                type="time"
                                                                className="form-control"
                                                                name={`${selectedDateDay}TimeOut`}
                                                                defaultValue={calendarFormData[`${selectedDateDay}TimeOut`]} // Use defaultValue for uncontrolled input
                                                                onBlur={(e) => {
                                                                    const { name, value } = e.target;
                                                                    setCalendarFormData((prevData) => ({
                                                                        ...prevData,
                                                                        [name]: `${value}:00`,
                                                                    }));
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="d-flex mt-4 align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                            <button type='button' onClick={handleCloseMainModal} className="btn btn-transparent ps-3 pe-4">
                                                Cancel
                                            </button>

                                            {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService2"&&
                                                <>
                                                    {
                                                        isEditingSchedular && (
                                                            <button type='button'
                                                                onClick={(e) => { handleSubmit(e, true) }}
                                                                className="btn btn-primary ps-3 pe-4" style={{ cursor: 'pointer' }}>
                                                                {loading?.delete ? (
                                                                    <span className="btnloader loader"></span>
                                                                ) : (
                                                                    <>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                        </svg>
                                                                        <span>Delete Schedule</span>
                                                                    </>
                                                                )}
                                                            </button>
                                                        )
                                                    }
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            if (!isEditingSchedular) {
                                                                showConfirmationModal('submit', e);
                                                            } else {
                                                                handleSubmit(e, false);
                                                            }
                                                        }}
                                                        className="btn btn-primary ps-3 pe-4"
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {loading?.submit ? (
                                                            <span className="btnloader loader"></span>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M13.8001 19.5514H19.8001M4.2002 19.5514L8.56618 18.6717C8.79796 18.625 9.01077 18.5109 9.17791 18.3437L18.9516 8.56461C19.4202 8.09576 19.4199 7.33577 18.9509 6.86731L16.8805 4.79923C16.4117 4.33097 15.6521 4.33129 15.1837 4.79995L5.40896 14.58C5.24214 14.7469 5.12824 14.9593 5.0815 15.1906L4.2002 19.5514Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                </svg>
                                                                <span>{isEditingSchedular || (scheduleTypeGroup === "Regular" && calendarFormData.id) ? 'Update' : 'Submit'}</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                message={confirmationProps.message}
                onConfirm={confirmationProps.onConfirm}
                onCancel={confirmationProps.onCancel}
                title="Confirmation"
            /></>





    )
}

export default SchedularTimesheetModal