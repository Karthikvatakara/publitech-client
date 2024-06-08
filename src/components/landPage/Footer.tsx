import React from 'react'
import logo from "../../assets/publitechwhitelogo.png"

function Footer() {
  return (
    <>
     <div className='bg-darkBlue flex flex-col items-center justify-center w-full m-0'>
        <div><img src={logo} alt="" className='w-64' /></div>
        <div className='text-white text-xl space-y-4 '>
            <h1 > Publitech By Corporation HispanaSoft technologies pvt Ltd</h1>
            <h1>PubliTech Solutions | copyright@2023 | All rights Reserved</h1>
        </div>
     </div>
    </>
  )
}

export default Footer
