export const initialState = {
  basket: [],
  user: null,
};

// selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case 'REMOVE_FROM_BASKET':
      //metoda findIndex znajdzie pierwszy pasujacy index i go zwroci;
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        //wejdz do koszyka i usun produkt z podanym pasujacym indexem
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant remove product (id: ${action.id}), as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return {
        state,
      };
  }
};

export default reducer;
