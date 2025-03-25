/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        console.log("error");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className=" max-w-3xl flex flex-col  gap-2 text-sm">
        <div className="md:mx-20">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer ">
                <img
                  className="w-36  rounded-md opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-36 absolute z-[4] bottom-0 right-0"
                  src={image ? "" : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img className="w-36  rounded-md " src={userData.image} alt="" />
          )}
        </div>
        <div className=" md:mx-20">
          <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-700 mb-2">
            {isEdit ? (
              <input
                placeholder="Enter Name"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <span>{userData.name}</span>
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
                    placeholder="Enter Email Id"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span className="text-gray-500 mx-2">{userData.email}</span>
                )}
              </p>
              <p className="flex text-xl text-gray-600 font-medium my-2">
                Contact Number:{" "}
                {isEdit ? (
                  <input
                    placeholder="Enter Contact Number"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span className="text-gray-500 mx-2">{userData.phone}</span>
                )}
              </p>
              <p className="flex text-xl text-gray-600 font-medium my-2">
                Address:{" "}
                {isEdit ? (
                  <input
                    placeholder="Enter Address line 1"
                    type="text"
                    onChange={(e) =>
                      setUserData.address((prev) => ({
                        ...prev,
                        line1: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span className="text-gray-500 mx-2">
                    {userData.address
                      ? `${userData.address.line1} ${userData.address.line2}`
                      : "Address not provided"}
                  </span>
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
                    placeholder="Select gender"
                    className="w-64 text-gray-500"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className="text-gray-500 mx-2">{userData.gender}</span>
                )}
              </p>
            </div>
          </div>
          <div className="mt-10">
            {isEdit ? (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
