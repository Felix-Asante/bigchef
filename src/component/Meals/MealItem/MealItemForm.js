import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef } from "react";
export default function MealItemForm(props) {
	const itemOrderAmountInput = useRef();
	const getInputAmountHandler = (e) => {
		e.preventDefault();
		const inputAmount = itemOrderAmountInput.current.value;
		const enteredAmount = +inputAmount;
		props.addToCartHandler(enteredAmount);
	};
	return (
		<form action="" className={classes.form} onSubmit={getInputAmountHandler}>
			<Input
				label={`Amount`}
				input={{
					id: "amount",
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
				ref={itemOrderAmountInput}
			/>
			<button>Add</button>
		</form>
	);
}
