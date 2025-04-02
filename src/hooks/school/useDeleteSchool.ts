import { useState } from 'react';
import {deleteSchool} from '../../apis/schoolApi'

export const useDeleteSchool = () => {
  const [loading, setLoading] = useState(false);

  const deleteSchoolData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteSchool(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };


  return { deleteSchoolData, loading };
};

