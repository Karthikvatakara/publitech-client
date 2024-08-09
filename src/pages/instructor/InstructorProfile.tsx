import React, { useEffect, useState } from 'react';
import InputWithIcon from '../../components/common/InputFieldWithTittle';
import emptyImage from "../../assets/profiles/emptyUser.png"
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RiCalendarEventFill, RiLinkedinLine } from 'react-icons/ri';
import { VscGithubAlt } from 'react-icons/vsc';
import { PiInstagramLogo } from 'react-icons/pi';
import { getPassedDateOnwardDateForInput } from '../../common/functions';
import InstructorEditProfile from './InstructorEditProfile';
import ModalComponent from '../../components/common/modals/ModalComponent';
import { UserEntity } from '../../interface/UserEntity';

function InstructorProfile() {
  const { user } = useSelector((state: RootState) => state.user);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);

  useEffect(()=>{
    
  })
  const handleEdit = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleSave = (updatedUser: UserEntity) => {
    console.log(updatedUser, 'arrived after updation');
    setShowEditProfile(false)
    // Here you would typically dispatch an action to save the updated user data to the store
  };

  const handleOnClose = () => {
    setShowEditProfile(!showEditProfile);
  };

  return (
    <>
      <div className='w-full bg-gray-200 p-6'>
        {showEditProfile && (
          <ModalComponent tab={<InstructorEditProfile user={user} onSave={handleSave} onClose={handleOnClose} />} />
        )}
        <div className='p-4 bg-white rounded-md'>
          <h1 className='text-darkBlue font-semibold text-xl'>Profile Settings</h1>
          <hr className='text-black mt-2' />

          <div className='grid grid-cols-12'>
            <div className='col-span-4 p-4'>
              <div className='flex items-center justify-center  rounded-full w-52 h-52'>
               <img src={user?.profile?.avatar || emptyImage} alt="" className="w-full h-full rounded-full object-cover" />
              </div><center></center>
            </div>
            <div className='grid grid-cols-2 col-span-8 p-4'>
              <div className='col-span-1 p-4 space-y-4'>
                <InputWithIcon
                  title="User name"
                  icon={<AiOutlineUser />}
                  name='username'
                  as='text'
                  value={user?.username || "-"}
                  disabled
                />
                <InputWithIcon
                  title="Email"
                  icon={<AiOutlineMail />}
                  name='email'
                  as='text'
                  value={user?.email || "-"}
                  disabled
                />
                <InputWithIcon
                  title="Gender"
                  icon={<AiOutlineUser />}
                  name='gender'
                  as='text'
                  value={user?.profile?.gender || "-"}
                  disabled
                />
                <InputWithIcon
                  title="LinkedIn"
                  icon={<RiLinkedinLine />}
                  name='linkedIn'
                  as='text'
                  value={user?.contact?.socialMedia?.linkedIn || "-"}
                  disabled
                />
              </div>
              <div className='col-span-1 p-4 space-y-4'>
                <InputWithIcon
                  title="Phone Number"
                  icon={<AiOutlinePhone />}
                  name='phoneNumber'
                  as='number'
                  value={user?.phoneNumber || "-"}
                  disabled
                />
                <InputWithIcon
                  title="Date of Birth"
                  icon={<RiCalendarEventFill />}
                  name='dateOfBirth'
                  as='date'
                  value={user?.profile?.dateOfBirth ? getPassedDateOnwardDateForInput(user?.profile?.dateOfBirth) : "-"}
                  disabled
                />
                <InputWithIcon
                  title="Github"
                  icon={<VscGithubAlt />}
                  name='github'
                  as='text'
                  value={user?.contact?.socialMedia?.github || "-"}
                  disabled
                />
                <InputWithIcon
                  title="Instagram"
                  icon={<PiInstagramLogo />}
                  name='instagram'
                  as='text'
                  value={user?.contact?.socialMedia?.instagram || "-"}
                  disabled
                />
              </div>
              <div className='col-span-2 flex justify-center items-center mt-4'>
                <button className='bg-darkBlue font-bold text-white px-4 py-2 rounded-md' onClick={handleEdit}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorProfile;
