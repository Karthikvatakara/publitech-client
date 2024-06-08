import * as Yup from "yup";

export const applyToTeachValidationSchema = Yup.object().shape({
    profession: Yup.string().required("profession is required"),
    profileDescription: Yup.string().required("profileDescription is required"),
    linkedIn: Yup.string().url("invalid url format").nullable(),
    github: Yup.string().url("invalid url format").nullable(),
    mobile: Yup.string().matches(/^[0-9]+$/, 'Mobile number is not valid').required("mobile number is required")
});