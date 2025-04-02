import { useState } from 'react';
import {deleteStatusAPI } from '../../apis/statusApi'
export const useDeleteStatus = () => {
  const [loading, setLoading] = useState(false);

const deleteStatus = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
      const success = await deleteStatusAPI(id); 
      if (success) {
        refetch(); 
      }
      return success;
    } finally {
      setLoading(false); 
    }
  };

  return { deleteStatus, loading };
};