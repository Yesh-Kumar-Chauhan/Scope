import React, { useState } from 'react'
import SiteForm from './site-form/SiteForm'
import SiteTable from './SiteTable';
import { ISite } from '../../../interface/Sites';

const Site = () => {
    const [showSiteForm, setShowSiteForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSite, setCurrentSite] = useState<ISite | null>(null);

    const handleEditSite = (site: ISite) => {
        setCurrentSite(site);
        setIsEditing(true);
        setShowSiteForm(true);
    };

    const handleCreateNewSite = () => {
        setCurrentSite(null); // Clear the current site to create a new one
        setIsEditing(false);
        setShowSiteForm(true);
    };

    return (
        <>
            {!showSiteForm ? (
                <SiteTable
                    setShowSiteForm={setShowSiteForm}
                    onEditSite={handleEditSite}
                    onCreateNewSite={handleCreateNewSite} />
            ) : (
                <SiteForm
                    setShowSiteForm={setShowSiteForm}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    currentSite={currentSite}
                 />
            )}
        </>
    )
}

export default Site