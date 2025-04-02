import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { z } from "zod";
import { inserviceWorkshopFormSchema } from '../../schemas/inservice'
import { IInserviceWorkShop } from "../../interface/Inservice";
import { createWorkShopInServiceForm } from '../../apis/inserviceApi'

type InserviceFormInputs = z.infer<typeof inserviceWorkshopFormSchema>;

export const useInserviceWorkshopForm = (
    initialFormData: IInserviceWorkShop,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    inservicePersonalId: any,
    setShowInserviceWorkShopForm: any,
    setShowInserviceBasicTable:any,
    setActiveTab:any
    
) => {
    const [inserviceWorshopFormData, setInserviceWorkshopFormData] = useState<IInserviceWorkShop>(initialFormData);
    const [error, setError] = useState<z.ZodFormattedError<InserviceFormInputs, string> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setInserviceWorkshopFormData(initialFormData);
    }, [initialFormData]);

    const numberFields = [
        "inserviceID", "staffId", "hours", "topicId",
        "workshopTypeId", 
    ];
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = 'target' in e ? e.target : e;

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setInserviceWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } else if (numberFields.includes(name)) {
            setInserviceWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),
            }));
        }
         else {
            setInserviceWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResult = inserviceWorkshopFormSchema.safeParse(inserviceWorshopFormData);
        if (!validationResult.success && validationResult.error) {
            setError(validationResult.error.format());
            return;
        }

        try {
            setIsLoading(true);
            if (isEditing) {
                // await updateInService(updatedFormData);
            } else {
                await createWorkShopInServiceForm(inserviceWorshopFormData);
            }
            setIsEditing(false);
            setError(null);
            setIsLoading(false);
            setInserviceWorkshopFormData(initialFormData);
            setActiveTab(0);
            setShowInserviceBasicTable(false);
        } catch (error) {
            let errorMessage = 'An unexpected error occurred while submitting inservice data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting inservice data:', error);
            toast.error(errorMessage);
        }
        finally{
            setIsLoading(false);
        }
    };

    return {
        inserviceWorshopFormData,
        setInserviceWorkshopFormData,
        onChange,
        onSubmit,
        error,
        setError,
        isLoading,
    };
};