import Chatting from "./Chatting";
import Contacts from "./Contacts";

export default function Contents({mainsreen="contact"}) {
  return (
    <div className="flex h-full">
      <div className={`relative h-full w-full p-2 flex flex-col md:w-[40%] md:border-r border-base-300 ${mainsreen==="chat" ? "not-md:hidden" :""}`}>
        <Contacts/>
      </div>

      <div className={`relative p-2 flex flex-col flex-1 h-full ${mainsreen==="contact" ? "not-md:hidden":""}`}>
        <Chatting/>
      </div>
    </div>
  )
}
