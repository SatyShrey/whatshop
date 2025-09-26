import axios from "axios"
import { useEffect, useState } from "react"
import { useValues } from "../Components/GlobalContexts"
import { useNavigate } from "react-router-dom";

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
        if (!nameRegex.test(name)) { return alert('Please enter valid name') }
        if (!emailRegex.test(email)) { return alert('Please enter avalid email') }
        Loader(true)
        axios.post('/api/signup', { name, email:email.toLowerCase() }).then(data => {
            alert(data.data); setIsOtp(true);setotp('')
        }).catch(error => { alert(error.response.data); })
            .finally(() => { Loader(false) })
    }

    const handleVerifyOTP = () => {
        if (!otp || otp.length !== 4 || !email) { return alert('Please enter email and OTP') }
        Loader(true)
        axios.post('/api/login', { email:email.toLowerCase(), otp }).then(data => {
            localStorage.setItem('user', JSON.stringify(data.data))
            navigate('/');loadData();
        }).catch(error => { alert(error.response.data); })
            .finally(() => { Loader(false) })
    }

    return (
        <div style={{scrollbarWidth:"none"}} className='flex-1 overflow-scroll flex p-2 justify-center items-center'>
            <div className="shadow-[0_0_2px] rounded flex flex-col p-2 gap-3 justify-between min-h-fit w-[340px] max-w-full m-auto">
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

                        <button className='btn btn-primary' onClick={handleSendOTP}>Send OTP</button>
                    </>
                }
            </div>
        </div>
    )
}
