import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Button, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

export const DashboardCustomers = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  // const { store, actions } = useContext(Context);
  let { id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");

  // fetch customers
  //   useEffect(() => {
  //     fetch("https://stepsolution-api.herokuapp.com/customers")
  //       .then((response) => response.json())
  //       .then((customers) => setCustomers(customers));
  //   });

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://stepsolution-api.herokuapp.com/customers").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  //   const lineFormatter = (data, row) => {
  //     return (
  //       <span
  //         onClick={() => {
  //           history.push(`/profile/user/${customerEmail}/customerdetails/`);
  //         }}
  //       >
  //         {data}
  //       </span>
  //     );
  //   };

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
      //   formatter: lineFormatter,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      //   formatter: lineFormatter,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      editable: false,
      //   formatter: lineFormatter,
    },
    {
      dataField: "tierLevel",
      text: "Tier",
      sort: true,
      editable: false,
      //   formatter: lineFormatter,
    },
  ];

  const rowEvents = {
    onClick: (e, { email: customerEmail }, rowIndex) => {
      setCustomerEmail(customerEmail);
      history.push(`/profile/user/${customerEmail}/customerdetails/`);
    },
  };

  return (
    <>
      <div className='d-flex p-4'>
        <div className='h-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* title section */}
            <Container>
              <Row>
                <Col sm='9'>
                  <h1>Customers</h1>
                </Col>
                {/* will be replaced for table */}
                {/* {JSON.stringify(customers, null, 4)} */}

                <Col>
                  <Button
                    onClick={() => {
                      history.push(`/profile/user/${userId}/addcustomer`);
                    }}
                    variant='dark'
                    className='mb-3 float-right'
                  >
                    + add customer
                  </Button>
                </Col>
              </Row>
            </Container>

            {/* Dashboard content */}

            <div className='container'>
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
                  // filter={filterFactory()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardCustomers.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
