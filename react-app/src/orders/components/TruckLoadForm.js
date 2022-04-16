import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

export const TruckLoadForm = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  let { id } = useParams();
  const [orders, setOrders] = useState([]);

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

  const selectOptions = {
    south: "south",
    north: "north",
    orlando: "orlando",
    pickup: "pickup",
  };

  const statusOptions = {
    ready: "ready",
    production: "in production",
    completed: "completed",
  };

  const columns = [
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
    },
    {
      dataField: "company",
      text: "Company",
      sort: true,
    },
    {
      dataField: "totalAmount",
      text: "Amount",
      sort: true,
    },
    {
      dataField: "shippingRoute",
      text: "Route",
      sort: true,
      filter: selectFilter({
        options: selectOptions,
      }),
    },
    {
      dataField: "orderStatus",
      text: "Status",
      sort: true,
      filter: selectFilter({
        options: statusOptions,
      }),
    },
  ];

  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 h-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* title section */}

            <Container>
              <Row>
                <Col sm='9'>
                  <h1>Truck Load Form</h1>
                </Col>

                <Col>
                  <Button
                    onClick={() => {
                      window.print();
                    }}
                    variant='dark'
                    type='submit'
                    className='printer-btn'
                  >
                    print
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
      </div>
    </>
  );
};

TruckLoadForm.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
