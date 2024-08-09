import * as Yup from 'yup';


export const CourseUploadSchema = Yup.object().shape({
    title: Yup.string().required('Course title is required').trim(),
    description: Yup.string().required('Course description is required').min(10, 'Description must be at least 10 characters long').trim(),
    categoryRef: Yup.string().required('Category is required'),
    isPaid: Yup.boolean(),
    thumbnail: Yup.mixed().required('Course thumbnail is required'),
    language: Yup.string().required('Language is required'),
    whatWillLearn: Yup.array()
      .of(Yup.string().required('Learning point is required').trim())
      .min(1, 'Add at least one learning point')
      .test('no-empty-values', 'All learning points must be filled', (value) => 
        value && value.every(item => item && item.trim() !== '')
      ),
    pricing: Yup.object().shape({
      type: Yup.string().oneOf(['free', 'paid'], 'Invalid price type').required('Price type is required'),
      amount: Yup.number().when('type', {
        is: 'paid',
        then: () => Yup.number()
          .required('Price is required for paid courses')
          .positive('Price must be a positive value'),
        otherwise: () => Yup.number().test('is-zero', 'Price must be 0 for free courses', value => value === 0)
      }),
    }),
  });