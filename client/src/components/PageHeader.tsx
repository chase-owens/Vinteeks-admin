import type { FC } from 'react';

type PageHeaderProps = {
	actionLabel?: string;
	description: string;
	isActionDisabled?: boolean;
	onAction?: () => void;
	title: string;
};

const PageHeader: FC<PageHeaderProps> = ({
	actionLabel,
	description,
	isActionDisabled = false,
	onAction,
	title
}) => (
	<div className="flex items-start justify-between gap-4">
		<div>
			<h1 className="text-2xl font-semibold">{title}</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>

		{actionLabel && onAction && (
			<button
				type="button"
				disabled={isActionDisabled}
				onClick={onAction}
				className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-sm font-medium text-(--accent) transition-colors hover:bg-(--accent-bg)/80"
			>
				{actionLabel}
			</button>
		)}
	</div>
);

export default PageHeader;
