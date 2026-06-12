import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
	const { pathname } = useLocation();

	return (
		<div className="flex flex-col">
			<Header currentRoute={pathname} />
			<div>
				<div id="sidebar"></div>
				<main id="page">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default App;
