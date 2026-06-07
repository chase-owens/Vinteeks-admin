import type { ImageAsset } from '../../../shared/types/Image';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getImages = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/images`);

	if (!response.ok) {
		throw new Error('Failed to fetch images');
	}

	const images: ImageAsset[] = await response.json();

	return images;
};

type CreateImageUploadUrlResponse = {
	key: string;
	uploadUrl: string;
};

export const createImageUploadUrl = async (
	fileName: string,
	contentType: string
): Promise<CreateImageUploadUrlResponse> => {
	const response = await fetch(`${API_BASE_URL}/images/upload-url`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fileName,
			contentType
		})
	});

	if (!response.ok) {
		throw new Error('Failed to create image upload URL');
	}

	return response.json();
};

export const uploadImage = async (file: File): Promise<string> => {
	const { key, uploadUrl } = await createImageUploadUrl(file.name, file.type);

	const uploadResponse = await fetch(uploadUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type
		},
		body: file
	});

	if (!uploadResponse.ok) {
		throw new Error('Failed to upload image');
	}

	return key;
};
