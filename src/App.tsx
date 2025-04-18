import { useEffect } from "react";
import Router from "./routers/Router";
import { callGetAccount } from "./services/AuthService";
import { useAppDispatch } from "./redux/hooks";
import { doGetAccount } from "./redux/slices/authSlice";
import { Bounce, ToastContainer } from "react-toastify";


function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		getAccount()
	}, []);

	const getAccount = async () => {
		const routesAut = ["/login", "/register", "/forgot-password"];
		if (routesAut.includes(window.location.pathname))
			return;
		const res = await callGetAccount();
		if (res.is_valid) {
			dispatch(doGetAccount(res.user));
		}
	}

	return (
		<>
			<Router />
		</>
	);
}

export default App
