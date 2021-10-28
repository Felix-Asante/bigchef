import CartContext from "../store/cart-context";
import { useReducer } from "react";
import cartReducer from "../reducer/cartReducer";
import {
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_TO_CART,
	CLEAR_CART,
} from "../actions/cart";

const CartProvider = (props) => {
	const defaultCartState = {
		items: [],
		totalAmount: 0,
	};
	const [cartState, dispatchCartActions] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCartHandler = (item) => {
		dispatchCartActions({ type: ADD_ITEM_TO_CART, item: item });
	};
	const removeFromCartHandler = (id) => {
		dispatchCartActions({ type: REMOVE_ITEM_TO_CART, id: id });
	};
	const clearCart = () => {
		dispatchCartActions({ type: CLEAR_CART });
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeFromCartHandler,
		clearCart: clearCart,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
