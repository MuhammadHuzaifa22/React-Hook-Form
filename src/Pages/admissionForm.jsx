import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Form function admit user
  function admitUser(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-full p-8 px-[100px] rounded-lg shadow-md pt-5">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 bg-gray-100 p-2 w-fit rounded-[20px] mx-auto">
          <Link to="/">
            <button className="bg-gray-300 py-1  text-black px-4 rounded-l-lg focus:outline-none">
              Admission Form
            </button>
          </Link>
          <Link to="/admission">
            <button className="bg-gray-200  text-black py-1 px-4 rounded-r-lg focus:outline-none">
              Verify Admission
            </button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center  mb-8">Admission Form</h1>

        <form onSubmit={handleSubmit(admitUser)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="text"
                placeholder="Full Name"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <span className="text-red-500">Full Name is required.</span>}
            </div>

            {/* Father Name */}
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="fatherName">
                Father Name
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="text"
                placeholder="Father Name"
                {...register('fathername',{required:true})}
              />
              {errors.fathername && <span className="text-red-500">Father Name is rquired.</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 " htmlFor="email">
                Email
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="email"
                placeholder="Email"
                {...register('email',{required:true})}
              />
              {errors.email && <span className="text-red-500">Email is required.</span>}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="mb-1 " htmlFor="phone">
                Phone Number
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="text"
                placeholder="Phone Number"
                {...register('phonenumber',{required:true})}
              />
              {errors.phonenumber && <span className="text-red-500">Phone Number is required.</span>}
            </div>

            {/* National ID */}
            <div className="flex flex-col">
              <label className="mb-1 " htmlFor="cnic">
                National ID (CNIC)
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="number"
                placeholder="CNIC"
                {...register('cnic',{required:true})}
              />
              {errors.cnic && <span className="text-red-500">CNIC is required.</span>}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="mb-1 " htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="date"
                {...register('dateofbirth',{required:true})}
              />
              {errors.dateofbirth && <span className="text-red-500">Date of Birth is required.</span>}
            </div>

            {/* Gender */}
<div className="flex flex-col">
  <label className="mb-1 " htmlFor="gender">
    Gender
  </label>
  <select
    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
    id="gender"
    name="gender"
  >
   
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>


            {/* Laptop */}
<div className="flex flex-col">
  <label className="mb-1" htmlFor="laptop">
    Do you have a Laptop?
  </label>
  <select
    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
    id="laptop"
    name="laptop"
  >
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>


            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-gray-600" htmlFor="address">
                Address
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="text"
                placeholder="Address"
                {...register('address',{required:true})}
              />
              {errors.address && <span className="text-red-500">Address is required.</span>}
            </div>

            {/* Last Qualification */}
<div className="flex flex-col col-span-2">
  <label className="mb-1" htmlFor="qualification">
    Last Qualification
  </label>
  <select
    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
    id="qualification"
    name="qualification"
  >
    <option value="matric">Matric</option>
    <option value="intermediate">Intermediate</option>
    <option value="bachelors">Bachelors</option>
    <option value="masters">Masters</option>
  </select>
</div>


            {/* Profile Image */}
            <div className="flex flex-col col-span-2">
              <label className="mb-1 " htmlFor="profileImage">
                Profile Image
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="file"
                id="profileImage"
                {...register('profileImage',{required:true,minLength:13,maxLength:13})}
              />
             
              {errors.profileImage && <span className="text-red-500">Profile Image is required.</span>}
            </div>

            <div className="col-span-2">
              <ul className="list-disc ml-5 ">
                <li>With white or blue background</li>
                <li>File type: jpg, jpeg, png</li>
                <li>Upload your recent passport-size picture</li>
                <li>Your face should be clearly visible without any glasses</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button className="btn btn-primary w-full  text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
