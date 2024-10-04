import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchItems = () => axios.get(`${API_URL}/items`);

export const createItem = (item: { name: string; description: string }) =>
  axios.post(`${API_URL}/items`, item);

export const updateItem = (
  id: number,
  item: { name: string; description: string }
) => axios.put(`${API_URL}/items/${id}`, item);

export const deleteItem = (id: number) =>
  axios.delete(`${API_URL}/items/${id}`);

export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data.fileUrl;
  };
