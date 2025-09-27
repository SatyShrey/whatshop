import Chatting from "./Chatting";
import Contacts from "./Contacts";

export default function Contents({mainsreen="contact"}) {
  return (
    <div className="flex flex-1 overflow-hidden gap-1">
      <div className={`pt-1 flex flex-col w-[40%] not-md:w-full ${mainsreen==="chat" ? "not-md:hidden" :""}`}>
        <Contacts/>
      </div>

      <div className={` pt-1 flex flex-col flex-1 ${mainsreen==="contact" ? "not-md:hidden":""}`}>
        <Chatting/>
      </div>
    </div>
  )
}
