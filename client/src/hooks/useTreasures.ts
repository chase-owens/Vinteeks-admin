import { useEffect, useState } from 'react';
import { getTreasures } from '../api/treasures';
import type { TreasureHuntItem } from '../../../shared/types/Treasure';

export const useTreasures = () => {
	const [treasures, setTreasures] = useState<TreasureHuntItem[]>([]);
	console.log('🚀 ~ useTreasures ~ treasures:', treasures);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadTreasures = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const treasuresData = await getTreasures();
				setTreasures(treasuresData.treasureHunt);
			} catch {
				setError('Failed to load treasures.');
			} finally {
				setIsLoading(false);
			}
		};
		loadTreasures();
	}, []);

	return {
		treasures,
		setTreasures,
		isLoading,
		error
	};
};
