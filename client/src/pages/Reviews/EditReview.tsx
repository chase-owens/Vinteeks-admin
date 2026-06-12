import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useReviews } from '../../hooks/useReview';
import { updateReviews } from '../../api/reviews';
import ReviewForm from '../../components/ReviewForm';
import type { Review } from '../../../../shared/types/Review';

const EditReview = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { reviews } = useReviews();

	const reviewToUpdate = reviews.find((review) => review.id === id);

	const [editedReview, setEditedReview] = useState<Review | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const review = editedReview ?? reviewToUpdate;

	const handleSave = async () => {
		if (!review) return;

		setIsSubmitting(true);

		const updatedReviews = reviews.map((item) => (item.id === review.id ? review : item));

		await updateReviews(updatedReviews);

		navigate('/reviews');
	};

	if (!review) {
		return <p className="text-sm text-muted-foreground">Loading review...</p>;
	}

	return (
		<section className="space-y-4 p-6">
			<div>
				<h1 className="text-2xl font-semibold">Edit Review</h1>

				<p className="text-sm text-muted-foreground">
					Update customer feedback shown on the consumer site.
				</p>
			</div>

			<ReviewForm
				isSubmitDisabled={isSubmitting}
				onCancel={() => navigate('/reviews')}
				onChange={setEditedReview}
				onSubmit={handleSave}
				review={review}
				submitLabel={isSubmitting ? 'Submitting...' : 'Save Changes'}
			/>
		</section>
	);
};

export default EditReview;
