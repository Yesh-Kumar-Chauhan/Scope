
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import { inserviceFormSchema } from '../../schemas/inservice'
import { IInservice } from "../../interface/Inservice";
import { createInService, updateInService } from '../../apis/inserviceApi'

type InserviceFormInputs = z.infer<typeof inserviceFormSchema>;

export const useInserviceForm = (
    initialFormData: IInservice,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    inservicePersonalId: any,
    setShowInserviceWorkShopForm: any
) => {
    const [inserviceFormData, setInserviceFormData] = useState<IInservice>(initialFormData);
    const [errors, setErrors] = useState<z.ZodFormattedError<InserviceFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInserviceFormData(initialFormData);
    }, [initialFormData]);

    const numberFields = [
        "inserviceID", "staffId", "hours", "topicId",
        "workshopTypeId", 
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setInserviceFormData((prevData) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } else if (numberFields.includes(name)) {
            setInserviceFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        } else if (type === 'date') {
            setInserviceFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : value, // Set to null if cleared, otherwise use date value
            }));
        }else {
            setInserviceFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedFormData = {
            ...inserviceFormData,
            staffId: inservicePersonalId.personalID,
        };

        const validationResult = inserviceFormSchema.safeParse(updatedFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }
        try {
            setLoading(true);
            if (isEditing) {
                await updateInService(updatedFormData);
            } else {
                await createInService(updatedFormData);
            }
            setIsEditing(false);
            setErrors(null);
            setLoading(false);
            setShowInserviceWorkShopForm(false);
        } catch (error) {
            let errorMessage = 'An unexpected error occurred while submitting inservice data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting inservice data:', error);
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return {
        inserviceFormData,
        setInserviceFormData,
        handleChange,
        handleSubmit,
        errors,
        setErrors,
        loading,
    };
};