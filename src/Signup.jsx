import axios from "axios";
import {  useState } from "react";
import { useValues } from "./GlobalContexts";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('')
    const {Loader,}=useValues();
    const navigate=useNavigate();
     
    const handleSubmit=(e)=>{
        e.preventDefault();
        Loader()
        axios.post("/api/signup",{name,email,password},{withCredentials:true}).then(data=>{
            Loader()
            if(data.data==="User already exists"){return alert(data.data)}
            alert(data.data);
        }).catch(e=>{alert(e.message);Loader()})
    }
  return(
    <div style={{scrollbarWidth:"none"}} className="mt-8 max-w-md w-full m-auto flex-1 overflow-y-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-2 p-2 rounded bg-base-200">
            <h2 className="text-center text-2xl text-primary font-bold">User Registration</h2>
            <input onChange={(e)=>setname(e.target.value)} value={name} className="h-11 bg-base-100 placeholder:text-gray-400 px-2 outline-none border rounded"
             placeholder="Name" type="text" />
            <input onChange={(e)=>setemail(e.target.value)} value={email} className="h-11 bg-base-100 placeholder:text-gray-400 px-2 outline-none border rounded"
             placeholder="Email" type="email" />
            <input onChange={(e)=>setpassword(e.target.value)} value={password} className="h-11 bg-base-100 placeholder:text-gray-400 px-2 outline-none border rounded" 
            placeholder="Password" type="password" />
            <input onChange={(e)=>setcpassword(e.target.value)} value={cpassword} className="h-11 bg-base-100 placeholder:text-gray-400 px-2 outline-none border rounded" placeholder="Confirm password" type="password" />
            <button type="submit" className="btn btn-primary">Signup</button>
            <button onClick={()=>{navigate('/login')}} className="btn btn-link" type="reset">Go to login</button>
        </form>
    </div>
  )
}

