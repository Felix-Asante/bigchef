import React from "react";

import headerImg from "../../assets/meal.jpeg";
import nav from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
	return (
		<React.Fragment>
			<header className={nav.header}>
				<h1>Glove Food</h1>
				<HeaderCartButton onShowCart={props.onShowCart} />
			</header>
			<div className={nav["main-image"]}>
				<img src={headerImg} alt="" />
			</div>
		</React.Fragment>
	);
}
