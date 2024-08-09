import * as Yup from 'yup';

const validateWhatWillLearn = (whatWillLearn) => {
  let isAnyFieldEmpty = false;

  for (let i = 0; i < whatWillLearn.length; i++) {
    if (!whatWillLearn[i].trim()) {
      isAnyFieldEmpty = true;
      break;
    }
  }

  return isAnyFieldEmpty
    ? 'Please fill out all learning points before adding a new one.'
    : true;
};

export const CourseUploadSchema = Yup.object().shape({
  title: Yup.string().required('Course title is required').trim(),
  description: Yup.string().required('Course description is required').min(10, 'Description must be at least 10 characters long').trim(),
  categoryRef: Yup.string().required('Category is required'),
  isPaid: Yup.boolean(),
  thumbnail: Yup.mixed().required('Course thumbnail is required'),
  language: Yup.string().required('Language is required'),
  whatWillLearn: Yup.array()
    .of(Yup.string().trim().required('Learning point is required'))
    .min(1, 'Add at least one learning point')
    .test('no-empty-values', 'All learning points must be filled', (value) => value.every(item => item.trim() !== '')),
  pricing: Yup.object().shape({
    type: Yup.string().oneOf(['free', 'paid'], 'Invalid price type').required('Price type is required'),
    amount: Yup.number().when('type', {
      is: 'paid',
      then: Yup.number()
        .required('Price is required for paid courses')
        .positive('Price must be a positive value'),
      otherwise: Yup.number().equals([0], 'Price must be 0 for free courses'),
    }),
  }),
});
