import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<NavLink
				className='btn btn-primary'
				style={({ isActive }) => {
					return {
						color: isActive ? "white" : "black",
					};
				}}
				to='/'
			>
				Home
			</NavLink>

			<NavLink
				className='btn btn-primary'
				style={({ isActive }) => {
					return {
						color: isActive ? "white" : "black",
					};
				}}
				to='/infiniteScroll'
			>
				Infinite Scroll
			</NavLink>

			<NavLink
				className='btn btn-primary'
				style={({ isActive }) => {
					return {
						color: isActive ? "white" : "black",
					};
				}}
				to='/reactQuery'
			>
				React Query
			</NavLink>

			<NavLink
				className='btn btn-primary'
				style={({ isActive }) => {
					return {
						color: isActive ? "white" : "black",
					};
				}}
				to='/reactQueryInfiniteScroll'
			>
				React Query Infinite Scroll
			</NavLink>

			{/* <NavLink to='/infiniteScroll'>Infinite Scroll</NavLink>
			<NavLink to='/reactQuery'>React Query</NavLink>
			<NavLink to='/reactQueryInfiniteScroll'>
				React Query Infinite Scroll
			</NavLink> */}
		</>
	);
};

export default Navbar;
