import { useState, type FC } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

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

const Header: FC<HeaderProps> = ({ currentRoute }) => {
	const { signOut } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);

	return (
		<header className={styles.header}>
			<div className="flex justify-between align-middle py-3 px-4">
				<Link className={styles.brand} to="/" onClick={closeMenu}>
					Vinteeks Admin
				</Link>

				<button
					className={styles.menuButton}
					type="button"
					aria-label="Toggle navigation"
					aria-expanded={isOpen}
					onClick={() => setIsOpen((current) => !current)}
				>
					☰
				</button>
			</div>

			<nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
				{navButtons.map(({ label, path, value }) => (
					<Link
						data-selected={currentRoute === path}
						key={value}
						className={styles.navButton}
						to={path}
						onClick={closeMenu}
					>
						{label}
					</Link>
				))}
				<button
					type="button"
					onClick={signOut}
					className="w-full px-4 text-left text-red-400 transition-colors hover:text-red-300"
				>
					Log Out
				</button>
			</nav>
		</header>
	);
};

export default Header;
