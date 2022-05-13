import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import { orderTableData } from "../../../adapters/orderAdapter";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';




export const DashboardOrders = ({ user, userId }) => {
  const username = useSelector((state) => state.session.user.username);
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
    axios(`${process.env.REACT_APP_API_URL}/orders`).then((res) => {

      console.log(res.data);
      setData(res.data);
    });
  };


  // filter routes
  const selectOptions = {
    0: "south",
    1: "north",
    2: "orlando",
    3: "pickup",
  };

  const dateFormatter = (data, row) => {
    return <>{new Date(
     data
    ).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}</>;
  };

  const { SearchBar, ClearSearchButton } = Search;

  // const headerSortingStyle = { backgroundColor: '#c8e6c9' };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      // headerSortingStyle
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
      formatter: dateFormatter,
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

  const defaultSorted = [{
    dataField: 'orderStatus',
    order: 'asc'
  }];

  return (
    <>
      {/* <div className='w-100 d-flex p-4'> */}
      <div className='w-100 p-2 rounded-3'>
        <div className='dashboard-page'>
          {/* title section */}

          <Container>
            <Row>
              <Col xs={7}>
                <h1>Orders</h1>
              </Col>
              {!(username === "staff") && (
              <>
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
              </>
               )}
            </Row>
          </Container>

          {/* Dashboard content */}

          <Container>
            <ToolkitProvider
              keyField="id"
              data={data}
              columns={columns}
              search
            >
              {
              props => (
              <div className='h-100 p-5 bg-light border rounded-3'>
                <SearchBar { ...props.searchProps } className="mb-3" />
                <ClearSearchButton { ...props.searchProps } className="mb-2"  />
                <BootstrapTable 
                  { ...props.baseProps }
                  keyField='id'
                  rowEvents={rowEvents}
                  data={data}
                  columns={columns}
                  striped
                  hover
                  condensed
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                  defaultSorted={ defaultSorted } 
                ></BootstrapTable>
              </div>
              )
            } 
            </ToolkitProvider>
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
