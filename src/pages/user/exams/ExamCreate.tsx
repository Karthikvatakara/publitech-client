import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../common/api';
import { config, configMultiPart } from '../../../common/configurations';
import { CourseEntity } from '../../../interface/courseEntity';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorage';
import toast from 'react-hot-toast';

function ExamCreate() {
  const { examId } = useParams();
  const [courseData, setCourseData] = useState<CourseEntity[] | null>(null);
  const [initialValues, setInitialValues] = useState({
    courseId: '',
    title: '',
    questionScore: 0,
    passingScore: 0,
    numQuestions: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesData();
    if(examId){
      console.log("🚀 ~ useEffect ~ examId:", examId)
      fetchExamDetails(examId);
    }else{
      loadSavedExamData();
    }
  }, [examId]);

  const getCoursesData = async () => {
    try {
      const response = await axios.get(`${URL}/api/course/getAllInstructorCourse`, config);
      setCourseData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const fetchExamDetails = async( examId: string ) => {
    try{
      const response = await axios.get(`${URL}/api/course/examsbyexamid/${examId}`,config)
      
      console.log("🚀 ~ fetchExamDetails ~ response:", response)
      setInitialValues(response?.data?.data);
      localStorage.setItem('examQuestions',JSON.stringify(response?.data?.data?.questions))
    }catch(error){
      console.error('error fetching exam details',error)
    }
  }
  const loadSavedExamData = () => {
    const savedExamData = getLocalStorage('examData');
    if (savedExamData) {
      console.log("🚀 ~ loadSavedExamData ~ savedExamData:", savedExamData)
      setInitialValues(savedExamData);
    }
  };

  const validationSchema = Yup.object({
    courseId: Yup.string().required('Course is required'),
    title: Yup.string().required('Exam name is required'),
    questionScore: Yup.number()
      .positive('Question score must be a positive number')
      .required('Question score is required'),
    passingScore: Yup.number()
      .positive('Passing score must be a positive number')
      .required('Passing score is required'),
    numQuestions: Yup.number()
      .positive('Number of questions must be a positive number')
      .required('Number of questions is required'),
  });

  const handleSubmit = async (values: any) => {
  // Save form data to localStorage
  setLocalStorage('examData', values);

  if (examId) {
    navigate(`/instructor/exams/create/question/${examId}`);
  } else {
    try {
      const response = await axios.get(`${URL}/api/course/exams/${values.courseId}`, config);
      if (response?.data?.succes) {
        toast.error("Exam already exists for this course");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // If the exam does not exist, proceed to create a new one
        navigate("/instructor/exams/create/question");
      } else {
        toast.error("An error occurred while checking the exam. Please try again.");
      }
    }
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">Create Exam</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="courseId" className="block font-medium mb-1">
                  Course
                </label>
                <Field
                  as="select"
                  id="courseId"
                  name="courseId"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.courseId && errors.courseId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a course</option>
                  {courseData?.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </Field>
                {touched.courseId && errors.courseId && (
                  <div className="text-red-500 text-sm mt-1">{errors.courseId}</div>
                )}
              </div>
              <div>
                <label htmlFor="title" className="block font-medium mb-1">
                  Exam Name
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.title && errors.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>
              <div>
                <label htmlFor="questionScore" className="block font-medium mb-1">
                  Question Score
                </label>
                <Field
                  type="number"
                  id="questionScore"
                  name="questionScore"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.questionScore && errors.questionScore ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.questionScore && errors.questionScore && (
                  <div className="text-red-500 text-sm mt-1">{errors.questionScore}</div>
                )}
              </div>
              <div>
                <label htmlFor="passingScore" className="block font-medium mb-1">
                  Passing Score
                </label>
                <Field
                  type="number"
                  id="passingScore"
                  name="passingScore"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.passingScore && errors.passingScore ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.passingScore && errors.passingScore && (
                  <div className="text-red-500 text-sm mt-1">{errors.passingScore}</div>
                )}
              </div>
              <div>
                <label htmlFor="numQuestions" className="block font-medium mb-1">
                  Number of Questions
                </label>
                <Field
                  type="number"
                  id="numQuestions"
                  name="numQuestions"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.numQuestions && errors.numQuestions ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.numQuestions && errors.numQuestions && (
                  <div className="text-red-500 text-sm mt-1">{errors.numQuestions}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                Create Exam
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ExamCreate;