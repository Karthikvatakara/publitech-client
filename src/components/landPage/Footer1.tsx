import React from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../../assets/publitechwhitelogo.png"
import { TiSocialTwitterCircular } from "react-icons/ti";
import { ImLinkedin } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img className="h-12 w-auto mb-4" src={logo} alt="Publitech Logo" />
            <p className="text-sm">
              Find reliable blue-collar workers for your home projects. Browse
              profiles and book skilled professionals hassle-free.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-100">Services</a></li>
              <li><a href="#" className="hover:text-yellow-100">Teach With us</a></li>
              <li><a href="#" className="hover:text-yellow-100">Terms</a></li>
              <li><a href="#" className="hover:text-yellow-100">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-100">Help Docs</a></li>
              <li><a href="#" className="hover:text-yellow-100">Guide</a></li>
              <li><a href="#" className="hover:text-yellow-100">Updates</a></li>
              <li><a href="#" className="hover:text-yellow-100">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-100"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-yellow-100"><TiSocialTwitterCircular size={24} /></a>
              <a href="#" className="hover:text-yellow-100"><ImLinkedin size={24} /></a>
              <a href="#" className="hover:text-yellow-100"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Publitech. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="text-sm hover:text-yellow-100 mr-4">Terms of Service</a>
            <a href="#" className="text-sm hover:text-yellow-100">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;