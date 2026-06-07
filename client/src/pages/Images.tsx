import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import type { ImageAsset } from '../../../shared/types/Image';
import { getImages, uploadImage } from '../api/images';

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL;

type ImageCardProps = {
	image: ImageAsset;
};

const ImageCard: FC<ImageCardProps> = ({ image }) => {
	const imageUrl = `${CONTENT_BASE_URL}/${image.key}`;

	return (
		<article className="overflow-hidden rounded-lg border border-(--accent) bg-card transition hover:bg-(--accent-bg)">
			<div className="bg-muted aspect-square overflow-hidden">
				<img
					src={imageUrl}
					alt={image.fileName}
					className="h-full w-full object-cover transition hover:scale-105"
					loading="lazy"
				/>
			</div>

			<div className="space-y-2 p-4">
				<p className="truncate text-sm font-semibold">{image.fileName}</p>
				<p className="mt-1 truncate text-xs text-muted-foreground">/{image.folder}</p>
			</div>
		</article>
	);
};

const Images: FC = () => {
	const [images, setImages] = useState<ImageAsset[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState('');

	const loadImages = async () => {
		const imageData = await getImages();
		setImages(imageData);
	};

	useEffect(() => {
		const init = async () => {
			try {
				await loadImages();
			} catch (error) {
				console.error(error);
				setError('Failed to load images.');
			} finally {
				setIsLoading(false);
			}
		};

		init();
	}, []);

	const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		try {
			setError('');
			setIsUploading(true);

			await uploadImage(file);
			await loadImages();

			event.target.value = '';
		} catch (error) {
			console.error(error);
			setError('Failed to upload image.');
		} finally {
			setIsUploading(false);
		}
	};

	if (isLoading) {
		return <p className="text-sm text-muted-foreground">Loading images...</p>;
	}

	return (
		<section className="space-y-4 p-6">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Images</h1>
					<p className="mt-1 text-sm text-muted-foreground">View uploaded content bucket images.</p>
				</div>

				<div>
					<input
						id="image-upload"
						type="file"
						accept="image/jpeg,image/png,image/webp"
						className="hidden"
						disabled={isUploading}
						onChange={handleUploadImage}
					/>

					<label
						htmlFor="image-upload"
						className="cursor-pointer rounded-lg border border-(--accent) bg-card px-4 py-2 text-sm font-medium transition hover:bg-(--accent-bg)"
					>
						{isUploading ? 'Uploading...' : 'Upload Image'}
					</label>
				</div>
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}

			{images.length === 0 ? (
				<div className="rounded-lg border border-(--accent) bg-card p-6">
					<p className="text-sm text-muted-foreground">No images found.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{images.map((image) => (
						<ImageCard key={image.key} image={image} />
					))}
				</div>
			)}
		</section>
	);
};

export default Images;
