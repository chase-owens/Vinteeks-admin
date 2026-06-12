import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from '../../components/ProductForm';
import { editProduct, getProducts } from '../../api/products';
import type { Product } from '../../../../shared/types/Product';
import PageHeader from '../../components/PageHeader';

const EditProduct = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const loadProduct = async () => {
			const productsData = await getProducts();
			const foundProduct = productsData.products.find((product: Product) => product.id === id);

			if (foundProduct) {
				setProduct(foundProduct);
			}
		};

		loadProduct();
	}, [id]);

	const handleSave = async () => {
		if (!product) return;
		setIsSubmitting(true);

		await editProduct(product.id, product);
		navigate('/products');
	};

	if (!product) {
		return <p className="text-sm text-muted-foreground">Loading product...</p>;
	}

	return (
		<section className="space-y-4 p-6">
			<PageHeader description="Update inventory, pricing, and availability." title="Edit Product" />

			<ProductForm
				isSubmitDisabled={isSubmitting}
				onCancel={() => navigate('/products')}
				onChange={setProduct}
				onSubmit={handleSave}
				product={product}
				submitLabel={isSubmitting ? 'Submitting...' : 'Save Changes'}
			/>
		</section>
	);
};

export default EditProduct;
