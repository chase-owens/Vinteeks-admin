import type { FC } from 'react';
import type { Review } from '../../../shared/types/Review';

type Props = {
	review: Review;
	submitLabel?: string;
	isSubmitDisabled?: boolean;
	onChange: (review: Review) => void;
	onSubmit: () => void;
	onCancel?: () => void;
};

const fieldClass =
	'h-11 w-full rounded-md border border-(--accent-border) bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-(--accent)';

const labelClass = 'text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground';

const ReviewForm: FC<Props> = ({
	review,
	onChange,
	onSubmit,
	onCancel,
	isSubmitDisabled,
	submitLabel = 'Save Review'
}) => {
	const update = <K extends keyof Review>(key: K, value: Review[K]) => {
		onChange({ ...review, [key]: value });
	};

	return (
		<div className="space-y-6">
			<div className="rounded-lg border border-(--accent-border) p-6">
				<h2 className="mb-6 text-lg font-semibold">Review Details</h2>

				<div className="grid gap-5 md:grid-cols-2">
					<label className="space-y-2">
						<span className={labelClass}>Reviewer Name</span>
						<input
							value={review.name}
							onChange={(e) => update('name', e.target.value)}
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Rating</span>
						<select
							value={review.rating ?? 5}
							onChange={(e) => update('rating', Number(e.target.value))}
							className={fieldClass}
						>
							<option value={5}>5</option>
							<option value={4}>4</option>
							<option value={3}>3</option>
							<option value={2}>2</option>
							<option value={1}>1</option>
						</select>
					</label>

					<label className="space-y-2 md:col-span-2">
						<span className={labelClass}>Review Text</span>
						<textarea
							value={review.text}
							onChange={(e) => update('text', e.target.value)}
							rows={6}
							className={fieldClass}
						/>
					</label>
				</div>
			</div>

			<div className="flex justify-end gap-4">
				<button
					type="button"
					onClick={onSubmit}
					disabled={isSubmitDisabled}
					className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-5 py-2.5 text-sm font-medium text-(--accent)"
				>
					{submitLabel}
				</button>

				<button
					type="button"
					onClick={onCancel}
					className="rounded-md border border-(--accent-border) px-5 py-2.5 text-sm font-medium text-(--accent)"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default ReviewForm;
