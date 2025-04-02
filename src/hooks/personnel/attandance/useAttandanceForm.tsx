import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import moment from 'moment';
import { attendanceFormSchema } from '../../../schemas/personnel'
import { IAttendanceForm, ICalendar } from "../../../interface/Personnel";
import { createAttendanceForm, createCertificateForm, getSchedularDataForPersonDate, updateAttendanceForm, updateCertificateForm } from '../../../apis/personnelApi'
import { ISchedularTimesheet } from "../../../interface/scheduleTimesheet";
import { createSchedularTimesheet, updateSchedularTimesheet } from "../../../apis/schedularTimesheetApi";
import { getSiteDataByDistrictId } from "../../../apis/sitesApi";
type AttendanceFormInputs = z.infer<typeof attendanceFormSchema>;

interface TimesheetState {
    districtSchoolData: any[];
    schoolData: any[];
    siteData: any[];
    loading: boolean;
    page: number;
    hasMore: boolean;
    setSites:any,
    sites:any
}

export const useAttandanceForm = (
    initialData: IAttendanceForm,
    setIsEditingTimesheet: (isEditingTimesheet: boolean) => void,
    isEditingTimesheet: boolean,
    attendanceID: number,
    onClose: () => void,
    refetch: any,
    personalId: number,
    sites:any,
    setSites:any,
) => {
    const [attendanceFormData, setAttendanceFormData] = useState<IAttendanceForm>(initialData);
    const [errors, setErrors] = useState<z.ZodFormattedError<AttendanceFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);
     const [schedules, setSchedules] = useState<Array<ICalendar> | null>(null);
    const [districtSite, setDistrictSite] = useState<TimesheetState>({
        districtSchoolData: [],
        schoolData: [],
        siteData: [],
        loading: false,
        page: 1,
        hasMore: true,
        sites:[],
        setSites:[],
    });
    const [paycode, setPaycode] = useState<any>('');

    useEffect(() => {
        if (initialData) {
            setAttendanceFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        if (isEditingTimesheet) {
            setIsEditingTimesheet(true);
        }
    }, [isEditingTimesheet]);

    const numberFields = [
        "attendanceID", "reasonID"
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (name === 'siteNumber') {
            // const selectedSite = s   ites.find((site: any) => site.siteNumber === parseInt(value, 10));
            const [selectedSiteNumber, selectedScheduleId] = value.split('|');
            const siteNumberInt = parseInt(selectedSiteNumber, 10);
            const scheduleIdInt = parseInt(selectedScheduleId, 10);

            const selectedSite = sites.find(
                (site: any) =>
                    site.siteNumber === siteNumberInt &&
                    site.scheduleId === scheduleIdInt
            );

            if (selectedSite) {
                if(schedules?.length){
                const matchingSchedule = schedules.find(
                    (schedule: any) => schedule.id === selectedSite.scheduleId
                );
    
                if (matchingSchedule && matchingSchedule.paycode) {
                    setPaycode(matchingSchedule.paycode);
                } else {
                    setPaycode(null);
                }
                setAttendanceFormData((prevData:any) => ({
                    ...prevData,
                    siteNumber: siteNumberInt,
                    siteName: selectedSite.siteName, // 🟢 This ensures siteName is displayed
                    scheduleId: scheduleIdInt,
                }));
            }
            }
        }else if (type === 'date') {
            if (value && name == "date") {
                const scheduleData = await getSchedularDataForPersonDate(personalId, value)
                setSchedules(scheduleData)
                setAttendanceFormData((prevData: any) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setSchedules(null)
                setAttendanceFormData((prevData: any) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }
        else if (numberFields.includes(name)) {
            setAttendanceFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        }
        else if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setAttendanceFormData((prevData: any) => ({
                ...prevData,
                [name]: isChecked,
            }));
        }
          
        else {
            setAttendanceFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationResult = attendanceFormSchema.safeParse(attendanceFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        const updatedFormData = {
            ...attendanceFormData,
            staffId: personalId,
            paycode: paycode?paycode:''
        };

        try {
            setLoading(true);
            if (isEditingTimesheet) {
                await updateAttendanceForm(attendanceID, updatedFormData);
                refetch()
            } else {
                await createAttendanceForm(updatedFormData);
                refetch()
            }
            setAttendanceFormData(initialData);
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
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setAttendanceFormData(initialData);
    };

    return {
        attendanceFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setAttendanceFormData,
        errors,
        setErrors,
        loading,
        districtSite,
        setDistrictSite,
        schedules,
        setSchedules
    };
};
