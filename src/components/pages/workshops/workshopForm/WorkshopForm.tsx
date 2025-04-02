import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Select from 'react-select';
import { IWorkshop } from '../../../../interface/Workshop';
import { getInserviceTopics } from '../../../../apis/inserviceApi'
import { fetchPersonnels } from '../../../../apis/personnelApi';
import { debounce } from 'lodash';
import { getUserData } from "../../../../utils/utils";
interface WorkShopProps {
    setShowWorkshopForm: (showWorkshopForm: boolean) => void;
    workshopFormData: IWorkshop;
    errors: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isEditing: boolean;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
interface Topic {
    topicID: number;
    topicName: string;
}

interface SelectOption {
    value: number;  // Assuming topicID and personID are numbers
    label: string;
}

const WorkshopForm: React.FC<WorkShopProps> = ({ setShowWorkshopForm, handleChange, handleSubmit, errors, workshopFormData, isEditing, isLoading, setIsLoading }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<SelectOption[]>([])
    const [selectedPersonels, setSelectedPersonels] = useState<SelectOption[]>([])
    const [personnelOptions, setPersonnelOptions] = useState<SelectOption[]>([]);
    const [personnelPage, setPersonnelPage] = useState(1);
    const [hasMorePersonnel, setHasMorePersonnel] = useState(true);
    const [isPatched, setIsPatched] = useState(false);
    const userData = getUserData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicsData = await getInserviceTopics();
                if (topicsData.success) {
                    setTopics(topicsData.data);
                }
                loadMorePersonnel();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isEditing && !isPatched && workshopFormData.workshopTopics && workshopFormData.workshopMembers && personnelOptions.length > 0) {
            const initialTopics: SelectOption[] = workshopFormData.workshopTopics.map((topic: any) => ({
                value: topic.topicID,
                label: topics.find((t: any) => t.topicID === topic.topicID)?.topicName || 'Unknown Topic',
            }));

            const initialPersonnel: SelectOption[] = workshopFormData.workshopMembers.map((member: any) => {
                const foundPerson = personnelOptions.find((p: SelectOption) => p.value === member.personID);
                return {
                    value: member.personID,
                    label: foundPerson ? foundPerson.label : 'Unknown Person',
                };
            });

            setSelectedTopics(initialTopics);
            setSelectedPersonels(initialPersonnel);
            handleChange({
                target: { name: 'topicIds', value: initialTopics.map((t: any) => t.value) },
            } as unknown as ChangeEvent<HTMLSelectElement>);

            handleChange({
                target: { name: 'personIds', value: initialPersonnel.map((p: any) => p.value) },
            } as unknown as ChangeEvent<HTMLSelectElement>);
            setIsPatched(true)
        }
    }, [isEditing, workshopFormData, personnelOptions, topics, isPatched]);

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
        handleChange({ target: { name: 'personIds', value: e.map((x: any) => x.value) } } as unknown as ChangeEvent<HTMLSelectElement>)
    }
    const formatDate = (dateString: any) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>{error.message}</p>;
    return (
        <>
            <form method="post" className="DistrictForm" onSubmit={handleSubmit}>

                <div className="seachStrip pb-lg-4 pb-md-3 pb-3">
                    <div className="row g-4 flex-lg-row flex-md-row flex-sm-row flex-column">
                        <div className="col-12 d-flex align-items-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap justify-content-between gap-lg-3 gap-md-3 gap-sm-3 gap-4">
                            <div className='DistrictpageSubTitle'>
                                <h2 className='d-flex m-0 align-items-center text-nowrap gap-3'>
                                    <b>Workshop</b>
                                </h2>
                            </div>

                            <div
                                className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">
                                <button className="btn btn-transparent" type='button' onClick={() => setShowWorkshopForm(false)}>Discard</button>
                                {userData.role !== "Scope.AdminView" && userData.role !== "Scope.StudentService" && userData.role !== "Scope.PayrollService1" && userData.role !== "Scope.PayrollService2" && userData.role !== "Scope.StudentService_PayrollService1" && userData.role !== "Scope.StudentService_PayrollService1AND2" &&
                                    <button type="submit" className="btn btn-primary d-flex align-items-center gap-2"> {isLoading ? (
                                        <span className="btnloader loader"></span>
                                    ) : (
                                        <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                    )}</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="seachStrip py-lg-4 py-md-3 py-3">
                    <div className="row g-4">
                        <div
                            className="col-12 d-flex align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-between gap-2 flex-lg-row flex-md-row flex-sm-row flex-column">
                            <div
                                className="d-lg-flex d-md-flex d-sm-flex d-none align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start w-100 gap-lg-4 gap-md-3 gap-3">
                                <button className="btn btn-transparent" type='button' onClick={() => setShowWorkshopForm(false)}>Discard</button>

                                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2"> {isLoading ? (
                                    <span className="btnloader loader"></span>
                                ) : (
                                    <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                )}</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="paginationDiv mb-0">
                    <div className="row g-4 justify-content-center">
                        <div className="col-12">
                            <div className="pageTable pt-3">
                                <div className="pageTableInner personalTab">
                                    <div className="row justify-content-center m-0">
                                        <div className="col-xl-4 col-lg-6 col-md-9 col-sm-12 col-12">
                                            <>
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-basicinfo"
                                                        role="tabpanel" aria-labelledby="nav-basicinfo-tab"
                                                        tabIndex={0}>
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
                                                                            <input
                                                                                type='text'
                                                                                className="form-control"
                                                                                name="workshopName"
                                                                                id='workshopName'
                                                                                value={workshopFormData.workshopName}
                                                                                onChange={handleChange}
                                                                            />
                                                                            {errors?.workshopName && (
                                                                                <div className="text-danger">
                                                                                    {errors?.workshopName?._errors[0]}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                        <div className="mb-0">
                                                                            <label className="form-label mb-1">Sponsor:</label>
                                                                            <input type="text" className="form-control" id='sponsor' name='sponsor'
                                                                                value={workshopFormData.sponsor}
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
                                                                            <label className="form-label mb-1">Date:</label>
                                                                            <input type="date" className="form-control" id='date' name='date'
                                                                                value={formatDate(workshopFormData.date)}
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
                                                                                value={workshopFormData.hours}
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
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="mb-0">
                                                                            <label className="form-label mb-1">Paid Date:</label>
                                                                            <input type="date" className="form-control" id='paidDate' name='paidDate'
                                                                                value={formatDate(workshopFormData.paidDate)}
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
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="mb-0">
                                                                            <div className="d-flex align-items-center gap-4">
                                                                                <div
                                                                                    className="d-flex checked align-items-center gap-2">
                                                                                    <div className="inputDesign position-relative">
                                                                                        <input type="checkbox" id="paid"
                                                                                            name="paid"
                                                                                            checked={workshopFormData.paid}
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
                                                                                        className="form-label m-0" style={{ fontWeight: workshopFormData.paid ? 'bold' : 'normal' }}>Paid</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
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
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="mb-0 multiselectDrop">
                                                                            <label className="form-label mb-1">Personnel:</label>
                                                                            <Select
                                                                                isMulti
                                                                                name="personIds"
                                                                                options={personnelOptions}
                                                                                value={selectedPersonels}
                                                                                onChange={handlePersonnelChange}
                                                                                onMenuScrollToBottom={() => {
                                                                                    if (hasMorePersonnel) {
                                                                                        loadMorePersonnel();
                                                                                    }
                                                                                }}
                                                                                onInputChange={(inputValue) => {
                                                                                    debouncedLoadMore(inputValue);
                                                                                }}
                                                                            />
                                                                            {errors?.personIds && (
                                                                                <div className="text-danger">
                                                                                    {errors?.personIds?._errors[0]}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div >
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="d-lg-none d-md-none d-sm-none d-flex mt-4 align-items-center justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-start flex-lg-row flex-md-row flex-sm-row flex-row-reverse w-100 gap-lg-4 gap-md-3 gap-3">
                                <button className="btn btn-transparent" type='button' onClick={() => setShowWorkshopForm(false)}>Discard</button>

                                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2"> {isLoading ? (
                                    <span className="btnloader loader"></span>
                                ) : (
                                    <span>{isEditing ? 'Edit' : 'Submit'}</span>
                                )}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </>
    )
}
export default WorkshopForm