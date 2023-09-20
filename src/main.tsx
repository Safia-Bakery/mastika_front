import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/rootConfig";
import BaseAPIClient from "./api/axiosConfig.ts";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";

export const baseURL = "https://backend.service.safiabakery.uz";
// export const baseURL = "http://10.0.0.51:8000";
export default new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
