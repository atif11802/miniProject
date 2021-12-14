import axios from "axios";
import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
	const [page, setPage] = useState(1);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	const handleScroll = (e) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
		// console.log("scrollTop", scrollTop);
		// console.log("scrollHeight", scrollHeight);
		// console.log("clientHeight", clientHeight);

		if (data?.data.meta.pagination.page !== data?.data.meta.pagination.pages) {
			if (scrollHeight - scrollTop === clientHeight) {
				setPage((prev) => prev + 1);
			}
		}
	};

	useEffect(() => {
		const loadUsers = async () => {
			setLoading(true);
			const response = await axios.get(
				`https://gorest.co.in/public/v1/users?page=${page}`
			);
			setData(response);
			// console.log(response.data.data);
			setUsers((prev) => [...prev, ...response.data.data]);
			// setUsers((prev) => [...prev, ...newUsers]);
			setLoading(false);
		};
		loadUsers();
	}, [page]);

	// console.log(loading);
	return (
		<div
			onScroll={handleScroll}
			style={{ height: "400px", margin: "0 auto", overflow: "auto" }}
		>
			<h1>infinity scroll</h1>
			{loading && <h1>loading...</h1>}
			<div>
				{users.map((user, i) => {
					return <p key={i}>{user.name}</p>;
				})}
			</div>
		</div>
	);
};

export default InfiniteScroll;
