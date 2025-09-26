import Chatting from "./Chatting";
import Contacts from "./Contacts";

export default function Contents({mainsreen="contact"}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className={`p-1 pb-0 flex flex-col w-[40%] not-md:w-full md:border-r border-base-300 ${mainsreen==="chat" ? "not-md:hidden" :""}`}>
        <Contacts/>
      </div>

      <div className={` p-1 pb-0 flex flex-col flex-1 ${mainsreen==="contact" ? "not-md:hidden":""}`}>
        <Chatting/>
      </div>
    </div>
  )
}
