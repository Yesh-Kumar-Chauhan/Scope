import React from 'react';

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
    title?: string;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    message,
    onConfirm,
    onCancel,
    isOpen,
    title
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal fade show align-items-lg-center overflow-auto align-items-md-center align-items-start justify-content-center"
            style={{ display: isOpen ? 'flex' : 'none' }}
            aria-labelledby="confirmationModalLabel"
            aria-hidden={!isOpen}
        >
            <div className="modal-dialog w-100">
                <div className="modal-content p-4">
                    <div className="modal-body p-lg-2 p-md-2 p-0">
                        <div className="formCard mt-0 p-0 border-0">
                            <div className="FormTitleWithdivider position-relative d-flex align-items-center gap-3 mb-lg-3 mb-md-3 mb-3">
                                <h3 className="text-nowrap formTitle m-0">{title}</h3>
                                <hr className="w-100" />
                                <div className="editForm" onClick={onCancel}  style={{ cursor: 'pointer' }} >
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="24"  height="25"
                                        viewBox="0 0 24 25" fill="none"
                                    >
                                        <path  d="M19 5.5L5 19.5M19 19.5L5 5.5" stroke="black" strokeWidth="2" strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="m-0">{message}</p>
                            </div>

                            <div className="d-flex align-items-center justify-content-end gap-lg-4 gap-md-3 gap-3">
                                <button type="button" onClick={onCancel} className="btn btn-transparent ps-3 pe-4" >
                                    Cancel
                                </button>
                                <button type="button" onClick={onConfirm} className="btn btn-primary ps-3 pe-4" >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;