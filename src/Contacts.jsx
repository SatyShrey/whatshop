import { BiUser } from "react-icons/bi"
import { useValues } from "./GlobalContexts"
import { useNavigate, } from "react-router-dom";

export default function Contacts() {
    const { setreceiver, receiver, users } = useValues();
    const contactsList = ["satyaxyz31@gmail.com", 'satya@gmail.com', 'kari@gmail.com'];
    const navigate = useNavigate()

    return (
        <div className='relative h-full flex-1 not-md:w-full p-2 flex flex-col md:border-r border-base-300'>
            <div className="h-12 mb-2">
                <input placeholder="Search..." type="text" className="h-full w-full rounded-full px-4 shadow-[0_0_2px] placeholder:text-gray-400 outline-none bg-base-200" />
            </div>

            <div style={{ scrollbarWidth: "none" }} className='flex-1 overflow-y-scroll'>
                {users && users.map((obj, index) => (
                    <div key={index}
                        className={`rounded-full flex items-center hover:bg-base-200 mt-2
                            ${obj.email === receiver.email ? "bg-base-300" : ""}`}>
                        <BiUser size={30} className="cursor-pointer mx-2" />
                        <p onClick={() => { setreceiver(obj); }}
                            className="h-full py-3 flex-1 overflow-x-hidden text-ellipsis not-md:hidden cursor-pointer">{obj.name}</p>
                        <p onClick={() => { setreceiver(obj); navigate('/chats') }}
                            className="h-full py-3 flex-1 overflow-x-hidden text-ellipsis md:hidden cursor-pointer">{obj.name}</p>
                    </div>
                )
                )}
            </div>
        </div>
    )
}
