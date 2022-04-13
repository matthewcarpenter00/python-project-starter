import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useState } from "react";

export const DashboardProducts = ({ user, userId }) => {
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
				<div className="w-100 h-100 p-2 rounded-3">
					<div className="dashboard-page">
						{/* title section */}
						<Container>
							<Row>
								<Col sm="9">
								<h1>Products</h1>
								</Col>

								<Col>
								<Button 
									onClick={() => {
										history.push(`/profile/user/${userId}/newproduct`);
										}}
									variant="dark"
									className="mb-3 float-right">
										+ new product
									</Button>
								</Col>
							</Row>
						</Container>

						{/* Dashboard content */}
						
                        <div className="container">
			<div className="h-100 p-5 bg-light border rounded-3">
				<Table striped bordered hover responsive="lg" className="table" >					<thead className="thead-dark">
						<tr>
							<th scope="col">Product ID</th>
							<th scope="col">Name</th>
							<th scope="col">Material</th>
							<th scope="col">Description</th>
							<th scope="col">Price</th>
					
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>001</td>
							<td>End Cap:ECAX</td>
							<td>Vinyl</td>
							<td>Custom End Cap / Reducer Fabrication</td>
							<td>$14.00</td>
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

DashboardProducts.propTypes = {
	user: PropTypes.object,
	userId: PropTypes.string,
};
