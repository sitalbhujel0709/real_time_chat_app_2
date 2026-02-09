import React from 'react'
import Sidebar from './Sidebar'
import Leftbar from './Leftbar'
import ChatWindow from './ChatWindow'

const PageLayout = () => {
  return (
    <div className='h-screen flex'>
      <Sidebar/>
      <div className='flex flex-1'>
        {/* Left */}
        <div className=''>
          <Leftbar/>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <ChatWindow/>
        </div>
      </div>
    </div>
  )
}

export default PageLayout