import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import { Item } from "./types/Item";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  return (
    <>
      <Provider store={store}>
        <div className="app container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Desafio Streetdevs - CRUD</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ItemForm itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} />
            </div>
            <div>
              <ItemList setItemToEdit={setItemToEdit} />
            </div>
          </div>
        </div>
      </Provider>
      <Footer />
    </>
  );
};

export default App;
