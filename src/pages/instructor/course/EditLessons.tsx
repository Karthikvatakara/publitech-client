import  { useEffect, useState, useCallback } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CustomVideoFileInput } from '../../../components/common/filesUpload/CustomVideoFileInput';
import CustomSinglePdfUpload from '../../../components/common/filesUpload/CustomSinglePdfUpload';
import CustomSingleFileImage from '../../../components/common/filesUpload/CustomSingleFileImage';
import { CourseEntity } from '../../../interface/courseEntity';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateCourse, getAllCourse } from '../../../redux/actions/course/courseActons';
import { RootState, AppState } from '../../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../common/api';
import { getLocalStorage, removeLocalStorage } from '../../../utils/localStorage';
import { LessonEntity } from '../../../interface/courseEntity';
import { FormikHelpers } from 'formik';

const lessonValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  thumbnail: Yup.string().required('Thumbnail is required'),
  video: Yup.string().required('Video is required'),
  attachments: Yup.object().shape({
    title: Yup.string(),
    url: Yup.string().url('Invalid URL')
  })
});

const initialLesson: LessonEntity = {
  title: '',
  description: '',
  thumbnail: '',
  video: '',
  attachments: { title: '', url: '' }
};

function EditLessons() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState<CourseEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<{lessons: [LessonEntity]}>({ lessons: [initialLesson] });
  const dispatch: AppState = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const fetchCourseDetails = useCallback(async () => {
    if (id) {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${URL}/api/course/course/${id}`);
        setCourseDetails(data.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to fetch course details');
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  useEffect(() => {
    if (courseDetails && courseDetails?.lessons) {
      setInitialValues({ lessons: courseDetails?.lessons });
    }
  }, [courseDetails]);

  const handleSubmit = async (values:{ lessons: [LessonEntity]}, _actions: FormikHelpers<{ lessons: [LessonEntity]}>) => {
      try {
        console.log("🚀 ~ handleSubmit ~ values:", values)
        
        const data = getLocalStorage("editCourseData")
      const updatedCourseData = {
        ...data,
        lessons: values.lessons,
        instructorRef: user._id,
        stage: "requested",
        isVerified: false
      };
      const res = await dispatch(updateCourse({courseId:id!,updateData:updatedCourseData}));
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getAllCourse());
        removeLocalStorage("editCourseData")
        toast.success("Course updated successfully");
        navigate("/instructor/course");
      }
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Lessons</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
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
                    <div key={index} className="mb-8 p-4 border rounded">
                      <h2 className="text-xl font-semibold mb-4">Lesson {index + 1}</h2>
                      <div className="flex flex-wrap mx-2">
                        <div className="w-full md:w-1/2 px-2 mb-4 gap-3">
                          <div className="mb-4">
                            <CustomVideoFileInput
                              onChange={(file) => setFieldValue(`lessons.${index}.video`, file)}
                              initialValue={values.lessons[index].video}
                            />
                            <ErrorMessage name={`lessons.${index}.video`} component="div" className="text-red-500" />
                          </div>
                          <CustomSinglePdfUpload
                            onChange={(file) => setFieldValue(`lessons.${index}.attachments.url`, file)}
                            initialValue={values.lessons[index] && values.lessons[index].attachments?.url || ''}
                          />
                          <ErrorMessage name={`lessons.${index}.attachments.url`} component="div" className="text-red-500" />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                          <div className="mb-4">
                            <CustomSingleFileImage
                              onChange={(file) => setFieldValue(`lessons.${index}.thumbnail`, file)}
                              initialValue={values.lessons[index].thumbnail}
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
              Update Lessons
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditLessons;