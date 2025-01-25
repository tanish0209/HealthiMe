import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    image: assets.profile_pic,
    email: "johndoe@gmail.com",
    phone: "+91 1234567890",
    address: "xyz, xyz street,New Delhi,Delhi,India",
    gender: "Male",
  });
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex flex-col md:flex-row gap-2 text-sm">
      <img className="w-36 h-36 rounded-md " src={userData.image} alt="" />
      <div className="md:mx-20">
        <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-700 mb-2">
          {isEdit ? (
            <input
              className="bg-gray-100"
              placeholder="Enter Name"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p>{userData.name}</p>
          )}
        </div>

        <hr className="border-none outline-none h-1 bg-primary m-auto" />
        <div className="my-5 align-left">
          <p className="text-gray-700 font-semibold text-2xl mb-3">
            CONTACT INFORMATION
          </p>
          <div>
            <p className="flex text-xl text-gray-600 font-medium my-2">
              Email Id:{" "}
              {isEdit ? (
                <input
                  className="bg-gray-100"
                  placeholder="Enter Email Id"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-500 mx-2">{userData.email}</p>
              )}
            </p>
            <p className="flex text-xl text-gray-600 font-medium my-2">
              Contact Number:{" "}
              {isEdit ? (
                <input
                  className="bg-gray-100"
                  placeholder="Enter Contact Number"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-500 mx-2">{userData.phone}</p>
              )}
            </p>
            <p className="flex text-xl text-gray-600 font-medium my-2">
              Address:{" "}
              {isEdit ? (
                <input
                  className="bg-gray-100"
                  placeholder="Enter Address"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-500 mx-2">{userData.address}</p>
              )}
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-700 font-semibold text-2xl mb-3">
            BASIC INFORMATION
          </p>
          <div>
            <p className="flex text-xl text-gray-600 font-medium my-2">
              Gender:{" "}
              {isEdit ? (
                <select
                  className="w-96 bg-gray-100"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="Male"></option>
                  <option value="Female"></option>
                  <option value="Transgender"></option>
                  <option value="Other"></option>
                </select>
              ) : (
                <p className="text-gray-500 mx-2">{userData.gender}</p>
              )}
            </p>
          </div>
        </div>
        <div>
          {isEdit ? (
            <button onClick={() => setIsEdit(false)}>Save Information</button>
          ) : (
            <button onClick={() => setIsEdit(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
