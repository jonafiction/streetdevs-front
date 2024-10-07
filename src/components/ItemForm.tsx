// ItemForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addItem, updateItem } from "../store/itemSlice";
import {
  createItem,
  updateItem as updateItemApi,
  uploadFile,
} from "../services/api";
import { Item } from "../types/Item";
import { Paper, Typography, Box } from "@mui/material";
import ItemFormInputs from "./ItemFormsInputs";
import ItemFormButtons from "./ItemFormsButtons";

interface ItemFormProps {
  itemToEdit: Item | null;
  setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
}

const ItemForm: React.FC<ItemFormProps> = ({ itemToEdit, setItemToEdit }) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setFileUrl(itemToEdit.fileUrl || null);
    } else {
      setName("");
      setDescription("");
      setFileUrl(null);
    }
    setFile(null);
  }, [itemToEdit]);

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

      setName("");
      setDescription("");
      setFile(null);
      setFileUrl(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        {itemToEdit ? "Edit Item" : "Add New Item"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& .MuiTextField-root": { mb: 2 } }}
      >
        <ItemFormInputs
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          file={file}
          setFile={setFile}
          fileUrl={fileUrl}
        />
        <ItemFormButtons
          uploading={uploading}
          itemToEdit={itemToEdit}
          setItemToEdit={setItemToEdit}
        />
      </Box>
    </Paper>
  );
};

export default ItemForm;
