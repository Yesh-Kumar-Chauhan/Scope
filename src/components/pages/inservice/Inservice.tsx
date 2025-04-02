import React, { useState, useEffect } from 'react'
import InservicePersonnelTable from './InservicePersonnelTable';
import { IInservice } from '../../../interface/Inservice';
import BasicInfoTable from './inserviceTable&Form/BasicInfoTable';
import WorkShopForm from './inserviceTable&Form/WorkShopForm';
import { useInserviceForm } from '../../../hooks/inservice/useInserviceForm';
import { useInserviceWorkshopForm } from '../../../hooks/inservice/useInserviceWorkshopForm';
import { inserviceFormDataModal, inserviceWorkShopFormDataModal } from '../../../data/inserviceFormData';
import WorkShopSecondForm from './inserviceTable&Form/WorkShopSecondForm';

const Inservice = () => {
    const [showInserviceBasicTable, setShowInserviceBasicTable] = useState(false);
    const [showInserviceWorkShopForm, setShowInserviceWorkShopForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inservicePersonalId, setInservicePersonalId] = useState({});
    const [currentInservice, setCurrentInservice] = useState<IInservice | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    const {
        inserviceFormData,
        setInserviceFormData,
        handleChange,
        handleSubmit,
        errors,
        setErrors,
        loading,
    } = useInserviceForm(inserviceFormDataModal, isEditing, setIsEditing, inservicePersonalId, setShowInserviceWorkShopForm);

    const {
        inserviceWorshopFormData,
        setInserviceWorkshopFormData,
        onChange,
        onSubmit,
        error,
        isLoading,
    } = useInserviceWorkshopForm(inserviceWorkShopFormDataModal, isEditing, setIsEditing, inservicePersonalId, setShowInserviceWorkShopForm, setShowInserviceBasicTable, setActiveTab);

    useEffect(() => {
        if (isEditing && currentInservice) {
            setInserviceFormData(currentInservice);
            // setInserviceWorkshopFormData(currentInservice);
        } else {
            setInserviceFormData(inserviceFormDataModal);
            setInserviceWorkshopFormData(inserviceWorkShopFormDataModal);
        }
    }, [isEditing, currentInservice]);

    const handleEditInservice = (inservice: IInservice) => {
        setCurrentInservice(inservice);
        setIsEditing(true);
        setShowInserviceBasicTable(true);
        setShowInserviceWorkShopForm(true);
    };

    const handleCreateNewInservice = (personalID: any, name: string) => {
        setInservicePersonalId({ personalID, name });
        setCurrentInservice(null);
        setIsEditing(false);
        setShowInserviceBasicTable(true);
    };

    const handleInserviceWorkshop = () => {
        setCurrentInservice(null);
        setIsEditing(false);
        setShowInserviceWorkShopForm(true);
    }

    const handleEditInserviceWorkshop = (inservice: IInservice) => {
        setCurrentInservice(inservice);
        setIsEditing(true);
        setShowInserviceWorkShopForm(true);
    };
    return (
        <>
            {!showInserviceBasicTable && (
                <div className="row justify-content-center pt-lg-0 pt-md-0 pt-0 mb-0">
                    <div className="col-12">
                        <FormTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            )}

            {activeTab === 0 ? (
                !showInserviceBasicTable ? (
                    <InservicePersonnelTable
                        setShowInserviceBasicTable={setShowInserviceBasicTable}
                        onEditInservice={handleEditInservice}
                        handleCreateNewInservice={handleCreateNewInservice}
                    />
                ) : (
                    !showInserviceWorkShopForm ? (
                        <BasicInfoTable
                            setShowInserviceBasicTable={setShowInserviceBasicTable}
                            handleEditInserviceWorkshop={handleEditInserviceWorkshop}
                            handleInserviceWorkshop={handleInserviceWorkshop}
                            inservicePersonalId={inservicePersonalId}
                        />
                    ) : (
                        <WorkShopForm
                            setShowInserviceWorkShopForm={setShowInserviceWorkShopForm}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            inserviceFormData={inserviceFormData}
                            isEditing={isEditing}
                            loading={loading}

                        />
                    )
                )
            ) : (
                <WorkShopSecondForm
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    errors={error}
                    inserviceWorshopFormData={inserviceWorshopFormData}
                    isEditing={isEditing}
                    setActiveTab={setActiveTab}
                    isLoading={isLoading}
                />
            )}


        </>

    )
}

const FormTabs: React.FC<any> = ({ activeTab, setActiveTab }) => (
    <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
        <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
            <div className="col-12 d-flex align-items-center justify-content-between gap-2">
                <div
                    className="d-flex align-items-center flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between w-100 gap-lg-2 gap-md-2 gap-2">
                    <div className='DistrictpageSubTitle'>
                        <h2 className='m-0'>Inservice</h2>
                    </div>
                    <nav className="formTabs">
                        <div className="nav nav-tabs align-items-center justify-content-center gap-lg-4 gap-md-3 gap-3 border-0"
                            id="nav-tab" role="tablist">
                            {["Personel", "Workshop"].map((label, index) => (
                                <React.Fragment key={index}>
                                    <button
                                        className={`nav-link ${activeTab === index ? 'active' : ''}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {label}
                                    </button>
                                    {index < 1 && <span className="Bseprator"></span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>

);

export default Inservice