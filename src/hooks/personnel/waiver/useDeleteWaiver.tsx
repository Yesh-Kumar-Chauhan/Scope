import { useState } from 'react';
import {deleteWaiver} from '../../../apis/personnelApi'

export const useDeleteWaiver = () => {
  const [loading, setLoading] = useState(false);

  const deleteWaiverData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteWaiver(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteWaiverData, loading };
};
