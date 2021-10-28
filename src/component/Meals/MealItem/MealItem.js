import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import cartContext from "../../../context/store/cart-context";

export default function MealItem(props) {
	const cartCtx = useContext(cartContext);

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3 className={classes.name}>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{`${props.price.toFixed(2)}`}</div>
			</div>
			<div>
				<MealItemForm id={props.id} addToCartHandler={addToCartHandler} />
			</div>
		</li>
	);
}
