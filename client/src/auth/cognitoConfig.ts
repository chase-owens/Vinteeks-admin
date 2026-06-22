export const cognitoAuthConfig = {
	authority: import.meta.env.VITE_COGNITO_AUTHORITY,
	client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
	redirect_uri: window.location.origin,
	response_type: 'code',
	scope: 'openid email profile'
};
