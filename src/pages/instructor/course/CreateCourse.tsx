import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Formik, Form, Field, FormikHelpers, FormikProps, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputWithIcon from '../../../components/courses/InputWIthTitle';
import { FaBook } from 'react-icons/fa';
import { getActiveCategory } from '../../../redux/actions/category/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, RootState } from '../../../redux/store';
import { CategoryEntity } from '../../../types/categoryEntity';
import CustomSingleFileImage from '../../../components/common/filesUpload/CustomSingleFileImage';
import toast from 'react-hot-toast';
import { setLocalStorage, getLocalStorage } from '../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { CourseUploadSchema } from '../../../utils/validation/courseUploadSchema';

interface CourseUploadFormValues {
  title: string;
  description: string;
  categoryRef: string;
  isPaid: boolean;
  thumbnail: File | string | null;
  language: string;
  whatWillLearn: string[];
  pricing: {
    amount: number;
    type: 'free' | 'paid';
  };
}


const CreateCourse: React.FC = () => {
  const dispatch = useDispatch<AppState>();
  const category = useSelector<RootState, any>((state) => state.category);
  const [courseDetails, setCourseDetails] = useState<CourseUploadFormValues | null>(null);
  const navigate = useNavigate();
  
  const getData = useCallback(() => {
    const data = getLocalStorage("tempCourseData");
    if (data && JSON.stringify(data) !== JSON.stringify(courseDetails)) {
      setCourseDetails(data);
    }
  }, [courseDetails]);

  useEffect(() => {
    dispatch(getActiveCategory());
    getData();
  }, [dispatch, getData]);

  const initialValues = useMemo(() => ({
    title: courseDetails?.title || '',
    description: courseDetails?.description || '',
    categoryRef: courseDetails?.categoryRef || '',
    isPaid: courseDetails?.isPaid || false,
    thumbnail: courseDetails?.thumbnail || null,
    language: courseDetails?.language || '',
    whatWillLearn: courseDetails?.whatWillLearn || [''],
    pricing: courseDetails?.pricing || { amount: 0, type: 'free' },
  }), [courseDetails]);

  const handleSubmit = async (
    values: CourseUploadFormValues,
    { setSubmitting }: FormikHelpers<CourseUploadFormValues>
  ) => {
    try {
      console.log("Form values before submission:", values);
      if(courseDetails?.trial){
        navigate("/instructor/createcourse/uploadtrailer");
      }else{
        await setLocalStorage("tempCourseData", values);
        navigate("/instructor/createcourse/uploadtrailer");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error in uploading");
    } finally {
      setSubmitting(false);
    }
  };

  const handleThumbnailChange = useCallback((file: File | string | null) => {
    // This function will be passed to CustomSingleFileImage
  }, []);

  return (
    <div className="w-full mx-auto px-2 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Upload New Course</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={CourseUploadSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validateOnMount={true}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ values, isSubmitting, setFieldValue, setFieldTouched, errors, touched }: FormikProps<CourseUploadFormValues>) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 pr-4">
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                    Course Thumbnail
                  </label>
                  <CustomSingleFileImage
                    onChange={(file) => {
                      setFieldValue("thumbnail", file);
                      setFieldTouched("thumbnail", true, false);
                      handleThumbnailChange(file);
                    }}
                    initialValue={typeof courseDetails?.thumbnail === 'string' ? courseDetails.thumbnail : undefined}
                  />
                  <ErrorMessage name="thumbnail" component="p" className="text-red-500 text-xs italic" />
                </div>
              </div>

              <div className="md:w-2/3">
                <InputWithIcon
                  title="Course Title"
                  name="title"
                  icon={<FaBook />}
                  placeholder="Enter course title"
                  as="text"
                />
                <ErrorMessage name="title" component="p" className="text-red-500 text-xs italic" />

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Course Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter course description"
                    className="form-textarea w-full h-12 border-2 rounded-lg p-2"
                  />
                  <ErrorMessage name="description" component="p" className="text-red-500 text-xs italic" />
                </div>

                <div className="mb-6 w-1/3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryRef">
                    Category
                  </label>
                  <Field
                    as="select"
                    id="categoryRef"
                    name="categoryRef"
                    className="form-select w-full border-2 p-2 rounded-lg"
                  >
                    <option value="" label="Select category" />
                    {category.availableCategory.map((cat: CategoryEntity) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="categoryRef" component="p" className="text-red-500 text-xs italic" />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                    Language
                  </label>
                  <Field
                    as="select"
                    id="language"
                    name="language"
                    className="form-select w-full border-2 p-2 rounded-lg"
                  >
                    <option value="" label="Select language" />
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    {/* Add more language options as needed */}
                  </Field>
                  <ErrorMessage name="language" component="p" className="text-red-500 text-xs italic" />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">What Will Students Learn?</label>
                  <FieldArray name="whatWillLearn">
                    {({ remove, push }) => (
                      <div>
                        {values.whatWillLearn.map((_, index) => (
                          <div key={index} className="flex mb-2">
                            <Field
                              name={`whatWillLearn.${index}`}
                              className="form-input w-full border-2 rounded-lg p-2 mr-2"
                              placeholder={`Learning point ${index + 1}`}
                            />
                            <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                              Remove
                            </button>
                          </div>
                        ))}
                        <ErrorMessage name="whatWillLearn" component="p" className="text-red-500 text-xs italic" />
                        <button type="button" onClick={() => push('')} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                          Add Learning Point
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Pricing</label>
                  <div className="flex items-center mb-2">
                    <Field 
                      type="radio" 
                      id="free" 
                      name="pricing.type" 
                      value="free" 
                      className="mr-2"
                      onChange={() => {
                        setFieldValue("pricing.type", "free");
                        setFieldValue("pricing.amount", 0);
                      }}
                    />
                    <label htmlFor="free">Free</label>
                  </div>
                  <div className="flex items-center">
                    <Field 
                      type="radio" 
                      id="paid" 
                      name="pricing.type" 
                      value="paid" 
                      className="mr-2"
                      onChange={() => {
                        setFieldValue("pricing.type", "paid");
                        setFieldValue("pricing.amount", "");
                      }}
                    />
                    <label htmlFor="paid">Paid</label>
                  </div>
                  {values.pricing.type === 'paid' && (
                    <div className="mt-2">
                      <Field
                        type="number"
                        name="pricing.amount"
                        placeholder="Enter price"
                        className="form-input w-full border-2 rounded-lg p-2"
                      />
                    </div>
                  )}
                  <ErrorMessage name="pricing.type" component="p" className="text-red-500 text-xs italic" />
                  <ErrorMessage name="pricing.amount" component="p" className="text-red-500 text-xs italic" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-darkBlue text-white hover:bg-white hover:text-darkBlue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Saving...' : 'Proceed to Lessons'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCourse;