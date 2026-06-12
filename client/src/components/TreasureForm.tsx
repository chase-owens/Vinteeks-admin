import { useEffect, useState, type FC } from 'react';
import type { ImageAsset } from '../../../shared/types/Image';
import type { TreasureHuntItem } from '../../../shared/types/Treasure';
import { getImages } from '../api/images';

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL;

type Props = {
	treasure: TreasureHuntItem;
	submitLabel?: string;
	isSubmitDisabled?: boolean;
	onChange: (treasure: TreasureHuntItem) => void;
	onSubmit: () => void;
	onCancel?: () => void;
};

const fieldClass =
	'h-11 w-full rounded-md border border-(--accent-border) bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-(--accent)';

const labelClass = 'text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground';

const TreasureForm: FC<Props> = ({
	treasure,
	onChange,
	onSubmit,
	onCancel,
	isSubmitDisabled,
	submitLabel = 'Save Treasure'
}) => {
	const [images, setImages] = useState<ImageAsset[]>([]);
	const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

	useEffect(() => {
		getImages().then(setImages);
	}, []);

	const update = <K extends keyof TreasureHuntItem>(key: K, value: TreasureHuntItem[K]) => {
		onChange({ ...treasure, [key]: value });
	};

	const tagsValue = Array.isArray(treasure.tags) ? treasure.tags.join(', ') : '';

	return (
		<div className="space-y-6">
			<div className="rounded-lg border border-(--accent-border) p-6">
				<h2 className="mb-6 text-lg font-semibold">Treasure Details</h2>

				<div className="grid gap-5 md:grid-cols-2">
					<label className="space-y-2">
						<span className={labelClass}>Title</span>
						<input
							value={treasure.title}
							onChange={(e) => update('title', e.target.value)}
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Category</span>
						<input
							value={treasure.category ?? ''}
							onChange={(e) => update('category', e.target.value)}
							placeholder="sofas, decor, collectibles..."
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Room</span>
						<input
							value={treasure.room ?? ''}
							onChange={(e) => update('room', e.target.value)}
							placeholder="living-room, bedroom..."
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Tags</span>
						<input
							value={tagsValue}
							onChange={(e) =>
								update(
									'tags',
									e.target.value
										.split(',')
										.map((tag) => tag.trim())
										.filter(Boolean)
								)
							}
							placeholder="vintage, statement piece, color"
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2 md:col-span-2">
						<span className={labelClass}>Description</span>
						<textarea
							value={treasure.description}
							onChange={(e) => update('description', e.target.value)}
							rows={4}
							className={fieldClass}
						/>
					</label>

					<div className="space-y-3 md:col-span-2">
						<div className="flex items-center justify-between gap-4">
							<span className={labelClass}>Image</span>

							<button
								type="button"
								onClick={() => setIsImagePickerOpen(true)}
								className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-3 py-2 text-xs font-medium text-(--accent)"
							>
								Choose Image
							</button>
						</div>

						{treasure.image ? (
							<div className="w-48 overflow-hidden rounded-md border border-(--accent-border)">
								<img
									src={`${CONTENT_BASE_URL}/${treasure.image}`}
									alt={treasure.title}
									className="h-36 w-full object-cover"
								/>

								<div className="space-y-2 p-2">
									<p className="truncate text-xs text-muted-foreground">{treasure.image}</p>

									<button
										type="button"
										onClick={() => update('image', '')}
										className="text-xs text-red-500"
									>
										Remove
									</button>
								</div>
							</div>
						) : (
							<p className="rounded-md border border-(--accent-border) p-4 text-sm text-muted-foreground">
								No image selected.
							</p>
						)}

						{isImagePickerOpen && (
							<div className="fixed inset-0 z-50 bg-black/70 p-6">
								<div className="mx-auto max-h-[90vh] max-w-6xl overflow-y-auto rounded-lg border border-(--accent-border) bg-background p-6">
									<div className="mb-5 flex items-center justify-between gap-4">
										<h2 className="text-lg font-semibold">Choose Image</h2>

										<button
											type="button"
											onClick={() => setIsImagePickerOpen(false)}
											className="rounded-md border border-(--accent-border) px-3 py-2 text-sm"
										>
											Close
										</button>
									</div>

									<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
										{images.map((image) => {
											const isSelected = treasure.image === image.key;

											return (
												<button
													key={image.key}
													type="button"
													onClick={() => {
														update('image', image.key);
														setIsImagePickerOpen(false);
													}}
													className={`overflow-hidden rounded-lg border text-left transition ${
														isSelected
															? 'border-(--accent) bg-(--accent-bg)'
															: 'border-(--accent-border) hover:border-(--accent)'
													}`}
												>
													<img
														src={`${CONTENT_BASE_URL}/${image.key}`}
														alt={image.fileName}
														className="h-40 w-full object-cover"
													/>

													<div className="p-3">
														<p className="truncate text-sm font-medium">{image.fileName}</p>
														<p className="truncate text-xs text-muted-foreground">
															{isSelected ? 'Selected' : image.key}
														</p>
													</div>
												</button>
											);
										})}
									</div>
								</div>
							</div>
						)}
					</div>
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

export default TreasureForm;
