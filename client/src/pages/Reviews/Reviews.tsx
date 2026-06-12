import { Fragment, useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Review } from '../../../../shared/types/Review';
import { getReviews, updateReviews } from '../../api/reviews';

const Reviews: FC = () => {
	const navigate = useNavigate();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

	const toggleExpandedReview = (reviewId: string) => {
		setExpandedReviewId((current) => (current === reviewId ? null : reviewId));
	};

	useEffect(() => {
		const loadReviews = async () => {
			const reviewData = await getReviews();
			setReviews(reviewData.reviews);
		};

		loadReviews();
	}, []);

	const handleDelete = async (id: string) => {
		const confirmed = window.confirm('Delete this review?');
		if (!confirmed) return;

		try {
			const updatedReviews = reviews.filter((review) => review.id !== id);
			const res = await updateReviews(updatedReviews);
			setReviews(res.reviews);
		} catch (error) {
			console.error(error);
			window.alert('Failed to delete review.');
		}
	};

	return (
		<section className="space-y-4 p-6">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Reviews</h1>
					<p className="text-sm text-muted-foreground">Manage customer reviews.</p>
				</div>

				<button
					type="button"
					onClick={() => navigate('/reviews/new')}
					className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-sm font-medium text-(--accent) transition-colors hover:bg-(--accent-bg)/80"
				>
					Add Review
				</button>
			</div>

			<div className="overflow-hidden rounded-lg border border-(--accent-border)">
				<table className="w-full border-collapse text-left text-sm">
					<thead className="bg-(--accent-bg)">
						<tr>
							<th className="px-4 py-3 font-medium">Reviewer</th>
							<th className="px-4 py-3 font-medium">Rating</th>
							<th className="px-4 py-3 font-medium">Review</th>
							<th className="px-4 py-3 text-right font-medium">Actions</th>
						</tr>
					</thead>

					<tbody>
						{reviews.map((review) => {
							const isExpanded = expandedReviewId === review.id;

							return (
								<Fragment key={review.id}>
									<tr
										onClick={() => toggleExpandedReview(review.id)}
										className="cursor-pointer border-t border-(--border) transition-colors hover:bg-(--accent-bg)"
									>
										<td className="px-4 py-3">
											<p className="font-medium">{review.name}</p>
											<p className="text-xs text-muted-foreground">{review.id}</p>
										</td>

										<td className="px-4 py-3 text-muted-foreground">
											{'rating' in review ? `${review.rating}/5` : '—'}
										</td>

										<td className="max-w-md px-4 py-3 text-muted-foreground">
											<p className="line-clamp-1">{review.text}</p>
										</td>

										<td className="px-4 py-3">
											<div className="flex justify-end gap-2">
												<button
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														navigate(`/reviews/${review.id}`);
													}}
													className="rounded-md px-3 py-1.5 text-xs font-medium text-(--accent) transition-colors hover:bg-(--accent-bg)"
												>
													Edit
												</button>

												<button
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														handleDelete(review.id);
													}}
													className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-300"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>

									{isExpanded && (
										<tr className="border-t border-(--border) bg-black/10">
											<td colSpan={4} className="px-4 py-5">
												<div className="grid gap-4 text-sm md:grid-cols-3">
													<div>
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Reviewer
														</p>
														<p className="mt-1">{review.name}</p>
													</div>

													<div>
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Rating
														</p>
														<p className="mt-1">
															{'rating' in review ? `${review.rating}/5` : '—'}
														</p>
													</div>

													<div>
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															ID
														</p>
														<p className="mt-1">{review.id}</p>
													</div>

													<div className="md:col-span-3">
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Review
														</p>
														<p className="mt-1">{review.text}</p>
													</div>
												</div>
											</td>
										</tr>
									)}
								</Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Reviews;
