import * as Yup from 'yup';

export const lessonValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    thumbnail: Yup.string().required('Thumbnail is required'),
    video: Yup.string().required('Video is required'),
    attachments: Yup.object().shape({
      title: Yup.string(),
      url: Yup.string().url('Invalid URL').required("pdf is required")
    })
  });