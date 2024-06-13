export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case "ADD_TO_CART": {
      const { ID_producto } = actionPayload;
      const productInCartIndex = state.findIndex(
        (item) => item.ID_producto === ID_producto
      );
      console.log({ productInCartIndex });
      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state);
        newCart[productInCartIndex].quantity += 1;
        updateLocalStorage(newCart);
        return newCart;
      }

      const newState = [
        ...state,
        {
          ...actionPayload, // --> Product
          quantity: 1,
        },
      ];

      updateLocalStorage(newState);
      return newState;
    }

    case "REMOVE_FROM_CART": {
      const { ID_producto, quantity } = actionPayload;
      const productInCartIndex = state.findIndex(
        (item) => item.ID_producto === ID_producto
      );
      console.log({ productInCartIndex });

      if (productInCartIndex >= 0 && quantity > 1) {

        const newCart = structuredClone(state);
        newCart[productInCartIndex].quantity -= 1;
        updateLocalStorage(newCart);
        return newCart;

      } else {

        const newState = state.filter(
          (element) => element.ID_producto !== ID_producto
        );
        updateLocalStorage(newState);

        return newState;
      }
    }

    case "CLEAR_CART": {
      updateLocalStorage([]);
      return [];
    }
  }
};
