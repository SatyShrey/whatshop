import { BiUser } from "react-icons/bi"
import { useLocation, useNavigate, } from "react-router-dom";
import { useValues } from "../Components/GlobalContexts";
import { useState } from "react";
import { BsChatSquareFill } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";

export default function Contacts() {
    const { setuser2, users, chats, oldChats } = useValues();
    const navigate = useNavigate();
    const [search, setsearch] = useState('');
    const [section, setsection] = useState('chats');
    const locate=useLocation();
    const pathname=locate.pathname;

    function lastMessage(email, chats = [], oldChats = []) {
        const total = oldChats.concat(chats);
        const last = total.reverse().find(a => (a.receiver === email || a.sender === email));
        return last ? last.text : ''
    }

    return (
        <>
            <div className="h-12 m-auto w-[95%]">
                <input placeholder="Search..." type="text" className="h-full w-full rounded-full px-4 m-1 shadow-[0_0_1px] placeholder:text-gray-400 outline-none bg-base-200"
                    value={search}
                    onChange={(e) => {
                        setsearch(e.target.value);
                    }} />
            </div>

            <div style={{ scrollbarWidth: "none" }} className='flex-1 overflow-y-scroll px-1'>
                {
                    section === "chats" ? <>
                        {users && users.
                            filter(f => (f.email.includes(search.toLowerCase()) || f.name.toLowerCase().includes(search.toLowerCase())))
                            .map((obj, index) => (
                                <div key={index}
                                    className="rounded-full flex gap-2 items-center hover:bg-primary/10 my-2">
                                    <button className="cursor-pointer rounded-full border overflow-hidden shrink-0" onClick={() => {
                                        setuser2(obj);
                                        navigate('/profile2')
                                    }} >
                                        {obj.imageUrl
                                            ? <img src={obj.imageUrl} alt="profile-pic" className="w-10" />
                                            : <BiUser size={40} />}
                                    </button>
                                    <button onClick={() => { 
                                        setuser2(obj);
                                        if(pathname !=='/chats'){
                                            navigate('/chats') ;
                                        }
                                    }}
                                        className="flex-1 flex flex-col overflow-hidden text-start">
                                        <p className="w-full whitespace-nowrap text-ellipsis overflow-hidden text-xl">{obj.name}</p>
                                        <p className="w-full whitespace-nowrap text-ellipsis overflow-hidden font-light text-sm">{lastMessage(obj.email, chats, oldChats)}</p>
                                    </button>
                                </div>
                            )
                            )}
                    </> : <div className="flex justify-center items-center h-full">No calls yet!</div>
                }
            </div>

            <div className="bg-primary flex p-1 text-base-100 w-full gap-1">
                <div onClick={() => setsection('chats')} className={`btn flex-1 ${section === "chats" ? "" : 'btn-ghost'}`}><BsChatSquareFill size={30} />Chats</div>
                <div onClick={() => setsection('calls')} className={`btn flex-1 ${section === "calls" ? "" : 'btn-ghost'}`}><IoCallSharp size={30} />Calls</div>
            </div>
        </>
    )
}
