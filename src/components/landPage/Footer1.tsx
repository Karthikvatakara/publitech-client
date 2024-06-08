import { FaFacebook, FaInstagram } from "react-icons/fa";
// import image from "../assets/Screenshot_161-removebg-preview.png";
import logo from "../../assets/publitechwhitelogo.png"
import { TiSocialTwitterCircular } from "react-icons/ti";
import { ImLinkedin } from "react-icons/im";

const Footer = () => {
  return (
    <div className="h-[400px] w-full bg-darkBlue mt-10">
      <div className="flex gap-4 justify-between flex-col md:flex-row">
        <div>
        <div className="flex pt-10 ps-14">
          <img className="h-[50px] w-44 hover:scale-110 cursor-pointer" src={logo}  alt="" />
        </div>
        <div className="w-[350px]  ms-14 ">
        <h1 className="text-lg cursor-default text-white">
        Find reliable blue-collar workers for your home projects. Browse
                profiles and book skilled professionals hassle-free.
        </h1>
      </div>
        </div>
       
        <div className="pt-16 text-white">
          <p className="font-semibold cursor-default">About</p>
          <ul className="mt-5">
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Services</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Teach With us</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Terms</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Privacy Policy</li>
          </ul>
        </div>
        <div className="pt-16 text-white">
          <p className="font-semibold cursor-default">Resources</p>
          <ul className="mt-5">
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Help Docs</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Guide</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Updates</li>
            <li className="pt-2 cursor-pointer hover:text-yellow-100">Contact Us</li>
          </ul>
        </div>
        <div></div>
      </div>
      <hr className="mt-24 mx-16 text-white" />
      <div className="flex mt-5 mx-16 justify-between text-white">
        <p>2024 @ LabourConnect. All rights reserved.</p>
        <div className="flex gap-5">
          <FaFacebook className="cursor-pointer hover:text-yellow-100" />
          <TiSocialTwitterCircular className="cursor-pointer hover:text-yellow-100" />
          <ImLinkedin className="cursor-pointer hover:text-yellow-100" />
          <FaInstagram className="cursor-pointer hover:text-yellow-100" />
        </div>
      </div>
    </div>
  );
};

export default Footer;