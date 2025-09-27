import { toast } from "react-toastify";
import { useValues } from "./GlobalContexts";
import axios from "axios";

export default function Logout() {
    const { Loader, } = useValues();

    function logout() {
        Loader(true)
        axios.get('/api/logout', { withCredentials: true }).then(data => {
            localStorage.clear();
            location.replace('/login')
        }).catch(e => { toast.error(e.message); }).finally(() => Loader(false))
    }

    return (
        <dialog id="logout" className="modal modal-bottom md:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm</h3>
                <p className="py-4">Are you sure to logout?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn me-2 btn-success" onClick={logout}>Yes</button>
                        <button className="btn btn-error">No</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
