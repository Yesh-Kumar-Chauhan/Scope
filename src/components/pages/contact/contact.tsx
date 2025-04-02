import React, { useState } from 'react'
import ContactSiteTable from './ContactSiteTable';
import ContactTable from './contactForm/ContactTable'

const Contact = () => {
  const [showContactTable, setShowContactTable] = useState(false);
  const [siteRowDetails, setSiteRowDetails] = useState({});

  const handleSelectSite = (siteID: any, name: string) => {
    setSiteRowDetails({ siteID, name });
    setShowContactTable(true);
  };

  return (
    <>
      {!showContactTable ? (
        <ContactSiteTable
        onCreateNewSite={handleSelectSite}
        />
      ) : (
        <ContactTable
        setShowContactTable={setShowContactTable}
        siteRowDetails={siteRowDetails}
      />
      )
        
      }
    </>
  )
}

export default Contact