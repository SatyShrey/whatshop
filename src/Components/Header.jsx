import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ThemeController from "./ThemeController";
import { useValues } from "./GlobalContexts";

export default function Header() {
const { settheme,theme ,user} = useValues();
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between px-1 py-2 bg-primary text-base-100'>
      <h1 className='font-bold text-2xl'>WhatShop</h1>
      <ThemeController settheme={settheme} theme={theme} />
      {user && <MdMenu size={30} onClick={() => navigate('/profile')} className="cursor-pointer" />}
    </div>
  )
}
