import axios from "axios";
import { useValues } from "../Components/GlobalContexts"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { toast } from "react-toastify";

export default function Profile() {
    const { user, Loader, profileuser, setuser } = useValues();
    const navigate = useNavigate();
    const [edit, setedit] = useState(false)
    const nameRegex = /^[a-zA-Z' -]{2,49}$/
    const [name, setname] = useState('');

    useEffect(() => {
        if (!profileuser) { return navigate('/') }
    }, [])

    function logout(){
         document.getElementById('logout').showModal();
    }

    function saveName() {
        if (!nameRegex.test(name)) { return toast.error('Please enter valid name') }
        Loader(true)
        axios.put('/api/edit-name', { name }, { withCredentials: true }).then((data) => {
            const editedUser = user;
            editedUser.name = name;
            setuser(editedUser);
            setedit(false);
            setname('')
        }).catch(err => { toast.error(err.response.data) }).finally(() => Loader(false))
    }

    return (
        <div style={{ scrollbarWidth: "none" }} className='flex-1 overflow-scroll flex p-2 justify-center items-center'>

            <div className="p-2 rounded shadow-[0_0_2px] flex flex-col text-center gap-3 min-w-fit w-[340px] max-w-full">
                {
                    user ? <>
                       <BiUser size={50} className="m-auto"/>
                        <p className="text-2xl font-bold">{profileuser.name}</p>
                        {edit && <input type="text" className="input" placeholder="Enter new name"
                            value={name} onChange={(e) => setname(e.target.value)} />}
                        <p>{profileuser.email}</p>
                        {(profileuser && profileuser.email === user.email) && <>
                            {
                                edit ? <button className="btn btn-success" onClick={saveName}>Save new name</button>
                                    : <button className="btn btn-neutral" onClick={() => setedit(true)}>Edit name</button>
                            }
                            <button onClick={logout} className="btn btn-error">Logout</button>
                        </>
                        }
                    </> : <button onClick={() => navigate('/login')} className="btn btn-primary">Login</button>
                }
            </div>

        </div>
    )
}
