import { useEffect, useRef, useState } from "react"
import { BiSolidSend, BiUser } from "react-icons/bi"
import { useValues } from "../Components/GlobalContexts";
import { useNavigate } from "react-router-dom";

export default function Chatting() {
  const { chats, socket, user, setchats, user2, oldChats } = useValues();
  const [chat, setchat] = useState('');
  const bottomRef = useRef();
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(!user2){ return navigate('/')}
  },[])

  const sendMessage = () => {
    if (!chat) { return alert('emty message') }
    const newChat = { text: chat, receiver: user2.email, sender: user.email }
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
    <div className="flex gap-2 font-semibold text-xl border-b border-base-300 p-2">
      <BiUser size={30} />
      <p className="flex-1 overflow-x-hidden text-ellipsis">{user2.name}</p>
    </div>
    <div style={{ scrollbarWidth: "none" }} className="flex-1 overflow-y-scroll">
      {oldChats && //past messages
        Messages(oldChats).map((chat, index) =>
          <div key={index} className={user.email === chat.sender ? "chat chat-end" : "chat chat-start"}>
            <div className="chat-bubble">{chat.text}</div>
          </div>)
      }

      {chats && //new messages
        Messages(chats).map((chat, index) =>
          <div key={index} className={user.email === chat.sender ? "chat chat-end" : "chat chat-start"}>
            <div className="chat-bubble">{chat.text}</div>
          </div>)
      }

      <div ref={bottomRef}/>
    </div>

    <div className="flex bg-base-200 items-center p-2 rounded-full m-2 shadow-[0_0_2px]">
      <textarea placeholder="Write message..." name="messagebox" className="flex-1 h-12 resize-none outline-none px-4 placeholder:text-gray-400" onChange={(e) => setchat(e.target.value)} value={chat}></textarea>
      {chat && <button onClick={sendMessage}><BiSolidSend size={30} /></button>}
    </div>
  </>
}
