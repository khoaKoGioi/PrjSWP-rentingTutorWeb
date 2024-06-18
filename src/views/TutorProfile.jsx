// src/ExtendedUserProfile.jsx
import { useState } from "react";
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import {
  FaEnvelope,
  FaPhone,
  FaHome,
  FaBuilding,
  FaBirthdayCake,
  FaUser,
  FaBook,
  FaInfoCircle,
} from "react-icons/fa";

const TutorProfile = () => {
  const [user, setUser] = useState({
    avatar:
      "https://i.pinimg.com/originals/b5/d9/f6/b5d9f6262c408ee0fdd6ce12f2e6e1b9.jpg",
    name: "Khoa",
    username: "khoacucuc",
    email: "khoa@gmail.com",
    phone: "09009009",
    homeAddress: "82/2 Nguyen long long",
    workplace: "FPT University",
    dob: "2004-01-01",
    subjects: "Math, Science, English",
    description:
      "handsome, well-known for having a deep knowledge and good teaching technique",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    // Here you would typically handle the update, e.g., send the updated data to a server
    console.log("User updated:", user);
  };

  return (
    <div>
      <div className="container mx-auto p-4 pt-16">
        <header>
          <MegaMenuWithHover />
        </header>
      </div>
      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <div className="font-extrabold bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent text-2xl py-5">
          {/*eslint-disable-next-line react/no-unescaped-entities */}
          {user.name}'s Profile
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="w-24 h-24 flex-shrink-0">
            <img
              className="rounded-full w-full h-full object-cover"
              src={user.avatar}
              alt="User Avatar"
            />
          </div>
          <div className="ml-6 flex-1">
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-600" />
              <label className="flex-1">
                <span className="block text-sm font-medium text-gray-700">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center mb-4">
            <FaUser className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Username
              </span>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Email Address
              </span>
              <input
                type="email"
                name="email"
                value={user.email}
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
                value={user.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaHome className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Home Address
              </span>
              <input
                type="text"
                name="homeAddress"
                value={user.homeAddress}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaBuilding className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Workplace
              </span>
              <input
                type="text"
                name="workplace"
                value={user.workplace}
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
                value={user.dob}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaBook className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                List of Subjects
              </span>
              <input
                type="text"
                name="subjects"
                value={user.subjects}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </label>
          </div>
          <div className="flex items-center mb-4">
            <FaInfoCircle className="mr-2 text-gray-600" />
            <label className="flex-1">
              <span className="block text-sm font-medium text-gray-700">
                Description
              </span>
              <textarea
                name="description"
                value={user.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="3"
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

export default TutorProfile;
