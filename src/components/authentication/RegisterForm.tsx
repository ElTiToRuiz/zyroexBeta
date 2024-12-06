import { useAuthUser } from "../../context/authContext";

export const RegisterForm = () => {
  const { formValues, error, isSubmitting, handleChange, handleSubmit } = useAuthUser();
  
  const register = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await handleSubmit('register');
		} catch (err) {
			console.error('Login failed', err);
		}
	};
  
  return (
    <div className="max-w-md mx-auto mt-12 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
      <form onSubmit={register}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email || ''}
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

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};
