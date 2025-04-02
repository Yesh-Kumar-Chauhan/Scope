import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import moment from 'moment';
import { waiverFormSchema } from '../../../schemas/personnel'
import { IWaiverForm } from "../../../interface/Personnel";
import { createWaiverForm, updateWaiverForm } from '../../../apis/personnelApi'
type waiverFormInputs = z.infer<typeof waiverFormSchema>;

export const useWaiverForm = (
    initialData: IWaiverForm,
    setIsEditingTimesheet: (isEditingTimesheet: boolean) => void,
    isEditingTimesheet: boolean,
    waiverID: number,
    onClose: () => void,
    refetch: any,
    personalId: number,
) => {
    const [waiverFormData, setWaiverFormData] = useState<IWaiverForm>(initialData);
    const [errors, setErrors] = useState<z.ZodFormattedError<waiverFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setWaiverFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        if (isEditingTimesheet) {
            setIsEditingTimesheet(true);
        }
    }, [isEditingTimesheet]);

    const numberFields = [
        "waiverID"
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (numberFields.includes(name)) {
            setWaiverFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        }
        else if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setWaiverFormData((prevData: any) => ({
                ...prevData,
                [name]: isChecked,
            }));
        }

        else {
            setWaiverFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationResult = waiverFormSchema.safeParse(waiverFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        const updatedFormData = {
            ...waiverFormData,
            staffId: personalId,
        };

        try {
            setLoading(true);
            if (isEditingTimesheet) {
                await updateWaiverForm(waiverID, updatedFormData);
                refetch()
            } else {
                await createWaiverForm(updatedFormData);
                refetch()
            }
            setWaiverFormData(initialData);
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
        setWaiverFormData(initialData);
    };

    return {
        waiverFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setWaiverFormData,
        errors,
        setErrors,
        loading,
    };
};
