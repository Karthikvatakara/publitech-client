import React from 'react';
import Navbar from '../../components/landPage/Navbar';
import Banner from '../../components/applyToTeach/Banner';
import HeroSection from '../../components/applyToTeach/HeroSection';
import VideoPart from '../../components/applyToTeach/VideoPart';
import Footer from '../../components/landPage/Footer1';

function ApplyToTeach() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Banner />
        <HeroSection />
        <VideoPart />
      </main>
      <Footer />
    </div>
  )
}

export default ApplyToTeach