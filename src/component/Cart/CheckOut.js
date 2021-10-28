import { useRef, useState, useContext } from "react";
import classes from "./Checkout.module.css";
import cartContext from "../../context/store/cart-context";
import { CLEAR_CART } from "../../context/actions/cart";
const CheckOut = (props) => {
	const cartCtx = useContext(cartContext);
	const url =
		"https://foodorderapp-d1a61-default-rtdb.firebaseio.com/orders.json";

	const isEmpty = (value) => value.trim() === "";
	const isValidPostal = (value) => value.trim().length >= 5;
	const [formValidity, setFormValidity] = useState({
		name: true,
		city: true,
		street: true,
		postal: true,
	});
	const onConfirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameRef.current.value;
		const enteredCity = cityRef.current.value;
		const enteredPostal = postalRef.current.value;
		const enteredStreet = streetRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalIsValid = isValidPostal(enteredPostal);

		setFormValidity({
			name: enteredNameIsValid,
			city: enteredCityIsValid,
			postal: enteredPostalIsValid,
			street: enteredStreetIsValid,
		});

		const formIsValid =
			enteredStreetIsValid &&
			enteredPostalIsValid &&
			enteredCityIsValid &&
			enteredNameIsValid;
		if (!formIsValid) return;
		props.submitting(true);
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				user: {
					name: enteredName,
					city: enteredCity,
					street: enteredStreet,
					postal: enteredPostal,
				},
				orderItems: cartCtx.items,
				totalOrderAmount: cartCtx.totalAmount,
			}),
		});
		props.submitting(false);
		props.doneSubmitting(true);
		cartCtx.clearCart({ type: CLEAR_CART });
	};
	const nameRef = useRef();
	const streetRef = useRef();
	const postalRef = useRef();
	const cityRef = useRef();

	return (
		<form className={classes.form} onSubmit={onConfirmHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formValidity.name && (
					<p className={classes.error}>Name fill cannot be empty</p>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formValidity.street && (
					<p className={classes.error}>Street name must be provided</p>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalRef} />
				{!formValidity.postal && (
					<p className={classes.error}>Please, provide a valid postal code</p>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />
				{!formValidity.city && (
					<p className={classes.error}>City cannot be empty</p>
				)}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default CheckOut;
