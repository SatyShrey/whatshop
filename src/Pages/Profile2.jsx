import { useValues } from "../Components/GlobalContexts"
import { useEffect, } from "react";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Profile2() {
    const { user2} = useValues();
    const navigate=useNavigate()

    useEffect(() => {
        if(!user2){return navigate('/')}
    }, [])

    return (
        <div className="flex-1 overflow-y-scroll bar-0">
            <div className="m-auto mt-5 p-5 shadow-[0_0_1px] rounded flex flex-col gap-3 items-center w-lg max-w-11/12">
                <div className="rounded-full border overflow-hidden">
                    {user2.imageUrl ?
                        <img src={user2.imageUrl} alt="profile-pic" className="w-28" />
                        : <BiUser size={40} />
                    }
                </div>
                <div className="text-xl font-semibold">{user2.name}</div>
                <div className="text-sm">{user2.email}</div>
            </div>
        </div>
    )
}
