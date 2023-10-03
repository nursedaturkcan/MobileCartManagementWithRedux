import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
  } from "./actionTypes";
  
  const initialState = [];
  
  const cartItemsReducers = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        // Aynı ID'ye sahip ürünün varlığının kontrol edilmesi
        const existingItem = state.find((item) => item.id === action.payload.id);
  
        if (existingItem) {
          // Eğer ürün zaten sepette varsa
          return state.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
        } else {
          // Eğer ürün sepette yoksa
          return [...state, { ...action.payload, quantity: 1 }];
        }
  
      case REMOVE_TO_CART:
        return state.filter((cartItem) => cartItem.id !== action.payload.id);
  
      case DECREASE_QUANTITY:
        return state.map((item) => {
          if (item.id === action.payload.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              // Eğer quantity 1'den küçükse, ürünü sepetten kaldır
              return null;
            }
          } else {
            return item;
          }
        }).filter(Boolean); // null değerleri filtrele
  
      case INCREASE_QUANTITY:
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
  
      default:
        return state;
    }
  };
  
  export default cartItemsReducers;
  