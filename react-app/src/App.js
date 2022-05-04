import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
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
import { ProductionLabel } from "./orders/components/ProductionLabel";
import { ProductLabel } from "./orders/components/ProductLabel";
import { TruckLoadForm } from "./orders/components/TruckLoadForm";

function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);
  console.log("REACT_APP_API_URL", process.env.REACT_APP_OAUTH_CLIENT_ID);

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
    <div>
     <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/' exact={true}>
            <Redirect to='/profile/user' />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/new-order' exact={true}>
            <OrderForm />
          </ProtectedRoute>
          <ProtectedRoute path='/new-client' exact={true}>
            <ContactForm />
          </ProtectedRoute>
          <ProtectedRoute path='/select-product' exact={true}>
            <SelectProduct />
          </ProtectedRoute>
          <ProtectedRoute path='/product-order/delivey' exact={true}>
            <DeliveryForm />
          </ProtectedRoute>
          <ProtectedRoute path='/product-order/:productId' exact={true}>
            <SelectProductDetails />
          </ProtectedRoute>
          <ProtectedRoute path='/order-review' exact={true}>
            <OrderReview />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/user'>
            <UserHome />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/user/:id'>
            <UserHome />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/user/:id/:profileoption'>
            <UserHome />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/profile/user/:id/:profileoption/productionlabel'
          >
            <ProductionLabel />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/profile/user/:id/:profileoption/productlabel'
          >
            <ProductLabel />
          </ProtectedRoute>
          <ProtectedRoute exact path='/truckloadform'>
            <TruckLoadForm />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
