import { FileText, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const ReviewResume = () => {
   const [input, setInput] = useState('')
  
    const onSubmitHandler = (e) => {
      e.preventDefault()
      console.log("File uploaded:", input)
      
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input
          onChange={(e)=>setInput(e.target.files[0])}
          accept='application/pdf'
          type='file'
          className='w-full p-2 px-3 mt-3 outline-none text-sm rounded-md border border-gray-300'
          required
        />
        <p className='text-xs text-gray-500 font-light mt-1'>
          Supports PDF resume Only
        </p>

        <button className='w-full flex justify-center items-center gap-2
          bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6
          text-sm rounded-lg cursor-pointer'>
          <FileText className='w-5'/>
          Review Resume
        </button>
      </form>
    
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Analysis Resume</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <FileText className='w-9 h-9' />
            <p>Upload an image and click "Review Resume" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResume