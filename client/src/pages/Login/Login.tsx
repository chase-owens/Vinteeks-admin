import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const Login = () => {
	const { isAuthenticated, signIn } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="w-full max-w-md rounded-lg border border-(--accent-border) bg-(--background) p-8">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-semibold">Vinteeks CMS</h1>

					<p className="mt-2 text-sm text-muted-foreground">
						Sign in to manage products, content, inquiries, and treasures.
					</p>
				</div>

				<button
					type="button"
					onClick={signIn}
					className="w-full rounded-md bg-(--accent) px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
				>
					Sign In
				</button>

				<p className="mt-6 text-center text-xs text-muted-foreground">
					Authorized administrators only.
				</p>
			</div>
		</div>
	);
};

export default Login;
