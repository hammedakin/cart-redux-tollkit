import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
      cartItems: [],
      amount: 0,
      total: 0,
      isLoading: true,
};

// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
//       return fetch(url)
//             .then((res) => res.json())
//             .catch((err) => console.log(err));
// });
export const getCartItems = createAsyncThunk('cart/getCartItems', async (thunkAPI) => {
      try {
            const res = await axios(url);
            return res.data;
      } catch (error) {
            return thunkAPI.rejectWithValue('error fetching');
      }
});

const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
            clearCart: (state) => {
                  state.cartItems = [];
            },
            removeItem: (state, action) => {
                  const itemId = action.payload;
                  state.cartItems = state.cartItems.filter((item) =>
                        item.id !== itemId
                  );
            },
            increase: (state, { payload }) => {
                  const cartItem = state.cartItems.find((item) =>
                        item.id === payload.id
                  );
                  cartItem.amount = cartItem.amount + 1;
            },
            decrease: (state, { payload }) => {
                  const cartItem = state.cartItems.find((item) =>
                        item.id === payload.id
                  );
                  cartItem.amount = cartItem.amount - 1;
            },
            calculateTotals: (state) => {
                  let amount = 0;
                  let total = 0;
                  state.cartItems?.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * item.price;
                  });
                  state.amount = amount;
                  state.total = total;
            }
      },
      extraReducers: {
            [getCartItems.pending]: (state) => {
                  state.isLoading = true;
            },
            [getCartItems.fulfilled]: (state, action) => {
                  state.cartItems = action.payload;
                  state.isLoading = false;
            },
            [getCartItems.rejected]: (state, action) => {
                  console.log(action);
                  state.isLoading = false;
            },
      }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;