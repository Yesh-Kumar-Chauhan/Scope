import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosConfig";
import { useState } from "react";
import { AxiosError } from "axios";
import { createDistrict, updateDistrict } from "../../apis/districtsApi";
import { districtSchema } from "./../../schemas/district"; // Import your Zod schema
import { z } from 'zod';
export const useCreateDistrictForm = (

    refetch: () => void,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    setCurrentPage: any
) => {
    const initialFormData: any = {
        distNum: "",
        distNam: "",
        liaison: "",
        title: "",
        secretary: "",
        addr1: "",
        addr2: "",
        addr3: "",
        lPhone: "",
        lFax: "",
        liason2: "",
        title2: "",
        secretary2: "",
        addr12: "",
        addr22: "",
        addr32: "",
        lPhone2: "",
        lPax2: "",
        super: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
        contract: false,
        terms: "",
        kndrgrtn: "",
        active: false,
        class: "",
        county: "",
        kinreg: null,
        kinper: "",
        kinfon: "",
        rspnsbl: "",
        email1: "",
        email2: "",
        notes: "",
        lEmail1: "",
        lEmail2: "",
        bhemercon: "",
        bhemerfon: "",
        building: "",
        emailsuper: "",
        supervisor: "",
        trainer: ""
    };
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<z.ZodIssue[]>([]);
    const [loading, setLoading] = useState(false);
    console.log('formData', formData)

    // const handleChange = (e: any) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData((prevFormData: any) => ({
    //         ...prevFormData,
    //         [name]: type === 'checkbox' ? checked : value,
    //     }));

    // };
    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
    
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: type === 'checkbox'
                ? checked
                : type === 'date' && value === ''
                ? null
                : value,
        }));
    };
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationResult = districtSchema.safeParse(formData);
        if (!validationResult.success) {
            setErrors(validationResult.error.issues);
            return;
        }
        try {
            setLoading(true);
            if (isEditing)
                await updateDistrict(formData);
            else
                await createDistrict(formData);

            setFormData(initialFormData);
            setCurrentPage(1);
            refetch();
            setIsEditing(false);
            setErrors([]);
            setLoading(false)

        } catch (error) {
            let errorMessage = 'An unexpected error occurred while submitting district data.';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            console.error('An error occurred while submitting district data:', error);
            toast.error(errorMessage);
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors([]);
    };

    return { formData, handleChange, handleSubmit, resetForm, setFormData, errors, loading };
};
