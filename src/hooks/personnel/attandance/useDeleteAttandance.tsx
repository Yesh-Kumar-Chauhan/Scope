import { useState } from 'react';
import {deleteAttendance} from '../../../apis/personnelApi'

export const useDeleteAttandance = () => {
  const [loading, setLoading] = useState(false);

  const deleteAttendanceData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteAttendance(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteAttendanceData, loading };
};
