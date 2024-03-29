import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import "./index.css";
import { Home } from "./pages/home";
import ErrorPage from "./pages/error-page";
import { States } from "./pages/states";
import { CompareStates } from "./pages/compare-states";
import { StateDetailsPage } from "./pages/state-details-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/states",
        element: <States />,
      },
      {
        path: "states/:stateName",
        element: <StateDetailsPage />,
      },
      {
        path: "compare",
        element: <CompareStates />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
