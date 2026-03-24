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
      console.log('Existing item in cart:', existsingItem);
      if(existsingItem){ 
        //item exists, increment quantity
        existsingItem.quantity ++ ;
        const updatedItem = { ...existsingItem }; // Create a new object to trigger state update  
        console.log('Updated item:', updatedItem);
        state.items.map(item => item.name === name ? updatedItem : item);  
        console.log('Cart after update:', state.items);
      } else {
        //otherwise, item does not exist, add to cart with quantity 1
        state.items.push({name, image, cost, quantity: 1});  
        console.log('Cart with new item:', state.items);
      };
    },
    removeItem: (state, action) => {
      const {name} = action.payload;
      const idx = state.items.findIndex(item => item.name === name);
      if (idx !== -1) {
      state.items.splice(idx, 1);
      }
    },
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      if (quantity > 0) {
        //if updated qty is greather than 0, update it
        const foundItem = state.items.find(item => item.name === name);
        const updatedItem = {...foundItem, quantity};
        state.items.map(item => item.name === name ? updatedItem : item);  
  
      } else {
      //remove item if quantity is zero or less
        const idx = state.items.findIndex(item => item.name === name);
        if (idx !== -1) {
        state.items.splice(idx, 1);
        }
      };
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
