import axios from "axios";
import React, { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const fetchTodos = async (page = 1) => {
	// console.log(page);
	try {
		const response = await axios.get(
			`https://gorest.co.in/public/v1/todos?page=${page}`
		);
		// console.log(response);
		return response;
	} catch (err) {
		throw new Error("error fetching todos", err);
	}
};

const RQueryInfiniteScroll = () => {
	// const { data } = useQuery("todos", fetchTodos);
	// console.log(data);

	const {
		fetchNextPage,
		fetchPreviousPage,
		data,
		hasNextPage,
		hasPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		...result
	} = useInfiniteQuery("todos", ({ pageParam = 1 }) => fetchTodos(pageParam), {
		getNextPageParam: (lastPage, allPages) => {
			const maxPages = allPages[0].data?.meta?.pagination.pages;
			const nextPage = lastPage.data?.meta?.pagination.page;
			return nextPage <= maxPages ? nextPage : undefined;
		},
	});

	useEffect(() => {
		let fetching = false;
		let dataa;
		const onScroll = async (e) => {
			const { scrollTop, scrollHeight, clientHeight } =
				e.target.scrollingElement;
			// console.log(scrollTop, scrollHeight, clientHeight);
			if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
				fetching = true;
				// console.log(fetchNextPage());
				if (hasNextPage) await fetchNextPage();
				// console.log(await fetchNextPage());
				fetching = false;
			}
		};

		document.addEventListener("scroll", onScroll);
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, []);

	console.log(data);
	return (
		<div>
			<h1>React query infinite Scroll</h1>
			<div>
				{data?.pages?.map((page) => {
					// console.log(page.data.data);
					return page.data.data.map((todo) => {
						return (
							<p style={{ marginTop: "40px", maxWidth: "400px" }} key={todo.id}>
								{todo.title}
							</p>
						);
					});
				})}
			</div>
		</div>
	);
};

export default RQueryInfiniteScroll;
