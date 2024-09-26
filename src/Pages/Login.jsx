
import React from 'react'
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors},
  } = useForm();

function loginUser(data){
    console.log(data)
}
  
    return (
        <>
          <h1 className="text-3xl text-center mt-4 font-medium">React Hook Form</h1>
          <form className="flex flex-col justify-center mt-2 gap-2 border-[1px] rounded border-primary p-2  w-[500px] mx-auto shadow-lg" onSubmit={handleSubmit(loginUser)}>
            <input
              type="text"
              placeholder="Enter your email"
              className="border-[1px] rounded border-primary text-xl p-[5px] shadow-lg"
              {...register("email",{required:true})}
            />
            {errors.email && <span className="text-red-500">This field is required</span>}
            <input
              type="text"
              placeholder="Enter your password"
              className="border-[1px] rounded border-primary text-xl p-[5px] shadow-lg"
             {...register("password",{required:true})}
            />
            {errors.password && <span>This field is required</span>}
            <button
              className="border-[1px] rounded mx-auto w-fit p-[5px]">
              Login
            </button>
          </form>
        </>
      );
  
}

export default Login