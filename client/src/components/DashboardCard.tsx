import type { FC } from 'react';

type DashboardCardProps = {
	count: number;
	description: string;
	href: string;
	title: string;
};
const DashboardCard: FC<DashboardCardProps> = ({ count, description, href, title }) => (
	<a
		href={href}
		className="rounded-lg border border-(--accent) bg-card p-5 transition hover:bg-(--accent-bg)"
	>
		<p className="text-sm text-muted-foreground">{title}</p>
		<p className="mt-3 text-3xl font-semibold">{count}</p>
		<p className="mt-2 text-sm text-muted-foreground">{description}</p>
	</a>
);

export default DashboardCard;
