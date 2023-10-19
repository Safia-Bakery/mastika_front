import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "src/components/Routes";
import WebOrderType from "src/webapp/screens/OrderType";

const WebNavigations = () => {
  return (
    <Routes>
      <Route path="/tg-web">
        <Route path="order-type" element={<WebOrderType />} index />
      </Route>
    </Routes>
  );
};

export default WebNavigations;
