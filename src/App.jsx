import { Route, Routes, } from "react-router-dom";
import Header from "./Components/Header";
import Protected from "./Components/Protected";
import Contents from "./Pages/Contents";
import Profile from "./Pages/Profile";
import LoginPage from "./Pages/LoginPage";
import { useValues } from "./Components/GlobalContexts";
import Logout from "./Components/Logout";
import Loading from "./Components/Loader";
import Profile2 from "./Pages/Profile2";
import { useEffect } from "react";

export default function App() {
   const { theme, loading } = useValues();

   useEffect(() => {
      window.visualViewport.addEventListener('resize', () => {
         document.getElementById('app').style.height = `${window.visualViewport.height}px`;
      });
   }, [])

   return (
      <div id="app" className="duration-300 shadow-[0_0_2px] h-dvh flex flex-col overflow-hidden"
         data-theme={theme ? "dark" : "light"}>
         <Header />
         <Routes>
            <Route path="/" element={<Protected><Contents /></Protected>} />
            <Route path="/chats" element={<Protected><Contents chatPage={true}/></Protected>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/profile2" element={<Protected><Profile2 /></Protected>} />
         </Routes>
         <Logout />
         {loading && <Loading />}
      </div>
   )
}
