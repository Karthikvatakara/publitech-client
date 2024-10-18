import  { useEffect, useState } from "react";
import { FaBook, FaRegClock, FaVideo, FaRunning, FaClock, FaStar, FaShare } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { RiArticleFill } from "react-icons/ri";
import { GiLaptop } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppState } from "../../redux/store";
import { getSingleCourse } from "../../redux/actions/course/courseActons";
import Navbar from "../../components/landPage/Navbar";
import c1 from "../../assets/courses/c1.png";
import c2 from "../../assets/courses/c2.png";
import axios from "axios";
import { config } from "../../common/configurations";
import { URL } from "../../common/api";
import toast from "react-hot-toast";
import { isEnrollmentExist } from "../../redux/actions/enrollment/enrollmentActions";
import { EnrollmentEntity } from "../../interface/EnrollmentEntity";
import { loadStripe } from '@stripe/stripe-js';
import UserCourseDetailSkeleton from "../../components/dashBoard/student/UserCourseDetailSkeleton";

function UserCourseDetailPage() {
  const [courseData, setCourseData] = useState<any | null>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const [ openLesson, setOpenLesson ] = useState(null);
  const [ AlreadyEnrolled,serAlreadyEnrolled ] = useState<EnrollmentEntity | null>(null);
  const { user } = useSelector((state:RootState) => state.user);
  const [ loading, setLoading ] = useState<boolean>(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppState>();

  useEffect(() => {
    if (courseId) {
      console.log(courseId,"courseid")
      getData(courseId);
      if(user){
        const userId = user._id
        isEnrollment(courseId,userId)
      }
    }
  }, [dispatch, courseId]);

  const getData = async (courseId: string) => {
   try{
    setLoading(true);
    const res = await dispatch(getSingleCourse(courseId));
    if (res?.payload?.success) {
      setLoading(false)
      setCourseData(res?.payload?.data);
    }
   }catch(error){
    setLoading(false)
      console.log(error,"error in the getdata")
   }finally{
    setLoading(false);
   }
  };

  const isEnrollment = async(courseId:string,userId:string) => {
    const data = {courseId,userId}
    const res = await dispatch(isEnrollmentExist(data))
    console.log(res,"aaaaaaaaaaaaaaaaaaaaaaaaa");
    serAlreadyEnrolled(res?.payload?.data);
  }

  const coursePrice = courseData?.pricing?.amount == 0 ? "free" : `₹ ${courseData?.pricing?.amount}`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const handleEnrollment = async(courseId:string) => {
    console.log(courseId)
    if(!user){
      toast.error("please login")
      return;
    }else{
      if(courseData?.pricing?.type === "free"){
        const data = {
          userId: user?._id,
          courseId: courseData?._id,
        }
        
        console.log("🚀 ~ handleEnrollment ~ data:", data)
        
          const freeEnrollment = await axios.post(`${URL}/api/course/createEnrollment`,data,config)
          console.log("🚀 ~ handleEnrollment ~ freeEnrollment:", freeEnrollment)
          const userId = user?._id
          isEnrollment(courseId,userId)
          toast.success("enrolled succesfully")
      }else{
        console.log("reached in fee part",courseId);
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
        const body = {
          courseId: courseData?._id,
          userId: user?._id,
          amount: courseData?.pricing?.amount,
          thumbnail: courseData?.thumbnail,
          courseName: courseData?.title,
          instructorRef: courseData?.instructorRef?._id,
        };
        const response = await axios.post(`${URL}/api/payment/create-checkout-session`,body,config)

        console.log("🚀 ~ handleEnrollment ~ response:222222222", response)
        if(!response?.data?.success && response?.data?.status == 409) {
          toast.error("you are already purchased the course")
        }

        if(stripe && response?.data.id){
          stripe.redirectToCheckout({
            sessionId: response?.data?.id
          })
        }
      }
    }
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <UserCourseDetailSkeleton />
      ) : (
        <>
          <div className="w-full p-4 md:p-8">
            <div className="bg-gray-100 rounded-md p-6 md:p-11 space-y-3 mb-8">
              <h1 className="font-bold text-xl md:text-2xl">{courseData?.title}</h1>
              <p className="font-semibold text-sm md:text-base">html || css || javascript || typeScript</p>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">ratings by</p>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-300" />
                  ))}
                </div>
                <p className="font-semibold text-sm md:text-base">5 ratings by 1000 students</p>
              </div>
              <p className="font-semibold text-sm md:text-base">Last updated {formatDate(courseData?.createdAt)}</p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-gray-100 rounded-md p-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="rounded-full w-12 h-12 overflow-hidden mr-4">
                        <img src={courseData?.thumbnail} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h1 className="font-bold">{courseData?.instructorRef?.username}</h1>
                        <p className="font-medium text-sm">Created by</p>
                      </div>
                    </div>
                    <button className="flex items-center bg-darkBlue text-white px-4 py-2 rounded-lg">
                      <FaShare className="mr-2" />
                      Share
                    </button>
                  </div>
  
                  <h1 className="font-bold text-xl md:text-2xl">{courseData?.title}</h1>
  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <FaBook className="text-xl mr-2" />
                      <p>{courseData?.lessons?.length || 0} Lessons</p>
                    </div>
                    <div className="flex items-center">
                      <FaRegClock className="text-xl mr-2" />
                      <p>20 Hours</p>
                    </div>
                    <div className="flex items-center">
                      <IoMdFlash className="text-xl mr-2" />
                      <p>Beginner</p>
                    </div>
                  </div>
  
                  <div className="border-2 p-6 rounded-lg space-y-4">
                    <h1 className="font-bold text-xl">Overview</h1>
                    <p className="font-semibold text-sm md:text-base">{courseData?.description}</p>
                    <h1 className="font-bold text-lg">What You Will Learn</h1>
                    <ul className="list-disc list-inside">
                      {courseData?.whatWillLearn && courseData?.whatWillLearn?.length > 0 ? (
                        courseData?.whatWillLearn?.map((item: any, index: number) => (
                          <li key={index} className="text-sm md:text-base">{item}</li>
                        ))
                      ) : (
                        <li>No items available</li>
                      )}
                    </ul>
                  </div>
  
                  <div className="border-2 rounded-md">
                    {courseData?.lessons?.map((lesson: any, index: any) => (
                      <div key={index} className="collapse collapse-plus bg-base-200 mb-2">
                        <input
                          type="checkbox"
                          checked={openLesson === index}
                          onChange={() => setOpenLesson(openLesson === index ? null : index)}
                        />
                        <div className="collapse-title text-lg font-medium">
                          Lesson {index + 1}: {lesson.title}
                        </div>
                        <div className="collapse-content">
                          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                            <img src={lesson.thumbnail} alt={lesson.title} className="w-full md:w-24 h-24 object-cover rounded" />
                            <div>
                              <h3 className="font-semibold">Lesson {index + 1}: {lesson.title}</h3>
                              <p className="text-sm">{lesson.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
  
                  <div className="border-2 rounded-lg p-6">
                    <h1 className="font-bold text-xl mb-4">Top companies offer this course to their employees</h1>
                    <p className="font-semibold text-sm mb-6">This course was selected for our collection of top-rated courses trusted by businesses worldwide. Learn More</p>
                    <div className="flex justify-center gap-4">
                      <div className="w-24 border-1 h-24 overflow-hidden">
                        <img src={c1} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="w-24 h-24 overflow-hidden">
                        <img src={c2} alt="" className="object-cover w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="bg-gray-100 rounded-md p-6">
                <div className="mb-6 ">
                  <div className="w-full h-36 bg-gray-400 rounded-md overflow-hidden">
                    <iframe
                      src={courseData?.trial?.video}
                      frameBorder="0"
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h1 className="text-green-700 font-bold text-2xl">{coursePrice}</h1>
                </div>
                <div className="flex justify-center items-center my-3">
                  {AlreadyEnrolled ? (
                    <button
                      className="bg-darkBlue p-3 text-white font-bold w-full rounded-lg transition duration-300 ease-in-out"
                      disabled
                    >
                      Already Enrolled
                    </button>
                  ) : (
                    <button
                      className="bg-darkBlue p-3 text-white font-bold w-full rounded-lg hover:bg-white hover:text-darkBlue transition duration-300 ease-in-out"
                      onClick={() => handleEnrollment(courseData?._id)}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
                <div className="bg-gray-100 border-2 p-4 rounded-md space-y-4 mb-6">
                  <h1 className="font-bold text-lg">Includes</h1>
                  {[
                    { icon: FaVideo, text: "Content on Demand video" },
                    { icon: RiArticleFill, text: "65 Articles" },
                    { icon: GiLaptop, text: "Access on Mobile and TV" },
                    { icon: FaRunning, text: "Coding Exercises" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="text-xl" />
                      <p className="text-sm font-semibold">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="border-2 p-4 rounded-md space-y-4">
                  <h1 className="font-bold text-xl">Details</h1>
                  {[
                    { icon: PiStudentBold, text: "Enrolled: 20" },
                    { icon: FaClock, text: "Duration: 2 hours" },
                    { icon: FaRunning, text: "Coding Exercises" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="text-xl" />
                      <p className="text-sm font-semibold">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
  
}

export default UserCourseDetailPage;