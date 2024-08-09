import React from 'react'
import Navbar from '../../components/landPage/Navbar'
import Banner from '../../components/landPage/Banner'
import HeroSection from '../../components/landPage/HeroSection'
import CourseTittle from "../../components/landPage/CourseTittle"
import CardGroup from '../../components/landPage/CardGroup'
import InstructorGroup from '../../components/landPage/InstructorGroup'
import Footer1 from '../../components/landPage/Footer1'

function LandPage() {

  
  return (
        <>
        <div>
        <div className='min-h-screen'>
            <Navbar/>
            <Banner/>
        </div>
            <HeroSection/>
            <CourseTittle/>
            {/* <CardGroup/> */}
            <InstructorGroup/>
            <Footer1/>
        </div>
        </>
      

  )
}

export default LandPage
