import Contacts from './Contacts'
import Chatting from './Chatting'

export default function Contents() {
  return (
    <div className="flex-1 flex p-2 gap-2 overflow-hidden">
      <Contacts />
      <div className='w-[60%] h-full not-md:hidden'>
        <Chatting />
      </div>
    </div>
  )
}
