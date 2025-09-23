import { useValues } from "./GlobalContexts";
import { MdMenu } from "react-icons/md";
import ThemeController from "./ThemeController";

export default function Header() {
  const { user } = useValues();

  return (
    <div className='navbar'>
      <h1 className='navbar-start font-bold text-2xl px-3'>WhatShop</h1>
      <div className="navbar-center">
        <ThemeController/>
      </div>
      <div className='navbar-end'>
        {user && <a href="/profile"
        className="font-bold text-2xl bg-base-100 h-12 cursor-pointer px-3">
          <MdMenu size={30}/>
        </a>}
      </div>
    </div>
  )
}
