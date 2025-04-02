import { useState } from 'react';
import {deleteContactAPI } from '../../apis/contactApi'
export const useDeleteContact = () => {
  const [loading, setLoading] = useState(false);

const deleteContact = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
      const success = await deleteContactAPI(id); 
      if (success) {
        refetch(); 
      }
      return success;
    } finally {
      setLoading(false); 
    }
  };

  return { deleteContact, loading };
};