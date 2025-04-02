import { useState } from 'react';
import { deleteClosing } from '../../apis/closingApi';
export const useDeleteClosing = () => {
  const [loading, setLoading] = useState(false);

  const deleteClosingData = async (id: number, refetch: any): Promise<boolean> => {
    setLoading(true); 
    try {
        await deleteClosing(id); 
        refetch(); 
        return true; 
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        return false; 
      } finally {
        setLoading(false); 
      }
  };

  return { deleteClosingData, loading };
};

