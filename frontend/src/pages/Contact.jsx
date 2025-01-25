import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-bold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-md">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-bold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            67389, 36th Avenue road,
            <br />
            Gurugram,Haryana,India
          </p>
          <p className="text-gray-500">
            Tel: +91-1111111111 <br />
            Email: healthime@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
