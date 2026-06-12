import type { Review } from '../../../shared/types/Review';

export const getReviews = async () => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`);

	if (!res.ok) {
		throw new Error('Failed to fetch reviews');
	}

	return res.json();
};

export const updateReviews = async (reviews: Review[]) => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ reviews })
	});

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error('Failed to update review');
	}

	return response.json();
};
