import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Formik, Form, Field, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FaBook } from 'react-icons/fa';
import { CustomVideoFileInput } from '../../../components/common/filesUpload/CustomVideoFileInput';
import CustomSingleFileImage from '../../../components/common/filesUpload/CustomSingleFileImage';
import InputWithIcon from '../../../components/courses/InputWIthTitle';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorage';
import { CourseEntity } from '../../../interface/courseEntity';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { trailerValidationSchema } from '../../../utils/validation/trailerValidationSchma';

interface UploadTrailerFormValues {
  title: string;
  description: string;
  video: string | null;
  thumbnail: string | null;
}


const UploadTrailer: React.FC = () => {
  const [courseDetails, setCourseDetails] = useState<CourseEntity | null>(null);
  const navigate = useNavigate();

  const getData = useCallback(() => {
    const data = getLocalStorage("tempCourseData");
    console.log("🚀 ~ getData ~ data:", data)
    if (data && JSON.stringify(data) !== JSON.stringify(courseDetails)) {
      setCourseDetails(data);
    }
  }, [courseDetails]);

  useEffect(() => {
    getData();
  }, [getData]);

  const initialValues: UploadTrailerFormValues = useMemo(() => ({
    title: courseDetails?.trial?.title || '',
    description: courseDetails?.trial?.description|| '',
    video: courseDetails?.trial?.video || null,
    thumbnail: courseDetails?.trial?.thumbnail || null,
  }), [courseDetails]);

  const handleSubmit = async (
    values: UploadTrailerFormValues,
    { setSubmitting }: FormikHelpers<UploadTrailerFormValues>
  ) => {
    try {
      const updatedCourseData = {
        ...courseDetails,
        trial: {
          ...courseDetails?.trial,
          title: values.title,
          description: values.description,
          thumbnail: values.thumbnail || courseDetails?.trial?.thumbnail,
          video: values.video || courseDetails?.trial?.video,
        },
      };

      await setLocalStorage("tempCourseData", updatedCourseData);
      console.log("🚀 ~ handleSubmit ~ updatedCourseData:", updatedCourseData)
      toast.success("Trial details saved successfully!");
      navigate("/instructor/createcourse/uploadlessons"); // Adjust this path as needed
    } catch (error) {
      console.error('Error saving trial details:', error);
      toast.error("Error saving trial details");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='w-full bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold text-green-500 mb-4'>Upload Trailer</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={trailerValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }: FormikProps<UploadTrailerFormValues>) => (
          <Form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-4'>
              <label className='block font-semibold'>Trial video</label>
              <CustomVideoFileInput
                onChange={(file) => setFieldValue('video', file)}
                initialValue={courseDetails?.trial?.video || values.video || undefined}
              />
              {errors.video && touched.video && <div className='text-red-500'>{errors.video}</div>}

              <InputWithIcon
                title="Trial Title"
                name="title"
                icon={<FaBook />}
                placeholder="Enter trial title"
                as="text"
              />

              <div>
                <label htmlFor="description" className='block mb-2 font-semibold'>Trial Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className='w-full p-2 border rounded'
                  rows={4}
                />
                {errors.description && touched.description && <div className='text-red-500'>{errors.description}</div>}
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block mb-2 font-semibold'>Trial thumbnail</label>
                <CustomSingleFileImage
                  onChange={(file) => setFieldValue('thumbnail', file)}
                  initialValue={values.thumbnail || courseDetails?.trial?.thumbnail || undefined}
                />
                {errors.thumbnail && touched.thumbnail && <div className='text-red-500'>{errors.thumbnail}</div>}
              </div>
            </div>

            <div className='col-span-full'>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Saving...' : 'Save and Continue'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadTrailer;