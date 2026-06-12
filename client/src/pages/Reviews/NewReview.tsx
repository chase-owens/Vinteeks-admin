import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ReviewForm from '../../components/ReviewForm';
import type { Review } from '../../../../shared/types/Review';
import { useReviews } from '../../hooks/useReview';
import { updateReviews } from '../../api/reviews';

const createReview = (): Review => ({
	id: crypto.randomUUID(),
	name: '',
	rating: 5,
	text: ''
});

const NewReview = () => {
	const navigate = useNavigate();
	const [review, setReview] = useState<Review>(createReview());
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { reviews } = useReviews();

	const handleSave = async () => {
		setIsSubmitting(true);

		await updateReviews([...reviews, review]);
		navigate('/reviews');
	};

	return (
		<section className="space-y-4 p-6">
			<div>
				<h1 className="text-2xl font-semibold">New Review</h1>
				<p className="text-sm text-muted-foreground">
					Add customer feedback to show on the consumer site.
				</p>
			</div>

			<ReviewForm
				review={review}
				onChange={setReview}
				onSubmit={handleSave}
				onCancel={() => navigate('/reviews')}
				isSubmitDisabled={isSubmitting}
				submitLabel={isSubmitting ? 'Submitting...' : 'Add Review'}
			/>
		</section>
	);
};

export default NewReview;
