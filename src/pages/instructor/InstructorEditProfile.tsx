import  { FC, useState } from 'react';
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { RiCalendarEventFill, RiLinkedinLine } from 'react-icons/ri';
import { VscGithubAlt } from 'react-icons/vsc';
import { PiInstagramLogo } from 'react-icons/pi';
import InputWithIcon from '../../components/common/InputFieldWithTitleEdit';
import { CustomSingleFileInput } from '../../components/common/filesUpload/CustomSingleFileInput';
import { UserEntity } from '../../interface/UserEntity';
import { Formik, Form, FormikProps } from 'formik';
import { editProfileValidationSchema } from '../../utils/validation/editProfileValidationSchema';
import { useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { editUserProfile } from '../../redux/actions/user/userActions';
import date from "date-and-time";
import { useNavigate } from 'react-router-dom';
import emptyImage from "../../assets/profiles/emptyUser.png"

interface InstructorEditProfileProps {
  user: UserEntity;
  onSave: (updatedUser: UserEntity) => void;
  onClose: () => void;
}

interface FormValues {
  username: string;
  email: string;
  linkedIn: string;
  phoneNumber: string;
  dateOfBirth: string;
  github: string;
  instagram: string;
  avatar: string | null;
}

const InstructorEditProfile: FC<InstructorEditProfileProps> = ({ user, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppState>()
  const [profileImage, setProfileImage] = useState<string | null>(user?.profile?.avatar || null);

  const getPassedDateOnwardDateForInput = (inputDateString: any) => {
    const inputDate = new Date(inputDateString);
    const formattedDate = date.format(inputDate, "YYYY-MM-DD");
    return formattedDate;
  };

  const initialValues: FormValues = {
    username: user?.username || "",
    email: user?.email || "",
    linkedIn: user?.contact?.socialMedia?.linkedIn || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: getPassedDateOnwardDateForInput(user?.profile?.dateOfBirth!),
    github: user?.contact?.socialMedia?.github || "",
    instagram: user?.contact?.socialMedia?.instagram || "",
    avatar: user?.profile?.avatar || null
  };

  const handleSave = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("email", values.email);
    formData.append("github", values.github);
    formData.append("linkedIn", values.linkedIn);
    formData.append("instagram", values.instagram);
    formData.append("dateOfBirth", values.dateOfBirth);
    if (profileImage !== null) formData.append("profileImageUrl", profileImage);

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log(JSON.stringify(formData), "edited formdata");
    const res = await dispatch(editUserProfile(formData));
    console.log("🚀 ~ handleSave ~ res:", res);
    if (res.meta.requestStatus === "fulfilled") {
      // onSave(res.payload?.data);
      // onClose()
      navigate("/instructor/profile")
    }
  };

  return (
    <div className='p-4 bg-white rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-darkBlue font-semibold text-xl mb-4'>Edit Profile</h1>
        <AiOutlineClose className='text-xl cursor-pointer' onClick={onClose} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={editProfileValidationSchema}
        onSubmit={handleSave}
      >
        {({ values, setFieldValue }: FormikProps<FormValues>) => (
          <Form>
            <div className='grid grid-cols-12 p-4 gap-4'>
              <div className='col-span-12 md:col-span-4 p-4'>
                <div className='w-52 h-52 rounded-full mx-auto'>
                  {values.avatar && typeof values.avatar === "string" ? (
                    <div className=' flex flex-col justify-center items-center'>
                      <div className='w-52 h-52'>
                        <img
                          src={values.avatar}
                          alt="profile"
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                      <button
                        type="button"
                        className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setProfileImage(emptyImage);
                          setFieldValue("avatar", null);
                        }}
                      >
                        Delete this
                      </button>
                    </div>
                  ) : (
                    <CustomSingleFileInput
                      onChange={(file) => {
                        setProfileImage(file as string);
                        setFieldValue("avatar", file as string);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className='col-span-12 md:col-span-8 p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <InputWithIcon
                    title="User name"
                    icon={<AiOutlineUser />}
                    name='username'
                    as='text'
                    value={values.username}
                    onChange={(e) => setFieldValue('username', e.target.value)}
                  />
                  <div className='relative cursor-not-allowed'>
                    <InputWithIcon
                      title="Email"
                      icon={<AiOutlineMail />}
                      name='email'
                      as='text'
                      value={values.email}
                      disabled
                    />
                  </div>
                  <InputWithIcon
                    title="LinkedIn"
                    icon={<RiLinkedinLine />}
                    name='linkedIn'
                    as='text'
                    value={values.linkedIn}
                    onChange={(e) => setFieldValue('linkedIn', e.target.value)}
                  />
                  <InputWithIcon
                    title="Phone Number"
                    icon={<AiOutlinePhone />}
                    name='phoneNumber'
                    as='number'
                    value={values.phoneNumber}
                    onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                  />
                  <InputWithIcon
                    title="Date of Birth"
                    icon={<RiCalendarEventFill />}
                    name='dateOfBirth'
                    as='date'
                    value={values.dateOfBirth}
                    onChange={(e) => setFieldValue('dateOfBirth', e.target.value)}
                  />
                  <InputWithIcon
                    title="Github"
                    icon={<VscGithubAlt />}
                    name='github'
                    as='text'
                    value={values.github}
                    onChange={(e) => setFieldValue('github', e.target.value)}
                  />
                  <InputWithIcon
                    title="Instagram"
                    icon={<PiInstagramLogo />}
                    name='instagram'
                    as='text'
                    value={values.instagram}
                    onChange={(e) => setFieldValue('instagram', e.target.value)}
                  />
                </div>
                <div className='flex justify-center items-center mt-4'>
                  <button className='bg-darkBlue font-bold text-white px-4 py-2 rounded-md' type='submit'>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InstructorEditProfile;
