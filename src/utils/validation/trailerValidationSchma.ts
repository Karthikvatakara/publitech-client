import * as Yup from 'yup';

export const trailerValidationSchema = Yup.object().shape({
    title: Yup.string().required('Trial title is required').trim(),
    description: Yup.string().required('Trial description is required').trim(),
    video: Yup.mixed().required('Video is required'),
    thumbnail: Yup.mixed().required('Thumbnail is required'),
  });