import React, { useEffect, useState } from 'react'
import WorkshopForm from './workshopForm/WorkshopForm';
import WorkshopTable from './WorkshopTable';
import { IWorkshop } from '../../../interface/Workshop';
import { useWokshopForm } from '../../../hooks/workshop/useWorkshopForm'
import { workshopFormDataModal } from '../../../data/workshopFromData'

const Workshop = () => {
    const [showWorkshopForm, setShowWorkshopForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentWorkshop, setCurrentWorkshop] = useState<IWorkshop | null>(null);

    const {
        workshopFormData,
        setWorkshopFormData,
        errors,
        handleChange,
        handleSubmit,
        loading,
        setLoading,
    } = useWokshopForm(workshopFormDataModal, isEditing, setIsEditing, setShowWorkshopForm);

    useEffect(() => {
        if (isEditing && currentWorkshop) {
            setWorkshopFormData(currentWorkshop);
        } else {
            setWorkshopFormData(workshopFormDataModal);
        }
    }, [isEditing, currentWorkshop]);

    const handleEditWorkshop = (workshop: IWorkshop) => {
        setCurrentWorkshop(workshop);
        setIsEditing(true);
        setShowWorkshopForm(true);
    };

    const handleCreateNewWorkshop = () => {
        setCurrentWorkshop(null);
        setIsEditing(false);
        setShowWorkshopForm(true);
    };


    return (
        <>
            {!showWorkshopForm ? (
                <WorkshopTable
                    onEditWorkshop={handleEditWorkshop}
                    onCreateNewWorkshop={handleCreateNewWorkshop} />
            ) : (
                <WorkshopForm
                    setShowWorkshopForm={setShowWorkshopForm}
                    workshopFormData={workshopFormData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isEditing={isEditing}
                    isLoading={loading}
                    setIsLoading={setLoading}
                />
            )}
        </>
    )
}

export default Workshop