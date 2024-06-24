import React, { useState, useContext, useEffect, useRef } from "react";
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import {
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaBirthdayCake,
  FaGraduationCap,
  FaUser,
  FaRegEdit,
} from "react-icons/fa";
import AuthContext from "../contexts/JWTAuthContext";


const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // Implement the update logic here
    console.log("User updated:", userData);
    try {
      // Send updated data to the server
      // await updateUserProfile(userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData((prevData) => ({
          ...prevData,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 pt-16">
        <header>
          <MegaMenuWithHover />
        </header>
      </div>
      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-5">
        <div className="font-extrabold bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent text-2xl py-5">
          {userData.name || userData.username}'s Profile
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="avatar-container w-24 h-24 flex-shrink-0 relative cursor-pointer" onClick={handleAvatarClick}>
            <img
              className="avatar-image rounded-full w-full h-full object-cover"
              src={userData.avatar || "default-avatar.png"} // Provide a default avatar if none is set
              alt="User Avatar"
            />
            <div className="avatar-overlay absolute inset-0 bg-black opacity-50 flex justify-center items-center rounded-full">
              <FaRegEdit className="edit-icon text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="ml-6 flex-1">
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-600" />
              <label className="flex-1">
                <span className="block text-sm font-medium text-gray-700">
                  User Name
                </span>
                <input
                  type="text"
                  name="username"
                  value={userData.username || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center mb-4">
            <FaEnvelope className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaPhone className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Phone Number
              </span>
              <input
                type="text"
                name="phone"
                value={userData.phone || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaSchool className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                School
              </span>
              <input
                type="text"
                name="school"
                value={userData.school || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaBirthdayCake className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Date of Birth
              </span>
              <input
                type="date"
                name="dob"
                value={userData.dob || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaGraduationCap className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Grade
              </span>
              <input
                type="text"
                name="grade"
                value={userData.grade || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
