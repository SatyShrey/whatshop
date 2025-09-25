import axios from "axios"
import { useState } from "react"
import { useValues } from "../Components/GlobalContexts"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [otp, setotp] = useState('');
    const { Loader,loadData } = useValues();
    const [isOtp, setIsOtp] = useState(false);
    const navigate=useNavigate()

    const handleSendOTP = () => {
        if (!email || !name) { return alert('Please enter name and email') }
        Loader(true)
        axios.post('/api/signup', { name, email }).then(data => {
            alert(data.data); setIsOtp(true)
        }).catch(error => { alert(error.response.data); })
            .finally(() => { Loader(false) })
    }

    const handleVerifyOTP = () => {
        if (!otp || otp.length !== 4 || !email) { return alert('Please enter email and OTP') }
        Loader(true)
        axios.post('/api/login', { email, otp }).then(data => {
            console.log(data.data);
            localStorage.setItem('user', JSON.stringify(data.data))
            navigate('/');loadData();
        }).catch(error => { alert(error.response.data); })
            .finally(() => { Loader(false) })
    }

    return (
        <div style={{scrollbarWidth:"none"}} className='flex-1 overflow-scroll'>
            <div className="min-h-fit h-full flex flex-col items-center justify-center gap-2">
                <h1 className="text-center font-bold text-xl">Login</h1>
                {isOtp
                    ? <>
                        <input type="number" placeholder="OTP" className='h-10 rounded outline p-2 placeholder:text-gray-400'
                            value={otp} onChange={(e) => setotp(e.target.value)} />

                        <button className='btn' onClick={handleVerifyOTP}>Verify OTP</button>
                    </>
                    : <>
                        <input type="name" placeholder="Name" className='h-10 rounded outline p-2 placeholder:text-gray-400'
                            value={name} onChange={(e) => setname(e.target.value)} />

                        <input type="email" placeholder="Email" className='h-10 rounded outline p-2 placeholder:text-gray-400'
                            value={email} onChange={(e) => setemail(e.target.value)} />

                        <button className='btn' onClick={handleSendOTP}>Send OTP</button>
                    </>
                }
            </div>
        </div>
    )
}
