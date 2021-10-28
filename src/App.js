import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import { useState } from "react";
import CartProvider from "./context/provider/CartProvider";
function App() {
	const [showCart, setShowCart] = useState(false);
	const showCartHandler = () => {
		setShowCart(!showCart);
	};
	return (
		<CartProvider>
			{showCart && <Cart onShowCart={showCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
