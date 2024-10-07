import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setItems, deleteItem as deleteItemAction } from "../store/itemSlice";
import { fetchItems, deleteItem as deleteItemApi } from "../services/api";
import { Item } from "../types/Item";

interface ItemListProps {
  setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
}

const ItemList: React.FC<ItemListProps> = ({ setItemToEdit }) => {
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);

  useEffect(() => {
    fetchItems().then((response) => dispatch(setItems(response.data)));
  }, [dispatch, items]);

  const handleDelete = (id: number) => {
    deleteItemApi(id).then(() => dispatch(deleteItemAction(id)));
    setItemToEdit(null);
  };

  return (
    <ul className="space-y-4" data-testid="item-list">
      {items.map((item) => (
        <li
          key={item.id}
          data-testid={`item-${item.id}`}
          className="bg-white shadow rounded-lg p-4"
        >
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <button
            data-testid="delete-button"
            onClick={() => handleDelete(item.id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
          >
            Eliminar
          </button>
          <button
            data-testid="edit-button"
            onClick={() => setItemToEdit(item)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Editar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
