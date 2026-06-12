import { Fragment, useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TreasureHuntItem } from '../../../../shared/types/Treasure';
import { getTreasures, updateTreasures } from '../../api/treasures';

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL;

const Treasures: FC = () => {
	const navigate = useNavigate();
	const [treasures, setTreasures] = useState<TreasureHuntItem[]>([]);
	const [expandedTreasureId, setExpandedTreasureId] = useState<string | null>(null);

	const toggleExpandedTreasure = (treasureId: string) => {
		setExpandedTreasureId((current) => (current === treasureId ? null : treasureId));
	};

	useEffect(() => {
		const loadTreasures = async () => {
			const treasureData = await getTreasures();
			setTreasures(treasureData.treasureHunt);
		};

		loadTreasures();
	}, []);

	const handleDelete = async (id: string) => {
		const confirmed = window.confirm('Delete this treasure?');
		if (!confirmed) return;

		try {
			const updatedTreasures = treasures.filter((treasure) => treasure.id !== id);
			const res = await updateTreasures(updatedTreasures);
			setTreasures(res.treasureHunt);
		} catch (error) {
			console.error(error);
			window.alert('Failed to delete treasure.');
		}
	};

	return (
		<section className="space-y-4 p-6">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Treasures</h1>
					<p className="text-sm text-muted-foreground">Manage treasure hunt finds.</p>
				</div>

				<button
					type="button"
					onClick={() => navigate('/treasures/new')}
					className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-sm font-medium text-(--accent) transition-colors hover:bg-(--accent-bg)/80"
				>
					Add Treasure
				</button>
			</div>

			<div className="overflow-hidden rounded-lg border border-(--accent-border)">
				<table className="w-full border-collapse text-left text-sm">
					<thead className="bg-(--accent-bg)">
						<tr>
							<th className="px-4 py-3 font-medium">Treasure</th>
							<th className="px-4 py-3 font-medium">Category</th>
							<th className="px-4 py-3 font-medium">Room</th>
							<th className="px-4 py-3 text-right font-medium">Actions</th>
						</tr>
					</thead>

					<tbody>
						{treasures.map((treasure) => {
							const isExpanded = expandedTreasureId === treasure.id;

							return (
								<Fragment key={treasure.id}>
									<tr
										onClick={() => toggleExpandedTreasure(treasure.id)}
										className="cursor-pointer border-t border-(--border) transition-colors hover:bg-(--accent-bg)"
									>
										<td className="px-4 py-3">
											<p className="font-medium">{treasure.title}</p>
											<p className="text-xs text-muted-foreground">{treasure.id}</p>
										</td>

										<td className="px-4 py-3 text-muted-foreground">
											{'category' in treasure ? treasure.category : '—'}
										</td>

										<td className="px-4 py-3 text-muted-foreground">
											{'room' in treasure ? treasure.room : '—'}
										</td>

										<td className="px-4 py-3">
											<div className="flex justify-end gap-2">
												<button
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														navigate(`/treasures/${treasure.id}`);
													}}
													className="rounded-md px-3 py-1.5 text-xs font-medium text-(--accent) transition-colors hover:bg-(--accent-bg)"
												>
													Edit
												</button>

												<button
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														handleDelete(treasure.id);
													}}
													className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-300"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>

									{isExpanded && (
										<tr className="border-t border-(--border) bg-black/10">
											<td colSpan={5} className="px-4 py-5">
												<div className="grid gap-4 text-sm md:grid-cols-3">
													<div className="flex gap-5 ">
														<p className="mb-3 text-xs tracking-[0.3em] text-muted-foreground uppercase">
															Image
														</p>

														{'image' in treasure && treasure.image ? (
															<img
																src={`${CONTENT_BASE_URL}/${treasure.image}`}
																alt={treasure.title}
																className="h-24 w-24 rounded-md border border-(--accent) object-cover"
															/>
														) : (
															<p className="text-sm text-muted-foreground">No image added.</p>
														)}
													</div>

													<div className="flex gap-5">
														<p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
															Description
														</p>
														<p className="mt-1">{treasure.description || 'No description'}</p>
													</div>
												</div>
											</td>
										</tr>
									)}
								</Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Treasures;
