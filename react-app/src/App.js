import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { OrderForm } from "./orders/views/OrderForm";
import { ContactForm } from "./orders/views/ContactForm";
import { SelectProduct } from "./orders/views/SelectProduct";
import { SelectProductDetails } from "./orders/views/SelectProductDetails";

import { UserHome } from "./orders/views/UserHome";

import { DeliveryForm } from "./orders/views/DeliveryForm";
import { OrderReview } from "./orders/views/OrderReview";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/new-order' exact={true}>
          <OrderForm />
        </Route>
        <Route path='/order-review' exact={true}>
          <OrderReview />
        </Route>
        <Route path='/delivery-form' exact={true}>
          <DeliveryForm />
        </Route>
        <Route path='/users' exact={true}>
          <UsersList />
        </Route>
        <Route path='/users/:userId' exact={true}>
          <User />
        </Route>
        <Route path='/new-client' exact={true}>
          <ContactForm />
        </Route>
        <Route path='/select-product' exact={true}>
          <SelectProduct />
        </Route>
        <Route path='/product-order/:productId' exact={true}>
          <SelectProductDetails />
        </Route>
        <Route exact path="/profile/user">
						<UserHome />
				</Route>
        <Route exact path="/profile/user/:id">
							<UserHome />
				</Route>
				<Route exact path="/profile/user/:id/:profileoption">
							<UserHome />
				</Route>
           
        </Switch>
      </BrowserRouter>
    

  );
}

export default App;
