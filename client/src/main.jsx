import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter}>
        {" "}
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
