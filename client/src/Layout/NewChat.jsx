import React from 'react'
import {MessageCirclePlus} from 'lucide-react'

const NewChat = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center gap-4 '>
        <div className='cursor-pointer w-24 h-24 border p-4 rounded-lg border-gray-300 bg-gray-50 shadow-lg'>
          <MessageCirclePlus className='w-16 h-16 text-emerald-600'/>
        </div>
        <p className='text-2xl font-semibold  text-emerald-600'>Start a new chat</p>
      </div>
    </div>
  )
}

export default NewChat