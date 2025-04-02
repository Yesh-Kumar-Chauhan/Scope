// Personnel
import React, { useState } from 'react';
import PersonnelForm from './personnel-form/Personnel-form';
import PersonnelTable from './PersonnelTable';
import { IPersonnel } from './../../../interface/Personnel'
const Personnel: React.FC = () => {
    const [showPersonnelForm, setShowPersonnelForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPersonnel, setCurrentPersonnel] = useState<IPersonnel | null>(null);
    const [personalId, setPersonalId] = useState<number | null>(null);
    const [personnelDataById , setPersonnelDataById] =useState<IPersonnel | null>(null)


    const handleEditPersonnel = (personal: IPersonnel) => {
        setCurrentPersonnel(personal);
        setPersonalId(personal?.personalID);
        setIsEditing(true);
        setShowPersonnelForm(true);
        setPersonnelDataById(personal)
    };

    const handleCreateNewPersonnel = () => {
        setCurrentPersonnel(null);
        setIsEditing(false);
        setShowPersonnelForm(true);
    };

    return (
        <div >
            {
                showPersonnelForm ? (
                    <PersonnelForm
                        setShowPersonnelForm={setShowPersonnelForm}
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        currentPersonnel={currentPersonnel}
                        onCreateNewPersonnel={handleCreateNewPersonnel}
                        onEditPersonnel={handleEditPersonnel}
                        personalId={personalId}
                        personnelDataById={personnelDataById}
                    />
                ) :
                    <PersonnelTable
                        onCreateNewPersonnel={handleCreateNewPersonnel}
                        onEditPersonnel={handleEditPersonnel}
                    />
            }


        </div>
    )
}

export default Personnel