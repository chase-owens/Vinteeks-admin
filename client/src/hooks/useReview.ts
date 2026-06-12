// src/hooks/useReviews.ts
import { useEffect, useState } from 'react';
import { getReviews } from '../api/reviews';
import type { Review } from '../../../shared/types/Review';

export const useReviews = () => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadReviews = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const reviewsData = await getReviews();
				setReviews(reviewsData.reviews);
			} catch {
				setError('Failed to load reviews.');
			} finally {
				setIsLoading(false);
			}
		};
		loadReviews();
	}, []);

	return {
		reviews,
		setReviews,
		isLoading,
		error
	};
};
