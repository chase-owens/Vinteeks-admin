import { useEffect, useState, type FC } from 'react';
import type {
	Product,
	Category,
	Room,
	ProductType,
	Status,
	Condition
} from '../../../shared/types/Product';
import type { ImageAsset } from '../../../shared/types/Image';
import { getImages } from '../api/images';

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL;

type Props = {
	product: Product;
	onChange: (product: Product) => void;
	onSubmit: () => void;
	submitLabel?: string;
};

const categories: Category[] = [
	'sofas',
	'chairs',
	'tables',
	'storage',
	'lighting',
	'rugs',
	'decor'
];
const rooms: Room[] = ['living-room', 'bedroom', 'dining-room', 'office', 'outdoor'];
const statuses: Status[] = ['available', 'sold', 'rented', 'reserved'];
const conditions: Condition[] = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
const productTypes: ProductType[] = ['chair', 'table', 'sofa', 'dresser', 'lamp', 'rug', 'decor'];

const fieldClass =
	'h-11 w-full rounded-md border border-(--accent-border) bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-(--accent)';

const labelClass = 'text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground';

const ProductForm: FC<Props> = ({ product, onChange, onSubmit, submitLabel = 'Save Product' }) => {
	const [images, setImages] = useState<ImageAsset[]>([]);
	const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

	useEffect(() => {
		const loadImages = async () => {
			const imageData = await getImages();
			setImages(imageData);
		};

		loadImages();
	}, []);

	const addImage = (imageKey: string) => {
		if (product.images.includes(imageKey)) return;

		update('images', [...product.images, imageKey]);
	};

	const removeImage = (imageKey: string) => {
		update(
			'images',
			product.images.filter((image) => image !== imageKey)
		);
	};

	const update = <K extends keyof Product>(key: K, value: Product[K]) => {
		onChange({ ...product, [key]: value });
	};

	return (
		<div className="space-y-6">
			<div className="rounded-lg border border-(--accent-border) p-6">
				<h2 className="mb-6 text-lg font-semibold">Product Details</h2>

				<div className="grid gap-5 md:grid-cols-2">
					<label className="space-y-2">
						<span className={labelClass}>Product Name</span>
						<input
							value={product.name}
							onChange={(e) => update('name', e.target.value)}
							placeholder="Hawthorne Linen Sofa"
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Price</span>
						<input
							type="number"
							value={product.price}
							onChange={(e) => update('price', Number(e.target.value))}
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Cost</span>
						<input
							type="number"
							value={product.cost ?? ''}
							onChange={(e) => update('cost', e.target.value ? Number(e.target.value) : undefined)}
							placeholder="Optional"
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Category</span>
						<select
							value={product.category}
							onChange={(e) => update('category', e.target.value as Category)}
							className={fieldClass}
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Room</span>
						<select
							value={product.room}
							onChange={(e) => update('room', e.target.value as Room)}
							className={fieldClass}
						>
							{rooms.map((room) => (
								<option key={room} value={room}>
									{room}
								</option>
							))}
						</select>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Product Type</span>
						<select
							value={product.type}
							onChange={(e) => update('type', e.target.value as ProductType)}
							className={fieldClass}
						>
							{productTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Status</span>
						<select
							value={product.status}
							onChange={(e) => update('status', e.target.value as Status)}
							className={fieldClass}
						>
							{statuses.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</label>

					<label className="space-y-2">
						<span className={labelClass}>Condition</span>
						<select
							value={product.condition ?? ''}
							onChange={(e) => update('condition', e.target.value as Condition)}
							className={fieldClass}
						>
							<option value="">Select condition</option>
							{conditions.map((condition) => (
								<option key={condition} value={condition}>
									{condition}
								</option>
							))}
						</select>
					</label>

					<label className="space-y-2 md:col-span-2">
						<span className={labelClass}>Material</span>
						<input
							value={product.material ?? ''}
							onChange={(e) => update('material', e.target.value)}
							placeholder="Oak, linen, brass, wool..."
							className={fieldClass}
						/>
					</label>

					<label className="space-y-2 md:col-span-2">
						<span className={labelClass}>Description</span>
						<textarea
							value={product.description}
							onChange={(e) => update('description', e.target.value)}
							rows={5}
							placeholder="Add product details, measurements, condition notes..."
							className={fieldClass}
						/>
					</label>

					<div className="space-y-3 md:col-span-2">
						<div className="flex items-center justify-between gap-4">
							<span className={labelClass}>Images</span>

							<button
								type="button"
								onClick={() => setIsImagePickerOpen(true)}
								className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-3 py-2 text-xs font-medium text-(--accent)"
							>
								Choose Images
							</button>
						</div>

						{product.images.length === 0 ? (
							<p className="rounded-md border border-(--accent-border) p-4 text-sm text-muted-foreground">
								No images selected.
							</p>
						) : (
							<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
								{product.images.map((imageKey) => (
									<div
										key={imageKey}
										className="overflow-hidden rounded-md border border-(--accent-border)"
									>
										<img
											src={`${CONTENT_BASE_URL}/${imageKey}`}
											alt={imageKey}
											className="h-32 w-full object-cover"
										/>

										<div className="space-y-2 p-2">
											<p className="truncate text-xs text-muted-foreground">{imageKey}</p>

											<button
												type="button"
												onClick={() => removeImage(imageKey)}
												className="text-xs text-red-500"
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}

						{isImagePickerOpen && (
							<div className="fixed inset-0 z-50 bg-black/70 p-6">
								<div className="mx-auto max-h-[90vh] max-w-6xl overflow-y-auto rounded-lg border border-(--accent-border) bg-background p-6">
									<div className="mb-5 flex items-center justify-between gap-4">
										<div>
											<h2 className="text-lg font-semibold">Choose Images</h2>
											<p className="text-sm text-muted-foreground">
												Select images to add to this product.
											</p>
										</div>

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
											const isSelected = product.images.includes(image.key);

											return (
												<button
													key={image.key}
													type="button"
													onClick={() => addImage(image.key)}
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

				<div className="mt-6 flex flex-wrap gap-4 border-t border-(--accent-border) pt-5">
					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={product.isFeatured ?? false}
							onChange={(e) => update('isFeatured', e.target.checked)}
						/>
						Featured
					</label>

					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={product.isSale ?? false}
							onChange={(e) => update('isSale', e.target.checked)}
						/>
						On Sale
					</label>

					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={product.canRent ?? false}
							onChange={(e) => update('canRent', e.target.checked)}
						/>
						Can Rent
					</label>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="button"
					onClick={onSubmit}
					className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-5 py-2.5 text-sm font-medium text-(--accent)"
				>
					{submitLabel}
				</button>
			</div>
		</div>
	);
};

export default ProductForm;
