import React, { useEffect } from 'react'
import Navbar from '../../components/landPage/Navbar'
import studying from "../../assets/applytoTeachForm/studying.png"
import { applyToTeachValidationSchema } from '../../utils/validation'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import { AppState,RootState } from '../../redux/store'
import { applyToTeach } from '../../redux/actions/user/userActions'
import toast from "react-hot-toast"
import { Navigate, useNavigate } from 'react-router-dom'

interface applyFormInterface {
    email: string,
    profession: string,
    profileDescription: string,
    linkedIn?:string,
    github?: string,
    mobile?: string
}

const initialValues :applyFormInterface = {
    email:"",
    profession: "",
    profileDescription: "",
    linkedIn: "",
    github: "",
    mobile: ""

}



function ApplytoTeachForm() {
    const { user ,error } = useSelector((state:RootState)=> state.user);
    const dispatch = useDispatch<AppState>();
    const navigate = useNavigate();

    const handleSubmit = async(values:applyFormInterface) => {
       
        if (user && user.email) { 
            values.email = user.email;
        } else {

            toast.error("User email not found");
            return;
        }

        
        const result = await dispatch(applyToTeach(values));
        if(result.meta.requestStatus === "fulfilled"){
            toast.success("instructor application submitted ")
        }
        if(result.meta.requestStatus === "rejected"){
            toast.error(result.payload || "application submission failed")
            navigate("/");
        }
    }

  return (
    <>  <div className='min-h-screen'>
        <Navbar/>
        <div className=' grid grid-cols-2'>
            <div className='col-span-1  '>
                <img src={studying} alt="" />
            </div>
            <div className='col-span-1 flex flex-col items-center justify-center'>
                <h1 className='font-bold text-3xl'>Become an <span className='text-darkBlue'>Instructor</span></h1>
            <div className='w-2/3 flex flex-col '>
                <Formik 
                   initialValues={initialValues}
                   validationSchema={applyToTeachValidationSchema}
                   onSubmit={handleSubmit}
                   >
                <Form className='w-full m-5 rounded-lg space-y-3'>
                     <div>
                    <Field as="select" name="profession" className='w-full p-3 bg-gray-100 border-none rounded-xl shadow-lg'>
                      <option value="">Choose profession</option>
                      <option value="Full stack developer">Full stack developer</option>
                      <option value="Front-end developer">Front-end developer</option>
                      <option value="Back-end developer">Back-end developer</option>
                      <option value="Python developer">Python developer</option>
                    </Field>
                    <ErrorMessage name="profession" component="div" className="text-red-500" />
                  </div>

                    <div>
                    <Field as="textarea" name="profileDescription" id="" placeholder='Profile Description' className='w-full p-3 bg-gray-100 rounded-xl shodow-lg'></Field>
                    <ErrorMessage name="profileDescription" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <Field type="url" name="linkedIn" className='w-full p-3 bg-gray-100 rounded-xl shodow-lg' placeholder='Linked In (optional) ' />
                        <ErrorMessage name="linkedIn" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <Field type="url" name="github" className='w-full p-3 bg-gray-100 rounded-xl shodow-lg' placeholder='GitHub (Optional)' />
                        <ErrorMessage name="github" component="div" className="text-red-500" />
                    </div>
                    <div>
                    <Field type="text" name="mobile" placeholder='Mobile' className='w-full p-3 bg-gray-100 rounded-xl shadow-lg' />
                    <ErrorMessage name="mobile" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <button type='submit' className='w-full p-2 bg-darkBlue text-white font-bold text-xl rounded-xl shodow-lg hover:bg-white hover:text-darkBlue hover:scale-105 hover:duration-300 hover:border-2 hover:border-gray-400'>Apply</button>
                    </div>
                    </Form>
                </Formik>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ApplytoTeachForm
