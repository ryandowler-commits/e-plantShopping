import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      const existsingItem = state.items.find(item => item.name === name);
      if(existsingItem){ 
        //item exists, increment quantity
        existsingItem.quantity ++ ;
      } else {
        //otherwise, item does not exist, add to cart with quantity 1
        state.items.push({name, image, cost, quantity: 1});  
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
        const updatedItems = state.items.map(item => item.name === itemToUpdate.name ? itemToUpdate : item);  
  
      } else {
      //remove item if quantity is zero or less
        const updatedItems = state.items.splice(state.items.indexOf(itemToUpdate), 1);
      };
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
