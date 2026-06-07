// src/api/products.ts

import type { Product } from '../../../shared/types/Product';

export const getProducts = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);

	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}

	return response.json();
};

export const deleteProduct = async (productId: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/delete`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ productId })
	});

	if (!response.ok) {
		throw new Error('Failed to delete product');
	}

	return response.json();
};

export const createProduct = async (product: Product) => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(product)
	});

	if (!response.ok) {
		throw new Error('Failed to create product');
	}

	return response.json();
};

export const editProduct = async (productId: string, updates: Partial<Product>) => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/edit`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			productId,
			updates
		})
	});

	if (!response.ok) {
		throw new Error('Failed to update product');
	}

	return response.json();
};
