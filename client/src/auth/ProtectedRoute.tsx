import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export function ProtectedRoute() {
	const auth = useAuth();

	useEffect(() => {
		if (!auth.isLoading && !auth.isAuthenticated) {
			auth.signIn();
		}
	}, [auth]);

	if (auth.isLoading) {
		return <p>Loading...</p>;
	}

	if (!auth.isAuthenticated) {
		return null;
	}

	return <Outlet />;
}
