import { useValues } from "./GlobalContexts"
import Login from "./Login";

export default function Protected({ children }) {
    const { user } = useValues();

    return user ? <>{children}</> : <Login/>
}
