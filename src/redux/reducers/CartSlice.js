import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    payload: {
      authorization: 'FLWPUBK_TEST-9fddec269d7457e63b952c7943e970a6-X',
      tx_ref: '',
      amount: '',
      currency: '',
      payment_options: '',
      customer: {
        email: '',
        phoneNumber: '',
        name: '',
      },
    },
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const added = state.cart.find(
        ({productID}) => productID === action.payload.productID,
      );
      if (!added) {
        state.cart.push(action.payload);
      } else {
        added.currentQuantity++;
      }
    },
    deleteItem: (state, action) => {
      let cart = state.cart;
      cart.splice(action.payload, 1);

      cart = state.cart;
    },
    increaseQuantity: (state, action) => {
      let idx = action.payload;
      const newItems = [...state.cart];
      let currentQty = newItems[idx].currentQuantity;
      let price = newItems[idx].price;
      let perQtyPrice = price / currentQty;

      newItems[idx].currentQuantity = currentQty + 1;
      newItems[idx].price += perQtyPrice;
    },
    decreaseQuantity: (state, action) => {
      let idx = action.payload;
      const newItems = [...state.cart];
      let currentQty = newItems[idx].currentQuantity;
      let price = newItems[idx].price;
      let perQtyPrice = price / currentQty;

      newItems[idx].currentQuantity = currentQty > 1 ? currentQty - 1 : 1;
      newItems[idx].price -= perQtyPrice;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    addToPayload: (state, action) => {
      state.payload = action.payload;
      console.log('PAYLOAD: ', state.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToPayload,
} = cartSlice.actions;

export const selectCart = state => state.cart.cart;
export const selectTotal = state => state.cart.total;

export default cartSlice.reducer;
