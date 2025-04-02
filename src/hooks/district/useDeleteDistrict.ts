import { useState } from 'react';
import {deleteDistrict} from '../../apis/districtsApi'
export const useDeleteDistrict = () => {
  const [loading, setLoading] = useState(false);

  const deleteDistrictData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteDistrict(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteDistrictData, loading };
};

