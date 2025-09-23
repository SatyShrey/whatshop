import axios from "axios";
import { useValues } from "./GlobalContexts"
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user,setuser,setusers,Loader } = useValues();
    const navigate=useNavigate();

    function logout() {
        const conf = confirm("Are you sure to logout?");
        if (conf) { 
            Loader()
            axios.get('/api/logout',{withCredentials:true}).then(data=>{
                Loader()
                setuser(null);
                setusers(null);
                localStorage.clear();
                navigate('/login');
            }).catch(e=>{alert(e.message);Loader()})
         }
    }

    return (
        <div className="p-2 my-10">
            <div className="p-2 w-fit rounded-2xl shadow border border-base-300 m-auto text-center">
                <p className="text-2xl font-bold">{user.name}</p>
                <p className="my-2">{user.email}</p>
                <button onClick={logout} className="btn">Logout</button>
            </div>
        </div>
    )
}
