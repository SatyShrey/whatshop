import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contents from "./Contents";
import Signup from "./Signup";
import Protected from "./Protected";
import Chatting from "./Chatting";
import Profile from "./Profile";
import Modal from "./Modal";
import Login from "./Login";

export default function App() {
  return (
    <div className="shadow-[0_0_2px] h-dvh font-[Poppins] flex flex-col overflow-hidden">
         <Routes>
            <Route path="/" element={<Protected><Contents/></Protected>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/chats" element={<Protected><Chatting/></Protected>}/>
            <Route path="/profile" element={<Profile/>}/>
         </Routes>
      <Modal/>
    </div>
  )
}
