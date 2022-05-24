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
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


export const DashboardCustomers = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  let { id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");



  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios(`${process.env.REACT_APP_API_URL}/customers`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "company",
      text: "Company",
      sort: true,
      editable: false,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      editable: false,
    },
    {
      dataField: "tierLevel",
      text: "Tier",
      sort: true,
      editable: false,
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
      <div className='w-100 d-flex p-4'>
        <div className='w-100 h-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* title section */}
            <Container>
              <Row>
                <Col sm='9'>
                  <h1>Customers</h1>
                </Col>

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
                  // filter={filterFactory()}
                />
              </div>
               )
              } 
              </ToolkitProvider>
            </Container>
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
