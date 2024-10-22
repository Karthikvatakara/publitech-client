import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CustomVideoFileInput } from '../../../components/common/filesUpload/CustomVideoFileInput';
import CustomSinglePdfUpload from '../../../components/common/filesUpload/CustomSinglePdfUpload';
import CustomSingleFileImage from '../../../components/common/filesUpload/CustomSingleFileImage';
// import { CourseEntity } from '../../../interface/courseEntity';
import { getLocalStorage,removeLocalStorage } from '../../../utils/localStorage';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getAllInstructorCourse, publishCourse } from '../../../redux/actions/course/courseActons';
import { AppState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { lessonValidationSchema } from '../../../utils/validation/lessonValidationSchema';

const initialLesson = {
  title: '',
  description: '',
  thumbnail: '',
  video: '',
  attachments: { title: '', url: '' }
};

function UploadLessons() {
  // const [ courseDetails,setCourseDetails ] = useState<CourseEntity | null>(null)
  const dispatch:AppState = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state:RootState) => state.user)

  const getData = () => {
    const data = getLocalStorage("tempCourseData")
    return data
  }
 

  const handleSubmit = async(values:any) => {
    console.log(values,"values");
    const localStorageData = getData()
    
    const data = {
      ...localStorageData,
      lessons:values.lessons,
      instructorRef: user._id,
    }
    console.log("🚀 ~ handleSubmit ~ data:", data)
    console.log(data,"send data");
    const res = await dispatch(publishCourse(data))
    if (res.meta.requestStatus === "fulfilled"){
      console.log("reached in the fulfilled section");
      
      removeLocalStorage("tempCourseData");
   
      dispatch(getAllInstructorCourse({ page: 1, limit: 6, search: '', stage: '' })).unwrap();

      toast.success("course updated succesfully")
 
      navigate("/instructor/course")
    }

  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Lessons</h1>
      <Formik
        initialValues={{ lessons: [initialLesson] }}
        validationSchema={Yup.object().shape({
          lessons: Yup.array().of(lessonValidationSchema)
        })}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="lessons"> 
              {({ push, remove }) => (
                <>
                  {values.lessons.map((_, index) => (
                    <div key={index} className="mb-8 p-4 border rounded ">
                      <h2 className="text-xl font-semibold mb-4">Lesson {index + 1}</h2>
                      <div className="flex flex-wrap mx-2 ">
                        <div className="w-full md:w-1/2 px-2 mb-4 gap-3 ">
                        <div className="mb-4">

                          <CustomVideoFileInput
                            onChange={(file) => setFieldValue(`lessons.${index}.video`, file)}
                          />
                          <ErrorMessage name={`lessons.${index}.video`} component="div" className="text-red-500" />
                          
                        </div>
                          <CustomSinglePdfUpload
                            onChange={(file) => setFieldValue(`lessons.${index}.attachments.url`, file)}
                          />
                          <ErrorMessage name={`lessons.${index}.attachments.url`} component="div" className="text-red-500" />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4 ">
                          <div className="mb-4 ">
                            <CustomSingleFileImage
                              onChange={(file) => setFieldValue(`lessons.${index}.thumbnail`, file)}
                            />
                            <ErrorMessage name={`lessons.${index}.thumbnail`} component="div" className="text-red-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block mb-2">Lesson Title</label>
                            <Field
                              name={`lessons.${index}.title`}
                              className="w-full p-2 border rounded"
                            />
                            <ErrorMessage name={`lessons.${index}.title`} component="div" className="text-red-500" />
                          </div>
                          <div className="mb-4">
                            <label className="block mb-2">Lesson Description</label>
                            <Field
                              as="textarea"
                              name={`lessons.${index}.description`}
                              className="w-full p-2 border rounded"
                            />
                            <ErrorMessage name={`lessons.${index}.description`} component="div" className="text-red-500" />
                          </div>
                        </div>
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        >
                          Delete Lesson
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push(initialLesson)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 m-2"
                  >
                    Add New Lesson
                  </button>
                </>
              )}
            </FieldArray>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-6 m-2"
            >
              Save Lessons
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UploadLessons;