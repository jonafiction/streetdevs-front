// ItemFormButtons.tsx
import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import { Item } from "../types/Item";

interface ItemFormButtonsProps {
  uploading: boolean;
  itemToEdit: Item | null;
  setItemToEdit: (item: Item | null) => void;
}

const ItemFormButtons: React.FC<ItemFormButtonsProps> = ({
  uploading,
  itemToEdit,
  setItemToEdit,
}) => {
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={uploading}
        startIcon={uploading ? <CircularProgress size={20} /> : null}
        sx={{ mt: 2 }}
      >
        {uploading ? "Uploading..." : itemToEdit ? "Actualizar" : "Agregar"}
      </Button>
      {itemToEdit && (
        <Button
          onClick={() => setItemToEdit(null)}
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<CancelIcon />}
          sx={{ mt: 1 }}
        >
          Cancelar
        </Button>
      )}
    </>
  );
};

export default ItemFormButtons;
