import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";

import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



export const DashboardOrders = ({ user, userId }) => {
	const params = useParams();
	const history = useHistory();

	// const { store, actions } = useContext(Context);
	let { id } = useParams();

	// const formatter = new Intl.NumberFormat("en-US", {
	// 	style: "currency",
	// 	currency: "USD",
	// 	minimumFractionDigits: 0
	// });
	const [key, setKey] = useState('home');

	const [data, setData] = useState([]);
	useEffect(() => {
	  getData();
	}, []);

	// api
	const getData = () => {
	  axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
		console.log(res.data);
		setData(res.data);
	  });
	};
	// to edit text in cell
	const lineFormatter = (data, row) => {
		return <span onClick={() => {
			history.push(`/profile/user/${userId}/orderdetails`);
			}} >{data}</span>
	}

	// flter routers
	const selectOptions = {
		0: 'south',
		1: 'north',
		2: 'orlando'
	  };

	// column info using api datafields

	const columns=[ {
		dataField: "postId",
		text: "ID",
		// click head to sort
		sort: true,	
		// format the cell, add text or create on click
		formatter: lineFormatter,	
	  },{
		dataField: "email",
		text: "Email",
		formatter: lineFormatter,		
	  },
	  {
		dataField: "name",
		text: "Name",
		formatter: lineFormatter,
	  }];

	return (
		<>
			<div className="w-100 d-flex p-4">
				<div className="w-100 h-100 p-2 rounded-3">
					<div className="dashboard-page">
						{/* title section */}
						<Container>
							<Row>
								<Col sm="9">
								<h1>Orders</h1>
								</Col>

								<Col>
								<Button 
									onClick={() => {
										history.push(`/profile/user/${userId}/neworder`);
										}}
									variant="dark"
									className="mb-3 float-right">
										+ new order
									</Button>
								</Col>
							</Row>
						</Container>

						{/* Dashboard content */}
						
                        <Container>	
					
							<div className="h-100 p-5 bg-light border rounded-3">
							<Row>
									<Col className="mb-3">
									<Button variant="outline-dark" >
										Print View
									</Button>
									</Col>
							</Row>		
							
							<Row>
					
								<Tabs
									id="controlled-tab-example"
									activeKey={key}
									onSelect={(k) => setKey(k)}
									className="mb-3"
								>
								
									<Tab eventKey="home" title="all">
										<Table striped bordered hover responsive="lg" className="table" >
											<thead className="thead-dark">
												<tr>
													<th scope="col">ID</th>
													<th scope="col">Date</th>
													<th scope="col">Customer</th>
													<th scope="col">Tier</th>
													<th scope="col">Amount</th>
													<th scope="col">Route</th>
													<th scope="col">Status</th>
												</tr>
											</thead>
											<tbody>
												<tr onClick={() => {
													history.push(`/profile/user/${userId}/orderdetails`);
												}}>
												
													<td>001</td>
													<td>04/01/22</td>
													<td>JDA Flooring</td>
													<td>A</td>
													<td>$300</td>
													<td>South</td>
													<td>In Production</td>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>002</td>
													<td>04/01/22</td>
													<td>Joel Floors</td>
													<td>C</td>
													<td>$100</td>
													<td>South</td>
													<td>In Production</td>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>003</td>
													<td>04/01/22</td>
													<td>Carlos Store</td>
													<td>B</td>
													<td>$80</td>
													<td>Orlando</td>
													<td>Ready</td>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>004</td>
													<td>04/01/22</td>
													<td>Best Flooring</td>
													<td>D</td>
													<td>$500</td>
													<td>North</td>
													<td>Completed</td>
												</tr>
											</tbody>
										</Table>
									</Tab>
								
									<Tab eventKey="profile" title="open">
									{/* map orders with status set to in production and ready */}
										<Table striped bordered hover responsive="lg" className="table" >
											<thead className="thead-dark">
												<tr>
													<th scope="col">ID</th>
													<th scope="col">Date</th>
													<th scope="col">Customer</th>
													<th scope="col">Tier</th>
													<th scope="col">Amount</th>
													<th scope="col">Route</th>
													<th scope="col">Status</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>001</td>
													<td>04/01/22</td>
													<td>JDA Flooring</td>
													<td>A</td>
													<td>$300</td>
													<td>South</td>
													<td>In Production</td>
												</tr>
											</tbody>
											<tbody>
												<tr>
													<td>003</td>
													<td>04/01/22</td>
													<td>Carlos Store</td>
													<td>B</td>
													<td>$80</td>
													<td>Orlando</td>
													<td>Ready</td>
												</tr>
											</tbody>
										</Table>
									</Tab>
								
									<Tab eventKey="contact" title="closed">
										{/* map orders with status set to completed */}
										<Table striped bordered hover responsive="lg" className="table" >
											<thead className="thead-dark">
												<tr>
													<th scope="col">ID</th>
													<th scope="col">Date</th>
													<th scope="col">Customer</th>
													<th scope="col">Tier</th>
													<th scope="col">Amount</th>
													<th scope="col">Route</th>
													<th scope="col">Status</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>001</td>
													<td>04/01/22</td>
													<td>JDA Flooring</td>
													<td>A</td>
													<td>$300</td>
													<td>South</td>
													<td>Completed</td>
												</tr>
											</tbody>
										</Table>
									</Tab>
								</Tabs>
							</Row>
							<Row>
								<BootstrapTable 
									keyField="id"
									data={data}
									columns={columns}
									striped
									hover
									condensed
									pagination={paginationFactory()}
									filter={filterFactory()}
									>

								</BootstrapTable>
							</Row>
						
							</div>
						</Container>
					</div>
				</div>
			</div>
		</>
	);
};

DashboardOrders.propTypes = {
	user: PropTypes.object,
	userId: PropTypes.string,
};