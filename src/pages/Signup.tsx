import React, { useState, useEffect } from 'react';
import signupRectangle from "../assets/signuprectangle.png";
import signuplaptop from "../assets/signuplaptop.png";
import publiTech from "../assets/publitech.png";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/common/InputField';
import PasswordInputField from '../components/common/PasswordInputField';
import { useDispatch,useSelector } from 'react-redux';
import { AppState,RootState } from '../redux/store';
import { signupUser } from '../redux/actions/user/userActions';
import toast from 'react-hot-toast'
import OtpComponent from '../components/otp/OtpComponent';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { googleLoginSignup } from '../redux/actions/user/userActions';

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string;
}

 interface TempData {
  username: string,
  email: string,
  password: string
}

const temporaryData = {
  username: "",
  email: "",
  password: "",
  otp:""
}

const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required')
});


const Signup: React.FC = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppState>();
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const [tempData,setTempData] = useState<TempData>(temporaryData)
  const [renderKey, setRenderKey] = useState<number>(0);


  useEffect(() => {
    console.log("User:", user, "Error:", error, "Loading:", loading);
    if (user && !error && !loading) {
      setIsOtp(true);
      setTempData(user);
      setRenderKey(prevKey => prevKey + 1);
    }
  }, [user, error, loading]);

  const initialValues: SignupFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  };

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      const { confirmPassword,otp,...restValues } = values;
      console.log(restValues);
      
      const result =  await dispatch(signupUser(restValues))
      // console.log(result, "formData is by onsubmit");
      // const response = await axios.post(`${URL}/api/auth/signup`, restValues, config)
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("OTP sent successfully");
        setIsOtp(true);
        setTempData(prevState => ({ ...prevState, ...restValues }));
        setRenderKey(prevKey => prevKey + 1);
     }else if(result.meta.requestStatus === "rejected"){
        // toast.error("signup failed")
        toast.error(result?.payload);
        console.error("Signup failed:", result.payload);
        //  const errorResponse = result.payload as any
          // toast.error(errorResponse?.response?.data.error || "signup failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGoogle = async(data:any) => {
    console.log("🚀 ~ loginWithGoogle ~ data:", data)
    const res = await dispatch(googleLoginSignup(data))
    console.log("🚀 ~ loginWithGoogle ~ res:", res)
  }
  
  return (
    <div className='min-h-screen grid md:grid-cols-12 relative'>
      <div className='md:col-span-5 hidden md:block bg-[#AFB3FF]'></div>
      <img src={publiTech} alt="" className='absolute md:w-1/6 w-1/3'/>
      <img src={signupRectangle} alt="" className='absolute w-1/4 left-[300px] top-[60px] md:block hidden'/>
      <img src={signuplaptop} alt="" className='absolute w-1/3 left-[200px] top-[200px] md:block hidden' />

      <div className='md:col-span-7 bg-white'>
        {isOtp ?(
          <OtpComponent key={renderKey} userData= {tempData}/>
        ):(
          <>
        <div className='flex flex-col flex-wrap justify-center items-center mt-[80px]'>
          <h1 className='font-bold'>Fill out the form to Register!</h1>
        </div>

        <div className='md:w-full'>
          <Formik
            initialValues={initialValues}
            validationSchema={signupValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className='flex flex-wrap md:ps-[140px] md:pe-[100px]'>
              <InputField
                type="text"
                placeholder="Username"
                name="username"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                  </svg>
                }
                style={{ padding: "20px" }}
                className='w-full'
              />

              <InputField
                type="email"
                placeholder="Email"
                name="email"
                icon={
                  <>
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </>
                }
                style={{ padding: "20px" }}
                className='w-full'
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
                style={{ padding: "20px" }}
                className='w-full'
              />

              <PasswordInputField
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                icon={
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                }
                style={{ padding: "20px" }}
                className='w-full'
              />

              <button type='submit' className='border border-primary bg-primary text-white hover:bg-white hover:text-primary text-center cursor-pointer rounded-xl p-2 ms-3 mt-4 font-bold w-full'>
                Signup
              </button>
            </Form>
          </Formik>
          <div className=' mt-3 space-y-2'> 
          <div className="flex justify-center ">
              <GoogleLogin
              onSuccess={(credentialResponse) => {
                loginWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("login failed"); 
              }}/>
              </div>
            <div className='flex justify-center'>
            <h1 className='font-bold'>Yes I have an account? <span className='text-primary hover:text-[#22036F]'><Link to={"/login"}>Login</Link></span></h1>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  )
}

export default Signup;