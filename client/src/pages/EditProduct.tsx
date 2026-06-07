import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from '../components/ProductForm';
import { editProduct, getProducts } from '../api/products';
import type { Product } from '../../../shared/types/Product';

const EditProduct = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);

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

		await editProduct(product.id, product);
		navigate('/products');
	};

	if (!product) {
		return <p className="text-sm text-muted-foreground">Loading product...</p>;
	}

	return (
		<section className="space-y-4 p-6">
			<div>
				<h1 className="text-2xl font-semibold">Edit Product</h1>
				<p className="text-sm text-muted-foreground">
					Update inventory, pricing, and availability.
				</p>
			</div>

			<ProductForm
				product={product}
				onChange={setProduct}
				onSubmit={handleSave}
				submitLabel="Save Changes"
			/>
		</section>
	);
};

export default EditProduct;
