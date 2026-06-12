import type { TreasureHuntItem } from '../../../shared/types/Treasure';

export const getTreasures = async () => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/treasures`);

	if (!res.ok) {
		throw new Error('Failed to fetch treasures');
	}

	return res.json();
};

export const updateTreasures = async (treasureHunt: TreasureHuntItem[]) => {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/treasures`, {
		method: 'PUT',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ treasureHunt })
	});
	console.log('🚀 ~ updateTreasures ~ response:', response);

	if (!response.ok) {
		throw new Error('Failed to update treasures');
	}

	return response.json();
};
