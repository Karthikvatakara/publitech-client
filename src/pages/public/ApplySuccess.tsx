import React, { useEffect } from "react";
import Navbar from "../../components/landPage/Navbar";
import AOS from "aos";
import success from "../../assets/applyToTeach/success.png";
import "aos/dist/aos.css";
import TypeWriterAnimation from "../../components/common/TypeWriterAnimati/TypeWriterAnimation";
import { Link } from "react-router-dom";

function ApplySuccess() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className=" min-h-screen ">
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col m  items-center justify-center font-bold  h-auto content-center">
          <div className="my-10"
            data-aos="fade-zoom-in"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600"
          >
            <h1 className="text-darkBlue text-4xl">
              Application submittd Succesfully!!
            </h1>
            <h1 className="text-2xl text-center">
            <TypeWriterAnimation text="Our Team Will contact You soon!!" delay={100} />
            </h1>
          </div>

          <div className="w-1/4 mt-12">
            <img src={success} className=" hover:scale-110 rounded-badge hover:shadow-2xl hover:shadow-cyan-500/50 duration-300" alt="" />
          </div>
          <Link to={"/"}><button className="p-2 bg-darkBlue text-white rounded-lg hover:text-darkBlue hover:bg-white hover:scale-110 duration-300">Back to Home</button></Link>
        </div>
      </div>
    </>
  );
}

export default ApplySuccess;
