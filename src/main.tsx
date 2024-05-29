import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import { Provider } from "react-redux";
import store from "./redux/store";
import Product from "./pages/Product";
import Consultation from "./pages/Consultation";
import Stories from "./pages/Stories";
import User from "./pages/User";
import Order from "./pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verification />,
  },
  // {
  //   path: "/dashboard",
  //   element: <Home />,
  // },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/consultation",
    element: <Consultation />,
  },
  {
    path: "/stories",
    element: <Stories />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/order",
    element: <Order />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
