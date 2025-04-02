import { useState } from 'react';
import {deletePersonnel} from '../../apis/personnelApi'

export const useDeletePersonnel = () => {
  const [loading, setLoading] = useState(false);

  const deletePersonnelData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deletePersonnel(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deletePersonnelData, loading };
};
