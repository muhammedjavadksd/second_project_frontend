import React from 'react'
import { loginStepDown } from './Logic'

function SignInOTP({ state }) {
  return (
    <div>

      <div className="headingSection">
        <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Submit OTP <span class="text-blue-600 dark:text-blue-500"> Number</span></h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
      </div>

      <form class="max-w-sm mt-10">
        <div class="mb-5">
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Number</label>
          <input type="number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" required />
        </div>
        <div className='flex gap-3'>
        <button type="submit" class="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> loginStepDown(state)}><i class="fa-solid fa-left-long"></i> Edit Phone Number</button>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> alert("Login OTP Success")}>Submit OTP</button>
        </div>
      </form>
    </div>
  )
}

export default SignInOTP