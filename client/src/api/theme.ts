import type { ThemeId } from '../../../shared/types/Theme';

type ThemeData = {
	activeTheme: ThemeId;
};

export const getTheme = async (): Promise<ThemeData> => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/theme`);

	if (!response.ok) {
		throw new Error('Failed to fetch theme');
	}

	return response.json();
};

export const updateTheme = async (theme: ThemeData): Promise<ThemeData> => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/theme`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(theme)
	});

	if (!response.ok) {
		throw new Error('Failed to update theme');
	}

	return response.json();
};
