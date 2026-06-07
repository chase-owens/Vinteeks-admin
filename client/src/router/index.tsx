import { createBrowserRouter } from 'react-router';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Inquiries from '../pages/Inquiries';
import InquiryDetails from '../pages/InquiryDetails';
import Products from '../pages/Products';
import NewProduct from '../pages/NewProduct';
import EditProduct from '../pages/EditProduct';
import Images from '../pages/Images';

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
				element: <Products />
			},
			{
				path: 'products/new',
				element: <NewProduct />
			},
			{
				path: 'products/:id',
				element: <EditProduct />
			},
			{
				path: 'modules',
				element: <div>hello</div>
			},
			{
				path: 'images',
				element: <Images />
			}
		]
	}
]);
