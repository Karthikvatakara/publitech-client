import * as Yup from "yup"

export const editProfileValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be only digits')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number cannot be longer than 15 digits'),
    linkedIn: Yup.string().url('Invalid LinkedIn URL').nullable().optional(),
    dateOfBirth: Yup.date().max(new Date(), 'Date of Birth cannot be in the future').nullable().required(),
    github: Yup.string().url('Invalid Github URL').nullable().optional(),
    instagram: Yup.string().url('Invalid Instagram URL').nullable().optional()
  });