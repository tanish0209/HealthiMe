import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className=" md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 py-5 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img className="mt-10 w-40" src={assets.logo} alt="" />
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul>
            <li>+91-1111111111</li>
            <li>healthime@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
