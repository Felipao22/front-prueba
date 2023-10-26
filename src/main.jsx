import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES.js";
import dayjs from "dayjs";
import "dayjs/locale/es.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
dayjs.locale("es");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router basename={import.meta.env.BASE_URL}>
    <ConfigProvider locale={esES}>
      <App />
    </ConfigProvider>
  </Router>
);
