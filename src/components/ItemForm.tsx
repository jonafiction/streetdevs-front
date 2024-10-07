import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addItem, updateItem } from '../store/itemSlice';
import { createItem, updateItem as updateItemApi, uploadFile } from '../services/api';
import { Item } from '../types/Item';
import { Button, CircularProgress } from '@mui/material';

interface ItemFormProps {
  itemToEdit: Item | null;
  setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
}

const ItemForm: React.FC<ItemFormProps> = ({ itemToEdit, setItemToEdit }) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setFileUrl(itemToEdit.fileUrl || null);
    } else {
      setName('');
      setDescription('');
      setFileUrl(null);
    }
    setFile(null);
  }, [itemToEdit]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let updatedFileUrl = fileUrl;
      if (file) {
        updatedFileUrl = await uploadFile(file);
      }

      const itemData = { name, description, fileUrl: updatedFileUrl };

      if (itemToEdit) {
        const response = await updateItemApi(itemToEdit.id, itemData);
        dispatch(updateItem(response.data));
        setItemToEdit(null);
      } else {
        const response = await createItem(itemData);
        dispatch(addItem(response.data));
      }

      setName('');
      setDescription('');
      setFile(null);
      setFileUrl(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {fileUrl && <p className="mt-2">Current file: {fileUrl}</p>}
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={uploading}
        className="w-full"
      >
        {uploading ? <CircularProgress size={24} /> : (itemToEdit ? 'Update Item' : 'Add Item')}
      </Button>
      {itemToEdit && (
        <Button 
          type="button" 
          onClick={() => setItemToEdit(null)} 
          variant="contained"
          color="secondary"
          className="w-full"
        >
          Cancel Edit
        </Button>
      )}
    </form>
  );
};

export default ItemForm;