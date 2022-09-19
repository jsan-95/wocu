import { Provider } from "react-redux";
import { store } from "./redux";
import "modern-normalize/modern-normalize.css";
import { Navigation } from "./components/nav/navbar";
import { ListCart } from "./components/listCart/listCart";
import { ProductForm } from "./components/productForm/productForm";

export function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <ProductForm />
      <ListCart />
    </Provider>
  );
}
