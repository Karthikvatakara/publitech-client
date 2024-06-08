import React from 'react'
import elearning from "../../assets/e-learning.png"

function HeroSection() {
  return (
   <>
      <div className='lg:grid grid-cols-2 lg:w-full flex flex-col-reverse flex-wrap w-auto'>
                <div className='lg:col-span-1'>
                <img src={elearning} alt="" className=''/>
                </div>
                <div className='lg:col-span-1 text-darkBlue font-bold text-5xl w-full text-center mt-32'>
                    <h1>Challenge yourself</h1>
                    <h1 className=''>&</h1>
                    <h1>unlock your potential</h1>
                </div>
        </div>
   </>
  )
}

export default HeroSection
