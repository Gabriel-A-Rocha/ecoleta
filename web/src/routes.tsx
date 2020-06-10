import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

//importing the pages
import Home from "../src/pages/Home/index";
import CreatePoint from "../src/pages/CreatePoint/index";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
};

export default Routes;
