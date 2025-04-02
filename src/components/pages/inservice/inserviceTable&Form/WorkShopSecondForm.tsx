import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Select from 'react-select';
import { TruncatedText } from '../../../common/CustomTooltip'
import { IInserviceWorkShop } from '../../../../interface/Inservice';
import { getInserviceTopics, getInserviceWorkshops, getPersonnelData } from '../../../../apis/inserviceApi'
import { fetchPersonnels } from '../../../../apis/personnelApi';
import { debounce } from 'lodash';
import { getUserData } from "../../../../utils/utils";
interface InserviceWorkShopProps {
    setActiveTab: any;
    inserviceWorshopFormData: IInserviceWorkShop;
    errors: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isEditing: boolean;
    isLoading: boolean;
}
interface Topic {
    topicID: number;
    topicName: string;
}
interface SelectOption {
    value: number;
    label: string;
}
interface TopicOption {
    label: string;
    value: number; // Adjust the type based on what your `value` is.
}

const WorkShopSecondForm: React.FC<InserviceWorkShopProps> = ({ setActiveTab, handleChange, handleSubmit, errors, inserviceWorshopFormData, isEditing, isLoading }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [workshops, setWorkshops] = useState([]);
    const [personnelCheck, setPersonnelCheck] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([])
    const [selectedPersonals, setSelectedPersonels] = useState([])

    const [personnelOptions, setPersonnelOptions] = useState<any[]>([]);
    const [personnelPage, setPersonnelPage] = useState(1);
    const [hasMorePersonnel, setHasMorePersonnel] = useState(true);
    const [isLoadingPersonnel, setIsLoadingPersonnel] = useState(false);
    const userData = getUserData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicsData = await getInserviceTopics();
                const workshopsData = await getInserviceWorkshops();
                if (topicsData.success) {
                    setTopics(topicsData.data);
                }
                if (workshopsData.success) {
                    setWorkshops(workshopsData.data);
                }
                loadMorePersonnel();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const loadMorePersonnel = async (searchQuery: string = "") => {
        try {
            const personnelData = await fetchPersonnels(searchQuery, personnelPage, 100);
            if (personnelData && personnelData.data) {
                const newOptions = personnelData.data.map((person: any) => ({
                    value: person.personalID,
                    label: `${person.firstname} ${person.lastname}`
                }));

                setPersonnelOptions((prevOptions: any) => [...prevOptions, ...newOptions]);
                setPersonnelPage(prevPage => prevPage + 1);
                setHasMorePersonnel(personnelData.data.length === 100);
            }
        } catch (error) {
            console.error("Error fetching personnel data:", error);
        } finally {
            // setIsLoadingPersonnel(false);
        }
    };

    const debouncedLoadMore = useCallback(
        debounce((inputValue: string) => {
            setPersonnelOptions([]);
            setPersonnelPage(1);
            setHasMorePersonnel(true);
            loadMorePersonnel(inputValue);
        }, 300),
        []
    );


    const mapTopicsToOptions = (topics: any) => {
        return topics.map((topic: any) => ({
            value: topic.topicID,
            label: topic.topicName,
        }));
    };

    const topicOptions = mapTopicsToOptions(topics);
    const handleTopicChange = (e: any) => {
        setSelectedTopics(e);
        handleChange({ target: { name: 'topicIds', value: e.map((x: any) => x.value) } } as unknown as ChangeEvent<HTMLSelectElement>)
    }
    const handlePersonnelChange = (e: any) => {
        setSelectedPersonels(e);
        handleChange({ target: { name: 'personnelIds', value: e.map((x: any) => x.value) } } as unknown as ChangeEvent<HTMLSelectElement>)
    }

    const formatDate = (dateString: any) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    return (
        <>
            <form method="post" className="DistrictForm" onSubmit={handleSubmit}>
                <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                    <div className="row">
                        <div
                            className="col-12 d-flex align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-between gap-2 flex-lg-row flex-md-row flex-sm-row flex-column">
                            {/* <h3 className="text-nowrap formTitle m-0">Inservice</h3> */}
                            <div
                                className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3 ">
                                {/* <div
                                className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3"> */}
                                <button className="btn btn-transparent" type='button' onClick={() => setActiveTab(0)}>Discard</button>
                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2"> {isLoading ? (
                                    <span className="btnloader loader"></span>
                                ) : (
                                    <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                )}</button>
                            }


                                {/* <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
                                    <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="paginationDiv mb-0">
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 px-0">
                            <div className="pageTable pt-0">
                                <div className="pageTableInner  personalTab pb-0">
                                    <div className="row m-0 justify-content-center">
                                        <div className="col-12">
                                            <>
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-basicinfo"
                                                        role="tabpanel" aria-labelledby="nav-basicinfo-tab"
                                                        tabIndex={0}>
                                                        <div className='row g-3'>
                                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                                <div className="formCard">
                                                                    <div
                                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                                        <h3 className="text-nowrap formTitle m-0">Workshop
                                                                        </h3>
                                                                        <hr className="w-100" />
                                                                    </div>
                                                                    <div className="DistrictForm">
                                                                        <div className="mb-0 g-2 row">

                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Workshops:</label>
                                                                                    <select
                                                                                        className="form-select"
                                                                                        name="workshopTypeId"
                                                                                        value={inserviceWorshopFormData.workshopTypeId}
                                                                                        onChange={handleChange}
                                                                                    >
                                                                                        <option value="">Select Workshops</option>
                                                                                        {workshops.map((workshop: any) => (
                                                                                            <option key={workshop.workshopTypeID} value={workshop.workshopTypeID}>
                                                                                                {/* {workshop.workshopTypeName} */}

                                                                                                <TruncatedText text={workshop.workshopTypeName} maxLength={50} />
                                                                                            </option>
                                                                                        ))}
                                                                                    </select>
                                                                                    {errors?.workshopTypeId && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.workshopTypeId?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">InService Tranning</label>
                                                                                    <input type="text" className="form-control" id='training' name='training'
                                                                                        value={inserviceWorshopFormData.training}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.training && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.training?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Sponsor</label>
                                                                                    <input type="text" className="form-control" id='sponsor' name='sponsor'
                                                                                        value={inserviceWorshopFormData.sponsor}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.sponsor && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.sponsor?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">CPR Expires :</label>
                                                                                    <input type="date" className="form-control" id='cpr' name='cpr'
                                                                                        value={formatDate(inserviceWorshopFormData.cpr)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                    />
                                                                                    {errors?.cpr && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.cpr?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Mat Expires :</label>
                                                                                    <input type="date" className="form-control" id='matDate' name='matDate'
                                                                                        value={formatDate(inserviceWorshopFormData.matDate)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                    />
                                                                                    {errors?.matDate && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.matDate?._errors[0]}
                                                                                        </div>
                                                                                    )}

                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">First Add Expires :</label>
                                                                                    <input type="date" className="form-control" id='firstAid' name='firstAid'
                                                                                        value={formatDate(inserviceWorshopFormData.firstAid)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                    />
                                                                                    {errors?.firstAid && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.firstAid?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Child Abuse Expire :</label>
                                                                                    <input type="date" className="form-control" id='matApp' name='matApp'
                                                                                        value={formatDate(inserviceWorshopFormData.matApp)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.matApp && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.matApp?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Sexual Harassment I :</label>
                                                                                    <input type="date" className="form-control" id='sHarassmentExp' name='sHarassmentExp'
                                                                                        value={formatDate(inserviceWorshopFormData.sHarassmentExp)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.sHarassmentExp && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.sHarassmentExp?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Sexual Harassment II:</label>
                                                                                    <input type="date" className="form-control" id='sHarassmentExp2' name='sHarassmentExp2'
                                                                                        value={formatDate(inserviceWorshopFormData.sHarassmentExp2)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.sHarassmentExp2 && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.sHarassmentExp2?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div> */}
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">ACES:</label>
                                                                                    <input type="date" className="form-control" id='aces' name='aces'
                                                                                        value={formatDate(inserviceWorshopFormData.aces)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.aces && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.aces?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div >
                                                                </div>
                                                            </div>
                                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                                <div className="formCard h-100">
                                                                    <div
                                                                        className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-3 mb-md-3 mb-3">
                                                                        <h3 className="text-nowrap formTitle m-0">Inservice
                                                                        </h3>
                                                                        <hr className="w-100" />
                                                                    </div>
                                                                    <div className="DistrictForm">
                                                                        <div className="mb-0 g-2 row">
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">E. Laws:</label>
                                                                                    <input type="date" className="form-control" id='elaw' name='elaw'
                                                                                        value={formatDate(inserviceWorshopFormData.elaw)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.elaw && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.elaw?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Date:</label>
                                                                                    <input type="date" className="form-control" id='date' name='date'
                                                                                        value={formatDate(inserviceWorshopFormData.date)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.date && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.date?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Hours:</label>
                                                                                    <input type="number" className="form-control" id='hours' name='hours'
                                                                                        value={inserviceWorshopFormData.hours}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.hours && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.hours?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Foundations 5hr:</label>
                                                                                    <input type="date" className="form-control" id='foundations' name='foundations'
                                                                                        value={formatDate(inserviceWorshopFormData.foundations)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.foundations && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.foundations?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>


                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">

                                                                                <div className="mb-0">
                                                                                    <div className="d-flex align-items-center gap-4">
                                                                                        <div
                                                                                            className="d-flex checked align-items-center gap-2">
                                                                                            <div className="inputDesign position-relative">
                                                                                                <input type="checkbox" id="paid"
                                                                                                    name="paid"
                                                                                                    checked={inserviceWorshopFormData.paid}
                                                                                                    onChange={handleChange}
                                                                                                />
                                                                                                {errors?.paid && (
                                                                                                    <div className="text-danger">
                                                                                                        {errors?.paid?._errors[0]}
                                                                                                    </div>
                                                                                                )}
                                                                                                <div className="checked">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                                                        width="24" height="25"
                                                                                                        viewBox="0 0 24 25" fill="none">
                                                                                                        <path
                                                                                                            d="M14.9999 10.5L10.5253 14.4999L8.99997 13.1365M19.9999 7.49998L19.9999 17.5C19.9999 19.1569 18.6568 20.5 16.9999 20.5H6.99998C5.34314 20.5 4 19.1569 4 17.5V7.49998C4 5.84314 5.34314 4.5 6.99998 4.5H16.9999C18.6568 4.5 19.9999 5.84314 19.9999 7.49998Z"
                                                                                                            stroke="black"
                                                                                                            stroke-width="2"
                                                                                                            stroke-linecap="round"
                                                                                                            stroke-linejoin="round" />
                                                                                                    </svg>
                                                                                                </div>
                                                                                                <div className="Unchecked">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                                                        width="24" height="25"
                                                                                                        viewBox="0 0 24 25" fill="none">
                                                                                                        <path
                                                                                                            d="M17 4.5C18.6569 4.5 20 5.84314 20 7.49998V17.5C20 19.1569 18.6569 20.5 17 20.5H7C5.34315 20.5 4 19.1569 4 17.5L4 7.49998C4 5.84314 5.34315 4.5 7 4.5L17 4.5Z"
                                                                                                            stroke="#A4A4A4"
                                                                                                            stroke-width="2"
                                                                                                            stroke-linecap="round"
                                                                                                            stroke-linejoin="round" />
                                                                                                    </svg>
                                                                                                </div>
                                                                                            </div>
                                                                                            <label
                                                                                                className="form-label m-0" style={{ fontWeight: inserviceWorshopFormData.paid ? 'bold' : 'normal' }}>Paid</label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Foundations 15hr:</label>
                                                                                    <input type="date" className="form-control" id='foundations15H' name='foundations15H'
                                                                                        value={formatDate(inserviceWorshopFormData.foundations15H)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}
                                                                                    />
                                                                                    {errors?.foundations15H && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.foundations15H?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0">
                                                                                    <label className="form-label mb-1">Paid Date</label>
                                                                                    <input type="date" className="form-control" id='paidDate' name='paidDate'
                                                                                        value={formatDate(inserviceWorshopFormData.paidDate)}
                                                                                        onChange={(e) => { handleChange(e) }}
                                                                                        onBlur={(e) => { }}

                                                                                    />
                                                                                    {errors?.paidDate && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.paidDate?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0 multiselectDrop">
                                                                                    <label className="form-label mb-1">Topics:</label>
                                                                                    <Select
                                                                                        isMulti
                                                                                        name="topicIds"
                                                                                        options={topicOptions}
                                                                                        value={selectedTopics}
                                                                                        onChange={handleTopicChange}
                                                                                    />
                                                                                    {errors?.topicId && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.topicId?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                                <div className="mb-0 multiselectDrop">
                                                                                    <label className="form-label mb-1">Personnel:</label>
                                                                                    <Select
                                                                                        isMulti
                                                                                        name="personnelIds"
                                                                                        options={personnelOptions}
                                                                                        value={selectedPersonals}
                                                                                        onChange={handlePersonnelChange}
                                                                                        onMenuScrollToBottom={() => {
                                                                                            if (hasMorePersonnel) {
                                                                                                loadMorePersonnel();
                                                                                            }
                                                                                        }}
                                                                                        onInputChange={(inputValue) => {
                                                                                            debouncedLoadMore(inputValue);
                                                                                        }}
                                                                                        isLoading={isLoadingPersonnel}
                                                                                    />
                                                                                    {errors?.personnelIds && (
                                                                                        <div className="text-danger">
                                                                                            {errors?.personnelIds?._errors[0]}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>


                                                                        </div>

                                                                    </div >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* <div
                                    className="d-lg-none d-md-none d-sm-none d-flex mt-lg-0 mt-md-0 mt-sm-0 mt-4 align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">

                                    {isEditing && (
                                        <>
                                            <button className="btn btn-outline" onClick={handlePrevStep}>Cancel</button>
                                        </>
                                    )}
                                    {!isEditing && (
                                        <>
                                            <button className="btn btn-transparent" onClick={handlePrevStep}>Discard</button>
                                        </>
                                    )}

                                    <button className="btn btn-primary" onClick={handleSubmit}> {loading ? (
                                        <span className="btnloader loader"></span>
                                    ) : (
                                        <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                    )}</button>
                                </div> */}
                        </div>
                    </div>
                </div>
            </form >
        </>
    )
}

export default WorkShopSecondForm