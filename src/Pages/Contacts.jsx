import { BiUser } from "react-icons/bi"
import { useNavigate, } from "react-router-dom";
import { useValues } from "../Components/GlobalContexts";
import { useState } from "react";
import {  BsChatSquareFill } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";

export default function Contacts() {
    const { setuser2, users, setprofileuser, } = useValues();
    const navigate = useNavigate();
    const [search, setsearch] = useState('');
    const [section, setsection] = useState('chats');

    return (
        <>
            <div className="h-12 m-auto w-[95%]">
                <input placeholder="Search..." type="text" className="h-full w-full rounded-full px-4 shadow-[0_0_2px] placeholder:text-gray-400 outline-none bg-base-200"
                    value={search}
                    onChange={(e) => {
                        setsearch(e.target.value);
                    }} />
            </div>

            <div style={{ scrollbarWidth: "none" }} className='flex-1 overflow-y-scroll px-1'>
               {
                section==="chats"?<>
                   {users && users.
                    filter(f => (f.email.includes(search.toLowerCase()) || f.name.toLowerCase().includes(search.toLowerCase())))
                    .map((obj, index) => (
                        <div key={index}
                            className="rounded-full flex items-center hover:bg-primary/10 my-2">
                            <BiUser size={30} className="cursor-pointer mx-2" onClick={() => {
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
                </>: <div className="flex justify-center items-center h-full">No calls yet!</div>
               }
            </div>

            <div className="bg-primary flex p-1 text-base-100 w-full gap-1">
                <div onClick={()=>setsection('chats')} className={`btn flex-1 ${section==="chats"?"":'btn-ghost'}`}><BsChatSquareFill size={30} />Chats</div>
                <div onClick={()=>setsection('calls')} className={`btn flex-1 ${section==="calls"?"":'btn-ghost'}`}><IoCallSharp size={30} />Calls</div>
            </div>
        </>
    )
}
