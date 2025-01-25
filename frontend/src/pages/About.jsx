import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        ABOUT <span className="text-gray-700 font-medium">US</span>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6  text-md text-gray-700">
          <p>
            Welcome to HealthiMe, Your trusted partner in managing your
            healthcare needs conveniently and efficiently. At HealthiMe, we
            understand the challenges faced when it comes to scheduling doctors
            appointments and managing their health records.
          </p>
          <p>
            HealthiMe is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at HealthiMe is to create a seameless healthcare
            experience for every user . We aim to bridge the gap between
            pateints and healthcare providers, making it easier for you to
            access the care you need, when you need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
