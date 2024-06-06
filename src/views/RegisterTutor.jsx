import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { DatePicker } from "@nextui-org/react";
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx';
import { Input, ThemeProvider, Textarea } from "@material-tailwind/react";
import { Password } from "../components/Password.jsx";
import ImageUploader from '../components/ImageUploader.jsx';
import '../styles/custom.css';

const RegisterTutor = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    workplace: "",
    dateOfBirth: "",
    password: "",
    address: "",
    credentialFiles: [],
    degreeFiles: [],
    photoId: [],
    listOfSubjects: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handlePhotoIdUpload = (files) => {
    setFormData({ ...formData, photoId: files });
  };

  const handleCredentialUpload = (files) => {
    setFormData({ ...formData, credentialFiles: files });
  };

  const handleDegreeUpload = (files) => {
    setFormData({ ...formData, degreeFiles: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file, index) => {
          formDataObj.append(`${key}[${index}]`, file);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    }
    // Implement the form submission logic, e.g., using fetch or axios
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formDataObj,
      });
      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully!');
      } else {
        // Handle errors
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
              <Input label="Fullname" name="fullname" onChange={handleChange} required />
            </div>

            <div className="mt-6 w-full">
              <Input label="Username" name="username" onChange={handleChange} required />
            </div>

            <div className="mt-6 w-full">
              <Input label="Email address" name="email" onChange={handleChange} required />
            </div>

            <div className="mt-6 w-full">
              <Input label="Phone number" name="phone" onChange={handleChange} required />
            </div>

            <div className="mt-6 w-full">
              <Input label="Home address" name="address" onChange={handleChange} required />
            </div>

            <div className="mt-6 flex space-x-4">
              <Input label="Workplace" name="workplace" onChange={handleChange} required />
            </div>

            <div className="mt-6">
              <label htmlFor="date" className="block text-sm font-medium leading-5 text-gray-700">
                Date of birth
              </label>
              <div className="mt-1">
                <DatePicker
                  id="date"
                  name="dateOfBirth"
                  onChange={handleDateChange}
                  required
                  className="appearance-none block w-full py-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6 w-full">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Upload photo ID 
              </label>
              <small className="text-red-500 block">*Please upload 1 picture of your full face.</small>
              <ImageUploader
                onUpload={handlePhotoIdUpload}
                maxFiles={1}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Upload Credential
              </label>
              <small className="text-red-500 block">*Please upload both two pictures of both sides of your Credential.</small>
              <ImageUploader
                onUpload={handleCredentialUpload}
                maxFiles={2}
                required
              />
            </div>

            <div className="mt-6 w-full">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Upload Degree
              </label>
              <small className="text-red-500 block">You can upload up to 4 degrees.</small>
              <ImageUploader
                onUpload={handleDegreeUpload}
                maxFiles={4}
              />
            </div>

            <div className="mt-6 w-full">
              <Textarea label="List of subjects" name="listOfSubjects" onChange={handleChange} required 
              placeholder="List of subjects which you want to teach"
              className="custom-placeholder"/>
            </div>

            <div className="mt-6 w-full">
              <Textarea label="Description" name="description" onChange={handleChange} required 
              placeholder="Give some more information about your backgroud and advantages "
              className="custom-placeholder"/>
            </div>

            <Password onChange={handleChange} required />

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
