import { BiUser } from "react-icons/bi"
import { useNavigate, } from "react-router-dom";
import { useValues } from "../Components/GlobalContexts";
import { useState } from "react";

export default function Contacts() {
    const { setuser2, users,setprofileuser, } = useValues();
    const navigate = useNavigate();
    const [search,setsearch]=useState('');

    return (
        <>
            <div className="h-12 mb-2">
                <input placeholder="Search..." type="text" className="h-full w-full rounded-full px-4 shadow-[0_0_2px] placeholder:text-gray-400 outline-none bg-base-200"
                value={search}
                onChange={(e)=>{
                    setsearch(e.target.value);
                }} />
            </div>

            <div style={{ scrollbarWidth: "none" }} className='flex-1 overflow-y-scroll'>
                {users && users.
                filter(f=>(f.email.includes(search.toLowerCase()) || f.name.toLowerCase().includes(search.toLowerCase())))
                .map((obj, index) => (
                    <div key={index}
                        className="rounded-full flex items-center hover:bg-base-200 my-2">
                        <BiUser size={30} className="cursor-pointer mx-2" onClick={()=>{
                            setprofileuser(obj);
                            navigate('/profile')
                        }} />
                        <p onClick={() => { setuser2(obj); }}
                            className="h-full py-3 flex-1 overflow-x-hidden text-ellipsis not-md:hidden cursor-pointer">{obj.name}</p>
                        <p onClick={() => { setuser2(obj); navigate('/chats') }}
                            className="h-full py-3 flex-1 overflow-x-hidden text-ellipsis md:hidden cursor-pointer">{obj.name}</p>
                    </div>
                )
                )}
                
            </div>
        </>
    )
}
