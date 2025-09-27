import { useEffect, useRef, useState } from "react"
import { BiArrowBack, BiSolidSend, BiUser } from "react-icons/bi"
import { useValues } from "../Components/GlobalContexts";
import { useLocation, useNavigate } from "react-router-dom";

export default function Chatting() {
  const { chats, socket, user, setchats, user2, oldChats, onlineUsers, setuser2 } = useValues();
  const [chat, setchat] = useState('');
  const bottomRef = useRef();
  const navigate = useNavigate();
  const locate = useLocation();

  useEffect(() => {
    if (!user2) { return navigate('/') }
  }, [])

  const sendMessage = () => {
    if (!chat) { return alert('emty message') }
    const newChat = {
      text: chat, receiver: user2.email, sender: user.email,
      time: (new Date()).toLocaleTimeString() + " " + (new Date()).toLocaleDateString()
    }
    socket.current.emit('send_message', newChat)
    setchats((prev) => [...prev, newChat]);
    const localChats = localStorage.getItem('chats')
    const newLocalChats = localChats ? JSON.parse(localChats) : []
    localStorage.setItem('chats', JSON.stringify([...newLocalChats, newChat]));
    setchat('');
    setTimeout(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }

  //function for display filtered messages
  function Messages(array) {
    const filteredArray = array.filter(f =>
      (f.sender === user.email && f.receiver === user2.email)
      || (f.sender === user2.email && f.receiver === user.email))

    return filteredArray;
  }

  return user2 && <>
    <div className="flex gap-2 p-2 bg-primary text-base-100 items-center">
      {locate.pathname.includes('chats') && <BiArrowBack size={30} onClick={() => navigate('/')} />}
      <BiUser size={30} />
      <p className="flex-1 overflow-x-hidden text-ellipsis">
        <span className="whitespace-nowrap">{user2.name}</span>
        {onlineUsers.includes(user2.email)
          ? <small className="p-0.5 block rounded-full">online</small>
          : <small className="p-0.5 block rounded-full">offline</small>}
      </p>

    </div>
    <div style={{ scrollbarWidth: "none" }} className="h-full overflow-y-scroll">
      {oldChats && //past messages
        Messages(oldChats).map((chat, index) =>
          <div key={index} className={user.email === chat.sender ? "chat chat-end" : "chat chat-start"}>
            <div className="chat-bubble">
              <pre className="whitespace-pre-wrap wrap-anywhere">{chat.text}</pre>
              <div className={`text-[10px] text-accent ${user.email === chat.sender ?'text-right':''}`}>{chat.time}</div>
            </div>
          </div>)
      }

      {chats && //new messages
        Messages(chats).map((chat, index) =>
          <div key={index} className={user.email === chat.sender ? "chat chat-end" : "chat chat-start"}>
            <div className="chat-bubble">
              <pre className="whitespace-pre-wrap wrap-anywhere">{chat.text}</pre>
              <div className={`text-[10px] text-accent ${user.email === chat.sender ?'text-right':''}`}>{chat.time}</div>
            </div>
          </div>)
      }

      <div ref={bottomRef} />
    </div>

    <div className="bg-primary">
      <div className="flex bg-base-200 items-center p-2 rounded-2xl m-1 shadow-[0_0_2px]">
        <textarea placeholder="Write message..." name="messagebox" className="flex-1 h-14 resize-none outline-none p-1 placeholder:text-gray-400" onChange={(e) => setchat(e.target.value)} value={chat}></textarea>
        {chat && <button onClick={sendMessage}><BiSolidSend size={30} /></button>}
      </div>
    </div>
  </>
}
