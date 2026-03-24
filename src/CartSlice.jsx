import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      console.log('Adding item to cart:', action.payload);
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
      const {name} = action.payload;
      const idx = state.items.findIndex(item => item.name === name);
      const updatedItems = state.items.splice(idx, 1);
    },
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      if (quantity > 0) {
        //if updated qty is greather than 0, update it
        const updatedItems = state.items.map(item => item.name === name ? {item, quantity} : quantity);  
  
      } else {
      //remove item if quantity is zero or less
        const idx = state.items.findIndex(item => item.name === name);
        const updatedItems = state.items.splice(state.items.indexOf(idx), 1);
      };
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
