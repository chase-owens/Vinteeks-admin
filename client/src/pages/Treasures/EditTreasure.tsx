import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TreasureForm from '../../components/TreasureForm';
import { updateTreasures } from '../../api/treasures';
import { useTreasures } from '../../hooks/useTreasures';

import type { TreasureHuntItem } from '../../../../shared/types/Treasure';

const EditTreasure = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { treasures } = useTreasures();

	const treasureToUpdate = treasures.find((treasure) => treasure.id === id);

	const [editedTreasure, setEditedTreasure] = useState<TreasureHuntItem | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const treasure = editedTreasure ?? treasureToUpdate;

	const handleSave = async () => {
		if (!treasure) return;

		setIsSubmitting(true);

		const updatedTreasures = treasures.map((item) => (item.id === treasure.id ? treasure : item));

		await updateTreasures(updatedTreasures);

		navigate('/treasures');
	};

	if (!treasure) {
		return <p className="text-sm text-muted-foreground">Loading treasure...</p>;
	}

	return (
		<section className="space-y-4 p-6">
			<div>
				<h1 className="text-2xl font-semibold">Edit Treasure</h1>

				<p className="text-sm text-muted-foreground">
					Update a treasure hunt find shown on the consumer site.
				</p>
			</div>

			<TreasureForm
				treasure={treasure}
				onChange={setEditedTreasure}
				onSubmit={handleSave}
				onCancel={() => navigate('/treasures')}
				isSubmitDisabled={isSubmitting}
				submitLabel={isSubmitting ? 'Submitting...' : 'Save Changes'}
			/>
		</section>
	);
};

export default EditTreasure;
