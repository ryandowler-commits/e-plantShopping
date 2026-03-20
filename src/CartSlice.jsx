import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = state[action.payload];
      const existsingItem = state.items.find(item => item.id === newItem.id);
      if(!existsingItem){ 
        //item does not exist, add to cart with quantity 1
        const newItemWithQty = { ...newItem, quantity: 1 };
        const updatedItems = state.items.push(newItemWithQty);
      } else {
        //otherwise, item exists, increment quantity
        const updatedItem = { ...existsingItem, quantity: existsingItem.quantity += 1 };
        const updatedItems = state.items.map(item => item.id === newItem.id ? updatedItem : item);  

      };
    },
    removeItem: (state, action) => {
      const item = state[action.payload];
      const updatedItems = state.items.splice(state.items.indexOf(item), 1);
    },
    updateQuantity: (state, action) => {
      const itemToUpdate = state[action.payload] ;
      const newQuantity = itemToUpdate.quantity ;
      if (newQuantity > 0) {
        const updatedItems = state.items.map(item => item.id === itemToUpdate.id ? itemToUpdate : item);  
  
      } else {
      //remove item if quantity is zero or less
        const updatedItems = state.items.splice(state.items.indexOf(itemToUpdate), 1);
      };
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
