import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addItem, updateItem } from '../store/itemSlice';
import { createItem, updateItem as updateItemApi, uploadFile } from '../services/api';
import { Item } from '../types/Item';

interface ItemFormProps {
  itemToEdit: Item | null;
  setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
}

const ItemForm: React.FC<ItemFormProps> = ({ itemToEdit, setItemToEdit }) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setImageUrl(itemToEdit.imageUrl || null);
    } else {
      setName('');
      setDescription('');
      setImageUrl(null);
    }
    setFile(null);
  }, [itemToEdit]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemToEdit) {
      updateItemApi(itemToEdit.id, { name, description }).then(response => {
        dispatch(updateItem(response.data));
        setItemToEdit(null);
      });
    } else {
      createItem({ name, description }).then(response => {
        dispatch(addItem(response.data));
      });
    }
    setName('');
    setDescription('');
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
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        {itemToEdit ? 'Update Item' : 'Add Item'}
      </button>
      {itemToEdit && (
        <button 
          type="button" 
          onClick={() => setItemToEdit(null)} 
          className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default ItemForm;