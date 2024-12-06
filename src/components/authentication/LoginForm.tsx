import { useState } from "react";
import { useAuthUser } from "../../context/authContext";
import { fetchForgotPassword } from "../../services/fetch/fetchSupport";


export const LoginForm = () => {
	const [forgotPassword, setForgotPassword] = useState(false);
	const { formValues, error, isSubmitting, handleChange, handleSubmit } = useAuthUser();
	
	const login = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await handleSubmit('login');
		} catch (err) {
			console.error('Login failed', err);
		}
	};

	const sendNewPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = document.getElementById('forgotEmail') as HTMLInputElement;
		if (email.value === '') {
			alert('Please enter your email to reset your password.');
			return;
		}
		const data = await fetchForgotPassword(email.value);
		alert(data.message);
	}

	return (
		<div className="max-w-md mx-auto mt-12 p-8 border rounded-lg shadow-lg bg-white">
			<h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
			<form onSubmit={login}>
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formValues.email}
						onChange={handleChange}
						placeholder="Enter your email"
						className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isSubmitting}
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formValues.password}
						onChange={handleChange}
						placeholder="Enter your password"
						className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isSubmitting}
					/>
				</div>
				<div className="text-right mb-4">
					Forgot password? <a onClick={()=>{setForgotPassword(true)}} className="text-blue-500 hover:underline">Reset password</a>
				</div>
				{error && <div className="text-sm text-red-600 mb-4">{error}</div>}

				<div className="flex justify-center">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
					>
						{isSubmitting ? 'Logging in...' : 'Login'}
					</button>
				</div>
			</form>
			{
				forgotPassword && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg shadow-lg p-8 w-96">
						<button
							onClick={() => setForgotPassword(false)} // Assuming `setForgotPassword` is used to toggle visibility
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
						>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
						</button>
						<h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
						<form onSubmit={sendNewPassword}>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
							<input
								type="email"
								id="forgotEmail"
								name="forgotEmail"
								placeholder="Enter your email"
								className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Send New Password
						</button>
						</form>
					</div>
					</div>
				)
			}
		</div>
	);
};
