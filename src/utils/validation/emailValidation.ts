import * as Yup from "yup";

export const emailValidationSchema = Yup.object().shape({
    email:Yup.string().email("invalid email").required("email is required")
})