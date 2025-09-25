import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Protected from "./Components/Protected";
import Contents from "./Pages/Contents";
import Profile from "./Pages/Profile";
import Modal from "./Components/Modal";
import LoginPage from "./Pages/LoginPage";
import Chatting from "./Pages/Chatting";

export default function App() {
   const location = useLocation();
  const hideNavbarPaths = ['/chats'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="shadow-[0_0_2px] h-dvh font-[Poppins] flex flex-col overflow-hidden">
      {!shouldHideNavbar && <Header/>}
         <Routes>
            <Route path="/" element={<Protected><Contents/></Protected>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/chats" element={<Protected><Chatting/></Protected>}/>
         </Routes>
      <Modal/>
    </div>
  )
}
