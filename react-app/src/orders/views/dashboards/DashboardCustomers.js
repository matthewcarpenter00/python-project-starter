import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Button, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export const DashboardCustomers = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  // const { store, actions } = useContext(Context);
  let { id } = useParams();
  const [customers, setCustomers] = useState([]);

  // fetch customers
  useEffect(() => {
    fetch("https://stepsolution-api.herokuapp.com/customers")
      .then((response) => response.json())
      .then((customers) => setCustomers(customers));
  });

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
                {JSON.stringify(customers, null, 4)}

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
                <Table striped bordered hover responsive='lg' className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>Customer ID</th>
                      <th scope='col'>Company</th>
                      <th scope='col'>Tier Level</th>
                      <th scope='col'>Contact Name</th>
                      <th scope='col'>Phone</th>
                      <th scope='col'>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      onClick={() => {
                        history.push(`/profile/user/${userId}/customerdetails`);
                      }}
                    >
                      <td>001t</td>
                      <td>Chester Flooring</td>
                      <td>1</td>
                      <td>Chester Tester</td>
                      <td>305-100-2000</td>
                      <td>chester@tester.com</td>
                    </tr>
                  </tbody>
                </Table>
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
