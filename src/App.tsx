import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { Item } from './types/Item';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  return (
    <>
    <Provider store={store}>
      <div className="app container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Streetdevs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {itemToEdit ? 'Edit Item' : 'Add New Item'}
            </h2>
            <ItemForm itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Item List</h2>
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