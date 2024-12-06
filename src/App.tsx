import { Authentication } from "./components/authentication/Authentication";
import { MainApp } from "./components/main/Main";
import { useAuthUser } from "./context/authContext";


export const App = () => { 
	const{ isAuth, authUser, loading } = useAuthUser();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (isAuth && authUser) {
		return <MainApp />;
	} else {
		return <Authentication />;
	}
};
