import { useEffect, useState, type FC } from 'react';
import { getRootContent, updateRootContent } from '../../api/content';
import type { Cta, RootContent } from '../../../../shared/types/Content';
import PageHeader from '../../components/PageHeader';
import { themes, type ThemeId } from '../../../../shared/types/Theme';
import type { ImageAsset } from '../../../../shared/types/Image';
import { getImages } from '../../api/images';
import { getTheme, updateTheme } from '../../api/theme';

const CONTENT_BASE_URL = import.meta.env.VITE_CONTENT_BASE_URL;

const fieldClass =
	'h-11 w-full rounded-md border border-(--accent-border) bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-(--accent)';

const textareaClass =
	'w-full rounded-md border border-(--accent-border) bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-(--accent)';

const labelClass = 'text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground';

const emptyCta: Cta = {
	title: '',
	href: '',
	type: 'default',
	variant: 'primary'
};

const SiteContent: FC = () => {
	const [rootContent, setRootContent] = useState<RootContent | null>(null);
	const [modulesText, setModulesText] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState('');
	const [selectedTheme, setSelectedTheme] = useState<ThemeId>('navy-red');
	const [images, setImages] = useState<ImageAsset[]>([]);
	const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

	useEffect(() => {
		const loadRootContent = async () => {
			try {
				const [content, imageData, themeData] = await Promise.all([
					getRootContent(),
					getImages(),
					getTheme()
				]);

				setRootContent(content);
				setModulesText(JSON.stringify(content.modules ?? [], null, 2));
				setImages(imageData);
				setSelectedTheme(themeData.activeTheme);
			} catch (error) {
				console.error(error);
				setError('Failed to load site content.');
			} finally {
				setIsLoading(false);
			}
		};

		loadRootContent();
	}, []);

	const updateHero = <K extends keyof RootContent['hero']>(
		key: K,
		value: RootContent['hero'][K]
	) => {
		setRootContent((current) => {
			if (!current) return current;

			return {
				...current,
				hero: {
					...current.hero,
					[key]: value
				}
			};
		});
	};

	const updateCta = <K extends keyof Cta>(index: number, key: K, value: Cta[K]) => {
		setRootContent((current) => {
			if (!current) return current;

			const ctas = [...(current.hero.ctas ?? [])];

			ctas[index] = {
				...(ctas[index] ?? emptyCta),
				[key]: value
			};

			return {
				...current,
				hero: {
					...current.hero,
					ctas
				}
			};
		});
	};

	const handleSave = async () => {
		if (!rootContent) return;

		setError('');
		setIsSaving(true);

		try {
			const modules = JSON.parse(modulesText);

			if (!Array.isArray(modules)) {
				setError('Modules must be a JSON array.');
				return;
			}

			const nextContent: RootContent = {
				...rootContent,
				modules
			};

			const [savedContent, savedTheme] = await Promise.all([
				updateRootContent(nextContent),
				updateTheme({ activeTheme: selectedTheme })
			]);

			setRootContent(savedContent);
			setSelectedTheme(savedTheme.activeTheme);
			setModulesText(JSON.stringify(savedContent.modules ?? [], null, 2));
		} catch (error) {
			console.error(error);
			setError('Failed to save site content. Check that modules is valid JSON.');
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="text-sm text-muted-foreground space-y-4 p-6">Loading site content...</div>
		);
	}

	if (!rootContent) {
		return <div className="text-sm text-red-600">{error || 'No site content found.'}</div>;
	}

	const primaryCta = rootContent.hero.ctas?.[0] ?? emptyCta;
	const secondaryCta = rootContent.hero.ctas?.[1] ?? { ...emptyCta, variant: 'secondary' };

	return (
		<div className="space-y-4 p-6">
			<PageHeader
				actionLabel={isSaving ? 'Saving...' : 'Save Changes'}
				description="Update the homepage copy, calls to action, and active customer-web theme."
				isActionDisabled={isSaving}
				onAction={handleSave}
				title="Site Content"
			/>

			{error && (
				<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			)}

			<div className="grid gap-6 lg:grid-cols-[1fr_360px]">
				<div className="space-y-6">
					<section className="rounded-lg border border-(--accent-border) p-6">
						<h2 className="mb-6 text-lg font-semibold">Homepage Hero</h2>

						<div className="grid gap-5 md:grid-cols-2">
							<label className="space-y-2 md:col-span-2">
								<span className={labelClass}>Title</span>
								<input
									value={rootContent.hero.title}
									onChange={(e) => updateHero('title', e.target.value)}
									className={fieldClass}
								/>
							</label>

							<label className="space-y-2 md:col-span-2">
								<span className={labelClass}>Subtitle</span>
								<input
									value={rootContent.hero.subTitle}
									onChange={(e) => updateHero('subTitle', e.target.value)}
									className={fieldClass}
								/>
							</label>

							<label className="space-y-2 md:col-span-2">
								<span className={labelClass}>Description</span>
								<textarea
									value={rootContent.hero.description}
									onChange={(e) => updateHero('description', e.target.value)}
									rows={4}
									className={textareaClass}
								/>
							</label>

							<div className="space-y-3 md:col-span-2">
								<div className="flex items-center justify-between gap-4">
									<span className={labelClass}>Hero Image</span>

									<button
										type="button"
										onClick={() => setIsImagePickerOpen(true)}
										className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-3 py-2 text-xs font-medium text-(--accent)"
									>
										Choose Image
									</button>
								</div>

								{rootContent.hero.image ? (
									<div className="overflow-hidden rounded-md border border-(--accent-border)">
										<img
											src={`${CONTENT_BASE_URL}${rootContent.hero.image}`}
											alt={rootContent.hero.title}
											className="h-150 w-full object-cover"
										/>

										<div className="flex items-center justify-between gap-3 p-3">
											<p className="truncate text-xs text-muted-foreground">
												{rootContent.hero.image}
											</p>
										</div>
									</div>
								) : (
									<p className="rounded-md border border-(--accent-border) p-4 text-sm text-muted-foreground">
										No hero image selected.
									</p>
								)}
							</div>
						</div>
					</section>

					<section className="rounded-lg border border-(--accent-border) p-6">
						<h2 className="mb-6 text-lg font-semibold">Hero Buttons</h2>

						<div className="grid gap-5 md:grid-cols-2">
							<label className="space-y-2">
								<span className={labelClass}>Primary Label</span>
								<input
									value={primaryCta.title}
									onChange={(e) => updateCta(0, 'title', e.target.value)}
									className={fieldClass}
								/>
							</label>

							<label className="space-y-2">
								<span className={labelClass}>Primary Link</span>
								<input
									value={primaryCta.href}
									onChange={(e) => updateCta(0, 'href', e.target.value)}
									className={fieldClass}
								/>
							</label>

							<label className="space-y-2">
								<span className={labelClass}>Secondary Label</span>
								<input
									value={secondaryCta.title}
									onChange={(e) => updateCta(1, 'title', e.target.value)}
									className={fieldClass}
								/>
							</label>

							<label className="space-y-2">
								<span className={labelClass}>Secondary Link</span>
								<input
									value={secondaryCta.href}
									onChange={(e) => updateCta(1, 'href', e.target.value)}
									className={fieldClass}
								/>
							</label>
						</div>
					</section>

					<section className="rounded-lg border border-(--accent-border) p-6">
						<h2 className="mb-2 text-lg font-semibold">Homepage Modules</h2>
						<p className="mb-5 text-sm text-muted-foreground">
							For now, edit the module JSON directly. This must stay as an array.
						</p>

						<textarea
							value={modulesText}
							onChange={(e) => setModulesText(e.target.value)}
							rows={18}
							className={`${textareaClass} font-mono text-xs`}
						/>
					</section>
				</div>

				<aside className="space-y-6">
					<section className="rounded-lg border border-(--accent-border) p-6">
						<h2 className="mb-2 text-lg font-semibold">Theme</h2>
						<p className="mb-5 text-sm text-muted-foreground">
							Choose the active theme for the customer website. This is preview-only until
							theme.json is wired.
						</p>

						<label className="space-y-2">
							<span className={labelClass}>Active Theme</span>
							<select
								value={selectedTheme}
								onChange={(e) => setSelectedTheme(e.target.value as ThemeId)}
								className={fieldClass}
							>
								{Object.values(themes).map((theme) => (
									<option key={theme.id} value={theme.id}>
										{theme.name}
									</option>
								))}
							</select>
						</label>

						<div className="mt-5 grid grid-cols-5 gap-2">
							{Object.entries(themes[selectedTheme].colors).map(([name, color]) => (
								<div key={name} className="space-y-1">
									<div
										className="h-9 rounded-md border border-(--accent-border)"
										style={{ backgroundColor: color }}
									/>
									<p className="truncate text-[10px] text-muted-foreground">{name}</p>
								</div>
							))}
						</div>
					</section>
					<section className="rounded-lg border border-(--accent-border) bg-card p-6">
						<p className="text-sm text-muted-foreground">Preview</p>

						<div className="mt-4 rounded-lg border border-(--accent-border) p-5">
							<p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
								{rootContent.hero.subTitle}
							</p>

							<h3 className="mt-3 text-xl font-semibold">{rootContent.hero.title}</h3>

							<p className="mt-3 text-sm text-muted-foreground">{rootContent.hero.description}</p>

							<div className="mt-5 flex flex-wrap gap-3">
								{rootContent.hero.ctas?.map((cta) => (
									<span
										key={`${cta.title}-${cta.href}`}
										className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-3 py-2 text-xs font-medium text-(--accent)"
									>
										{cta.title}
									</span>
								))}
							</div>
						</div>
					</section>

					<section className="rounded-lg border border-(--accent-border) p-6">
						<h2 className="mb-2 text-lg font-semibold">Content Status</h2>
						<p className="text-sm text-muted-foreground">
							{rootContent.modules.length} homepage modules loaded.
						</p>
					</section>
				</aside>
			</div>
			{isImagePickerOpen && (
				<div className="fixed inset-0 z-50 bg-black/70 p-6">
					<div className="mx-auto max-h-[90vh] max-w-6xl overflow-y-auto rounded-lg border border-(--accent-border) bg-background p-6">
						<div className="mb-5 flex items-center justify-between gap-4">
							<div>
								<h2 className="text-lg font-semibold">Choose Hero Image</h2>
								<p className="text-sm text-muted-foreground">
									Select the image to use on the homepage hero.
								</p>
							</div>

							<button
								type="button"
								onClick={() => setIsImagePickerOpen(false)}
								className="rounded-md border border-(--accent-border) px-3 py-2 text-sm"
							>
								Close
							</button>
						</div>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
							{images.map((image) => {
								const isSelected = rootContent.hero.image === image.key;

								return (
									<button
										key={image.key}
										type="button"
										onClick={() => {
											updateHero('image', image.key);
											setIsImagePickerOpen(false);
										}}
										className={`overflow-hidden rounded-lg border text-left transition ${
											isSelected
												? 'border-(--accent) bg-(--accent-bg)'
												: 'border-(--accent-border) hover:border-(--accent)'
										}`}
									>
										<img
											src={`${CONTENT_BASE_URL}/${image.key}`}
											alt={image.fileName}
											className="h-40 w-full object-cover"
										/>

										<div className="p-3">
											<p className="truncate text-sm font-medium">{image.fileName}</p>
											<p className="truncate text-xs text-muted-foreground">
												{isSelected ? 'Selected' : image.key}
											</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SiteContent;
