import { useState } from 'react';
import {deleteTimesheet} from '../../../apis/personnelApi'

export const useDeleteTimesheet = () => {
  const [loading, setLoading] = useState(false);

  const deleteTimesheetData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteTimesheet(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteTimesheetData, loading };
};
