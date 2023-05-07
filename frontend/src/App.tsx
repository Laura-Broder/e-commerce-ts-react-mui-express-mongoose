import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ContextProvider from "./hooks/context/context";
import About from "./pages/About";
import Checkout from "./pages/checkout/Checkout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ProductPage from "./pages/Products/ProductPage";
import Products from "./pages/Products/Products";
import Root from "./pages/Root";
import ShoppingCart from "./pages/ShoppingCart";
import SignIn from "./pages/SignIn";
import Wishlist from "./pages/Wishlist";

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
            path: "/checkout",
            element: <Checkout />,
          },
          {
            path: "/wishlist",
            element: <Wishlist />,
          },
          {
            path: "/products",
            // element: <Products />,
            children: [
              { index: true, element: <Products /> },

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
