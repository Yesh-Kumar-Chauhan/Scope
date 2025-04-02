import React, { useState } from 'react';
import { z } from 'zod';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import Assignment from './Assignment';
import Assignment2 from './Assignment2';
import Notes from './Notes';
import { additionalInfoSchema, assignmentSchema, basicInfoSchema, siteFormSchema } from '../../../../schemas/site';
import { siteFormDataModal } from '../../../../data/siteFormData';
import { useSiteForm } from '../../../../hooks/site/useSiteForm';
import { useFetchSites } from '../../../../hooks/site/useFetchSites';
import { ISite } from '../../../../interface/Sites';
import { getUserData } from "../../../../utils/utils";
interface FormTabsProps {
    activeStep: number;
    setActiveStep: (step: number) => void;
}

interface NavigationButtonsProps {
    activeStep: number;
    onPrevious: () => void;
    onNext: () => void;
    // isLastStep: boolean;
    className?: string;
    isEditing: boolean
    setShowSiteForm: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    userData: any;
}

interface SiteFormProps {
    setShowSiteForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean,
    currentSite: ISite | null
}

const SiteForm: React.FC<SiteFormProps> = ({ setShowSiteForm, setIsEditing, isEditing, currentSite }) => {
    const [activeStep, setActiveStep] = useState(0);
    const userData = getUserData();
    const { data: sites, isLoading, isError, error, refetch } = useFetchSites('', 1, 10);
    // Determine the initial form data based on editing mode
    const initialFormData = isEditing && currentSite ? currentSite : siteFormDataModal;

    const {
        siteFormData,
        handleChange,
        handleSubmit,
        resetForm,
        setSiteFormData,
        errors,
        setErrors,
        loading, } = useSiteForm(initialFormData, isEditing, setIsEditing);
    const handleNext = () => {
        let validationResult;
        switch (activeStep) {
            case 0:
                validationResult = basicInfoSchema.safeParse(siteFormData);
                break;
            case 1:
                validationResult = additionalInfoSchema.safeParse(siteFormData);
                break;
            // case 2:
            //     validationResult = assignmentSchema.safeParse(siteFormData);
            //     break;
            // Add cases for other steps
            default:
                validationResult = { success: true }; // Skip validation if no schema for the step
        }

        if (!validationResult.success && validationResult.error) {
            setErrors(validationResult.error.format());
            return;
        }

        setErrors(null);
        // setActiveStep((prevStep) => prevStep + 1);

        if (isEditing) {
            handleSubmit().then(() => {
                setShowSiteForm(false)
                refetch()
            })
        } else {
            // if (activeStep == 4) {
                handleSubmit().then(() => {
                    setShowSiteForm(false)
                    refetch()
                })
            // }
        }
    };


    const handlePrevious = () => {
        if (activeStep > 0) setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <BasicInfoForm siteFormData={siteFormData} errors={errors} handleChange={handleChange} />;
            case 1:
                return <AdditionalInfoForm siteFormData={siteFormData} errors={errors} handleChange={handleChange} />;
            case 2:
                return <Assignment setSiteFormData={setSiteFormData} siteFormData={siteFormData} />;
            case 3:
                return <Assignment2 setSiteFormData={setSiteFormData} siteFormData={siteFormData} />;
            case 4:
                return <Notes siteFormData={siteFormData} errors={errors} handleChange={handleChange} />;
            default:
                return null;
        }
    };
    return (
        <section className="DashboardPage">
            <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                <div className="row g-4">
                    <div className="col-12 d-flex align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-between  flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap gap-2">
                        {isEditing ? <div className='DistrictpageSubTitle'>
                            <h2 className='d-flex align-items-center  m-0 gap-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={() => setShowSiteForm(false)} style={{ cursor: "pointer" }}>
                                    <path d="M14.2891 22.2973C14.6427 22.7216 15.2732 22.7789 15.6975 22.4253C16.1218 22.0718 16.1791 21.4412 15.8256 21.0169L14.2891 22.2973ZM10.3433 16.0002L9.57504 15.36C9.266 15.7309 9.266 16.2696 9.57504 16.6404L10.3433 16.0002ZM15.8256 10.9835C16.1791 10.5592 16.1218 9.92868 15.6975 9.57512C15.2732 9.22156 14.6427 9.27888 14.2891 9.70316L15.8256 10.9835ZM21.657 17.0002C22.2093 17.0002 22.657 16.5525 22.657 16.0002C22.657 15.4479 22.2093 15.0002 21.657 15.0002V17.0002ZM15.8256 21.0169L11.1115 15.36L9.57504 16.6404L14.2891 22.2973L15.8256 21.0169ZM11.1115 16.6404L15.8256 10.9835L14.2891 9.70316L9.57504 15.36L11.1115 16.6404ZM10.3433 17.0002H21.657V15.0002H10.3433V17.0002ZM7.65634 7.65634C12.2645 3.04815 19.7359 3.04815 24.3441 7.65634L25.7583 6.24212C20.369 0.852887 11.6314 0.852887 6.24212 6.24212L7.65634 7.65634ZM24.3441 7.65634C28.9522 12.2645 28.9522 19.7359 24.3441 24.3441L25.7583 25.7583C31.1475 20.369 31.1475 11.6314 25.7583 6.24212L24.3441 7.65634ZM24.3441 24.3441C19.7359 28.9522 12.2645 28.9522 7.65634 24.3441L6.24212 25.7583C11.6314 31.1475 20.369 31.1475 25.7583 25.7583L24.3441 24.3441ZM7.65634 24.3441C3.04815 19.7359 3.04815 12.2645 7.65634 7.65634L6.24212 6.24212C0.852887 11.6314 0.852887 20.369 6.24212 25.7583L7.65634 24.3441Z" fill="#023047" />
                                </svg>
                                <b>{siteFormData.siteNumber} {siteFormData.siteName}</b></h2>
                        </div> : <div className='DistrictpageSubTitle'>
                            <h2 className='d-flex align-items-center  m-0 gap-3'>
                                <b>New Site</b></h2>
                        </div>}
                        <div className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center gap-3">
                            <NavigationButtons
                                activeStep={activeStep}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                // isLastStep={activeStep === 4} // Update this line as well
                                className={undefined}
                                isEditing={isEditing}
                                setShowSiteForm={setShowSiteForm}
                                loading={loading} 
                                userData={userData}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center m-0 pt-lg-0 pt-md-0 pt-0">
                <div className="col-12 ps-0 pe-0">
                    <FormTabs activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>

            <div className="paginationDiv mb-0">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 px-0">
                        <div className="pageTable pt-3">
                            <div className="pageTableInner district">
                                {renderStepContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="d-lg-none d-md-none d-sm-none d-flex mt-lg-0 mt-md-0 mt-sm-0 mt-4 align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">
                <NavigationButtons activeStep={activeStep} onPrevious={handlePrevious}
                 onNext={handleNext} userData={userData}
                // isLastStep={activeStep === 4} // Update this line as well className={undefined} isEditing={isEditing}
                setShowSiteForm={setShowSiteForm} loading={loading} isEditing={false} />
            </div>
        </section>
    );
};

const FormTabs: React.FC<FormTabsProps> = ({ activeStep, setActiveStep }) => (
    <nav className="formTabs mb-2">
        <div className="nav nav-tabs align-items-center justify-content-start gap-lg-3 gap-md-3 gap-3 border-0"
            id="nav-tab" role="tablist">
            {["Basic Information", "Additional Information", "Assignments", "Assignments 2", "Notes"].map((label, index) => (
                <React.Fragment key={index}>
                    <button className={`nav-link ${activeStep === index ? 'active' : ''}`} onClick={() => setActiveStep(index)}>
                        {label}
                    </button>
                    {index < 4 && <span className="Bseprator"></span>}
                </React.Fragment>
            ))}
        </div>
    </nav>
);

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ activeStep, onPrevious, onNext, className, isEditing, setShowSiteForm, loading, userData }) => (
    <div className={`d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-start gap-3 ${className}`}>
        <button className="btn btn-transparent" type='button' onClick={() => setShowSiteForm(false)}>Previous</button>
        {/* <button className="btn btn-outline" onClick={onPrevious} disabled={activeStep === 0}>Previous</button> */}
        {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
        <button className="btn btn-primary" onClick={onNext}>
            {loading ? (
                <span className="btnloader loader"></span>
            ) : (
                // <span>{isEditing ? 'Edit' : isLastStep ? 'Submit' : 'Next'}</span>
                <span>{isEditing ? 'Edit' : 'Submit'}</span>
            )}

        </button>
        }
    </div>
);

export default SiteForm;
