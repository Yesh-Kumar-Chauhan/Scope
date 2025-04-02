import { useState } from 'react';
import { deleteVisit } from "../../apis/visitApi";

export const useDeleteVisit = () => {
  const [loading, setLoading] = useState(false);

  const deleteVisitData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteVisit(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteVisitData, loading };
};

