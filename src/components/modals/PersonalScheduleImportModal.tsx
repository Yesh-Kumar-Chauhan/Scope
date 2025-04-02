import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { importSchedule } from '../../apis/personnelApi';

const PersonalScheduleImportModal: React.FC<{
    initialData?: {};
    onClose: () => void;
}>
    = ({ initialData = {}, onClose }) => {
        const [file, setFile] = useState<any>(null);
        const [isUploading, setIsUploading] = useState(false);
        const fileInputRef = useRef<any>(null);

        const handleFileChange = (event: any) => {
            setFile(event.target.files[0]);
        };

        const handleImport = async () => {
            if (!file) {
                toast.error('Please select a file to import.');
                return;
            }

            try {
                setIsUploading(true);
                const result = await importSchedule(file);
                console.log('Import Result:', result);
                setIsUploading(false);
                setFile(null);
                onClose()
                toast.success(`Import completed. Success count: ${result.SuccessCount}, Duplicates count: ${result.DuplicateCount}`);
            } catch (error) {
                console.error('Error importing schedule:', error);
                setIsUploading(false);
                setFile(null);
            }
            finally {
                setIsUploading(false);
                // Reset the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Clear the file input value
                }
            }
        };

        console.log('file', file);

        return (
            <div className={`modal fade show afterSchool importpage timesheetModal editAsignment align-items-lg-center overflow-auto align-items-md-center align-items-start justify-content-center`}
                id="Filter" aria-labelledby="FilterLabel" aria-hidden="true">
                <div className="modal-dialog w-100">
                    <div className="modal-content p-4">
                        <div className="modal-body p-lg-2 p-md-2 p-0">
                            <div className="formCard mt-0 p-0 border-0">
                                <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3  mb-lg-4 mb-md-3 mb-3">
                                    <h3 className="text-nowrap formTitle m-0">Import Schedule</h3>
                                    <hr className="w-100" />
                                    <div className="editForm" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mb-4 g-lg-4 g-md-4 g-3">
                                    <div className='importContainer rounded-4 p-3 text-center position-relative'>
                                        <svg viewBox="0 0 24 24" width={'90px'} height={'90px'} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.0344 14.0062C13.0361 14.5585 12.5898 15.0076 12.0375 15.0093C11.4853 15.0111 11.0361 14.5647 11.0344 14.0125L13.0344 14.0062Z" fill="#ffb703"></path> <path d="M9.71867 6.72364L11.0075 5.42672L11.0344 14.0125L13.0344 14.0062L13.0075 5.42045L14.3044 6.70926C14.6961 7.09856 15.3293 7.09659 15.7186 6.70484C16.1079 6.3131 16.1059 5.67993 15.7142 5.29064L11.9955 1.59518L8.30003 5.31387L9.71867 6.72364Z" fill="#ffb703"></path> <path d="M8.30003 5.31387C7.91073 5.70562 7.9127 6.3388 8.30445 6.7281C8.69619 7.1174 9.32938 7.11539 9.71867 6.72364L8.30003 5.31387Z" fill="#ffb703"></path> <path d="M4 12C4 10.8954 4.89543 10 6 10C6.55228 10 7 9.55229 7 9C7 8.44772 6.55228 8 6 8C3.79086 8 2 9.79086 2 12V18C2 20.2091 3.79086 22 6 22H17C19.7614 22 22 19.7614 22 17V12C22 9.79086 20.2091 8 18 8C17.4477 8 17 8.44772 17 9C17 9.55229 17.4477 10 18 10C19.1046 10 20 10.8954 20 12V17C20 18.6569 18.6569 20 17 20H6C4.89543 20 4 19.1046 4 18V12Z" fill="#023047"></path> </g></svg>

                                        {
                                            file?.name ?
                                                (<p className='m-0 text-muted' style={{ fontSize: '14px' }}>{file?.name}</p>)
                                                :
                                                (<>
                                                    <h4 className='mb-1 mt-2 text-dark card-title h6 fw-bold'>Drag & Drop or <span style={{ color: '#ffb703' }}>Choose file</span> to upload</h4>
                                                    <p className='m-0 text-muted' style={{ fontSize: '14px' }}>Suported format: CVS, XLS, XLSX</p>
                                                </>)
                                        }

                                        <input
                                            style={{ position: 'absolute', left: '0', right: '0', top: '0', bottom: '0', width: '100%', opacity: '0', cursor: 'pointer' }}
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".xlsx"
                                            onChange={handleFileChange}
                                            disabled={isUploading}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                    <button
                                        type='button'
                                        onClick={onClose}
                                        className="btn btn-transparent ps-3 pe-4">
                                        Cancel
                                    </button>
                                    <button
                                        type='button'
                                        className="btn btn-primary ps-3 d-flex align-items-center gap-2 pe-4"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleImport}>
                                        {
                                            isUploading ? <span className="btnloader loader"></span> : <svg viewBox="0 0 24 24" width={'22px'} height={'22px'} fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 4L12 14M12 14L15 11M12 14L9 11" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454" stroke="#fff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                        }
                                        <span>{'Submit'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default PersonalScheduleImportModal