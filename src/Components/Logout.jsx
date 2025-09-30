import { toast } from "react-toastify";
import axios from "axios";

export default function Logout() {

    function logout() {
        document.getElementById('logout').hidden=true;
        Loader(true)
        axios.get('/api/logout', { withCredentials: true }).then(data => {
            localStorage.clear();
            location.replace('/login')
        }).catch(e => { toast.error(e.message); }).finally(() => Loader(false))
    }

    function no(){
        document.getElementById('logout').hidden=true;
    }

    return (
        <div id="logout" hidden className="absolute backdrop-blur-[2px] top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <div className="w-lg anim2 max-w-11/12 flex flex-col gap-3 items-center bg-base-100 shadow-[0_0_1px] p-3 rounded">
                <h3 className="font-bold text-lg">Confirm</h3>
                <p className="">Are you sure to logout?</p>
                <div className="flex justify-end gap-3">
                        <button className="btn btn-outline" onClick={logout}>Yes</button>
                        <button className="btn btn-outline" onClick={no}>No</button>
                </div>
            </div>
        </div>
    )
}
