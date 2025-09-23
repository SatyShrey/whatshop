import { useValues } from "./GlobalContexts";
import { MdMenu } from "react-icons/md";
import ThemeController from "./ThemeController";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useValues();
  const navigate=useNavigate()

  return (
    <div className='navbar'>
      <h1 className='navbar-start font-bold text-2xl px-3'>WhatShop</h1>
      <div className="navbar-center">
        <ThemeController/>
      </div>
      <div className='navbar-end'>
        {user && <button onClick={()=>navigate('/profile')}
        className="font-bold text-2xl bg-base-100 h-12 cursor-pointer px-3">
          <MdMenu size={30}/>
        </button>}
      </div>
    </div>
  )
}
