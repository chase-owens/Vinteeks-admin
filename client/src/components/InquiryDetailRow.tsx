export function DetailRow({ label, value }: { label: string; value?: string }) {
	return (
		<div>
			<p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
			<p className="mt-1">{value || '—'}</p>
		</div>
	);
}
