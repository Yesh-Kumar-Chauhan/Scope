import { useState } from 'react';
import {deleteSchedular} from '../../../apis/personnelApi'

export const useDeleteSchedular = () => {
  const [loading, setLoading] = useState(false);

  const deleteSchedularData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteSchedular(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteSchedularData, loading };
};
