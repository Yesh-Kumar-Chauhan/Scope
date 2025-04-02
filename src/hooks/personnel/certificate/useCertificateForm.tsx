import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import moment from 'moment';
import { certificateFormSchema } from '../../../schemas/personnel'
import { ICertificateForm } from "../../../interface/Personnel";
import { createCertificateForm, updateCertificateForm } from '../../../apis/personnelApi'
import { ISchedularTimesheet } from "../../../interface/scheduleTimesheet";
import { createSchedularTimesheet, updateSchedularTimesheet } from "../../../apis/schedularTimesheetApi";
import { getSiteDataByDistrictId } from "../../../apis/sitesApi";
type CertificateFormInputs = z.infer<typeof certificateFormSchema>;

interface TimesheetState {
    districtSchoolData: any[];
    schoolData: any[];
    siteData: any[];
    loading: boolean;
    page: number;
    hasMore: boolean;
}

export const useCertificateForm = (
    initialData: ICertificateForm,
    setIsEditingTimesheet: (isEditingTimesheet: boolean) => void,
    isEditingTimesheet: boolean,
    certificateID: number,
    onClose: () => void,
    refetch: any,
    personalId: number,
) => {
    const [certificateFormData, setCertificateFormData] = useState<ICertificateForm>(initialData);
    const [errors, setErrors] = useState<z.ZodFormattedError<CertificateFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);
    const [districtSite, setDistrictSite] = useState<TimesheetState>({
        districtSchoolData: [],
        schoolData: [],
        siteData: [],
        loading: false,
        page: 1,
        hasMore: true,
    });

    useEffect(() => {
        if (initialData) {
            setCertificateFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        if (isEditingTimesheet) {
            setIsEditingTimesheet(true);
        }
    }, [isEditingTimesheet]);

    const numberFields = [
        "certificateID", "certificateTypeID", "personID"
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (numberFields.includes(name)) {
            setCertificateFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        }
        else if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setCertificateFormData((prevData: any) => ({
                ...prevData,
                [name]: isChecked,
            }));
        }
        else {
            setCertificateFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationResult = certificateFormSchema.safeParse(certificateFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        const updatedFormData = {
            ...certificateFormData,
            // certificateID: 0,
            personID: personalId,
            certificatePermanent: certificateFormData.certificatePermanent || false,
            certificateProfessional: certificateFormData.certificateProfessional || false,
            certificateCQ: certificateFormData.certificateCQ || false,
            initial: certificateFormData.initial || false,
            initialExpiration: certificateFormData.initialExpiration || null,
            provisional: certificateFormData.provisional || false,
            provisionalExpiration: certificateFormData.provisionalExpiration || null,
        };

        // const { personel, schedule, site, ...formData } = updatedFormData
        console.log('updatedFormData', updatedFormData);

        try {
            setLoading(true);
            if (isEditingTimesheet) {
                await updateCertificateForm(certificateID, updatedFormData);
                refetch()
            } else {
                await createCertificateForm(updatedFormData);
                refetch()
            }
            setCertificateFormData(initialData);
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
        setCertificateFormData(initialData);
    };

    return {
        certificateFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setCertificateFormData,
        errors,
        setErrors,
        loading,
        districtSite,
        setDistrictSite,
    };
};
