import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";

// import { ErrorBoundary } from "./components";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ErrorBoundary> */}
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* </ErrorBoundary> */}
  </StrictMode>
);
