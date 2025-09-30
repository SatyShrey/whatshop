import { useLocation, useNavigate } from "react-router-dom";
import ThemeController from "./ThemeController";
import { useValues } from "./GlobalContexts";
import { BiUser, } from "react-icons/bi";

export default function Header() {
  const { settheme, theme, user, } = useValues();
  const navigate = useNavigate()

  const locate = useLocation();

  return (
    <div className='flex items-center justify-between px-1 py-2 bg-primary text-base-100'>
      <h1 className='font-bold text-2xl not-sm:text-xl'>WhatShop</h1>
      <ThemeController settheme={settheme} theme={theme} />
      {user && <div className="rounded-full border overflow-hidden cursor-pointer"
      onClick={() => {
        const path = locate.pathname
        if (path.includes('profile')) { navigate('/') }
        else { navigate('/profile') }
      }}>
        {user.imageUrl
          ? <img src={user.imageUrl} alt="profile-pic" className="w-10" />
          : <BiUser size={40} className="cursor-pointer" />
        }
      </div>}
    </div>
  )
}
