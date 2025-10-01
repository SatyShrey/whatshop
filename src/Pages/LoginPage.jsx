import axios from "axios"
import { useEffect, useState } from "react"
import { useValues } from "../Components/GlobalContexts"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [otp, setotp] = useState('');
    const { Loader,loadData,} = useValues();
    const [isOtp, setIsOtp] = useState(false);
    const navigate=useNavigate()
    const nameRegex=/^[a-zA-Z' -]{2,49}$/
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const localUser=localStorage.getItem('user');

    useEffect(()=>{
        if(localUser){navigate('/')}
    },[])
    const handleSendOTP = () => {
        if (!nameRegex.test(name)) { return toast.error('Please enter valid name') }
        if (!emailRegex.test(email)) { return toast.error('Please enter avalid email') }
        Loader(true)
        axios.post('/api/signup', { name, email:email.toLowerCase() }).then(data => {
            toast.success(data.data); setIsOtp(true);setotp('')
        }).catch(error => { toast.error(error.response.data); })
            .finally(() => { Loader(false) })
    }

    const handleVerifyOTP = () => {
        if (!otp || otp.length !== 4 || !email) { return toast.error('Please enter email and OTP') }
        Loader(true)
        axios.post('/api/login', { email:email.toLowerCase(), otp }).then(data => {
            localStorage.setItem('user', JSON.stringify(data.data))
            navigate('/');loadData();
        }).catch(error => { toast.error(error.response.data); })
            .finally(() => { Loader(false) })
    }

    return (
        <div className='flex-1 overflow-scroll bar-0 p-2 flex items-center justify-center'>
            <div className="shadow-[0_0_2px] rounded flex-col flex gap-4 p-2 items-center w-80">
                <h1 className="text-center font-bold text-xl">Login</h1>
                {isOtp
                    ? <>
                        <input type="text" placeholder="OTP" className="input"
                            value={otp} onChange={(e) => setotp(e.target.value)} />

                        <button className='btn btn-primary' onClick={handleVerifyOTP}>Verify OTP</button>
                        <button className='btn btn-warning' onClick={handleSendOTP}>Resend OTP</button>
                    </>
                    : <>
                        <input type="name" placeholder="Name" className="input"
                            value={name} onChange={(e) => setname(e.target.value)} />

                        <input type="email" placeholder="Email" className="input"
                            value={email} onChange={(e) => setemail(e.target.value)} />

                        <button className='btn btn-primary btn-block' onClick={handleSendOTP}>Send OTP</button>
                    </>
                }
            </div>
        </div>
    )
}
