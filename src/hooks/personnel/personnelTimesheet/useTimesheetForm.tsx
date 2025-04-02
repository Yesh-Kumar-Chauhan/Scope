import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import moment from 'moment';
import { PersonalTimesheetFormSchema } from '../../../schemas/personnel'
import { ICalendar, ITimesheetForm } from "../../../interface/Personnel";
import { createTimeSheetForm, getSchedularDataForPersonDate, updateTimeSheetForm } from '../../../apis/personnelApi'
import { ISchedularTimesheet } from "../../../interface/scheduleTimesheet";
import { createSchedularTimesheet, updateSchedularTimesheet } from "../../../apis/schedularTimesheetApi";
import { getSiteDataByDistrictId, getSiteDataById } from "../../../apis/sitesApi";
type TimesheetFormInputs = z.infer<typeof PersonalTimesheetFormSchema>;

interface TimesheetState {
    districtSchoolData: any[];
    schoolData: any[];
    siteData: any[];
    positionsData: any[];
    loading: boolean;
    page: number;
    hasMore: boolean;
}

export const useTimesheetForm = (
    initialData: ITimesheetForm,
    setIsEditingTimesheet: (isEditingTimesheet: boolean) => void,
    isEditingTimesheet: boolean,
    timesheetID: number,
    onClose: () => void,
    refetch: any,
    personalId: number,
) => {
    const [timesheetFormData, setTimesheetFormData] = useState<ITimesheetForm>(initialData);
    const [schedules, setSchedules] = useState<Array<ICalendar> | null>(null);
    const [errors, setErrors] = useState<z.ZodFormattedError<TimesheetFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);
    const [districtSite, setDistrictSite] = useState<TimesheetState>({
        districtSchoolData: [],
        schoolData: [],
        siteData: [],
        positionsData: [],
        loading: false,
        page: 1,
        hasMore: true,
    });

    useEffect(() => {
        if (initialData) {
            setTimesheetFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        if (isEditingTimesheet) {
            setIsEditingTimesheet(true);
        }
    }, [isEditingTimesheet]);

    const numberFields = [
        "districtID", "siteID", "schoolID", "type"
    ];

    const timeFields = ['timeIn', 'timeOut', 'lunchIn', 'lunchOut', 'additionalStart', 'additionalStop'];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (timeFields.includes(name)) {
            // Append ":00" to the time value to handle seconds
            const timeWithSeconds = `${value}:00`;
            // Validate the time with Moment.js
            const time = moment(timeWithSeconds, 'HH:mm:ss', true);
            if (time.isValid()) {
                setTimesheetFormData((prevData: any) => ({
                    ...prevData,
                    [name]: time.format('HH:mm:ss'), // Store time in HH:mm:ss format
                }));
            }
            // else if (name === 'districtID' && value) {
            //     try {
            //         const response = await getSiteDataByDistrictId(value, 0);
            //         setDistrictSite((prevState: any) => ({ ...prevState, siteData: response }));
            //         const selectedDistrict = districtSite.districtSchoolData.find((district: any) => district.districtId == value);
            //         setTimesheetFormData((prevData: any) => ({
            //             ...prevData,
            //             districtID: parseInt(value),
            //             distNum: selectedDistrict ? selectedDistrict.distNum.toString() : '',
            //             distNam: selectedDistrict ? selectedDistrict.distNam : '',

            //         }));
            //     }
            //     catch (error) {/
            //         console.error("Error fetching site data:", error);
            //     }
            // }
            else {
                console.log("Invalid time format");
            }
        } else if (numberFields.includes(name)) {
            if (name == "siteID") {
                const schedule = schedules?.find(x => x.siteID === Number(value))
                const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                const selectedDayName = dayMap[moment(timesheetFormData.timeSheetDate).day()]; // Get the day name

                const timeIn = `${selectedDayName}TimeIn`;
                const timeOut = `${selectedDayName}TimeOut`;
                setTimesheetFormData((prevData: any) => ({
                    ...prevData,
                    [name]: value === '' ? null : parseInt(value, 10),
                    position: schedule?.position ?? null,
                    siteTimeIn: schedule ? schedule[timeIn as keyof typeof schedule] : null, 
                    siteTimeOut: schedule ? schedule[timeOut as keyof typeof schedule] : null, 
                    paycode : schedule ? schedule.paycode : ''
                }));
            }
            else {
                setTimesheetFormData((prevData) => ({
                    ...prevData,
                    [name]: value === '' ? null : parseInt(value, 10),
                }));
            }
        } else if (type === 'date') {
            if (value && name == "timeSheetDate") {
                const scheduleData = await getSchedularDataForPersonDate(personalId, value)
                setSchedules(scheduleData)

            } else {
                setSchedules(null)
            }
            setTimesheetFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : value, // Set to null if empty, otherwise use date value
            }));
        } else {
            setTimesheetFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!timesheetFormData.siteID) return;
        const site = await getSiteDataById(timesheetFormData.siteID)

        const distNumber = site?.siteNumber?.toString().substring(0, 3);

        console.log('distNumber', distNumber);
        console.log('districtSite.districtSchoolData', districtSite.districtSchoolData);
        if (!distNumber) return;
        const districtId = districtSite.districtSchoolData.find(x => x.distNum == Number(distNumber))?.districtId
        const updatedFormData = {
            ...timesheetFormData,
            personID: personalId,
            districtID: districtId
        };

        const validationResult = PersonalTimesheetFormSchema.safeParse(updatedFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        // const { personel, schedule, site, ...formData } = updatedFormData
        console.log('updatedFormData', updatedFormData);

        try {
            setLoading(true);
            if (isEditingTimesheet) {
                await updateTimeSheetForm(timesheetID, updatedFormData);
                // await updateSchedularTimesheet(formData);
                refetch()
            } else {
                await createTimeSheetForm(updatedFormData);
                // await createSchedularTimesheet(updatedFormData);
                refetch()
            }
            setTimesheetFormData(initialData);
            setErrors(null);
            setLoading(false);
            onClose();
            if (isEditingTimesheet) {
                setIsEditingTimesheet(false);
            }

        } catch (error) {
            console.log('error while creating personnel');
            let errorMessage = 'An unexpected error occurred while submitting site data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting site data:', error);
            // toast.error(errorMessage);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTimesheetFormData(initialData);
    };

    return {
        timesheetFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setTimesheetFormData,
        errors,
        setErrors,
        loading,
        districtSite,
        setDistrictSite,
        schedules,
        setSchedules
    };
};
