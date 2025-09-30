import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Protected from "./Components/Protected";
import Contents from "./Pages/Contents";
import Profile from "./Pages/Profile";
import LoginPage from "./Pages/LoginPage";
import Chatting from "./Pages/Chatting";
import { useValues } from "./Components/GlobalContexts";
import Logout from "./Components/Logout";
import Loading from "./Components/Loader";
import Profile2 from "./Pages/Profile2";

export default function App() {
   const location = useLocation();
  const hideNavbarPaths = ['/chats'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  const {theme,loading}=useValues();

  return (
    <div id="app" className="shadow-[0_0_2px] h-dvh flex flex-col overflow-hidden"
     data-theme={theme?"night":"light"}>
      {!shouldHideNavbar && <Header/>}
         <Routes>
            <Route path="/" element={<Protected><Contents/></Protected>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<Protected><Profile/></Protected>}/>
            <Route path="/profile2" element={<Protected><Profile2/></Protected>}/>
            <Route path="/chats" element={<Protected><Chatting/></Protected>}/>
         </Routes>
      <Logout/>
      {loading && <Loading/>}
    </div>
  )
}
