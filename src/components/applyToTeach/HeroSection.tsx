import { useEffect } from 'react'
import student from "../../assets/applyToTeach/student.png"
import patternapplyToTeach from "../../assets/applyToTeach/PatternapplyToTeach.png"
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  },[])

  return (
    <>
    <div className=' grid lg:grid-cols-12 md:grid-cols-12 sm:cols-1 lg:p-20 p-8 md:p-14'>
        <div className='lg:col-span-5 md:col-span-5 sm:col-span-1'data-aos="fade-right">
            <div className='bg-[#F5E6FF]  w-full relative rounded-xl shadow-xl p-2'>
                 <img src={patternapplyToTeach} alt=""  className='absolute w-1/3 ms-64 lg:block md:hidden hidden ' />
                 <img src={student} alt="" className='p-3 shadow-lg ' />
            </div>
        </div>
        <div className='lg:col-span-7  md:col-span-7 flex flex-col items-center text-sm lg:text-base sm:col-span-1' data-aos="fade-left">
            <h1 className='font-bold text-2xl '>Apply as <span className='text-darkBlue'>Instructor</span></h1>
            <p className='ps-12 pt-6 sm:block md:hidden lg:block'>Join our vibrant community of instructors and share your knowledge with the world! As an instructor on our platform, you'll have the opportunity to inspire others, build connections, and make a meaningful impact. Whether you're an expert in your field, passionate about a particular subject, or simply love to teach, we welcome you to join us. Teach at your own pace, create engaging courses, and empower learners to achieve their goals. Together, let's make learning accessible and enjoyable for everyone.</p>
            <p className='ps-12 pt-4'><span className='font-bold  lg:text-lg text-darkBlue'>   No Formal Requirements</span>There are no formal educational or professional requirements to become an instructor on our platform.</p>
            <p className='ps-12 pt-4'><span className='font-bold  lg:text-lg text-darkBlue'>   Focus on Passion and Expertise</span>We value passion for teaching and subject matter expertise over formal qualifications, making this opportunity accessible to all.</p>
            <p className='ps-12 pt-4'><span className='font-bold  lg:text-lg text-darkBlue'>No Barriers to Entry</span>We believe in removing barriers to entry, allowing anyone with a desire to teach to contribute to our platform.</p>
            <p className='ps-12 pt-4'><span className='font-bold  lg:text-lg text-darkBlue'>No Barriers to Entry</span>We believe in removing barriers to entry, allowing anyone with a desire to teach to contribute to our platform.</p>
        <div className='p-5'>
          <Link to={"/apply-to-teach"}><button className='p-3 bg-darkBlue rounded-xl text-white font-bold hover:text-darkBlue hover:bg-white hover:border-2 duration-300 cursor-pointer hover:scale-110'>Apply Now</button></Link>  
        </div>
        </div>
    </div>
    </>
  )
}

export default HeroSection
