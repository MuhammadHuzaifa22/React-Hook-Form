// Importing functions and variables.
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../Config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

// Form Submit Component
const AdmissionForm = () => {
  let [userEmail, setUserEmail] = useState("");
  let [userPhoto, setUserPhoto] = useState("");
  let [submitBtnLoadingCondition, setSubmitBtnLoadingCondition] =
    useState(false);
  let [selectedValue, setSelectedValue] = useState("male");
  let [haveUserLaptop, setHaveUserLaptop] = useState("yes");
  let [userLastQualification, setUserLastQualification] = useState("matric");

  const Navigate = useNavigate();

  // Use this for React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Get user gender
  function getUserGender(event) {
    setSelectedValue(event.target.value);
  }

  // Get is user have a laptop?
  function getUserHaveLaptop(event) {
    console.log(`before: ${haveUserLaptop}`);
    setHaveUserLaptop(event.target.value);
    console.log(event.target.value);
    console.log(`After: ${haveUserLaptop}`);
  }

// Get user last qualification
  function getUserLastQualification(event){
  setUserLastQualification(event.target.value);
  }


  // Form function admit user
  async function admitUser(data) {
    const form = document.getElementById("form");
    console.log(data);
    if (data.email !== "" || data.email !== null) {
      setSubmitBtnLoadingCondition(true);
      setUserEmail(data.email);
      showUrl(data.profileImage[0], data.email);
      const userImage = await showUrl(data.profileImage[0], data.email);
      console.log(userImage);
      console.log(selectedValue);
      if (userImage !== "" || userImage !== null) {
        data.userImage = userImage;
        data.userGender = selectedValue;
        data.haveUserLaptop = haveUserLaptop;
        data.userLastQualification = userLastQualification;
        console.log(data);
      }
      sendDataToFiresstore(data);
      setUserPhoto(userImage);
    } else {
      setSubmitBtnLoadingCondition(false);
    }

    // Reset all form after submit.
    form.reset();
  }

  // Send form submitter data to firestore
  async function sendDataToFiresstore(data) {
    console.log(data);
    console.log(data.haveUserLaptop);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        fullname: data.fullname,
        fathername: data.fathername,
        email: data.email,
        cnic: data.cnic,
        address: data.address,
        dateofbirth: data.dateofbirth,
        phonenumber: data.phonenumber,
        userProfile: data.userImage,
        userGender: selectedValue,
        haveUserLaptop: haveUserLaptop,
        userLastQualification:userLastQualification
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Firebase storage show URL function image to link converter
  async function showUrl(files, email) {
    const storageRef = ref(storage, email);
    try {
      const uploadImg = await uploadBytes(storageRef, files);
      const url = await getDownloadURL(storageRef);
      setSubmitBtnLoadingCondition(false);
      console.log(url);
      Navigate(`/admission`);
      return url;
    } catch (error) {
      console.log(error);
    }
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

        {/* Submission Form */}
        <form onSubmit={handleSubmit(admitUser)} id="form">
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
                {...register("fullname", {
                  required: true,
                  pattern: {
                    value: /^[A-Z][a-z]*.*$/,
                  },
                })}
              />
              {errors.fullname && (
                <span className="text-red-500">
                  {errors.fullname.type === "required"
                    ? "Full Name is required."
                    : "First letter must be capitalized."}
                </span>
              )}
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
                {...register("fathername", {
                  required: true,
                  pattern: {
                    value: /^[A-Z][a-z]*.*$/,
                  },
                })}
              />

              {errors.fathername && (
                <span className="text-red-500">
                  {errors.fathername.type === "required"
                    ? "Father Name is required."
                    : "First letter must be capitalized."}
                </span>
              )}
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
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email is required.</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="mb-1 " htmlFor="phone">
                Phone Number
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="number"
                placeholder="Phone Number"
                {...register("phonenumber", {
                  required: true,
                  minLength: 11,
                  maxLength: 11,
                  pattern: {
                    value: "/^03d{8}$/",
                    message:
                      "Phone Number must start with '03' and be 11 digits long.",
                  },
                })}
              />
              {errors.phonenumber && (
                <span className="text-red-500">
                  {errors.phonenumber.type === "required"
                    ? "Phone Number is required."
                    : errors.phonenumber.type === "minLength"
                    ? "Phone Number length must be equal to 11."
                    : errors.phonenumber.type === "maxLength"
                    ? "Phone Number length must be equal to 11."
                    : errors.phonenumber.type === "pattern"
                    ? "Phone Number must starts with 03"
                    : "Phone Number should meet the prevous requirements."}
                </span>
              )}
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
                {...register("cnic", {
                  required: true,
                  minLength: 13,
                  maxLength: 13,
                })}
              />
              {errors.cnic && errors.cnic.type === "required" && (
                <span className="text-red-500">CNIC is required.</span>
              )}

              {errors.cnic && errors.cnic.type === "minLength" && (
                <span className="text-red-500">
                  CNIC must be at least 13 characters long.
                </span>
              )}

              {errors.cnic && errors.cnic.type === "maxLength" && (
                <span className="text-red-500">
                  CNIC must be exactly 13 characters long.
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="mb-1 " htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
                type="date"
                {...register("dateofbirth", { required: true })}
              />
              {errors.dateofbirth && (
                <span className="text-red-500">Date of Birth is required.</span>
              )}
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
                value={selectedValue}
                onChange={getUserGender}
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
                value={haveUserLaptop}
                onChange={getUserHaveLaptop}
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
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className="text-red-500">Address is required.</span>
              )}
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
                value={userLastQualification}
                onChange={getUserLastQualification}
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
                {...register("profileImage", {
                  required: true,
                })}
              />

              {errors.profileImage && (
                <span className="text-red-500">Profile Image is required.</span>
              )}
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
              {submitBtnLoadingCondition ? (
                <button className="btn btn-primary w-full  text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                  <span className="loading loading-spinner"></span>
                  Submitting
                </button>
              ) : (
                <button className="btn btn-primary w-full  text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
