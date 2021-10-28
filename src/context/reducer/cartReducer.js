import {
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_TO_CART,
	CLEAR_CART,
} from "../actions/cart";

const cartReducer = (state, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;
			// * CHECK IF ITEM ALREADY EXIST
			const existingItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			);
			const existingItem = state.items[existingItemIndex];
			let updatedItems;
			if (existingItem) {
				const updatedItem = {
					...existingItem,
					amount: existingItem.amount + action.item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingItemIndex] = updatedItem;
				return { items: updatedItems, totalAmount: updatedTotalAmount };
			} else {
				updatedItems = state.items.concat(action.item);
			}

			return { items: updatedItems, totalAmount: updatedTotalAmount };

		case REMOVE_ITEM_TO_CART:
			const itemIndex = state.items.findIndex((item) => item.id === action.id);

			let updatedItem = state.items;
			const existingItems = updatedItem[itemIndex];

			if (existingItems.amount > 1) {
				const newItems = { ...existingItems, amount: --existingItems.amount };
				updatedItem[itemIndex] = newItems;
			} else {
				updatedItem = state.items.filter((item) => item.id !== action.id);
			}
			// calculate new totalAmount
			const totalAmount = state.totalAmount - existingItems.price;

			return { items: updatedItem, totalAmount: totalAmount };
		case CLEAR_CART:
			return {
				items: [],
				totalAmount: 0,
			};
	}
};

export default cartReducer;
