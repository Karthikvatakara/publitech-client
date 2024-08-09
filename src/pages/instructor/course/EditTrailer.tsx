import React, { useEffect, useState, useCallback } from 'react';
import { Formik, Form, Field, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FaBook } from 'react-icons/fa';
import { CustomVideoFileInput } from '../../../components/common/filesUpload/CustomVideoFileInput';
import CustomSingleFileImage from '../../../components/common/filesUpload/CustomSingleFileImage';
import InputWithIcon from '../../../components/courses/InputWIthTitle';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorage';
import { CourseEntity } from '../../../interface/courseEntity';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { URL } from '../../../common/api';

interface UploadTrailerFormValues {
  title: string;
  description: string;
  video: string | null;
  thumbnail: string | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Trial title is required'),
  description: Yup.string().required('Trial description is required'),
  video: Yup.mixed().required('Video is required'),
  thumbnail: Yup.mixed().required('Thumbnail is required'),
});

const EditTrailer: React.FC = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState<CourseEntity | null>(null);
  const navigate = useNavigate();

  const fetchCourseDetails = useCallback(async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${URL}/api/course/course/${id}`);
        setCourseDetails(data.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to fetch course details');
      }
    }
  }, [id]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const initialValues: UploadTrailerFormValues = {
    title: courseDetails?.trial?.title || '',
    description: courseDetails?.trial?.description || '',
    video: courseDetails?.trial?.video || null,
    thumbnail: courseDetails?.trial?.thumbnail || null,
  };

  const handleSubmit = async (
    values: UploadTrailerFormValues,
    { setSubmitting }: FormikHelpers<UploadTrailerFormValues>
  ) => {
    try {
        const data = getLocalStorage("editCourseData");
      const updatedCourseData = {
        ...data,
        trial: {
          ...courseDetails?.trial,
          title: values.title,
          description: values.description,
          thumbnail: values.thumbnail || courseDetails?.trial?.thumbnail,
          video: values.video || courseDetails?.trial?.video,
        },
      };

      if (id) {
        // Update existing course
        setLocalStorage("editCourseData",updatedCourseData);
        toast.success('Course trailer updated successfully');
        navigate(`/instructor/course/editlesson/${id}`); 
      } else {
        // Create new course
        await setLocalStorage("tempCourseData", updatedCourseData);
        navigate("/instructor/course");
      }
    } catch (error) {
      console.error('Error saving trial details:', error);
      toast.error(id ? "Error updating course trailer" : "Error saving trial details");
    } finally {
      setSubmitting(false);
    }
  };

  if (!courseDetails && id) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold text-green-500 mb-4'>
        {id ? 'Edit Trailer' : 'Upload Trailer'}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                {isSubmitting ? 'Saving...' : id ? 'Update Trailer' : 'Save and Continue'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTrailer;