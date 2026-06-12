import { useEffect, useState, type FC } from 'react';
import { getProducts } from '../api/products';
import { getInquiries } from '../api/inquiries';
import DashboardCard from '../components/DashboardCard';
import type { Inquiry } from '../../../shared/types/Inquiry';

const getTime = (date?: string) => {
	const time = new Date(date || '').getTime();
	return Number.isNaN(time) ? 0 : time;
};

const Dashboard: FC = () => {
	const [products, setProducts] = useState([]);
	const [inquiries, setInquiries] = useState<Inquiry[]>([]);

	useEffect(() => {
		async function loadDashboard() {
			const [productsData, inquiriesData] = await Promise.all([getProducts(), getInquiries()]);

			setProducts(productsData.products);
			setInquiries(inquiriesData);
		}

		loadDashboard();
	}, []);

	const sortedInquiries = inquiries
		.sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt)) // newest first - should be able to fix at lamda dynamodb level
		.filter(({ inquiryId }) => !!inquiryId)
		.slice(0, 5);

	return (
		<div className="space-y-8 px-4">
			<h1 className="text-2xl">Dashboard</h1>

			<section className="grid gap-4 md:grid-cols-3">
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

			<section className="rounded-lg border border-(--accent-border) p-6">
				<div className="mb-5">
					<h2 className="text-lg font-semibold">Quick Actions</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Common admin tasks for managing the Vinteeks site.
					</p>
				</div>

				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
					<a
						className="rounded-md border border-(--accent-border) p-4 hover:bg-(--accent-bg)"
						href="/products/new"
					>
						<p className="font-medium">Add Product</p>
						<p className="mt-1 text-xs text-muted-foreground">Create inventory item</p>
					</a>

					<a
						className="rounded-md border border-(--accent-border) p-4 hover:bg-(--accent-bg)"
						href="/treasures/new"
					>
						<p className="font-medium">Add Treasure</p>
						<p className="mt-1 text-xs text-muted-foreground">Add a found piece</p>
					</a>

					<a
						className="rounded-md border border-(--accent-border) p-4 hover:bg-(--accent-bg)"
						href="/inquiries"
					>
						<p className="font-medium">Review Inquiries</p>
						<p className="mt-1 text-xs text-muted-foreground">View customer requests</p>
					</a>

					<a
						className="rounded-md border border-(--accent-border) p-4 hover:bg-(--accent-bg)"
						href="/content"
					>
						<p className="font-medium">Edit Content</p>
						<p className="mt-1 text-xs text-muted-foreground">Homepage and theme</p>
					</a>

					<a
						className="rounded-md border border-(--accent-border) p-4 hover:bg-(--accent-bg)"
						href="/images"
					>
						<p className="font-medium">Upload Images</p>
						<p className="mt-1 text-xs text-muted-foreground">Manage image assets</p>
					</a>
				</div>
			</section>

			<section className="rounded-lg border border-(--accent-border) p-6">
				<div className="mb-5 flex items-center justify-between">
					<div>
						<h2 className="text-lg font-semibold">Recent Inquiries</h2>
						<p className="mt-1 text-sm text-muted-foreground">Latest customer requests.</p>
					</div>

					<a href="/inquiries" className="text-sm text-(--accent)">
						View All
					</a>
				</div>

				<div className="overflow-hidden rounded-md border border-(--accent-border)">
					<table className="w-full">
						<thead>
							<tr className="border-b border-(--accent-border)">
								<th className="p-3 text-left text-xs">Name</th>
								<th className="p-3 text-left text-xs">Product</th>
								<th className="p-3 text-left text-xs">Date</th>
							</tr>
						</thead>

						<tbody>
							{sortedInquiries.map((inquiry) => (
								<tr key={inquiry.id} className="border-b border-(--accent-border)">
									<td className="p-3 text-sm">{inquiry.name}</td>

									<td className="p-3 text-sm">{inquiry.productId || '-'}</td>

									<td className="p-3 text-sm text-muted-foreground">
										{new Date(inquiry.createdAt).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
