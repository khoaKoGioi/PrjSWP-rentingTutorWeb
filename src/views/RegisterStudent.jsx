import logo from "../assets/logo.png";
import { DatePicker } from "@nextui-org/react";
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx';
import React, { useState } from 'react';
import { GradePick } from "../components/GradePick.jsx";
import { Input, ThemeProvider } from "@material-tailwind/react";
import { Password } from "../components/Password.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    dateOfBirth: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleGradeChange = (grade) => {
    setFormData({ ...formData, grade });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the form submission logic, e.g., using fetch or axios
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
      } else {
        // Handle errors
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
          Create a new student account
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
              <Input label="Phone number" name="phone" onChange={handleChange} />
            </div>

            <div className="mt-6 flex space-x-4">
              <div className="w-2/3 box-border">
                <Input label="School" name="school" onChange={handleChange} required />
              </div>

              <div className="w-1/3 box-border">
                <GradePick onChange={handleGradeChange} />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="date" className="block text-sm font-medium leading-5 text-gray-700">
                Date of birth
              </label>
              <div className="mt-1">
                <DatePicker
                  id="date"
                  name="date"
                  onChange={handleDateChange}
                  className="appearance-none block w-full py-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <Password onChange={handleChange} />

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

export default Register;