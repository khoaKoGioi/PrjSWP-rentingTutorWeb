import { useState } from "react";
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import {
  FaStar,
  FaUser,
  FaBook,
  FaCertificate,
  FaInfoCircle,
} from "react-icons/fa";

const ViewTutorProfile = () => {
  const [tutor] = useState({
    avatar:
      "https://i.pinimg.com/originals/b5/d9/f6/b5d9f6262c408ee0fdd6ce12f2e6e1b9.jpg",
    name: "Khoa cute",
    description:
      "Experienced in English and Math with over 10 years of teaching",
    subjects: "Math, Science, Physics, Chemistry",
    certificate: "place for inputting certificate",
    rating: 4.5,
  });

  const [isRequestOpen, setRequestOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const handleRequestClick = () => {
    setRequestOpen(!isRequestOpen);
  };

  const handleRequestChange = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleSendRequest = () => {
    // Here you would handle the request, e.g., send the request message to a server
    console.log("Request message sent:", requestMessage);
    // Close the request box after sending the message
    setRequestOpen(false);
    setRequestMessage("");
  };

  return (
    <div>
      <div className="container mx-auto p-4 pt-16 mt-16">
        <header>
          <MegaMenuWithHover />
        </header>
      </div>
      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <div className="font-extrabold bg-gradient-to-r mb-7 from-orange-500 to-orange-800 bg-clip-text text-transparent text-2xl py-5">
          {/*eslint-disable-next-line react/no-unescaped-entities */}
          {tutor.name}'s Profile
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="w-32 h-32 flex-shrink-0">
            <img
              className="rounded-full w-full h-full object-cover"
              src={tutor.avatar}
              alt="Tutor Avatar"
            />
          </div>
          <div className="ml-6 flex-1">
            <div className="mb-4">
              <h2 className="flex items-center">
                <FaUser className="mr-2 text-gray-600" /> {tutor.name}
              </h2>
            </div>
            <div className="mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-gray-600" />
              <p>{tutor.description}</p>
            </div>
            <div className="mb-4 flex items-center">
              <FaBook className="mr-2 text-gray-600" />
              <p>{tutor.subjects}</p>
            </div>
            <div className="mb-4 flex items-center">
              <FaCertificate className="mr-2 text-gray-600" />
              <p>{tutor.certificate}</p>
            </div>
            <div className="mb-4 flex items-center">
              <FaStar className="mr-2 text-gray-600 text-yellow-600" />
              <p>{tutor.rating} / 5.0</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleRequestClick}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 mb-4"
        >
          Send Request
        </button>
        {isRequestOpen && (
          <div className="w-full">
            <textarea
              value={requestMessage}
              onChange={handleRequestChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4"
              rows="3"
              placeholder="Write your request here..."
            />
            <button
              onClick={handleSendRequest}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-300"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTutorProfile;
