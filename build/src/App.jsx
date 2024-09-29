import React from "react";
import { useForm } from "react-hook-form";

const App = () => {
// Variable Declaration
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Login Functionaf
  function loginUser(data) {
    console.log(data)

  }

  
};

export default App;
