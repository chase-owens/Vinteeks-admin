import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from '../../components/ProductForm';
import { createProduct } from '../../api/products';
import type { Product } from '../../../..//shared/types/Product';
import PageHeader from '../../components/PageHeader';

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
	const [isSubmitting, setIsSubmitting] = useState(false);

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

		setIsSubmitting(true);

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
			<PageHeader description="Create a new inventory item." title="Add Product" />

			<ProductForm
				isSubmitDisabled={isSubmitting}
				onCancel={() => navigate('/products')}
				onChange={setProduct}
				onSubmit={handleCreate}
				product={product}
				submitLabel={isSubmitting ? 'Submitting...' : 'Create Product'}
			/>
		</section>
	);
};

export default NewProduct;
