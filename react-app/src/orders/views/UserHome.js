import React, { useContext, useEffect, useState } from "react";
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
import { DashboardEditCustomer } from "./dashboards/DashboardEditCustomer";
import { oauthClient } from "../../lib/intuit-oauth";
import { useSelector } from "react-redux";

export const UserHome = (props) => {
  const user = useSelector((state) => state.session.user);
  const [oauthToken, setOauthToken] = useState("");
  const [realmId, setRealmId] = useState("");
  const [companyInfo, setCompanyInfo] = useState(null);
  const getCompanyInfo = async () => {
    const response = await fetch("/api/auth/company-info");
    const data = await response.json();
    setCompanyInfo(data);
  };

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const realmId = url.searchParams.get("realmId");
    setRealmId(realmId);

    fetch("/api/auth/oauth-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, realmId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOauthToken(data);
      });
    // oauthClient
    //   .createToken(code)
    //   .then((authResponse) =>
    //     console.log("The Token is  " + JSON.stringify(authResponse.getJson()))
    //   )
    //   .catch((e) => {
    //     console.error("The error message is :" + e.originalMessage);
    //     console.error(e.intuit_tid);
    //   });
  }, []);

  const params = useParams();
  const history = useHistory();

  // const { store, actions } = useContext(Context);

  let { id } = useParams();

  let activeUser;

  const clickedProfile = (profile) => {
    if (user.username === "staff") {
      if (profile == "orderdetails") {
        return <DashboardOrderDetails />;
      } else {
        return <DashboardOrders />;
      }
    }
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
    } else if (profile == "editcustomer") {
      return <DashboardEditCustomer />;
    } else if (profile == "truckloadform") {
      return <TruckLoadForm />;
    } else {
      return <DashboardOrders />;
    }
  };

  return (
    <>
      <div className='d-flex'>
        <SideBar />

        {clickedProfile(params.profileoption)}
      </div>
      <button onClick={getCompanyInfo}>Get Company Info</button>
      {JSON.stringify(companyInfo)}
    </>
  );
};

UserHome.propTypes = {
  match: PropTypes.object,
};
