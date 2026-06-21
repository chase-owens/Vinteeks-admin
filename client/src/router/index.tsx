import { createBrowserRouter } from 'react-router';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Inquiries from '../pages/Inquiries/Inquiries';
import InquiryDetails from '../pages/Inquiries/InquiryDetails';
import Products from '../pages/Products/Products';
import NewProduct from '../pages/Products/NewProduct';
import EditProduct from '../pages/Products/EditProduct';
import Images from '../pages/Images';
import Reviews from '../pages/Reviews/Reviews';
import Treasures from '../pages/Treasures/Treasures';
import NewReview from '../pages/Reviews/NewReview';
import EditReview from '../pages/Reviews/EditReview';
import NewTreasure from '../pages/Treasures/NewTreasure';
import EditTreasure from '../pages/Treasures/EditTreasure';
import SiteContent from '../pages/SiteContent/SiteContent';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{ path: 'content', element: <SiteContent /> },
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
				path: 'reviews',
				element: <Reviews />
			},
			{
				path: 'reviews/new',
				element: <NewReview />
			},
			{
				path: 'reviews/:id',
				element: <EditReview />
			},
			{
				path: 'treasures',
				element: <Treasures />
			},
			{
				path: 'treasures/new',
				element: <NewTreasure />
			},
			{
				path: 'treasures/:id',
				element: <EditTreasure />
			},
			{
				path: 'images',
				element: <Images />
			}
		]
	}
]);
