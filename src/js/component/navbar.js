import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div>
				<span className="navbar-brand mb-0 ms-2 h1">CONTACT LIST</span>
			</div>
			<div className="ml-auto">
				<Link to="/contactview">
					<button className="btn btn-success me-2">Add New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
