import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from '../components/ProductForm';
import { createProduct } from '../api/products';
import type { Product } from '../../../shared/types/Product';

const createProductId = (name: string) => {
	const slug = name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

	return `${slug || 'product'}-${Date.now()}`;
};

const NewProduct = () => {
	const navigate = useNavigate();

	const [product, setProduct] = useState<Product>({
		id: '',
		name: '',
		description: '',
		price: 0,
		category: 'sofas',
		room: 'living-room',
		type: 'sofa',
		status: 'available',
		images: [],
		isFeatured: false,
		isSale: false,
		canRent: false
	});

	const handleCreate = async () => {
		if (!product.name.trim()) {
			window.alert('Product name is required.');
			return;
		}

		try {
			const now = new Date().toISOString();

			const productToCreate: Product = {
				...product,
				id: createProductId(product.name),
				createdAt: now
			};

			await createProduct(productToCreate);

			navigate('/products');
		} catch (error) {
			console.error(error);
			window.alert('Failed to create product.');
		}
	};

	return (
		<section className="space-y-4 p-6">
			<div>
				<h1 className="text-2xl font-semibold">Add Product</h1>
				<p className="text-sm text-muted-foreground">Create a new inventory item.</p>
			</div>

			<ProductForm
				product={product}
				onChange={setProduct}
				onSubmit={handleCreate}
				submitLabel="Create Product"
			/>
		</section>
	);
};

export default NewProduct;
