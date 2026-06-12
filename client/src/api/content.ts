import type { RootContent } from '../../../shared/types/Content';

export const getRootContent = async (): Promise<RootContent> => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/content`);

	if (!response.ok) {
		throw new Error('Failed to fetch root content');
	}

	return response.json();
};

export const updateRootContent = async (rootContent: RootContent): Promise<RootContent> => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/content`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(rootContent)
	});

	if (!response.ok) {
		throw new Error('Failed to update root content');
	}

	return response.json();
};
