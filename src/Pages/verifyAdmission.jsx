// Improting functions and variables
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

// Admssion Verification Component
const AdmissionVerification = () => {
  // Variables Declaration
  const Navigate = useNavigate();
  let [userVerified, setUserVerified] = useState(false);
  let [submitBtnLoadingCondition, setSubmitBtnLoadingCondition] = useState(false);
  let [modalClosingCount, setModalClosingCount] = useState(3);
  let [userCnic, setUserCnic] = useState("");
  let [userAlreadyVerifiedCondition,setUserAlreadyVerifiedCondition] = useState(false);
  let [docData,setData] = useState([]);

  // Use for Reack Hook Form for validations
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  

useEffect(()=>{
  async function getAlreadyVerifiedUsers(){
    try {
      const querySnapshot = await getDocs(collection(db, "verifiedUsers"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().cnic);
       if(doc.data().cnic === userCnic){
          setUserAlreadyVerifiedCondition(true);
          console.log("Setuser already verified condition is true.")
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  
}

getAlreadyVerifiedUsers();
},[userCnic,userAlreadyVerifiedCondition])


// Get user submited cnic
async function getUserRegisteredCnic(data) {
    if(userAlreadyVerifiedCondition === true){
      alert('You are already verified.');
      return
    }    
    
    setUserCnic(data.cnic);
    getDataFromFiresore(data.cnic); 
}




  // Get data form Firestore
  async function getDataFromFiresore(cnic) {

    try {
      const q = query(collection(db, "users"), where("cnic", "==", cnic));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSubmitBtnLoadingCondition(true);
        console.log(doc.id, " => ", doc.data());
        addSpecificUserDataToFirestore(doc.id, doc.data());
      });

    } catch (error) {
      console.log(error);
      setSubmitBtnLoadingCondition(false);
    }
  }

  
    
    
      
      


  // Add specific user data to firestore
  async function addSpecificUserDataToFirestore(id, data) {
    if(userAlreadyVerifiedCondition === true){
      alert('You are already verified')
      return
    }
    try {
      console.log(data.cnic);
      const docRef = await addDoc(collection(db, "verifiedUsers"), data);
      console.log(data.cnic);
      console.log("Document written with ID: ", docRef.id);
      setSubmitBtnLoadingCondition(false);
      // setUserVerified(true);
      setInterval(() => {
        setModalClosingCount(modalClosingCount - 1);
      }, 500);

      // setTimeout(() => {
      //   setUserVerified(false);
      // }, 1500);

      // Navigate(`/Home`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col  justify-center ">
      <div className="w-full max-w-full  p-8 rounded-lg shadow-md pt-5">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 bg-gray-100 p-2 w-fit rounded-[20px] mx-auto">
          <Link to="/">
            <button className="bg-gray-200 py-1 px-4 text-black rounded-l-lg focus:outline-none">
              Admission Form
            </button>
          </Link>
          <Link to="/admission">
            <button className="bg-gray-300 text-black py-1 px-4 rounded-r-lg focus:outline-none">
              Verify Admission
            </button>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Admission Verification
        </h1>

        <form onSubmit={handleSubmit(getUserRegisteredCnic)}>
          {/* CNIC Input */}
          <div className="flex flex-col mb-8">
            <label className="mb-1" htmlFor="cnic">
              CNIC (Which you provided during form submission)
            </label>
            <input
              className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-offset-2 focus:ring-pastel"
              type="text"
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

          {/* Submit Button */}
          <div>
            {submitBtnLoadingCondition ? (
              <button className="btn btn-primary w-full  text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                <span className="loading loading-spinner"></span>
                Submitting
              </button>
            ) : (
              <button className="w-full btn  btn-primary text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                Submit
              </button>
            )}

            {/* Modal for verification message */}
            {userVerified ? (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 7l-6 6-3-3 1.41-1.41L10 10.17l5.59-5.59L15 7z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Verified</h2>
                  </div>
                  <p className="text-gray-600 mb-4">You are verified.</p>

                  <div className="flex justify-end">
                    <h1>{modalClosingCount}</h1>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionVerification;
