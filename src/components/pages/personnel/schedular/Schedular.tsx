import React, { useEffect, useState } from 'react'
import { ICalendar } from './../../../../interface/Personnel'
import SchedularTable from './SchedularTable'
import { getLookUpPositions, getSitesByType } from '../../../../apis/personnelApi'

interface SchedularTableProps {
    personalId: number
}

const Schedular: React.FC<SchedularTableProps> = ({ personalId }) => {
    const [currentSchedular, setCurrentSchedular] = useState<ICalendar | null>(null);
    const handleEditSchedular = (personal: ICalendar) => {
        setCurrentSchedular(personal);
        // setPersonalId(personal?.personalID);
        // setIsEditingSchedular(true);
    };

    const handleCreateNewSchedular = () => {
        setCurrentSchedular(null);
        // setIsEditingSchedular(false);
    };

    return (
        <>
            {/* <div className='mx-2' style={{width:'40%'}}>
                <SchedularForm calendarFormData={calendarFormData} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
            <div className='mx-2' style={{width:'60%'}}>
                <Calendar data={calendarData} />
            </div> */}

            <div className="pageTable pt-3">
                <div className="pageTableInner">
                    <SchedularTable
                        onCreateNewSchedular={handleCreateNewSchedular}
                        onEditSchedular={handleEditSchedular}
                        personalId={personalId}
                    />
                </div>
            </div>

        </>
    )
}

export default Schedular