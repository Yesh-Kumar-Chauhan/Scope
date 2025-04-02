
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import { visitFormSchema } from '../../schemas/visits'
import { IVisit } from "../../interface/Visits";
// import { createInService, updateInService } from '../../apis/inserviceApi'

type VisitFormInputs = z.infer<typeof visitFormSchema>;

export const useVisitForm = (
    initialFormData: IVisit,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    inservicePersonalId: any,
    // setShowInserviceWorkShopForm: any
) => {
    const [visitFormData, setVisitFormData] = useState<IVisit>(initialFormData);
    const [errors, setErrors] = useState<z.ZodFormattedError<VisitFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setVisitFormData(initialFormData);
    }, [initialFormData]);

    const numberFields = [
        "inserviceID", "staffId", "hours", "topicId",
        "workshopTypeId", 
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setVisitFormData((prevData) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } else if (numberFields.includes(name)) {
            setVisitFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        } else {
            setVisitFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const updatedFormData = {
        //     ...visitFormData,
        //     staffId: inservicePersonalId.personalID,
        // };

        const validationResult = visitFormSchema.safeParse(visitFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                // await updateInService(visitFormData);
            } else {
                // await createInService(visitFormData);
            }
            setIsEditing(false);
            setErrors(null);
            setLoading(false);
            // setShowInserviceWorkShopForm(false);
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
        visitFormData,
        setVisitFormData,
        handleChange,
        handleSubmit,
        errors,
        setErrors,
        loading,
    };
};