import React from "react";
import { NavLink, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router";


export const DashboardOrderDetails = () => {
	const params = useParams();
	const history = useHistory();
	// const { store, actions } = useContext(Context);
	let { id } = useParams();



	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	 
	const [fullscreen, setFullscreen] = useState(true);


	return (
		<>
			<div className="w-100 d-flex p-4">
				<div className="w-100 p-2 rounded-3">
					<div className="dashboard-page">
						{/* Dashboard title area */}
						<Container>
							<Row>
								<h2>Order<strong> #001</strong></h2>
							</Row>
							<Row>
								<Col  md="auto">
									<Button onClick={() => {
										history.push(`/production-label`);
										}} variant="dark" className="mb-3">
										print production label
									</Button>
									{/* <Modal show={show} onHide={handleClose} >

										<Modal.Header closeButton >
										<Modal.Title>Production Label</Modal.Title>
										</Modal.Header>
										<Modal.Body>
											<Row className="mb-3">
												<Col>Order ID</Col>
												<Col>001</Col>
											</Row>
											<hr />
											<Row className="mb-3">
												<Col>Customer</Col>
												<Col>JDA Flooring</Col>
											</Row>
											<hr />
											<Row className="mb-3">
												<Col>Product 1</Col>
												<Col>Vinyl Stairnose Deco</Col>
											</Row>
											<hr />
											<Row className="mb-3">
												<Col>Quantity</Col>
												<Col>14</Col>
											</Row>
											<hr />
											<Row className="mb-3">
												<Col>Route</Col>
												<Col>South</Col>
											</Row>
											<hr />
											<Row className="mb-3">
												<Col>Date</Col>
												<Col>04/01/22</Col>
											</Row>
											<hr />
											<Row className="mb-3">
												<Col>Notes</Col>
												<Col>2 inch thick</Col>
											</Row>
											<hr />
										</Modal.Body>
										<Modal.Footer>
										<Button variant="dark" onClick={handleClose}>
											Print
										</Button>
										</Modal.Footer>
									
									</Modal> */}
								</Col>
								<Col  md="auto">
									<Button href="/" variant="dark" className="mb-3">
										print product label
									</Button>
								</Col>
								<Col  md="auto">
									<Button href="/" variant="dark" className="mb-3">
										generate invoice
									</Button>
								</Col>
							</Row>
						</Container>

						{/* Dashboard content */}
						<Form className="h-100 p-5 border rounded-3">
						
								<Row className="mb-3">
									<Form.Group as={Col} controlId="formOrderID">
									<Form.Label>Order ID</Form.Label>
									<Form.Control plaintext readOnly defaultValue="001"  />
									</Form.Group>

									<Form.Group as={Col} controlId="formCustomer">
										<Form.Label>Customer</Form.Label>
										<Form.Control plaintext readOnly defaultValue="JDA Flooring" />
									</Form.Group>

									<Form.Group as={Col} controlId="formOrderDate">
									<Form.Label>Date Placed</Form.Label>
									<Form.Control plaintext readOnly defaultValue="04/01/22"  />
									</Form.Group>

									
								
								</Row>
								<Row className="mb-3">
									<Form.Group as={Col}  controlId="formJobName">
									<Form.Label>PO/Job Name</Form.Label>
									<Form.Control plaintext readOnly defaultValue="12 grey"/>
									</Form.Group>
									
									<Form.Group as={Col}  controlId="formRoute">
										<Form.Label>Route</Form.Label>
										<Form.Select aria-label="SelectRoute">
											<option>Select</option>
											<option value="1">North</option>
											<option value="2">South</option>
											<option value="3">Orlando</option>
										</Form.Select>
									</Form.Group>

									<Form.Group as={Col}  controlId="formStatus">
									<Form.Label>Status</Form.Label>
										<Form.Select aria-label="SelectRoute">
											<option>Select</option>
											<option value="1">In Production</option>
											<option value="2">Ready</option>
											<option value="3">Completed</option>
										</Form.Select>
									</Form.Group>
								</Row>
								<Row className="mb-3">
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

									<Form.Group as={Col}  controlId="formTierLevel">
									<Form.Label>Invoice #</Form.Label>
									<Form.Control type="text" placeholder="00125"/>
									</Form.Group>

									<Form.Group as={Col} controlId="formCustomer">
										<Form.Label>Amount</Form.Label>
										<Form.Control type="currency" placeholder="$290" />
									</Form.Group>
								</Row>
								<Row>
									<Table striped bordered hover responsive="lg" className="table" >
											<thead className="thead-dark">
												<tr>
													<th scope="col">#</th>
													<th scope="col">Tier</th>
													<th scope="col">Product</th>
													<th scope="col">Qty</th>
													<th scope="col">Price</th>
													<th scope="col">Notes</th>
												
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td>A</td>
													<td>Vinyl Deco Stairnose</td>
													<td>14</td>
													<td>$168</td>
													<td>corner edge</td>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>2</td>
													<td>A</td>
													<td>White Riser</td>
													<td>12</td>
													<td>$108</td>
													<td>none</td>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>3</td>
													<td>A</td>
													<td>T-moulding</td>
													<td>1</td>
													<td>$14</td>
													<td>2 inches wide</td>
												</tr>
											</tbody>
										</Table>
								</Row>
								<Row>
								<Col  md="auto">
								<Button variant="danger" type="submit">
									Delete Order
								</Button>
								</Col>
								<Col><Button variant="success" type="submit">
									Update Order
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