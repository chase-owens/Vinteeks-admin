import type { FC } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export type Page = 'content' | 'products' | 'inquiries' | 'treasures' | 'images' | 'reviews';

type NavButton = {
	label: string;
	path: string;
	value: Page;
};

const navButtons: NavButton[] = [
	{ label: 'content', path: '/content', value: 'content' },
	{ label: 'products', path: '/products', value: 'products' },
	{ label: 'inquiries', path: '/inquiries', value: 'inquiries' },
	{ label: 'treasures', path: '/treasures', value: 'treasures' },
	{ label: 'reviews', path: '/reviews', value: 'reviews' },
	{ label: 'images', path: '/images', value: 'images' }
];

type HeaderProps = {
	currentRoute: string;
};

const Header: FC<HeaderProps> = ({ currentRoute }) => (
	<div className="flex justify-between align-middle py-3 px-4">
		<Link to="/">Vinteeks Admin</Link>
		<div className="flex justify-end gap-3">
			{navButtons.map(({ label, path, value }) => (
				<Link
					data-selected={currentRoute === path}
					key={value}
					className={styles.navButton}
					to={path}
				>
					{label}
				</Link>
			))}
		</div>
	</div>
);

export default Header;
