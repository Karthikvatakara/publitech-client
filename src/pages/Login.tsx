import { FormEvent, useEffect, useState } from "react";
import loginlaptop from "../assets/loginLaptop.png";
import publitech from "../assets/publitech.png";
import InputField from "../components/common/InputField";
import {loginValidationSchema} from "../utils/validation/index"
import { Formik,Form } from "formik";
import PasswordInputField from "../components/common/PasswordInputField";
import { loginUser } from "../redux/actions/user/userActions";
import { useDispatch } from "react-redux";
import { AppState,RootState } from "../redux/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  const { user,error } = useSelector((state:RootState)=> state.user);
  const dispatch = useDispatch<AppState>();

  const handleSubmit = async(values:loginFormValues) => {
    // const { email,password } = values;

    const result =  await dispatch(loginUser(values));
    console.log(user,"1111111111111111111111");
    
    if(result.meta.requestStatus === "fulfilled"){
      console.log(result);
      toast.success(result?.payload.message);
    }
    if(result.meta.requestStatus ==="rejected"){
      toast.error(result?.payload);
    }
  }

  useEffect(()=>{
    console.log(user);
  },[user])

  interface loginFormValues {
    email: string,
    password: string
  }

  const initialValues:loginFormValues = {
    email:"",
    password:""
  }

  return (
    <>
      <div className="w-full min-h-screen grid md:grid-cols-12 relative grid-cols-1">
        <div className="md:col-span-7 grid-cols-1 flex flex-col flex-wrap justify-center items-center">
          <div className="absolute left-2 top-2">
            <img src={publitech} alt="" className="w-1/3" />
          </div>
          <div className="text-xl font-bold">
            <span>welcome Back!</span>
          </div>

          <div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
          <Form>
            <InputField
              type="text"
              placeholder="Email"
              name="email"
              icon={
                <>
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </>
              }
              style={{ padding: "20px" }}
            />

            <PasswordInputField
              type="password"
              placeholder="Password"
              name="password"
              icon={
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              }
              className="mt-4"
              style={{ padding: "20px" }}
            />
            
            <button type="submit" className="border border-1 border-primary text-primary text-center cursor-pointer rounded-xl p-2 ms-3 mt-4 font-bold w-full hover:text-white hover:bg-primary">login</button>
          </Form>
          </Formik>
          </div>

          <div className="mt-6">
            <h1 className="font-bold">
              dont have an account ?{" "}
              <span className="font-bold hover:text-[#22036F] text-primary">
                <Link to={"/signup"}>Register</Link>
              </span>
            </h1>
          </div>
        </div>
        <div className="col-span-5 bg-[#AFB3FF] hidden md:block"></div>
        <img
          src={loginlaptop}
          alt=""
          className="absolute left-[600px] top-[90px] w-1/3 hidden md:block"
        />
      </div>
    </>
  );
};

export default Login;
