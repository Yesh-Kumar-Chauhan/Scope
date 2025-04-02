import { useState } from 'react';
import {deleteWorkshop} from '../../apis/workshopApi'

export const useDeleteWorkshop = () => {
  const [loading, setLoading] = useState(false);

  const deleteWorkshopData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteWorkshop(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteWorkshopData, loading };
};
