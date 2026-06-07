import { createBrowserRouter } from 'react-router';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Inquiries from '../pages/Inquiries';
import InquiryDetails from '../pages/InquiryDetails';

// import { AdminLayout } from "./layouts/AdminLayout";
// import { Inquiries } from "./routes/Inquiries";
// import { Products } from "./routes/Products";
// import { Modules } from "./routes/Modules";
// import { Images } from "./routes/Images";

<div>hello</div>;

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: 'inquiries',
				element: <Inquiries />
			},
			{
				path: 'inquiries/:id',
				element: <InquiryDetails />
			},
			{
				path: 'products',
				element: <div>hello</div>
			},
			{
				path: 'modules',
				element: <div>hello</div>
			},
			{
				path: 'images',
				element: <div>hello</div>
			}
		]
	}
]);
