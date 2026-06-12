import { useEffect, useState, type FC } from 'react';
import type { Inquiry } from '../../../../shared/types/Inquiry';
import { getInquiries } from '../../api/inquiries';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const getTime = (date?: string) => {
	const time = new Date(date || '').getTime();
	return Number.isNaN(time) ? 0 : time;
};

const Inquiries: FC = () => {
	const navigate = useNavigate();
	const [inquiries, setInquiries] = useState<Inquiry[]>([]);

	useEffect(() => {
		const loadInquiries = async () => {
			const inquriesData = (await getInquiries()) as Inquiry[];
			const sortedInquiries = inquriesData
				.sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt)) // newest first - should be able to fix at lamda dynamodb level
				.filter(({ inquiryId }) => !!inquiryId); // remove old corrupted inquiries
			setInquiries(sortedInquiries);
		};

		loadInquiries();
	}, []);

	return (
		<section className="space-y-4 p-6">
			<PageHeader description="Review customer requests and uploaded images." title="Inquiries" />

			<div className="overflow-hidden rounded-lg border border-(--accent-border)">
				<table className="w-full border-collapse text-left text-sm">
					<thead className="bg-(--accent-bg)">
						<tr>
							<th className="px-4 py-3 font-medium">Status</th>
							<th className="px-4 py-3 font-medium">Name</th>
							<th className="px-4 py-3 font-medium">Contact</th>
							<th className="px-4 py-3 font-medium">Preferred</th>
							<th className="px-4 py-3 font-medium">Area</th>
							<th className="px-4 py-3 font-medium">Photos</th>
							<th className="px-4 py-3 font-medium">Created</th>
						</tr>
					</thead>

					<tbody>
						{inquiries.map((inquiry) => {
							const isNew = !inquiry.status || inquiry.status === 'new';

							return (
								<tr
									onClick={() => navigate(`/inquiries/${inquiry.inquiryId}`)}
									key={inquiry.id}
									className={`
						border-t border-(--border)
						transition-colors
						cursor-pointer
						hover:bg-(--accent-bg)
						${isNew ? 'bg-[rgba(170,59,255,0.05)]' : ''}
					`}
								>
									<td className="px-4 py-3">
										<span
											className={`
								rounded-full px-2 py-1 text-xs font-medium
								${isNew ? 'bg-(--accent-bg) text-(--accent)' : 'bg-black/10'}
							`}
										>
											{inquiry.status ?? 'new'}
										</span>
									</td>

									<td className="px-4 py-3 font-medium">{inquiry.name}</td>

									<td className="px-4 py-3 text-muted-foreground">
										{inquiry.email || inquiry.phone || '—'}
									</td>

									<td className="px-4 py-3 text-muted-foreground capitalize">
										{inquiry.preferredContact}
									</td>

									<td className="px-4 py-3 text-muted-foreground">{inquiry.generalArea || '—'}</td>

									<td className="px-4 py-3 text-muted-foreground">
										{inquiry.imageKeys?.length ?? 0}
									</td>

									<td className="px-4 py-3 text-muted-foreground">
										{new Date(inquiry.createdAt).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric'
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Inquiries;
