import { useEffect, useState, type FC } from 'react';
import type { Inquiry, InquiryStatus } from '../../../shared/types/Inquiry';
import { useParams } from 'react-router-dom';
import getInquiries from '../api/inquiries';
import { DetailRow } from '../components/InquiryDetailRow';
import { updateInquiry } from '../api/updateInquiry';

type StatusOption = {
	label: string;
	value: InquiryStatus;
};

const statusOptions: StatusOption[] = [
	{ label: 'New', value: 'new' },
	{ label: 'Reviewing', value: 'reviewing' },
	{ label: 'Quoted', value: 'quoted' },
	{ label: 'Completed', value: 'completed' }
];

const InquiryDetails: FC = () => {
	const { id } = useParams();

	const [inquiry, setInquiry] = useState<Inquiry | undefined>(undefined);

	useEffect(() => {
		const getInquiry = async () => {
			const inquiriesData = (await getInquiries()) as Inquiry[];
			const inquiryData = inquiriesData.find(({ inquiryId }) => id === inquiryId);

			if (inquiryData) {
				setInquiry(inquiryData);
			}
		};

		getInquiry();
	}, [id]);

	if (!inquiry) {
		return <div>error no inquiry found</div>;
	}

	return (
		<section className="space-y-6 p-6">
			<div>
				<a href="/inquiries" className="text-sm text-(--accent)">
					← Back to inquiries
				</a>

				<h1 className="mt-4 text-2xl font-semibold">{inquiry?.name || 'Inquiry'}</h1>

				<p className="text-sm text-muted-foreground">
					Submitted{' '}
					{new Date(inquiry.createdAt).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})}
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
				<div className="space-y-4 rounded-lg border border-(--accent-border) p-5">
					<h2 className="text-lg font-medium">Request details</h2>

					<DetailRow label="Message" value={inquiry.message || '—'} />
					<DetailRow label="Budget" value={inquiry.budget || '—'} />
					<DetailRow label="Area" value={inquiry.generalArea || '—'} />
					<DetailRow label="Room" value={inquiry.roomId || '—'} />
					<DetailRow label="Category" value={inquiry.categoryId || '—'} />
					<DetailRow label="Product" value={inquiry.productId || '—'} />
				</div>

				<aside className="space-y-4 rounded-lg border border-(--accent-border) p-5">
					<h2 className="text-lg font-medium">Contact</h2>

					<DetailRow label="Name" value={inquiry.name} />
					<DetailRow label="Email" value={inquiry.email || '—'} />
					<DetailRow label="Phone" value={inquiry.phone || '—'} />
					<DetailRow label="Preferred" value={inquiry.preferredContact} />

					<div className="pt-2">
						<label className="mb-2 block text-sm text-muted-foreground">Status</label>

						<select
							value={inquiry.status ?? 'new'}
							className="w-full rounded-md border border-(--accent-border) bg-transparent px-3 py-2"
							onChange={async (e) => {
								const status = e.target.value as InquiryStatus;

								await updateInquiry(inquiry.id, status);

								setInquiry({ ...inquiry, status });
							}}
						>
							{statusOptions.map(({ label, value }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>
				</aside>
			</div>

			<div className="rounded-lg border border-(--accent-border) p-5">
				<h2 className="mb-4 text-lg font-medium">Photos</h2>

				{inquiry.imageKeys?.length ? (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{inquiry.imageKeys.map((imageKey) => (
							<img
								key={imageKey}
								src={`${import.meta.env.VITE_CONTENT_BASE_URL}/${imageKey}`}
								alt={inquiry.name}
								className="aspect-square w-full rounded-md border border-(--border) object-cover"
							/>
						))}
					</div>
				) : (
					<p className="text-sm text-muted-foreground">No photos uploaded.</p>
				)}
			</div>
		</section>
	);
};

export default InquiryDetails;
