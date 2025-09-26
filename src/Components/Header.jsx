import { MdMenu } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeController from "./ThemeController";
import { useValues } from "./GlobalContexts";
import { BiUser, BiUserCircle } from "react-icons/bi";

export default function Header() {
  const { settheme, theme, user,setprofileuser } = useValues();
  const navigate = useNavigate()

  const locate = useLocation();

  return (
    <div className='flex items-center justify-between px-1 py-2 bg-primary text-base-100'>
      <h1 className='font-bold text-2xl'>WhatShop</h1>
      <ThemeController settheme={settheme} theme={theme} />
      {user && <BiUserCircle size={34} onClick={() => {
        const path = locate.pathname
        if (path.includes('profile')) {
          navigate('/')
        } else { setprofileuser(user);navigate('/profile') }
      }} className="cursor-pointer" />}
    </div>
  )
}
