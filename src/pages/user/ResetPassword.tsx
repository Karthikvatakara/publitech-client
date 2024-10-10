import { FC, useState } from 'react'
import resetPassword from "../../assets/updatePassword/resetPassword.png"
import { Formik,Form } from 'formik'
import PasswordInputField from '../../components/common/PasswordInputField'
import { resetPasswordValidationSchema } from '../../utils/validation/resetPasswordValidation'
import axios from 'axios'
import { config } from '../../common/configurations'
import toast from 'react-hot-toast'
import { URL } from '../../common/api'
import { Link } from 'react-router-dom'
import Modal from '../../components/common/modal'

interface formValues {
  password: string,
  confirmPassword: string
}
const ResetPassword: FC = () => {
  const [ finalMessage,setFinalMessage ] = useState<boolean>(false)
  const params = new URLSearchParams(window.location.search);
  const param = params.get("token")
  console.log("🚀 ~ param:", param)

  const initialValues: formValues = {
    password: "",
    confirmPassword: ""
  }

  const handleSubmit = async(values:formValues,{ resetForm }: { resetForm: () => void }) => {
    try{
      const { password } = values;
      const data = { param,password }
      
      const response = await axios.post(`${URL}/api/auth/update-password`,  data  ,config);
      console.log("🚀 ~ handleSubmit ~ response:", response)
      if(response.data.success){
        toast.success(response?.data?.message)
        resetForm();
        setFinalMessage(true)
      }else {
        toast.error(response.data?.message)
      }
    }catch(error:any){
      console.log(error,"errror is occured here!!!!!!!!!!!!!!!!!!!!!!!!!");
      resetForm();
      toast.error(error?.response?.data?.message)
    }
    
  }

  return (
    <div className='grid md:grid-cols-12 grid-cols-1 min-h-screen w-full'>
      <div className="col-span-7  md:flex hidden items-center justify-center">
        <img src={resetPassword} alt="" className='w-auto'/>
      </div>
      <div className="md:col-span-5 grid-cols-1  flex flex-col  justify-center px-4 md:px-8 w-full max-w-md mx-auto gap-3">
        <h1 className='font-bold text-2xl'>Reset Your Password</h1>
        <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={handleSubmit}
        >
          <Form>
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
            <button type="submit" className="border border-1 border-primary text-white bg-darkBlue text-center cursor-pointer rounded-xl p-2 ms-3 mt-4 font-bold w-full hover:text-darkBlue hover:bg-white">login</button>
          </Form>
        </Formik>

        <Modal
          show={finalMessage}
          onClose={() => setFinalMessage(false)}
          title="Success"
        >
          <p>Your password has been reset successfully. Please log in again.</p>
          <div className='flex items-center justify-center mt-4'>
            <Link className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" to="/login">
              Go to Login
            </Link>
          </div>
        </Modal>

      </div>
    </div>
  )
}

export default ResetPassword