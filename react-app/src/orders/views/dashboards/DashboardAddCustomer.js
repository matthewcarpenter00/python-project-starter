import React from "react";
import { NavLink, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import { useState } from "react";
import { useHistory } from "react-router";


export const DashboardAddCustomer = ({ user, userId }) => {
	const params = useParams();
	const history = useHistory();
	
	// const { store, actions } = useContext(Context);
	let { id } = useParams();

	// const formatter = new Intl.NumberFormat("en-US", {
	// 	style: "currency",
	// 	currency: "USD",
	// 	minimumFractionDigits: 0
	// });


	return (
		<>
			<div className="w-100 d-flex p-4">
				<div className="w-100 p-2 rounded-3">
					<div className="dashboard-page">
						{/* Dashboard title area */}
						<Container>
							<Row>
								<Col>
								<h2>new customer</h2>
								</Col>
								<Col  md="auto">
									<Button
										onClick={() => {
											history.push(`/profile/user/${userId}/customers`);
										}}
										variant="dark"
										className="mb-3">
										All Customers
									</Button>
								</Col>
							
							</Row>
						</Container>

						{/* Dashboard content */}
						<Form className="h-100 p-5 border rounded-3">
						
								<Row className="mb-3">
									<Form.Group as={Col} controlId="formOrderID">
										<Form.Label>Customer ID</Form.Label>
										<Form.Control plaintext readOnly defaultValue="001"  />
									</Form.Group>
								</Row>

								<Row className="mb-3">
									<Form.Group  controlId="formJobName">
										<Form.Label>Company</Form.Label>
										<Form.Control type="text" placeholder="Company Name"/>
									</Form.Group>
								</Row>

								<Row>
									<Form.Group as={Col}  controlId="formTierLevel">
										<Form.Label>Tier Level</Form.Label>
										<Form.Select aria-label="SelectRoute">
												<option>Select</option>
												<option value="1">A</option>
												<option value="2">B</option>
												<option value="3">C</option>
												<option value="1">D</option>
												<option value="2">E</option>
											
										</Form.Select>
									</Form.Group>
								</Row>



								<Row className="mb-3">
									<Form.Group as={Col}  controlId="formTierLevel">
										<Form.Label>Contact Name</Form.Label>
										<Form.Control type="text" placeholder="Contact Name"/>
									</Form.Group>
								</Row>

								<Row className="mb-3">
									<Form.Group as={Col}  controlId="formTierLevel">
										<Form.Label>Telephone</Form.Label>
										<Form.Control type="text" placeholder="305-305-3053"/>
									</Form.Group>
								</Row>
								<Row className="mb-3">
									<Form.Group as={Col}  controlId="formTierLevel">
										<Form.Label>E-mail</Form.Label>
										<Form.Control type="email" placeholder="name@company.com"/>
									</Form.Group>
								</Row>
								<Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Select defaultValue="Choose...">
        <option>Choose...</option>
        <option>FL</option>
		<option>GA</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Row>

								<Row>
								<Col  md="auto">
									<Button variant="danger" type="submit">
										Delete Customer
									</Button>
								</Col>
								<Col>
									<Button variant="success" type="submit">
										Update Customer
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

DashboardAddCustomer.propTypes = {
	user: PropTypes.object,
	userId: PropTypes.string,
};