import { useEffect, useRef, useState } from "react"
import { BiArrowBack, BiSolidChat, BiSolidSend, BiUser } from "react-icons/bi"
import { useValues } from "../Components/GlobalContexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Chatting() {
  const { chats, socket, user, setchats, user2, oldChats, onlineUsers, sendStart, setsendStart } = useValues();
  const [chat, setchat] = useState('');
  const bottomRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (user2 && bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [user2])

  const sendMessage = () => {
    if (!chat) { return toast.error('emty message') }
    setsendStart(true)
    const newChat = {
      text: chat, receiver: user2.email, sender: user.email,
      time: (new Date()).toLocaleTimeString() + " " + (new Date()).toLocaleDateString()
    }
    socket.current.emit('send_message', newChat)
    setchats((prev) => [...prev, newChat]);
    setchat('');
    setTimeout(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }

  //function for display filtered messages
  function Messages(newArray=[],oldArray=[]) {
    const newFilteredArray = newArray.filter(f =>
      (f.sender === user.email && f.receiver === user2.email)
      || (f.sender === user2.email && f.receiver === user.email))

      const oldFilteredArray = oldArray.filter(f =>
      (f.sender === user.email && f.receiver === user2.email)
      || (f.sender === user2.email && f.receiver === user.email))
    
      const collection=oldFilteredArray.concat(newFilteredArray);
      return collection;
  }

  return user2 ?
   <>
    <div className="flex gap-2 p-2 bg-primary text-base-100 items-center">
      <BiArrowBack size={40} onClick={() => navigate('/')} className="md:hidden"/>
      <button className="cursor-pointer mx-2 rounded-full border overflow-hidden" onClick={() => {
        navigate(-1)
      }} >
        {user2.imageUrl
          ? <img src={user2.imageUrl} alt="profile-pic" className="w-10" />
          : <BiUser size={30} />}
      </button>
      <p className="flex-1 overflow-x-hidden text-ellipsis">
        <span className="whitespace-nowrap">{user2.name}</span>
        {onlineUsers.includes(user2.email)
          ? <small className="p-0.5 block rounded-full">online</small>
          : <small className="p-0.5 block rounded-full">offline</small>}
      </p>

    </div>
    <div style={{ scrollbarWidth: "none" }} className="h-full overflow-y-scroll">
      {oldChats && //past messages
        Messages(chats,oldChats).map((chat, index) =>
          <div key={index} className={user.email === chat.sender ? "chat chat-end" : "chat chat-start"}>
            <div className="chat-bubble">
              <pre className="whitespace-pre-wrap wrap-anywhere">{chat.text}</pre>
              <div className={`text-[10px] mt-2 text-base-content/60 ${user.email === chat.sender && 'text-right'}`}>{chat.time}</div>
            </div>
          </div>)
      }

      {sendStart &&
        <div className="flex justify-end pe-3">
          <div className="loading loading-dots" />
        </div>
      }
      <div ref={bottomRef} className="h-1" />
    </div>

    <div className="bg-primary">
      <div className="flex bg-base-200 items-center p-2 rounded-2xl m-1">
        <textarea placeholder="Write message..." name="messagebox" className="flex-1 h-14 resize-none outline-none p-1 placeholder:text-gray-400" onChange={(e) => setchat(e.target.value)} value={chat}></textarea>
        {chat && <button onClick={sendMessage}><BiSolidSend size={30} /></button>}
      </div>
    </div>
  </>: 
  <div className="flex-1 flex justify-center items-center flex-col">
    <BiSolidChat size={60}/>
    Start conversations
  </div>
}
