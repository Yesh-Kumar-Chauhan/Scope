// src/store/modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../types/modal';

interface ModalState {
    isOpen: boolean;
    modalType: ModalType | null;
    modalProps: any; // You can define a more specific type based on your modals
}

const initialState: ModalState = {
    isOpen: false,
    modalType: null,
    modalProps: {},
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ modalType: ModalType; modalProps?: any }>) => {
            state.isOpen = true;
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps || {};
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.modalProps = {};
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
