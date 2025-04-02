import React, { useState } from 'react'
import ClosingDistrictTable from './ClosingDistrictTable';
import ClosingTable from '././closingForm/ClosingTable'

const Closing = () => {
  const [showClosingTable, setShowClosingTable] = useState(false);
  const [districtRowDetails, setDistrictRowDetails] = useState({});

  const handleSelectDistrict = (districtId: any, name: string) => {
    setDistrictRowDetails({ districtId, name });
    setShowClosingTable(true);
  };

  return (
    <>
      {!showClosingTable ? (
        <ClosingDistrictTable
          onCreateNewClosing={handleSelectDistrict}
        />
      ) : (
        <ClosingTable
        setShowClosingTable={setShowClosingTable}
        districtRowDetails={districtRowDetails}
      />
      )
        
      }
    </>
  )
}

export default Closing