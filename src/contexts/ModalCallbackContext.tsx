// src/contexts/ModalCallbackContext.tsx
import React, { createContext, useContext, useState } from 'react';

// ModalCallback can either accept a formData argument or be called without any arguments
type ModalCallback = ((formData?: any) => void) | null;

const ModalCallbackContext = createContext<{
    setCallback: (callback: ModalCallback) => void;
    getCallback: () => ModalCallback;
}>({
    setCallback: () => {},
    getCallback: () => null,
});

export const ModalCallbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [callback, setCallbackInternal] = useState<ModalCallback>(null);

    // Set the callback, which can optionally take an argument or not
    const setCallback = (cb: ModalCallback) => setCallbackInternal(() => cb);

    const getCallback = () => callback;

    return (
        <ModalCallbackContext.Provider value={{ setCallback, getCallback }}>
            {children}
        </ModalCallbackContext.Provider>
    );
};

export const useModalCallback = () => useContext(ModalCallbackContext);
