import { useAuth as useOidcAuth } from 'react-oidc-context';

export function useAuth() {
	const auth = useOidcAuth();

	const signOut = async () => {
		await auth.removeUser();

		const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
		const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
		const logoutUri = `${window.location.origin}/login?logged_out=1`;

		window.location.href =
			`${cognitoDomain}/logout` +
			`?client_id=${clientId}` +
			`&logout_uri=${encodeURIComponent(logoutUri)}`;
	};

	return {
		user: auth.user,
		isAuthenticated: auth.isAuthenticated,
		isLoading: auth.isLoading,
		error: auth.error,

		accessToken: auth.user?.access_token,
		idToken: auth.user?.id_token,

		signIn: () => auth.signinRedirect(),
		signOut
	};
}
