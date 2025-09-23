import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";

const GlobalContexts = createContext()
export function GlobalProvider({ children }) {
  const [chats, setchats] = useState([]);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState();
  const [users, setusers] = useState([]);
  const [oldChats, setoldChats] = useState([]);
  const [receiver, setreceiver] = useState('')
  const socket = useRef();
  const socketurl = import.meta.env.VITE_SOCKET_URL;

  useEffect(() => {
    Loader()
    const old_chats = localStorage.getItem('chats');
    if (old_chats) { setoldChats(JSON.parse(old_chats)) }
    axios.get('/api/start', { withCredentials: true }).then(data => {
      Loader()
      if (data.data.user) { setuser(data.data.user); }
      if (data.data.users) { setusers(data.data.users); }
    }).catch(err => { alert(err.message); Loader() })
  }, [])

  useEffect(() => {
    try {
      if (user) {
        socket.current = io(socketurl, { withCredentials: true, query: { email: user.email } });
        socket.current.on('receive_message', (newChat) => {
          setchats((prev) => [...prev, newChat]);
          const localChats = localStorage.getItem('chats') || [];
          const newLocalChats = JSON.parse(localChats);
          localStorage.setItem('chats', JSON.stringify([...newLocalChats, newChat]));
        })
      }
    } catch (error) { console.log(error) }
  }, [user])

  //Loader show/hide
  function Loader() {
    setloading((prev) => !prev)
  }

  //rough
  useEffect(() => {
    // const arr=[{name:"Satya",age:"23"},{name:"Kari",age:"21"}];
    // const arr3=arr.map(a=>({...a,age:'12'}));console.log(arr3);
    // console.log("Answer:")
    // console.log(arr3)
  }, [])

  return (
    <GlobalContexts.Provider value={{
      chats, setchats, user, setuser, socket, receiver, setreceiver, users, setusers,
      loading, Loader, oldChats, setoldChats
    }}>
      {children}
    </GlobalContexts.Provider>
  )
}

export const useValues = () => useContext(GlobalContexts);