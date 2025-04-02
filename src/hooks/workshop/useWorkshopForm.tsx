import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { createWorkshop, updateWorkshop } from "../../apis/workshopApi"; 
import {IWorkshop } from "../../interface/Workshop";
import { workshopFormSchema } from "../../schemas/workshop";
import { z } from "zod";

type WorkshopFormInputs = z.infer<typeof workshopFormSchema>;

export const useWokshopForm = (
    initialFormData: IWorkshop,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    setShowWorkshopForm:(showWorkshopForm: boolean) => void,
) => {
    const [workshopFormData, setWorkshopFormData] = useState<IWorkshop>(initialFormData);
    const [errors, setErrors] = useState<z.ZodFormattedError<WorkshopFormInputs, string> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setWorkshopFormData(initialFormData);
    }, [initialFormData]);

    const numberFields = [
        "workshopTypeId", "hours",
    ];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
    
        // Handle checkbox separately
        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: isChecked,
            }));
        } 
        // Handle number fields separately
        else if (numberFields.includes(name)) {
            setWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : parseInt(value, 10),  // Convert to number or set to null if empty
            }));
        }
        else if (type === 'date') {
            setWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: value === '' ? null : value, // Set to null if cleared, otherwise use date value
            }));
        }
        // Handle other input types
        else {
            setWorkshopFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const validationResult = workshopFormSchema.safeParse(workshopFormData);
        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }
        const payload = {
            ...workshopFormData,  // Use the form data as-is, since it now contains the correct topicIds and personIds
        };
        try {
            setLoading(true);
            if (isEditing) {
                await updateWorkshop(workshopFormData.workshopID, workshopFormData); 
            } else {
                await createWorkshop(payload); 
            }

            setWorkshopFormData(initialFormData); 
            setIsEditing(false); 
            setErrors(null); 
            setShowWorkshopForm(false)
            setLoading(false); 

        } catch (error) {
            console.log('error while creating sites');

            let errorMessage = 'An unexpected error occurred while submitting site data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting site data:', error);
            toast.error(errorMessage);
            setLoading(false); // Stop loading state
        }
    };

    const resetForm = () => {
        setWorkshopFormData(initialFormData);
        setErrors(null);
    };

    return {
        workshopFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setWorkshopFormData,
        errors,
        setErrors,
        loading,
        setLoading,
    };
};
