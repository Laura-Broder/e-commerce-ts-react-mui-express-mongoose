import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ContextProvider from "./hooks/context/context";
import About from "./pages/About";
import Catalog from "./pages/catalog/Catalog";
import ProductPage from "./pages/catalog/ProductPage";
import ProductsGallery from "./pages/catalog/ProductsGallery";
import Checkout from "./pages/checkout/Checkout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
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
            path: "/catalog",
            element: <Catalog />,
            children: [
              { index: true, element: <ProductsGallery /> },

              {
                path: "/catalog/:id",
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
