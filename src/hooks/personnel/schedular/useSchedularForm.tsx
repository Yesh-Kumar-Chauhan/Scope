import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import moment from 'moment';
import { CalendarSchema } from '../../../schemas/personnel'
import { ICalendar } from "../../../interface/Personnel";
import { createSchedularForm, updateSchedularForm, fetchSchedular, createAdditionalSchedularForm } from '../../../apis/personnelApi'
import { useModalCallback } from "../../../contexts/ModalCallbackContext";
import { debug } from "console";
type CalendarInputs = z.infer<ReturnType<typeof CalendarSchema>>;

export const useSchedularForm = (
    initialData: ICalendar,
    personalId: number,
    isEditingSchedular: boolean,
    handleCloseMainModal: () => void,
    refetch: () => void,
    schedularId: number,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedScheduleType?: string,
    scheduleTypeGroup?: string
) => {
    const [calendarFormData, setCalendarFormData] = useState<ICalendar>(initialData);
    const [initialState, setInitialState] = useState({
        site: initialData.siteID,
        position: initialData.position,
    });
    const [errors, setErrors] = useState<z.ZodFormattedError<CalendarInputs, string> | null>(null);
    const [loading, setLoading] = useState({
        submit: false,
        delete: false
    });

    const { getCallback } = useModalCallback();

    useEffect(() => {
        if (initialData) {
            setCalendarFormData(initialData);
        }
    }, [initialData]);

    // useEffect(() => {
    //     if (isEditingTimesheet) {
    //         setIsEditingTimesheet(true);
    //     }
    // }, [isEditingTimesheet]);

    const numberFields = [
        "id", "personID", "siteID"
    ];

    const timeFields = [
        'mondayTimeIn', 'mondayTimeOut',
        'tuesdayTimeIn', 'tuesdayTimeOut',
        'wednesdayTimeIn', 'wednesdayTimeOut',
        'thursdayTimeIn', 'thursdayTimeOut',
        'fridayTimeIn', 'fridayTimeOut',
        'lunchIn', 'lunchOut',
        'additionalStart', 'additionalStop'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (['siteID', 'position'].includes(name) && isEditingSchedular) {
            console.log('initialState', initialState);
            console.log('calendarFormData', calendarFormData);

            const isSiteChanged = name === 'siteID' ? parseInt(value, 10) !== initialState.site : calendarFormData.siteID !== initialState.site;
            const isPositionChanged = name === 'position' ? value !== initialState.position : calendarFormData.position !== initialState.position;

            // Determine if paycode is required based on changes to either siteID or position
            const isPaycodeRequired = isSiteChanged || isPositionChanged;

            setCalendarFormData((prevData: any) => ({
                ...prevData,
                [name]: name === 'siteID' ? parseInt(value, 10) : value,
                paycodeRequired: isPaycodeRequired, // Set `paycodeRequired` based on changes
            }));
        }
        else {

            // if (timeFields.includes(name)) {
            //     // Append ":00" to the time value to handle seconds
            //     const timeWithSeconds = `${value}:00`;
            //     // Validate the time with Moment.js
            //     const time = moment(timeWithSeconds, 'HH:mm:ss', true);
            //     if (time.isValid()) {
            //         setCalendarFormData((prevData: any) => ({
            //             ...prevData,
            //             [name]: time.format('HH:mm:ss'), // Store time in HH:mm:ss format
            //         }));
            //     } else {
            //         console.log("Invalid time format");
            //     }
            // } 
            
            if (timeFields.includes(name)) {
                // Append ":00" to the time value to handle seconds
                const timeWithSeconds = `${value}:00`;
                const time = moment(timeWithSeconds, 'HH:mm:ss', true); // Validate the time with Moment.js
            
                if (time.isValid()) {
                    setCalendarFormData((prevData: any) => {
                        const updatedData = { ...prevData, [name]: time.format('HH:mm:ss') };
            
                        // Validation logic for time-in and time-out fields
                        const day = name.replace(/Time(In|Out)$/, ''); // Extract the day from the field name
                        const timeInField = `${day}TimeIn`;
                        const timeOutField = `${day}TimeOut`;
            
                        // If the user is updating the "time-out" field, ensure the "time-in" field is filled
                        if (name.endsWith('TimeOut')) {
                            if (!updatedData[timeInField]) {
                                toast.error(`Please fill in ${timeInField}`);
                                // Clear the invalid input field
                                return { ...prevData, [name]: '' };
                            }
            
                            // Ensure "time-out" is not earlier than "time-in"
                            const timeInMoment = moment(updatedData[timeInField], 'HH:mm:ss');
                            if (time.isBefore(timeInMoment)) {
                                toast.error(`${name} cannot be earlier than ${timeInField}.`);
                                // Clear the invalid input field
                                return { ...prevData, [name]: '' };
                            }
            
                            // Ensure time-in and time-out are not the same
                            if (time.isSame(timeInMoment)) {
                                toast.error(`${name} cannot be the same as ${timeInField}.`);
                                // Clear the invalid input field
                                return { ...prevData, [name]: '' };
                            }
                        }
            
                        return updatedData; // Update the state if all validations pass
                    });
                } else {
                    toast.error("Invalid time format");
                    // Clear the invalid input field
                    setCalendarFormData((prevData: any) => ({
                        ...prevData,
                        [name]: '',
                    }));
                }
            }
            
            
            else if (numberFields.includes(name)) {
                setCalendarFormData((prevData) => ({
                    ...prevData,
                    [name]: value === '' ? null : parseInt(value, 10),
                }));
            } else if (type === 'checkbox') {
                const isChecked = (e.target as HTMLInputElement).checked;
                setCalendarFormData((prevData: any) => ({
                    ...prevData,
                    [name]: isChecked,
                }));
            } else if (type === 'radio') {
                // No need for `checked`, just use `value` directly for radio buttons
                setCalendarFormData((prevData: any) => ({
                    ...prevData,
                    [name]: value,
                    siteID: 0,
                    position: '',
                }));
            }
            else {
                if (name == "date") {
                    setCalendarFormData((prevData: any) => ({
                        ...prevData,
                        [name]: value,
                        mondayTimeIn: '',
                        mondayTimeOut: '',
                        tuesdayTimeIn: '',
                        tuesdayTimeOut: '',
                        wednesdayTimeIn: '',
                        wednesdayTimeOut: '',
                        thursdayTimeIn: '',
                        thursdayTimeOut: '',
                        fridayTimeIn: '',
                        fridayTimeOut: '',
                        paycodeRequired: true
                    }));
                }
                else {
                    setCalendarFormData((prevData: any) => ({
                        ...prevData,
                        [name]: value,
                    }));
                }
            }
        }
    };

    const handleSubmit = async (e: any, isDeleting = false): Promise<boolean> => {
        e.preventDefault();
        const validationResult = CalendarSchema().safeParse(calendarFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return false; // Validation failed
        }
        let updatedFormData: ICalendar;
        if (isDeleting) {
            setLoading((state) => ({ ...state, delete: true }));
            updatedFormData = {
                ...calendarFormData,
                personID: personalId,
                deletedSiteType: calendarFormData.deletedSiteType || null,
                date: null,
                startDate: null,
                endDate: null,
                updatedDate: null,
                deletedDate: calendarFormData.deletedDate || null,
                mondayTimeIn: calendarFormData.mondayTimeIn || null,
                mondayTimeOut: calendarFormData.mondayTimeOut || null,
                tuesdayTimeIn: calendarFormData.tuesdayTimeIn || null,
                tuesdayTimeOut: calendarFormData.tuesdayTimeOut || null,
                wednesdayTimeIn: calendarFormData.wednesdayTimeIn || null,
                wednesdayTimeOut: calendarFormData.wednesdayTimeOut || null,
                thursdayTimeIn: calendarFormData.thursdayTimeIn || null,
                thursdayTimeOut: calendarFormData.thursdayTimeOut || null,
                fridayTimeIn: calendarFormData.fridayTimeIn || null,
                fridayTimeOut: calendarFormData.fridayTimeOut || null,
            };
        } else {
            setLoading((state) => ({ ...state, submit: true }));
            updatedFormData = {
                ...calendarFormData,
                personID: personalId,
                deletedSiteType: calendarFormData.deletedSiteType || null,
                date: calendarFormData.date || null,
                startDate: calendarFormData.startDate || null,
                endDate: calendarFormData.endDate || null,
                updatedDate: calendarFormData.updatedDate || null,
                deletedDate: calendarFormData.deletedDate || null,
                mondayTimeIn: calendarFormData.mondayTimeIn || null,
                mondayTimeOut: calendarFormData.mondayTimeOut || null,
                tuesdayTimeIn: calendarFormData.tuesdayTimeIn || null,
                tuesdayTimeOut: calendarFormData.tuesdayTimeOut || null,
                wednesdayTimeIn: calendarFormData.wednesdayTimeIn || null,
                wednesdayTimeOut: calendarFormData.wednesdayTimeOut || null,
                thursdayTimeIn: calendarFormData.thursdayTimeIn || null,
                thursdayTimeOut: calendarFormData.thursdayTimeOut || null,
                fridayTimeIn: calendarFormData.fridayTimeIn || null,
                fridayTimeOut: calendarFormData.fridayTimeOut || null,
            };
        }
        if (calendarFormData.paycodeRequired) {
            updatedFormData.paycode = calendarFormData.paycode;
        }
        if (selectedScheduleType) {
            updatedFormData.selectedScheduleType = selectedScheduleType;
        }

        try {

            if (isEditingSchedular && schedularId) {
                await updateSchedularForm(schedularId, updatedFormData);
                refetch();
            } else if(scheduleTypeGroup == "Regular"){
                // const schedularData = await fetchSchedular(personalId);
                // const formattedDate = updatedFormData.date
                //     ? moment(updatedFormData.date).format("YYYY-MM-DD")
                //     : null;

                // const existingRecord = schedularData?.data?.find((record) => {
                //     const recordDate = record.date
                //         ? moment(record.date).format("YYYY-MM-DD")
                //         : null;
                //     return recordDate === formattedDate && record.paycode;
                // });

                // if (existingRecord) {
                //     toast.error(`You cannot create more than one additional site for the same date ${formattedDate}.`);
                //     setLoading((state) => ({ ...state, submit: false }));
                //     refetch();
                //     return false;
                // }
                delete updatedFormData?.id;
                await createSchedularForm(updatedFormData);
                refetch();
            }
            else{
                delete updatedFormData?.id;
                await createAdditionalSchedularForm(updatedFormData);
                refetch();
            }
            setCalendarFormData(initialData);
            setErrors(null);
            setLoading((state) => ({ ...state, submit: false, delete: false }));

            const loadEvents = getCallback();
            if (loadEvents) {
                loadEvents(updatedFormData);
            }
            return true; // Submission succeeded
        } catch (error) {
            console.error('An error occurred while submitting site data:', error);
            let errorMessage = 'An unexpected error occurred while submitting site data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            toast.error(errorMessage);
            setLoading((state) => ({ ...state, submit: false, delete: false }));
            return false; // Submission failed
        }
    };


    // const handleSubmit = async (e: any, isDeleting = false) => {
    //     e.preventDefault();
    //     const validationResult = CalendarSchema().safeParse(calendarFormData);
    //     if (!validationResult.success && validationResult.error) {
    //         setErrors(validationResult.error.format());
    //         return;
    //     }

    //     let updatedFormData: ICalendar
    //     if (isDeleting) {
    //         setLoading((state) => ({ ...state, delete: true }));

    //         updatedFormData = {
    //             ...calendarFormData,
    //             personID: personalId,
    //             deletedSiteType: calendarFormData.deletedSiteType || null,
    //             date: null,
    //             startDate: null,
    //             endDate: null,
    //             updatedDate: null,
    //             deletedDate: calendarFormData.deletedDate || null,
    //             mondayTimeIn: calendarFormData.mondayTimeIn || null,
    //             mondayTimeOut: calendarFormData.mondayTimeOut || null,
    //             tuesdayTimeIn: calendarFormData.tuesdayTimeIn || null,
    //             tuesdayTimeOut: calendarFormData.tuesdayTimeOut || null,
    //             wednesdayTimeIn: calendarFormData.wednesdayTimeIn || null,
    //             wednesdayTimeOut: calendarFormData.wednesdayTimeOut || null,
    //             thursdayTimeIn: calendarFormData.thursdayTimeIn || null,
    //             thursdayTimeOut: calendarFormData.thursdayTimeOut || null,
    //             fridayTimeIn: calendarFormData.fridayTimeIn || null,
    //             fridayTimeOut: calendarFormData.fridayTimeOut || null,
    //         };
    //     }
    //     else {
    //         setLoading((state) => ({ ...state, submit: true }));
    //         updatedFormData = {
    //             ...calendarFormData,
    //             personID: personalId,
    //             deletedSiteType: calendarFormData.deletedSiteType || null,
    //             date: calendarFormData.date || null,
    //             startDate: calendarFormData.startDate || null,
    //             endDate: calendarFormData.endDate || null,
    //             updatedDate: calendarFormData.updatedDate || null,
    //             deletedDate: calendarFormData.deletedDate || null,
    //             mondayTimeIn: calendarFormData.mondayTimeIn || null,
    //             mondayTimeOut: calendarFormData.mondayTimeOut || null,
    //             tuesdayTimeIn: calendarFormData.tuesdayTimeIn || null,
    //             tuesdayTimeOut: calendarFormData.tuesdayTimeOut || null,
    //             wednesdayTimeIn: calendarFormData.wednesdayTimeIn || null,
    //             wednesdayTimeOut: calendarFormData.wednesdayTimeOut || null,
    //             thursdayTimeIn: calendarFormData.thursdayTimeIn || null,
    //             thursdayTimeOut: calendarFormData.thursdayTimeOut || null,
    //             fridayTimeIn: calendarFormData.fridayTimeIn || null,
    //             fridayTimeOut: calendarFormData.fridayTimeOut || null,
    //         };
    //     }

    //     // Add paycode only if date has a value
    //     if (calendarFormData?.date || calendarFormData?.updatedDate) {
    //         updatedFormData.paycode = calendarFormData.paycode;
    //     }

    //     try {

    //         if (isEditingSchedular && schedularId) {
    //             await updateSchedularForm(schedularId, updatedFormData);
    //             refetch()
    //         } else {
    //             delete updatedFormData?.id;
    //             // delete updatedFormData?.personel;
    //             // delete updatedFormData?.site;
    //             await createSchedularForm(updatedFormData);
    //             refetch()
    //         }
    //         setCalendarFormData(initialData);
    //         setErrors(null);
    //         setLoading((state) => ({ ...state, submit: false, delete: false }));
    //         const loadEvents = getCallback();
    //         if (loadEvents) {
    //             loadEvents(updatedFormData); // Pass the required argument if needed
    //         }
    //         // onClose();
    //         // if (isEditingTimesheet) {
    //         //     setIsEditingTimesheet(false);
    //         // }

    //     } catch (error) {
    //         console.log('error while creating personnel');
    //         let errorMessage = 'An unexpected error occurred while submitting site data.';
    //         if (error instanceof AxiosError) {
    //             errorMessage = error.response?.data?.message || errorMessage;
    //         } else if (error instanceof Error) {
    //             errorMessage = error.message || errorMessage;
    //         }
    //         console.error('An error occurred while submitting site data:', error);
    //         toast.error(errorMessage);
    //         setLoading((state) => ({ ...state, submit: false, delete: false }));
    //     }
    // };

    const resetForm = () => {
        setCalendarFormData(initialData);
    };

    return {
        calendarFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setCalendarFormData,
        errors,
        setErrors,
        loading,
        setIsModalOpen
    };
};
