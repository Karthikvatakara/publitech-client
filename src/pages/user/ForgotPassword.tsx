import React from 'react';
import  forgotpassword  from "../../assets/forgot-password/forgot-password.png";
import { Formik,Form } from 'formik';
import { emailValidationSchema } from '../../utils/validation';
import InputField from '../../components/common/InputField';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { forgotPassword } from '../../redux/actions/user/userActions';
import toast  from 'react-hot-toast';
import { FaHome } from "react-icons/fa";


const initialValues = {
    email:""
}

const ForgotPassword:React.FC = ()=> {
    const dispatch = useDispatch<AppState>();
    // const Navigate = Navigate()
    

    const handleSubmit = async(values:{email:string}, { resetForm }: { resetForm: () => void }) => {
        try{
            console.log("🚀 ~ handleSubmit ~ values:", values.email)
            const res = await dispatch(forgotPassword(values.email))
            console.log("🚀 ~ handleSubmit ~ res:", res);
            if(res.meta.requestStatus === "fulfilled"){
                toast.success("A link is sent to your email")
                toast.success("Check your email")
                resetForm();
            }else if(res.meta.requestStatus === "rejected"){
                toast.error(res.payload)
                resetForm();
            }
        }catch(error:any){
            console.error(error,"error in theandlesubmit")
            toast.error(error?.message)
        }
    }


  return (
    <div className='grid md:grid-cols-12 grid-cols-1 min-h-screen w-full'>
        <div className="col-span-7 justify-center items-center md:flex hidden">
            <img src={forgotpassword} alt="" className=''/>
        </div>
        <div className="md:col-span-5 grid-cols-1  flex flex-col  justify-center px-4 md:px-8 w-full max-w-md mx-auto gap-3">
                <h1 className='font-bold text-2xl'>Forgot Password</h1>
                <p className='text-gray-500 font-semibold'>Enter your email and we'll send a link to reset your password</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={emailValidationSchema}
                    onSubmit={handleSubmit}>
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
                        }/>
                <button type="submit" className="border border-1 border-primary text-primary text-center cursor-pointer rounded-xl p-2 ms-3 mt-4 font-bold w-full hover:text-white hover:bg-darkBlue">Submit</button>
                    </Form>
                </Formik>
                <div className="flex justify-center gap-2">
                   <Link to={"/login"}><h1 className='text-darkBlue font-bold'>Back to Login ?</h1></Link> 
                </div>
                <div className="flex justify-center gap-3">
                   <Link to={"/"}><h1 className='text-2xl font-bold'><FaHome/></h1></Link> 
                </div>
            </div>
        </div>
  )
}

export default ForgotPassword