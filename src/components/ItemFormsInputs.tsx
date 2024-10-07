// ItemFormInputs.tsx
import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

interface ItemFormInputsProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  setFile: (file: File | null) => void;
  fileUrl: string | null;
}

const ItemFormInputs: React.FC<ItemFormInputsProps> = ({
  name,
  setName,
  description,
  setDescription,
  setFile,
  fileUrl,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={3}
      />
      <TextField
        fullWidth
        type="file"
        onChange={handleFileChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" component="span">
                <CloudUploadIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {fileUrl && (
        <Typography variant="caption" display="block" gutterBottom>
          Current file: {fileUrl}
        </Typography>
      )}
    </>
  );
};

export default ItemFormInputs;
