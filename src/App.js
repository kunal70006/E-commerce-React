import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LandingPage,
  Shop,
  About,
  Cart,
  Register,
  Login,
  UploadItem,
  Details,
  ProductManagement,
  Edit,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/about" component={About} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/uploadItem" component={UploadItem} />
          <Route exact path="/promgmnt" component={ProductManagement} />
          <Route exact path="/edit" component={Edit} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
