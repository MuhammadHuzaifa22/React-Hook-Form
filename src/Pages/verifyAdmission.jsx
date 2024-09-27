import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AdmissionVerification = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors},
  } = useForm();


  return (
    <div className="flex flex-col  justify-center ">
      <div className="w-full max-w-full  p-8 rounded-lg shadow-md pt-5">
     {/* Tab Navigation */}
     <div className="flex justify-center mb-8 bg-gray-100 p-2 w-fit rounded-[20px] mx-auto">
          <Link to='/'><button className="bg-gray-200 py-1 px-4 text-black rounded-l-lg focus:outline-none">Admission Form</button></Link>
          <Link to='/admission'><button className="bg-gray-300 text-black py-1 px-4 rounded-r-lg focus:outline-none">Verify Admission</button></Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Admission Verification</h1>

        {/* CNIC Input */}
        <div className="flex flex-col mb-8">
          <label className="mb-1 " htmlFor="cnic">
            CNIC (Which you provided during form submission)
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
            type="text"
            placeholder="CNIC"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button className="w-full btn btn btn-primary text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionVerification;
