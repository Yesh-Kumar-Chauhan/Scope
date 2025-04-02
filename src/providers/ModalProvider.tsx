// src/components/ModalProvider.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { closeModal } from '../store/modalSlice';
import AssignmentModal from '../components/modals/SiteAssignmentModal';
import ClosingModal from '../components/modals/ClosingModal';
import VisitBasicInfoModal from '../components/modals/VisitBasicInfoModal';
import PersonalTimesheetModal from '../components/modals/PersonalTimesheetModal';
import StatusModal from '../components/modals/StatusModal';
import ContactModal from '../components/modals/ContactModal';
import SchedularTimesheetModal from '../components/modals/SchedularTimesheetModal';
import ScheduleDataModal from '../components/modals/ScheduleDataModal';
import PersonalExperienceModal from '../components/modals/PersonalExperienceModal';
import CertificateModal from '../components/modals/CertificateModal';
import AttandanceModal from '../components/modals/AttandanceModal';
import WaiverModal from '../components/modals/WaiverModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import PersonalScheduleImportModal from '../components/modals/PersonalScheduleImportModal';
import TimeSheetFormModal from '../components/modals/TimeSheetFormModal';
const ModalProvider: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen, modalType, modalProps } = useSelector((state: RootState) => state.modal);

    useEffect(() => {
        if (isOpen) {
            // Add the modal-open class to the body when a modal is open
            document.body.classList.add('modal-open');
        } else {
            // Remove the modal-open class from the body when no modals are open
            document.body.classList.remove('modal-open');
        }

        // Cleanup function to ensure the class is removed when the component is unmounted
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);
    if (!isOpen || !modalType) return null;

    const handleClose = () => dispatch(closeModal());

    // You can use a dynamic import or conditional rendering to load modals
    // based on modalType and pass modalProps to them
    const renderModal = () => {
        switch (modalType) {
            case 'SITE-ASSIGNMENT-MODAL':
                return <AssignmentModal {...modalProps} onClose={handleClose} />;
            case 'VISIT-BASICINFO-MODAL':
                return <VisitBasicInfoModal {...modalProps} onClose={handleClose} />;
            case 'PERSONAL-TIMESHEET-MODAL':
                return <PersonalTimesheetModal {...modalProps} onClose={handleClose} />;
            case 'CLOSING-MODAL': // Add the new case here
                return <ClosingModal {...modalProps} onClose={handleClose} />;
            case 'STATUS-MODAL': // Add the new case here
                return <StatusModal {...modalProps} onClose={handleClose} />;
            case 'CONTACT-MODAL': // Add the new case here
                return <ContactModal {...modalProps} onClose={handleClose} />;
            case 'SCHEDULAR-TIMESHEET-MODAL': // Add the new case here
                return <SchedularTimesheetModal {...modalProps} onClose={handleClose} />;
            case 'SCHEDULE-DATA-MODAL': // Add the new case here
                return <ScheduleDataModal {...modalProps} onClose={handleClose} />;
            case 'PERSONAL_EXPERIENCE-MODAL': // Add the new case here
                return <PersonalExperienceModal {...modalProps} onClose={handleClose} />;
            case 'CERTIFICATE-MODAL': // Add the new case here
                return <CertificateModal {...modalProps} onClose={handleClose} />;
            case 'ATTANDANCE-MODAL': // Add the new case here
                return <AttandanceModal {...modalProps} onClose={handleClose} />;
            case 'WAIVER-MODAL': // Add the new case here
                return <WaiverModal {...modalProps} onClose={handleClose} />;
            case 'CONFIRMATION-MODAL': // Add the new case here
                return <ConfirmationModal {...modalProps} onClose={handleClose} />;
            case 'PERSONAL-SCHEDULE-IMPORT-MODAL': // Add the new case here
                return <PersonalScheduleImportModal {...modalProps} onClose={handleClose} />;
            case 'TIMESHEET-FORM-MODAL': // Add the new case here
                return <TimeSheetFormModal {...modalProps} onClose={handleClose} />;
            default:
                return null;
        }
    };

    return <>{renderModal()}</>;
};

export default ModalProvider;
