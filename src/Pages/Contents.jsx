import Chatting from "./Chatting";
import Contacts from "./Contacts";

export default function Contents({chatPage}) {
  return (
    <div className="flex flex-1 overflow-hidden gap-1">
      <div className={`w-[40%] ${chatPage ? 'not-md:hidden':'not-md:w-full'} flex flex-col`}>
        <Contacts/>
      </div>

      <div className={`w-[60%] ${chatPage ? 'not-md:w-full':'not-md:hidden'} flex flex-col`}>
        <Chatting/>
      </div>
    </div>
  )
}
