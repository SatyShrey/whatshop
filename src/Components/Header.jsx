import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between p-1'>
      <h1 className='font-bold text-2xl'>WhatShop</h1>
      <MdMenu size={30} onClick={() => navigate('/profile')} className="cursor-pointer" />
    </div>
  )
}
