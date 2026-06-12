export type ThemeId =
	| 'emerald-brass'
	| 'midnight-gold'
	| 'charcoal-orange'
	| 'navy-red'
	| 'fourth-of-july'
	| 'halloween'
	| 'thanksgiving'
	| 'christmas'
	| 'winter'
	| 'spring'
	| 'summer';

export type Theme = {
	id: ThemeId;
	name: string;
	colors: Record<string, string>;
};

export const themes: Record<ThemeId, Theme> = {
	'emerald-brass': {
		id: 'emerald-brass',
		name: 'Emerald + Brass',
		colors: {
			background: '#0f1e18',
			surface: '#182921',
			primary: '#2f855a',
			secondary: '#d4af37',
			accent: '#f6e27f',
			highlight: '#f6e27f',
			border: '#2f4f3f',
			foreground: '#f7faf7',
			muted: '#c8d6ce'
		}
	},

	'navy-red': {
		id: 'navy-red',
		name: 'Navy & Red',
		colors: {
			background: '#111827',
			surface: '#1f2937',
			primary: '#dc2626',
			secondary: '#f97316',
			accent: '#fdba74',
			highlight: '#60a5fa',
			border: '#374151',
			foreground: '#f9fafb',
			muted: '#d1d5db'
		}
	},

	'midnight-gold': {
		id: 'midnight-gold',
		name: 'Midnight + Gold',
		colors: {
			background: '#0f172a',
			surface: '#1e293b',
			primary: '#3b82f6',
			secondary: '#f59e0b',
			accent: '#fbbf24',
			highlight: '#fde68a',
			border: '#334155',
			foreground: '#f8fafc',
			muted: '#cbd5e1'
		}
	},

	'charcoal-orange': {
		id: 'charcoal-orange',
		name: 'Charcoal + Orange',
		colors: {
			background: '#111111',
			surface: '#1f1f1f',
			primary: '#f97316',
			secondary: '#ea580c',
			accent: '#fdba74',
			highlight: '#fb923c',
			border: '#3f3f46',
			foreground: '#fafafa',
			muted: '#d4d4d8'
		}
	},

	'fourth-of-july': {
		id: 'fourth-of-july',
		name: '4th of July',
		colors: {
			background: '#0f172a',
			surface: '#1e293b',
			primary: '#dc2626',
			secondary: '#2563eb',
			accent: '#fbbf24',
			highlight: '#fde68a',
			border: '#334155',
			foreground: '#f8fafc',
			muted: '#cbd5e1'
		}
	},

	halloween: {
		id: 'halloween',
		name: 'Halloween',
		colors: {
			background: '#111111',
			surface: '#1f1f1f',
			primary: '#f97316',
			secondary: '#ea580c',
			accent: '#fdba74',
			highlight: '#fb923c',
			border: '#3f3f46',
			foreground: '#fafafa',
			muted: '#d4d4d8'
		}
	},

	thanksgiving: {
		id: 'thanksgiving',
		name: 'Thanksgiving',
		colors: {
			background: '#2d1f16',
			surface: '#3b2a1f',
			primary: '#92400e',
			secondary: '#d97706',
			accent: '#fbbf24',
			highlight: '#fde68a',
			border: '#5b4636',
			foreground: '#fff7ed',
			muted: '#e7d7c1'
		}
	},

	christmas: {
		id: 'christmas',
		name: 'Christmas',
		colors: {
			background: '#0f1e18',
			surface: '#162922',
			primary: '#166534',
			secondary: '#dc2626',
			accent: '#d4af37',
			highlight: '#fef08a',
			border: '#274136',
			foreground: '#f8fafc',
			muted: '#d1d5db'
		}
	},

	winter: {
		id: 'winter',
		name: 'Winter',
		colors: {
			background: '#0b1220',
			surface: '#162032',
			primary: '#60a5fa',
			secondary: '#cbd5e1',
			accent: '#e0f2fe',
			highlight: '#f8fafc',
			border: '#334155',
			foreground: '#f8fafc',
			muted: '#cbd5e1'
		}
	},

	spring: {
		id: 'spring',
		name: 'Spring',
		colors: {
			background: '#f8faf7',
			surface: '#ffffff',
			primary: '#22c55e',
			secondary: '#ec4899',
			accent: '#f9a8d4',
			highlight: '#bbf7d0',
			border: '#d1fae5',
			foreground: '#1f2937',
			muted: '#6b7280'
		}
	},

	summer: {
		id: 'summer',
		name: 'Summer',
		colors: {
			background: '#082f49',
			surface: '#0c4a6e',
			primary: '#06b6d4',
			secondary: '#f59e0b',
			accent: '#fde047',
			highlight: '#fef08a',
			border: '#155e75',
			foreground: '#f8fafc',
			muted: '#dbeafe'
		}
	}
};
