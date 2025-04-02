import { useState } from 'react';
import {deleteInService} from '../../apis/inserviceApi'
export const useDeleteInService = () => {
  const [loading, setLoading] = useState(false);
  
const deleteInServiceData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteInService(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteInServiceData, loading };
};
