import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";

const GlobalContexts = createContext()
export function GlobalProvider({ children }) {
  const [chats, setchats] = useState([]);
  const [loading, Loader] = useState(false);
  const [user, setuser] = useState()
  const [users, setusers] = useState([]);
  const [oldChats, setoldChats] = useState([]);
  const [user2, setuser2] = useState('')
  const socket = useRef();
  const socketurl = import.meta.env.VITE_SOCKET_URL;

  useEffect(() => {
    const old_chats = localStorage.getItem('chats');
    if (old_chats) { setoldChats(JSON.parse(old_chats)) }
    const localuser = localStorage.getItem('user');
    if (localuser) {
      Loader(true)
      axios.get('/api/start', { withCredentials: true }).then(data => {
        setuser(data.data.user);
        setusers(data.data.users);
        localStorage.setItem('user', JSON.stringify(data.data.user))
        localStorage.setItem('users', JSON.stringify(data.data.users))

        //socket part...........
        try {
          socket.current = io(socketurl, { withCredentials: true, 
            query: { email: data.data.user.email,token:data.data.token }
          });
          socket.current.on('otp_sent', (data) => console.log(data));
          socket.current.on('error', (data) => {Loader(false);console.log(data)});
          socket.current.on('success', (data) => {Loader(false);console.log(data)});
          socket.current.on('receive_message', (newChat) => {
            setchats((prev) => [...prev, newChat]);
            const localChats = localStorage.getItem('chats')
            const newLocalChats = localChats ? JSON.parse(localChats) : []
            localStorage.setItem('chats', JSON.stringify([...newLocalChats, newChat]));
          })
        } catch (error) { console.log(error);Loader(false) }
        //socket part end.......................

      }).catch(err => { Loader(false); console.log("app server error:" + err.response.data.message) })
    }
  }, [])

  return (
    <GlobalContexts.Provider value={{
      chats, setchats, user, setuser, socket, user2, setuser2, users, setusers,
      loading, Loader, oldChats, setoldChats
    }}>
      {children}
    </GlobalContexts.Provider>
  )
}

export const useValues = () => useContext(GlobalContexts);