import { useEffect, useState, type FC } from 'react';
import { getProducts } from '../api/products';
import { getInquiries } from '../api/inquiries';
import DashboardCard from '../components/DashboardCard';

const Dashboard: FC = () => {
	const [products, setProducts] = useState([]);
	const [inquiries, setInquiries] = useState([]);

	useEffect(() => {
		async function loadDashboard() {
			const [productsData, inquiriesData] = await Promise.all([getProducts(), getInquiries()]);

			setProducts(productsData.products);
			setInquiries(inquiriesData);
		}

		loadDashboard();
	}, []);

	return (
		<>
			<h1 className="px-4 pb-8 text-2xl">Dashboard</h1>
			<section className="grid gap-4 md:grid-cols-3 px-4">
				<DashboardCard
					title="Total Products"
					count={products.length}
					description="Products in inventory"
					href="/products"
				/>

				<DashboardCard
					title="New Inquiries"
					count={inquiries.length}
					description="Requests waiting for review"
					href="/inquiries"
				/>
			</section>
		</>
	);
};

export default Dashboard;
