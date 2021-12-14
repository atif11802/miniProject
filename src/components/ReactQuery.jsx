import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchUser = async (key, page) => {
	// console.log(key, page);
	try {
		const response = await axios.get(
			`https://gorest.co.in/public/v1/users?page=${page}`
		);
		return response;
	} catch (err) {
		throw new Error(err);
	}
};

const ReactQuery = () => {
	const [page, setPage] = useState(1);
	const { data, status } = useQuery(["fetchUser", page], ({ queryKey }) =>
		fetchUser(queryKey[0], queryKey[1])
	);

	// console.log(data, status);

	return (
		<div>
			{status === "loading" && <div>Loading...</div>}
			{status === "error" && <div>NetWork Issue</div>}
			{status === "success" &&
				data?.data.data.map((item) => {
					return <div key={item.id}>{item.email}</div>;
				})}
			{data?.data.meta.pagination.page !== 1 && (
				<button
					className='btn btn-primary'
					onClick={() => setPage((old) => Math.max(old - 1, 1))}
					disabled={data?.previous === null}
				>
					Previous Page
				</button>
			)}
			{"  "}

			{data?.data.meta.pagination.pages !== data?.data.meta.pagination.page && (
				<button
					className='btn btn-primary'
					onClick={() => {
						setPage(page + 1);
					}}
					// Disable the Next Page button until we know a next page is available
					disabled={data?.next === null}
				>
					Next Page
				</button>
			)}
		</div>
	);
};

export default ReactQuery;
