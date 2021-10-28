import Modals from "../UI/Modals";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import cartContext from "../../context/store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
export default function Cart(props) {
	const cartCtx = useContext(cartContext);
	const [showCheckOut, setShowCheckOut] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [doneSubmitting, setDoneSubmitting] = useState(false);
	const hasItem = cartCtx.items.length > 0;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const orderHandler = () => {
		setShowCheckOut(true);
	};

	const modalContent = (
		<React.Fragment>
			<ul className={classes["cart-items"]}>
				{cartCtx.items.map((item) => {
					return (
						<CartItem
							key={item.id}
							{...item}
							onRemove={cartItemRemoveHandler.bind(null, item.id)}
							onAdd={cartItemAddHandler.bind(null, item)}
						/>
					);
				})}
			</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>${cartCtx.totalAmount.toFixed(2)}</span>
			</div>
			{showCheckOut && hasItem && (
				<CheckOut
					onCancel={props.onShowCart}
					doneSubmitting={setDoneSubmitting}
					submitting={setIsSubmitting}
				/>
			)}
			{!showCheckOut && (
				<div className={classes.actions}>
					<button
						className={classes["button-alt"]}
						onClick={() => {
							props.onShowCart();
						}}
					>
						Close
					</button>
					{hasItem && (
						<button className={classes.button} onClick={orderHandler}>
							order
						</button>
					)}
				</div>
			)}
		</React.Fragment>
	);
	const submittingContent = (
		<React.Fragment>
			<p className={classes["order-note"]}>Processing your order ....</p>
		</React.Fragment>
	);
	const didSubmitContent = (
		<React.Fragment>
			<p className={classes["order-note"]}>Your ordered has been placed ....</p>
			<div className={classes.actions}>
				<button
					className={classes["button-alt"]}
					onClick={() => {
						props.onShowCart();
					}}
				>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modals onClick={props.onShowCart}>
			{!isSubmitting && !doneSubmitting && modalContent}
			{isSubmitting && !doneSubmitting && submittingContent}
			{!isSubmitting && doneSubmitting && didSubmitContent}
		</Modals>
	);
}
