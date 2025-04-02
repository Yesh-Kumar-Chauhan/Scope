import React, { useEffect, useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import ExperienceForm from './ExperienceForm';
import HistoryForm from './HistoryForm';
import TimeSheetTable from './TimeSheetTable';
import { usePersonnelForm } from '../../../../hooks/personnel/usePersonnelForm';
import { IPersonnel } from '../../../../interface/Personnel';
import { personnelFormDataModal } from '../../../../data/personnelFormData'
import { personnelBasicFormSchema, personnelExperienceFormSchema, personnelHistoryFormSchema } from '../../../../schemas/personnel';
import { useDebounce } from 'use-debounce';
import { useFetchSites } from '../../../../hooks/site/useFetchSites'
import { getLookUpPositions, getSitesByType } from '../../../../apis/personnelApi'
import Schedular from '../schedular/Schedular';
import Certificate from './Certificate';
import AttandanceForm from './AttandanceForm';
import WaiversForm from './WaiversForm';
import MultiSiteDirector from './MultiSiteDirector';
import { getUserData } from "../../../../utils/utils";
interface PersonnelFormProps {
    setShowPersonnelForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    currentPersonnel: IPersonnel | null;
    onCreateNewPersonnel: () => void
    onEditPersonnel: (site: IPersonnel) => void;
    personalId: any;
    personnelDataById: any;
}

const PersonnelForm: React.FC<PersonnelFormProps> = ({ setShowPersonnelForm, setIsEditing, isEditing, currentPersonnel, onCreateNewPersonnel, onEditPersonnel, personalId, personnelDataById }) => {
    const [activeTab, setActiveTab] = useState(0);
    const initialFormData = isEditing && currentPersonnel ? currentPersonnel : personnelFormDataModal; // Define default structure
    const [positionsData, setPositionsData] = useState({});
    const userData = getUserData();

    const {
        setPersonnelFormData,
        personnelFormData,
        handleChange,
        handleSubmit,
        errors,
        setErrors,
        loading,
        setLoading,
    } = usePersonnelForm(initialFormData, isEditing, setIsEditing, positionsData);
    const [searchSiteQuery, setSearchSiteQuery] = useState('');
    const [debouncedSiteSearchQuery] = useDebounce(searchSiteQuery, 500); // Debounce search query with 500ms delay

    useEffect(() => {
        if (activeTab === 1) {
            const fetchPositions = async () => {
                try {
                    // const data = await getLookUpPositions();
                    // const sitesTypes = await getSitesByType();
                    // setPositionsData(data);
                    const positionsData = await getLookUpPositions();
                    const sitesTypesData = await getSitesByType();
                    const combinedData = {
                        positions: positionsData,
                        sitesTypes: sitesTypesData
                    };
                    // Set the combined data into state
                    setPositionsData(combinedData);
                } catch (error) {
                    console.error("Error fetching positions:", error);
                }
            };
            fetchPositions();
        }
    }, [activeTab]);
    const handleNext = async () => {
        let validationResult;
        switch (activeTab) {
            case 0:
                validationResult = personnelBasicFormSchema.safeParse(personnelFormData);
                break;
            case 1:
                validationResult = personnelExperienceFormSchema.safeParse(personnelFormData);
                break;
            case 2:
                validationResult = personnelHistoryFormSchema.safeParse(personnelFormData);
                break;
            default:
                validationResult = { success: true }; // Skip validation if no schema for the step
        }

        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        setErrors(null);

        // if (activeTab === (isEditing ? 7 : 2)) {
        //     await handleSubmit();
        //     setShowPersonnelForm(false);
        // } else {
        //     setActiveTab((prevTab) => prevTab + 1);
        // }

        if (isEditing) {
            await handleSubmit();
            setShowPersonnelForm(false);
            return;
        }
        // else if (activeTab < 2) {
        //     setActiveTab((prevTab) => prevTab + 1);
        // }
         else {
            await handleSubmit();
            setShowPersonnelForm(false);
        }

    };

    const handlePrevious = () => {
        setActiveTab((prevTab) => prevTab - 1);

    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return <BasicInfoForm personnelFormData={personnelFormData} handleChange={handleChange} errors={errors} />;
            // case 1:
            //     return <ExperienceForm personnelFormData={personnelFormData} positionsData={positionsData} handleChange={handleChange} errors={errors} setPersonnelFormData={setPersonnelFormData} />;
           
            case 1:
                return <HistoryForm personnelFormData={personnelFormData} handleChange={handleChange} errors={errors} />;
                case 2:
                    return isEditing ? (
                        <ExperienceForm personnelFormData={personnelFormData} positionsData={positionsData} handleChange={handleChange} errors={errors} setPersonnelFormData={setPersonnelFormData} />
                    ) : null;
            case 3:
                return isEditing ? (
                    <TimeSheetTable personalId={personalId} currentPersonnel={currentPersonnel}/>
                    // <Schedular personalId={personalId} />
                ) : null;
            case 4:
                return isEditing ? (
                    <Certificate personalId={personalId} />
                ) : null;
            case 5:
                return isEditing ? (
                    <AttandanceForm personalId={personalId} personnelDataById={personnelDataById} personnelFormData={personnelFormData} handleChange={handleChange} handleNext={handleNext} />
                ) : null;
            case 6:
                return isEditing ? (
                    <WaiversForm personalId={personalId} />
                ) : null;
            case 7:
                return isEditing ? (
                    <MultiSiteDirector personalId={personalId} />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <section className="DashboardPage">
            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4">
                    <div className="col-12 d-flex align-items-center justify-content-between gap-2">
                        {isEditing ? <div className='DistrictpageSubTitle'>
                            <h2 className='d-flex align-items-center m-0 gap-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={() => setShowPersonnelForm(false)} style={{ cursor: "pointer" }}>
                                    <path d="M14.2891 22.2973C14.6427 22.7216 15.2732 22.7789 15.6975 22.4253C16.1218 22.0718 16.1791 21.4412 15.8256 21.0169L14.2891 22.2973ZM10.3433 16.0002L9.57504 15.36C9.266 15.7309 9.266 16.2696 9.57504 16.6404L10.3433 16.0002ZM15.8256 10.9835C16.1791 10.5592 16.1218 9.92868 15.6975 9.57512C15.2732 9.22156 14.6427 9.27888 14.2891 9.70316L15.8256 10.9835ZM21.657 17.0002C22.2093 17.0002 22.657 16.5525 22.657 16.0002C22.657 15.4479 22.2093 15.0002 21.657 15.0002V17.0002ZM15.8256 21.0169L11.1115 15.36L9.57504 16.6404L14.2891 22.2973L15.8256 21.0169ZM11.1115 16.6404L15.8256 10.9835L14.2891 9.70316L9.57504 15.36L11.1115 16.6404ZM10.3433 17.0002H21.657V15.0002H10.3433V17.0002ZM7.65634 7.65634C12.2645 3.04815 19.7359 3.04815 24.3441 7.65634L25.7583 6.24212C20.369 0.852887 11.6314 0.852887 6.24212 6.24212L7.65634 7.65634ZM24.3441 7.65634C28.9522 12.2645 28.9522 19.7359 24.3441 24.3441L25.7583 25.7583C31.1475 20.369 31.1475 11.6314 25.7583 6.24212L24.3441 7.65634ZM24.3441 24.3441C19.7359 28.9522 12.2645 28.9522 7.65634 24.3441L6.24212 25.7583C11.6314 31.1475 20.369 31.1475 25.7583 25.7583L24.3441 24.3441ZM7.65634 24.3441C3.04815 19.7359 3.04815 12.2645 7.65634 7.65634L6.24212 6.24212C0.852887 11.6314 0.852887 20.369 6.24212 25.7583L7.65634 24.3441Z" fill="#023047" />
                                </svg>
                                <b>{personnelFormData.firstname} {personnelFormData.lastname}</b></h2>
                        </div> : <div className='DistrictpageSubTitle'>
                            <h2 className='d-flex align-items-center gap-3 m-0'>
                                <b>New Personnel</b></h2>
                        </div>}

                        <div className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center gap-3">
                            <NavigationButtons
                                activeTab={activeTab}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                isLastStep={activeTab === 2}
                                // isLastStep={activeTab === (isEditing ? 7 : 2)}
                                isEditing={isEditing}
                                setShowPersonnelForm={setShowPersonnelForm}
                                handleSubmit={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center pt-lg-0 pt-md-0 pt-0">
                <div className="col-12">
                    <FormTabs activeTab={activeTab} setActiveTab={setActiveTab} isEditing={isEditing} />
                </div>
            </div>

            <div className="paginationDiv mb-0">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 px-0">
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            <div
                className="d-lg-none d-md-none d-sm-none d-flex mt-lg-0 mt-md-0 mt-sm-0 mt-4 align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">
                <NavigationButtons
                    activeTab={activeTab}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isLastStep={activeTab === 2}
                    // isLastStep={activeTab === (isEditing ? 7 : 2)}
                    isEditing={isEditing}
                    setShowPersonnelForm={setShowPersonnelForm}
                    handleSubmit={handleSubmit}
                    loading={loading}
                // hasChanges={hasChanges} 
                />
            </div>
        </section>
    );
};

const FormTabs: React.FC<any> = ({ activeTab, setActiveTab, isEditing }) => {
    const tabs = [
        "Basic Information",
        // "Scheduler",
        "History"
    ];

    if (isEditing) {
        tabs.push("Scheduler","Timesheet", "Certificate", "Attandance", "Waivers", "Multi-Site Director");
    }

    return (
        <nav className="formTabs mb-2">
            <div className="nav nav-tabs align-items-center justify-content-start gap-lg-3 gap-md-3 gap-3 border-0"
                id="nav-tab" role="tablist">
                {/* {["Basic Information", "Experience", "History","Scheduler"].map((label, index) => ( */}
                {tabs.map((label, index) => (
                    <React.Fragment key={index}>
                        <button
                            className={`nav-link ${activeTab === index ? 'active' : ''}`}
                            onClick={() => setActiveTab(index)}
                        >
                            {label}
                        </button>
                        {index < tabs.length - 1 && <span className="Bseprator"></span>}
                        {/* {index < 2 && <span className="Bseprator"></span>} */}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    )
};


const NavigationButtons: React.FC<any> = ({ activeTab, onPrevious, onNext, isLastStep, className, isEditing, setShowPersonnelForm, loading }) => {
    // const totalSteps = isEditing ? '' : 2; // Total steps based on editing state
    // const isLastStepCalculated = activeTab === totalSteps;
    const userData = getUserData();
    return (
        <div className={`d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-start gap-3 ${className}`}>
            <button className="btn btn-transparent" type='button' onClick={() => setShowPersonnelForm(false)}>Previous</button>
            {/* <button className="btn btn-outline" onClick={onPrevious} disabled={activeTab === 0}>Previous</button> */}
            {userData.role !== "Scope.AdminView" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" &&
            <button className="btn btn-primary" onClick={onNext}>
                {loading ? (
                    <span className="btnloader loader"></span>
                ) : (
                    // <span> {isLastStepCalculated ? (isEditing ? 'Update' : 'Submit') : 'Next'}</span>
                    // <span>{isEditing ? 'Update' : isLastStep ? 'Submit' : 'Next'}</span>
                    <span>{isEditing ? 'Update' :  'Submit'}</span>
                )}

            </button>
}
        </div>
    );
};


export default PersonnelForm;