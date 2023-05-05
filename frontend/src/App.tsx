import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProductPage from "./components/ProductPage";
import ContextProvider from "./hooks/context";
import About from "./routes/About";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Products from "./routes/Products";
import Root from "./routes/Root";
import ShoppingCart from "./routes/ShoppingCart";
import SignIn from "./routes/SignIn";
import Wishlist from "./routes/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/signin",
            element: <SignIn />,
          },
          {
            path: "/signup",
            element: <SignIn isSignUp={true} />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/shopping-cart",
            element: <ShoppingCart />,
          },
          {
            path: "/wishlist",
            element: <Wishlist />,
          },
          {
            path: "/products",
            element: <Products />,
            children: [
              {
                path: "/products/:productId",
                element: <ProductPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
