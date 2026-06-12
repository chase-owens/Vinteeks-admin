import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../../shared/types/Product';
import { deleteProduct, getProducts } from '../../api/products';
import PageHeader from '../../components/PageHeader';

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL;

const Products: FC = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<Product[]>([]);
	const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

	const toggleExpandedProduct = (productId: string) => {
		setExpandedProductId((current) => (current === productId ? null : productId));
	};

	useEffect(() => {
		const loadProducts = async () => {
			const productsData = await getProducts();
			setProducts(productsData.products);
		};

		loadProducts();
	}, []);

	const handleDelete = async (productId: string) => {
		const confirmed = window.confirm('Delete this product?');

		if (!confirmed) return;

		try {
			await deleteProduct(productId);

			setProducts((current) => current.filter((product) => product.id !== productId));
		} catch (error) {
			console.error(error);
			window.alert('Failed to delete product.');
		}
	};

	return (
		<section className="space-y-4 p-6">
			<PageHeader
				actionLabel="Add Product"
				description="Manage inventory, pricing, and product availability."
				onAction={() => navigate('/products/new')}
				title="Products"
			/>

			<div className="overflow-hidden rounded-lg border border-(--accent-border)">
				<table className="w-full border-collapse text-left text-sm">
					<thead className="bg-(--accent-bg)">
						<tr>
							<th className="px-4 py-3 font-medium">Product</th>
							<th className="px-4 py-3 font-medium">Category</th>
							<th className="px-4 py-3 font-medium">Room</th>
							<th className="px-4 py-3 font-medium">Price</th>
							<th className="px-4 py-3 font-medium">Status</th>
							<th className="px-4 py-3 text-right font-medium">Actions</th>
						</tr>
					</thead>

					<tbody>
						{products.map((product) => {
							const isExpanded = expandedProductId === product.id;
							const status =
								product.status === 'sold'
									? 'sold'
									: product.status === 'rented'
										? 'rented'
										: 'available';

							const isAvailable = status === 'available';

							const keyProp = `${product.id}-${product.name}`;

							return (
								<>
									<tr
										key={keyProp}
										onClick={() => toggleExpandedProduct(product.id)}
										className={`
										border-t border-(--border)
										transition-colors
										hover:bg-(--accent-bg)
                    cursor-pointer
										${isAvailable ? 'bg-[rgba(170,59,255,0.05)]' : ''}
									`}
									>
										<td className="px-4 py-3">
											<p className="font-medium">{product.name}</p>
											<p className="text-xs text-muted-foreground">{product.id}</p>
										</td>

										<td className="px-4 py-3 text-muted-foreground">{product.category}</td>

										<td className="px-4 py-3 text-muted-foreground">{product.room}</td>

										<td className="px-4 py-3 text-muted-foreground">${product.price}</td>

										<td className="px-4 py-3">
											<span
												className={`
												rounded-full px-2 py-1 text-xs font-medium
												${isAvailable ? 'bg-(--accent-bg) text-(--accent)' : 'bg-black/10'}
											`}
											>
												{status}
											</span>
										</td>

										<td className="px-4 py-3">
											<div className="flex justify-end gap-2">
												<button
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														navigate(`/products/${product.id}`);
													}}
													className="rounded-md px-3 py-1.5 text-xs font-medium text-(--accent) transition-colors hover:bg-(--accent-bg)"
												>
													Edit
												</button>

												<button
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														handleDelete(product.id);
													}}
													className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-300"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
									{isExpanded && (
										<tr className="border-t border-(--border) bg-black/10">
											<td colSpan={6} className="px-4 py-5">
												<div className="grid gap-4 text-sm md:grid-cols-3">
													<div className="md:col-span-3">
														<p className="mb-3 text-xs tracking-[0.3em] text-muted-foreground uppercase">
															Images
														</p>

														{product.images?.length ? (
															<div className="flex gap-3 overflow-x-auto pb-2">
																{product.images.map((imageKey) => (
																	<img
																		key={`${keyProp}-${imageKey}`}
																		src={`${CONTENT_BASE_URL}${imageKey}`}
																		alt={product.name}
																		className="h-24 w-24 rounded-md border border-(--accent) object-cover"
																	/>
																))}
															</div>
														) : (
															<p className="text-sm text-muted-foreground">No images added.</p>
														)}
													</div>
													<div>
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Description
														</p>
														<p className="mt-1">{product.description || 'No description'}</p>
													</div>

													<div>
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Details
														</p>
														<p>Type: {product.type}</p>
														<p>Condition: {product.condition || '—'}</p>
														<p>Material: {product.material || '—'}</p>
													</div>

													<div>
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Flags
														</p>
														<p>Featured: {product.isFeatured ? 'Yes' : 'No'}</p>
														<p>On Sale: {product.isSale ? 'Yes' : 'No'}</p>
														<p>Can Rent: {product.canRent ? 'Yes' : 'No'}</p>
													</div>
												</div>
											</td>
										</tr>
									)}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Products;
