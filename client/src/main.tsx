import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from 'react-oidc-context';
import { cognitoAuthConfig } from './auth/cognitoConfig';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider {...cognitoAuthConfig}>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);
