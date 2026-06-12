import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TreasureForm from '../../components/TreasureForm';
import { updateTreasures } from '../../api/treasures';
import { useTreasures } from '../../hooks/useTreasures';

import type { TreasureHuntItem } from '../../../../shared/types/Treasure';

const createTreasure = (): TreasureHuntItem => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	image: '',
	category: '',
	room: '',
	tags: [],
	foundFor: '',
	highlight: ''
});

const NewTreasure = () => {
	const navigate = useNavigate();

	const [treasure, setTreasure] = useState<TreasureHuntItem>(createTreasure());
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { treasures } = useTreasures();

	const handleSave = async () => {
		setIsSubmitting(true);

		await updateTreasures([...treasures, treasure]);

		navigate('/treasures');
	};

	return (
		<section className="space-y-4 p-6">
			<div>
				<h1 className="text-2xl font-semibold">New Treasure</h1>

				<p className="text-sm text-muted-foreground">
					Add a treasure hunt find to show on the consumer site.
				</p>
			</div>

			<TreasureForm
				treasure={treasure}
				onChange={setTreasure}
				onSubmit={handleSave}
				onCancel={() => navigate('/treasures')}
				isSubmitDisabled={isSubmitting}
				submitLabel={isSubmitting ? 'Submitting...' : 'Add Treasure'}
			/>
		</section>
	);
};

export default NewTreasure;
