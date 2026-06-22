import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export function ProtectedRoute() {
	const auth = useAuth();

	if (auth.isLoading) {
		return <p>Loading...</p>;
	}

	if (!auth.isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
