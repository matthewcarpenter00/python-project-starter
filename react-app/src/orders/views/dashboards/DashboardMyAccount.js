import React, { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

export const DashboardMyAccount = ({ user, userId }) => {
  const params = useParams();
  const history = useHistory();
  let { id } = useParams();
  // const { store, actions } = useContext(Context);

  return (
    <>
      <div className='w-100 d-flex p-4'>
        <div className='w-100 p-2 rounded-3'>
          <div className='dashboard-page'>
            {/* Dashboard title area */}

            {/* Dashboard content */}
            <Form className='h-100 p-5 border rounded-3'>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='forStaffId'>
                  <Form.Label>Staff ID</Form.Label>
                  <Form.Control  type='text'  defaultValue='001' />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group controlId='formRole'>
                  <Form.Label>Role</Form.Label>
                  <Form.Control type='text' placeholder='Office Manager' />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formName'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type='text' placeholder='Joel Ruiz' />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formPhone'>
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control type='text' placeholder='954-687-6990' />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formEmail'>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='admin@stepsolutionusa.com'
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col>
                  <Button variant='success' type='submit'>
                    Update Profile
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardMyAccount.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string,
};
