import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import LogoutButton from "../../components/auth/LogoutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';



export const SideBar = ({ userId }) => {
	const history = useHistory();
	// const { store, actions } = useContext(Context);
	const user = useSelector((state) => state.session.user);

	const [dropdown, setDropdown] = useState(false);
	const [active, setActive] = useState(false);

	let show = "";
	let activeOption = "";

	if (dropdown) {
		show = "show";
	}

	if (active) {
		activeOption = "active";
	}

	return (
		<div className="d-flex flex-column  flex-shrink-0 p-3 text-white bg-dark" style={{ width: "20%" }}>
			<a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<svg className="bi me-2" width="40" height="32" />
				<span className="fs-4">
                    Admin
				</span>
			</a>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="m-2">
					<a
						style={{ cursor: "pointer" }}
						className={active ? "nav-link text-white " + activeOption : "nav-link text-white"}
						aria-current="page"
						onClick={() => {
							history.push(`/profile/user/${userId}`);
						}}>
						<span className="ms-4 sidebar-item ">Orders</span>
					</a>
				</li>
				<li className="m-2">
					<a
						style={{ cursor: "pointer" }}
						className={active ? "nav-link text-white " + activeOption : "nav-link text-white"}
						onClick={() => {
							history.push(`/profile/user/${userId}/customers`);
						}}>
						<span className="ms-4 sidebar-item">Customers</span>
					</a>
				</li>
	
					<li className="m-2">
						<a
							style={{ cursor: "pointer" }}
							className="nav-link text-white"
							onClick={() => {
								history.push(`/profile/user/${userId}/products`);
							}}>
							<span className="ms-4 sidebar-item">Products</span>
						</a>
					</li>
			
				<li className="m-2">
					<a
						style={{ cursor: "pointer" }}
						className="nav-link text-white"
						onClick={() => {
							history.push(`/profile/user/${userId}/myaccount`);
						}}>

						<span className="ms-4 sidebar-item">My Account</span>
					</a>
				</li>
				<li className="m-2">
					<a
						style={{ cursor: "pointer" }}
						className="nav-link text-white"
						onClick={() => {
							history.push("/");
							// actions.logout();
						}}>
						<i className="fas fa-sign-out-alt" />
						<LogoutButton />
						{/* <span className="ms-4 sidebar-item">log out</span> */}
					</a>
				</li>
			</ul>
		</div>
	);
};

SideBar.propTypes = {
	user: PropTypes.object,
	userId: PropTypes.string,
};