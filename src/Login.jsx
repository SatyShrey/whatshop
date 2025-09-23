import axios from "axios";
import {  useState } from "react";
import { useValues } from "./GlobalContexts";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { setuser, Loader, user } = useValues()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Loader()
        axios.post("/api/login", { email, password }, { withCredentials: true }).then((data) => {
            Loader()
            if (data.data === "Invalid credentials") { return alert(data.data) }
            setuser(data.data);location.replace('/');
        }).catch(e => { Loader(); alert(e.message) })
    }

    return (
        <div style={{ scrollbarWidth: "none" }} className="mt-8 max-w-md w-full m-auto flex-1 overflow-y-scroll">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-2 p-2 rounded bg-base-200">
                <h2 className="text-center text-2xl text-primary font-bold">User Login</h2>
                <input className="h-11 bg-base-100 placeholder:text-gray-400 px-2 outline-none border rounded" placeholder="Email" type="email" onChange={(e) => setemail(e.target.value)} value={email} />
                <input className="h-11 bg-base-100 placeholder:text-gray-400 px-2 outline-none border rounded" placeholder="Password" type="password" onChange={(e) => setpassword(e.target.value)} value={password} />
                <button type="submit" className="btn btn-primary">Login</button>
                <button onClick={()=>{navigate('/signup')}} className="btn btn-link" type="reset">Go to signup</button>
            </form>
        </div>
    )
}
