import axios from "axios";
import { useValues } from "./GlobalContexts"
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ThemeController from "./ThemeController";
import { BsBack } from "react-icons/bs";
import { FaBackward } from "react-icons/fa";
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
                navigate('/login');
            }).catch(e => { alert(e.message); Loader() })
        }
    }

    return (
        <><Header />
            <div onClick={()=>navigate('/')}
            className="flex gap-1 items-center text-xl cursor-pointer ps-3"><BiArrowBack /> <div>Home</div> </div>
            <div style={{scrollbarWidth:"none"}} className="px-2 pt-8 flex flex-col items-center flex-1 overflow-scroll gap-4">
                <div >
                    <ThemeController />
                </div>
               {user ? <div className="p-2 w-fit rounded-2xl shadow border border-base-300 mx-auto text-center">
                    <p className="text-2xl font-bold">{user.name}</p>
                    <p className="my-2">{user.email}</p>
                    <button onClick={logout} className="btn">Logout</button>
                </div>:  <div onClick={()=>navigate('/login')}
            className="flex gap-1 items-center text-xl cursor-pointer btn"><BiArrowBack /> <div>Login</div> </div> }
            </div>
        </>
    )
}
