import React, { useContext } from "react";
// import { Context } from "react";

import { useHistory } from "react-router";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { SideBar } from "../components/Sidebar";
import { DashboardOrders } from "./dashboards/DashboardOrders";
import { DashboardProducts } from "./dashboards/DashboardProducts";
import { DashboardCustomers } from "./dashboards/DashboardCustomers";
import { DashboardMyAccount } from "./dashboards/DashboardMyAccount";
import { DashboardOrderDetails } from "./dashboards/DashboardOrderDetails";
import { DashboardNewOrder } from "./dashboards/DashboardNewOrder";
import { DashboardCustomerDetails } from "./dashboards/DashboardCustomerDetails";
import { DashboardAddCustomer } from "./dashboards/DashboardAddCustomer";
import { TruckLoadForm } from "../components/TruckLoadForm";

export const UserHome = (props) => {
  const params = useParams();
  const history = useHistory();

  // const { store, actions } = useContext(Context);

  let { id } = useParams();

  let activeUser;

  const clickedProfile = (profile) => {
    if (profile == "myaccount") {
      return <DashboardMyAccount />;
    } else if (profile == "customers") {
      return <DashboardCustomers />;
    } else if (profile == "products") {
      return <DashboardProducts />;
    } else if (profile == "orderdetails") {
      return <DashboardOrderDetails />;
    } else if (profile == "neworder") {
      return <DashboardNewOrder />;
    } else if (profile == "customerdetails") {
      return <DashboardCustomerDetails />;
    } else if (profile == "addcustomer") {
      return <DashboardAddCustomer />;
    } else if (profile == "truckloadform") {
      return <TruckLoadForm />;
    } else {
      return <DashboardOrders />;
    }
  };

  return (
    <div className='d-flex'>
      <SideBar />
      {clickedProfile(params.profileoption)}
    </div>
  );
};

UserHome.propTypes = {
  match: PropTypes.object,
};
