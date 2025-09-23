import { useEffect, useRef, useState } from "react"
import { BiSolidSend, BiUser } from "react-icons/bi"
import { useValues } from "./GlobalContexts";
import { useNavigate } from "react-router-dom";

export default function Chatting() {
  const { socket, user, } = useValues();
  const { chats, setchats, receiver ,oldChats} = useValues();
  const [chat, setchat] = useState('');
  const bottomRef = useRef();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!receiver){navigate('/')}
  },[])

  const sendMessage = () => {
    if (!chat) { return alert('emty message') }
    const newChat = { text: chat, receiver: receiver.email, sender: user.email }
    socket.current.emit('send_message', newChat)
    setchats((prev) => [...prev, newChat]);
    const localChats=localStorage.getItem('chats') || [];
    const newLocalChats=JSON.parse(localChats);
    localStorage.setItem('chats',JSON.stringify([...newLocalChats,newChat]));
    setchat('');
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className='relative p-2 flex flex-col w-full h-full'>
      {
        receiver && <>
          <div className="flex gap-2 font-semibold text-xl border-b border-base-300 p-2">
            <BiUser size={30} />
            <p className="flex-1 overflow-x-hidden text-ellipsis">{receiver.name}</p>
          </div>
          <div style={{ scrollbarWidth: "none" }} className="flex-1 overflow-y-scroll">
             {
              oldChats && oldChats.map((chat, index) => {
                if (chat.sender === user.email && chat.receiver === receiver.email) {
                  return <div key={index} className="chat chat-end">
                    <div className="chat-bubble">{chat.text}</div>
                  </div>
                }
                else if (chat.sender === receiver.email && chat.receiver === user.email) {
                  return <div key={index} className="chat chat-start">
                    <div className="chat-bubble">{chat.text}</div>
                  </div>
                }
              }
              )
            }
            {
              chats && chats.map((chat, index) => {
                if (chat.sender === user.email && chat.receiver === receiver.email) {
                  return <div key={index} className="chat chat-end">
                    <div className="chat-bubble">{chat.text}</div>
                  </div>
                }
                else if (chat.sender === receiver.email && chat.receiver === user.email) {
                  return <div key={index} className="chat chat-start">
                    <div className="chat-bubble">{chat.text}</div>
                  </div>
                }
              }
              )
            }
            <div ref={bottomRef}></div>
          </div>

          <div className="flex bg-base-200 items-center p-2 rounded-full mt-2 shadow-[0_0_2px]">
            <textarea placeholder="Write message..." name="messagebox" className="flex-1 h-12 resize-none outline-none px-4 placeholder:text-gray-400" onChange={(e) => setchat(e.target.value)} value={chat}></textarea>
            {chat && <button onClick={sendMessage}><BiSolidSend size={30} /></button>}
          </div>
        </>
      }
    </div>
  )
}
