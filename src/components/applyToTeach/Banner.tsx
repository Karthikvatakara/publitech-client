import React, { useEffect } from 'react'
import discussion from "../../assets/applyToTeach/young-tender-curly-girl-holding-documents.png"
import TypeWriterAnimation from '../common/TypeWriterAnimati/TypeWriterAnimation'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  },[])
  return (
   <>
     <div className='grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 lg:pt-7' >
        <div className="lg:col-span-7 md:col-span-7 col-span-1 flex justify-center items-center">
            <div className="lg:space-y-4 lg:ps-8 md:space-y-2 space-y-1 lg:text-4xl md:text-3xl text-xl lg:p-0 md:p-2 p-4 " data-aos="fade-right">
                <h1 className='font-bold text-darkBlue'>
                    <TypeWriterAnimation text='Join with publitech' delay={100}/>
                </h1>
                <h1 className='font-bold text-darkBlue'>As a mentor</h1>
                <p className='text-sm font-bold text-gray-500 '>
                    Welcome to our e-learning platform! Discover accessible, engaging,
                    and transformative learning experiences. Empower yourself with diverse courses,
                    connect with experts, and unlock your potential. Embrace the future of education—your
                    journey to success begins here!
                </p>
            </div>
        </div>
        <div className='lg:col-span-5 md:col-span-5 col-span-1 lg:block md:block block' data-aos="fade-down">
            <img src={discussion} alt="Discussion" className="w-full"  />
        </div>
     </div>
   </>
  )
}

export default Banner