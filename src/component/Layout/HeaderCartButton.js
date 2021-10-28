import CartIcon from "../Cart/CartIcon";
import carticon from "./HeaderCartButton.module.css";
import { useContext, useState, useEffect } from "react";
import cartContext from "../../context/store/cart-context";

export default function CartButton(props) {
	const cartCtx = useContext(cartContext);
	const [bump, setBump] = useState(false);
	const { items } = cartCtx;
	const totalCartItems = items.reduce((currentValue, item) => {
		return currentValue + item.amount;
	}, 0);
	const buttonClasses = `${carticon.button} ${bump ? carticon.bump : ""}`;
	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBump(true);

		const timer = setTimeout(() => {
			setBump(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);
	return (
		<button
			className={buttonClasses}
			onClick={() => {
				props.onShowCart();
			}}
		>
			<span className={carticon.icon}>
				<CartIcon />
			</span>
			<span>Your cart</span>
			<span className={carticon.badge}>{totalCartItems}</span>
		</button>
	);
}
