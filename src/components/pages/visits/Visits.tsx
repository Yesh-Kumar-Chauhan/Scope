import React, { useState } from 'react'
import VisitSiteTable from './VisitSiteTable';
import BasicInfoTable from './visitForm/BasicInfoTable';

const Visits = () => {
  const [showVisitBasicTable, setShowVisitBasicTable] = useState(false);
  const [visitSiteId, setVisitSiteId] = useState({});

  const handleCreateNewVisit = (siteID: number, name: string) => {
    setVisitSiteId({ siteID, name });
    setShowVisitBasicTable(true);
  };
  return (
    <>
      {!showVisitBasicTable ? (
        <VisitSiteTable
          onCreateNewSite={handleCreateNewVisit}
        />
      ) : (
          <BasicInfoTable
            setShowInserviceBasicTable={setShowVisitBasicTable}
            visitSiteId={visitSiteId}
          />
      )}
    </>
  )
}

export default Visits