import React from 'react'
import spinner from '../assets/Ellipsis@1x-1.8s-161px-161px.svg'

const Spinner = () => {
  return (
    <div className='flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
      <div>
        <img src={spinner} alt="" className='h-24 bg-gray-500'/>
      </div>
    </div>
  )
}

export default Spinner
