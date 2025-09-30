import axios from "axios";
import { useValues } from "../Components/GlobalContexts"
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { toast } from "react-toastify";

export default function Profile() {
    const { user, Loader, setuser, } = useValues();
    const [preview, setPreview] = useState(null);
    const nameRegex = /^[a-zA-Z' -]{2,49}$/
    const [name, setname] = useState('');

    //change pic
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); 
        }
    };

    //canel name change
    function handleCancelName() {
        setname(user.name)
    }
    useEffect(() => {
        handleCancelName()
    }, [])

    //upload profile pic
    const handleUpload = async () => {
        Loader(true);
        const fileInput = document.getElementById('profile');
        const file = fileInput.files[0];
        if (!file) { return toast.error('Select profile pic') }
        const formData = new FormData();
        formData.append('profile', file);

        try {
            const res = await axios.post('/api/upload', formData);
            const newuser = user;
            newuser.imageUrl = res.data;
            setuser(newuser);
            toast.success("Profilepic updated");
            localStorage.setItem('user', JSON.stringify(newuser));
            Loader(false);handleCancelImage();
        } catch (err) {
            toast.error('Upload failed:', err.response.data);
            Loader(false);
        }
    };

    //cancel pic change
    function handleCancelImage() {
        setPreview(null);
        document.getElementById('profile').value = '';
    }

    //logout
    function logout() {
        document.getElementById('logout').hidden = false;
    }

    function handleSaveName() {
        if (!nameRegex.test(name)) { return toast.error('Please enter valid name') }
        Loader(true)
        axios.put('/api/edit-name', { name }, { withCredentials: true }).then((data) => {
            const editedUser = user;
            editedUser.name = name;
            localStorage.setItem('user', JSON.stringify(editedUser));
            setuser(editedUser);handleCancelName()
            toast.success("Name updated")
        }).catch(err => { toast.error(err.response.data) }).finally(() => Loader(false))
    }

    return (
        <div className="flex-1 overflow-y-scroll bar-0">
            <div className="m-auto mt-5 p-5 shadow-[0_0_1px] rounded flex flex-col gap-3 items-center w-lg max-w-11/12">
                <label htmlFor="profile" className="rounded-full border overflow-hidden cursor-pointer">
                    {(user.imageUrl || preview) ?
                        <img src={preview || user.imageUrl} alt="profile-pic" className="w-28" />
                        : <BiUser size={40} />
                    }
                </label>
                {preview &&
                    <div className="flex gap-2">
                        <button className="btn btn-outline" onClick={handleUpload}>Update</button>
                        <button className="btn btn-outline" onClick={handleCancelImage}>Cancel</button>
                    </div>
                }
                <input type="file" hidden id="profile" onChange={handleFileChange} />
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} 
                className="text-xl font-semibold text-center outline-none border-b" />
                {(user.name !== name) &&
                    <div className="flex gap-2">
                        <button className="btn btn-outline" onClick={handleSaveName}>Update</button>
                        <button className="btn btn-outline" onClick={handleCancelName}>Cancel</button>
                    </div>
                }
                <div className="text-sm">{user.email}</div>
                <button onClick={logout} className="btn btn-error">Logout</button>
            </div>
        </div>
    )
}
