import { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
export default function AvailableMeals() {
	const [meals, setMeals] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const url =
		"https://foodorderapp-d1a61-default-rtdb.firebaseio.com/meals.json";
	const fetchMeals = async () => {
		setIsFetching(true);
		const response = await fetch(url, {
			headers: { "content-type": "application/json" },
		});
		const result = await response.json();
		let meal = [];
		for (let item in result) {
			meal.push({
				id: item,
				description: result[item].description,
				price: result[item].price,
				name: result[item].name,
			});
		}
		setTimeout(() => {
			setMeals(meal);

			setIsFetching(false);
		}, 700);
	};
	useEffect(() => {
		fetchMeals();
	}, []);

	return (
		<section className={classes.meals}>
			<Card>
				{!isFetching && (
					<ul>
						{meals.map((meal) => {
							return <MealItem key={meal.id} {...meal}></MealItem>;
						})}
					</ul>
				)}
				{isFetching && (
					<p className={classes.fetching}>Fetching Available meals</p>
				)}
			</Card>
		</section>
	);
}
