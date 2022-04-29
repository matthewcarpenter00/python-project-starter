import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";

import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import { orderTableData } from "../../../adapters/orderAdapter";
// import { format, parseISO } from "date-fns";



export const DashboardOrders = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  let { id } = useParams();
  // const [key, setKey] = useState("home");

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);
    // axios(`${process.env.REACT_APP_API_URL}/orders`).then((res) => {
      axios("https://stepsolutionapi.herokuapp.com/orders").then((res) => {

      console.log(res.data);
      setData(res.data);
    });
  };

  //fetch orders
  // useEffect(() => {
  //   fetch("https://stepsolutionapi.herokuapp.com/orders")
  //     .then((response) => response.json())
  //     .then((orders) => setOrders(orders));
  // });

  // filter routes
  const selectOptions = {
    0: "south",
    1: "north",
    2: "orlando",
    3: "pickup",
  };

  const priceFormatter = (data, row) => {
    return <>${data}</>;
  };

  // const dateFormatter = (data, row) => {
  //   return<>{parseISO(`${data}`)}</>
  // }


  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
      // formatter: dateFormatter,
    },
    {
      dataField: "customer.company",
      text: "Company",
      sort: true,
    },
    {
      dataField: "poName",
      text: "Job / PO Name",
      sort: true,
    },
    {
      dataField: "totalAmount",
      text: "Amount",
      sort: true,
      formatter: priceFormatter,
    },
    {
      dataField: "shippingRoute",
      text: "Route",
      sort: true,
    },
    {
      dataField: "orderStatus",
      text: "Status",
      sort: true,
    },
  ];

  const rowEvents = {
    onClick: (e, { id: orderId }, rowIndex) => {
      setOrderId(orderId);
      history.push(`/profile/user/${orderId}/orderdetails/`);
    },
  };

  return (
    <>
      {/* <div className='w-100 d-flex p-4'> */}
      <div className='p-2 rounded-3'>
        <div className='dashboard-page'>
          {/* title section */}

          <Container>
            <Row>
              <Col xs={7}>
                <h1>Orders</h1>
              </Col>

              <Col>
                <Link to='/truckloadform' target='_blank'>
                  <Button variant='outline-dark' className='mb-3'>
                    truck load form
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    history.push(`/profile/user/${userId}/neworder`);
                  }}
                  variant='dark'
                  className='mb-3 float-right'
                >
                  + new order
                </Button>
              </Col>

              {/* <Col>
                  <Button variant='light'>Print View</Button>
                </Col> */}
            </Row>
          </Container>

          {/* Dashboard content */}

          <Container>

            <div className='h-100 p-5 bg-light border rounded-3'>
              <BootstrapTable
                keyField='id'
                rowEvents={rowEvents}
                data={data}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
                filter={filterFactory()}
              ></BootstrapTable>
            </div>
          </Container>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

DashboardOrders.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
