import LoginPage from "../Pages/LoginPage";
import { useValues } from "./GlobalContexts";

export default function Protected({ children }) {
    const { user } = useValues();

    return user ? <>{children}</> : <LoginPage/>
}
