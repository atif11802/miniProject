import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InfiniteScroll from "./components/InfiniteScroll";
import Navbar from "./components/Navbar";
import ReactQuery from "./components/ReactQuery";
import RQueryInfiniteScroll from "./components/RQueryInfiniteScroll";

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/infiniteScroll' element={<InfiniteScroll />} />
				<Route path='/reactQuery' element={<ReactQuery />} />
				<Route
					path='/reactQueryInfiniteScroll'
					element={<RQueryInfiniteScroll />}
				/>
			</Routes>
		</div>
	);
}

export default App;
