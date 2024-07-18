import React from 'react'

function CreateFormBackground({ children }) {
  return (
    <div className=''>
      <div className='border-black bg-gray-300 p-10 pb-4 rounded-xl'>
        {children}
      </div>
    </div>
  )
}

export default CreateFormBackground