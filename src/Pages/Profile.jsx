import axios from "axios";
import { useValues } from "../Components/GlobalContexts"
import { useNavigate } from "react-router-dom";
import ThemeController from "../Components/ThemeController";
import { BiArrowBack } from "react-icons/bi";

export default function Profile() {
    const { user, setuser, setusers, Loader } = useValues();
    const navigate = useNavigate();

    function logout() {
        const conf = confirm("Are you sure to logout?");
        if (conf) {
            Loader()
            axios.get('/api/logout', { withCredentials: true }).then(data => {
                Loader()
                setuser(null);
                setusers(null);
                localStorage.clear();
                location.replace('/login');
            }).catch(e => { alert(e.message); Loader() })
        }
    }

    return (
        <div style={{ scrollbarWidth: "none" }} className="px-2 flex-1 overflow-scroll">

            <div className="flex justify-between items-center mb-10">
                <BiArrowBack size={30} onClick={() => navigate('/')} />
                <ThemeController />
            </div>
            <div className="p-2 w-fit rounded-2xl shadow border border-base-300 mx-auto text-center">
                {
                    user ? <>
                        <p className="text-2xl font-bold">{user.name}</p>
                        <p className="my-2">{user.email}</p>
                        <button onClick={logout} className="btn">Logout</button>
                    </> : <button onClick={()=>location.replace('login')} className="btn">Login</button>
                }
            </div>

        </div>
    )
}
