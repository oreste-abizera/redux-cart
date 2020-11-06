import { CLEAR_CART, DECREASE, INCREASE, REMOVE, GET_TOTALS } from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };

    case REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case INCREASE:
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id)
          return { ...cartItem, amount: cartItem.amount + 1 };
        else return cartItem;
      });

      return { ...state, cart: tempCart };

    case DECREASE:
      let tempcart = [];
      if (action.payload.amount === 1) {
        tempcart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      } else {
        tempcart = state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.id)
            return { ...cartItem, amount: cartItem.amount - 1 };
          else return cartItem;
        });
      }
      return { ...state, cart: tempcart };

    case GET_TOTALS:
      let { amount, total } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          let totalPrice = price * amount;

          cartTotal.total += totalPrice;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { amount: 0, total: 0 }
      );

      total = parseFloat(total.toFixed(2));
      return { ...state, amount, total };

    default:
      return state;
  }
}
