import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/JWTAuthContext.jsx";
import logo from "../assets/logo.png";
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import { Input, Textarea } from "@material-tailwind/react";
import { Password } from "../components/Password.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/custom.css";

const RegisterTutor = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    address: "", // Add address field
    avatar: null, // Add avatarFile field

    workplace: "",
    credentialFile: null,
    degreeFile: null,
    description: "",
  });
  const handleDateChange = (e) => {
    setFormData({ ...formData, dateOfBirth: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
     try {
      const response = await register("tutor", formData);
      console.log("Response:", response);
      alert("Tutor registered successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <header>
        <MegaMenuWithHover />
      </header>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a href="./" className="flex justify-center">
          <img className="h-48 w-48" src={logo} alt="Workflow" />
        </a>
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new tutor account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Or
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            {" "}
            login to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mt-6 w-full">
              <Input
                label="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <Input
                label="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <Input
                label="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <Input
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <Input
                label="Home address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 flex space-x-4">
              <Input
                label="Workplace"
                name="workplace"
                value={formData.workplace}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-5 text-gray-700">
                Date of birth
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  required
                  className="appearance-none block w-full py-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Upload Avatar
              </label>
              <small className="text-red-500 block">
                *Please upload pictures of your face as avatar.
              </small>
              <input
                type="file"
                name="avatar"
                
                onChange={handleFileChange}
                required
                
              />
            </div>
           

            <div className="mt-6 w-full">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Upload Credential
              </label>
              <small className="text-red-500 block">
                *Please upload pictures of your Credential.
              </small>
              <input
                type="file"
                name="credentialFile"
                
                onChange={handleFileChange}
                required
                
              />
            </div>

            <div className="mt-6 w-full">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Upload Degree
              </label>
              <small className="text-red-500 block">
                You can upload up to 4 degrees.
              </small>
              <input
                type="file"
                name="degreeFile"
                
                onChange={handleFileChange}
                
              />
            </div>

            
            <div className="mt-6 w-full">
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Give some more information about your background and advantages "
                className="custom-placeholder"
              />
            </div>

            <Password value={formData.password} onChange={handleChange} />

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTutor;
