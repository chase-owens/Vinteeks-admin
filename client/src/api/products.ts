// src/api/products.ts

export const getProducts = async () => {
	const res = await fetch(`${import.meta.env.VITE_CONTENT_BASE_URL}/data/products.json`);

	if (!res.ok) {
		throw new Error('Failed to fetch products');
	}

	return res.json();
};
