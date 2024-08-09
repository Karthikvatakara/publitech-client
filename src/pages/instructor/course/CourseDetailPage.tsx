import React,{ useEffect,useState } from "react";
import { FaBook, FaRegClock, FaVideo, FaTrophy, FaFileDownload, FaRunning, FaClock } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { RiArticleFill } from "react-icons/ri";
import { GiLaptop } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState,AppState } from "../../../redux/store";
import { getSingleCourse } from "../../../redux/actions/course/courseActons";
import { useDispatch } from "react-redux";
import { CourseEntity } from "../../../interface/courseEntity";
import { useNavigate } from "react-router-dom";


function CourseDetailPage() {
    const [ courseData,setCourseData ] = useState<any | null>(null);
    const { courseId } = useParams< {courseId: string} >();
    const [openLesson, setOpenLesson] = useState(null);
    const [ isModalOpen,setIsModalOpen ]=  useState<boolean>(false);
    const navigate = useNavigate();
    console.log("🚀 ~ CourseDetailPage ~ courseId:", courseId)
    
    const dispatch = useDispatch<AppState>();
    // const { course } = useSelector((state:RootState)=> state.courses)

    useEffect(() => {
      console.log('this is coursesd',courseId)
        if(courseId){
          getData(courseId)
        }
    },[dispatch,courseId])
    
    const getData = async(courseId:string) => {
      console.log("🚀 ~ getData ~ courseId:", courseId)
      const res =  await dispatch(getSingleCourse(courseId)); 
      console.log("🚀 ~ getData ~ res:", res)
      if(res?.payload?.success){
        setCourseData(res?.payload?.data)
      }
      
    }

    const updateCourse = async() => {
      console.log(courseData?.stage,"stage in course");
      console.log(courseData?.isVerified,"isverified in ocurseData");
    console.log(courseData.isPublished,"isPublished incourseData")
      if(courseData?.stage ==="accepted" && courseData?.isVerified ){
        setIsModalOpen(true)
      }else{
        navigate(`/instructor/course/edit/${courseData._id}`)
      }
    }

    const coursePrice = courseData?.pricing?.amount == 0 ? "free" :`₹ ${courseData?.pricing?.amount}`;


  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 md:col-span-8 bg-gray-100 rounded-md p-4">
        <div className="flex flex-col">
          <div className="p-3 flex items-center ">
            <div className=" rounded-full w-12 h-12 m-2 flex items-center justify-center">
              <img src={courseData?.thumbnail} alt="" className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col m-2">
              <h1 className="font-bold">{courseData?.instructorRef?.username}</h1>
              <p className="font-medium">Instructor</p>
            </div>
          </div>
          <h1 className="font-bold p-4 text-2xl">{courseData?.title}</h1>
          <div className="flex flex-wrap">
            <div className="m-2 flex items-center">
              <FaBook className="text-xl m-2" />
              <p className="m-2">3</p>
              {courseData?.lessons?.length}
              1
            </div>
            <div className="m-2 flex items-center">
              <FaRegClock className="text-xl m-2" />
              <p className="m-2">20 Hours</p>
            </div>
            <div className="m-2 flex items-center">
              <IoMdFlash className="text-xl m-2" />
              <p className="m-2">Beginner</p>
            </div>
          </div>
          <div className="border-2 m-2 p-3 rounded-lg space-y-3">
            <h1 className="font-bold text-xl">Overview</h1>
            <p className="font-semibold">
            {courseData?.description}
            </p>
            <h1 className="font-bold">What You Will Learn</h1>
            <ul className="list-disc list-inside">
              {courseData?.whatWillLearn && courseData?.whatWillLearn?.length > 0 ? (
              courseData?.whatWillLearn?.map((item: any, index: number) => (
              <li key={index}>{item}</li>
              ))
              ) : (
              <li>No items available</li>
              )}
              </ul>

          </div>
          <div className="border-2 m-2 text-xl rounded-md p-3 space-y-3">
            <h1 className="font-bold text-xl">This Course Includes</h1>
            <div className="flex flex-wrap justify-between">
              <div>
                <div className="flex p-2 items-center gap-2">
                  <FaVideo className="text-xl" />
                  <p className="text-sm font-semibold">Content on Demand video</p>
                </div>
                <div className="flex p-2 items-center gap-2">
                  <RiArticleFill className="text-xl" />
                  <p className="text-sm font-semibold">65 Articles</p>
                </div>
                <div className="flex p-2 items-center gap-2">
                  <GiLaptop className="text-xl" />
                  <p className="text-sm font-semibold">Access on Mobile and TV</p>
                </div>
              </div>
              <div>
                <div className="flex p-2 items-center gap-2">
                  <FaTrophy className="text-xl" />
                  <p className="text-sm font-semibold">Certificate of Completion</p>
                </div>
                <div className="flex p-2 items-center gap-2">
                  <FaFileDownload className="text-xl" />
                  <p className="text-sm font-semibold">Downloadable Resources</p>
                </div>
                <div className="flex p-2 items-center gap-2">
                  <FaRunning className="text-xl" />
                  <p className="text-sm font-semibold">Coding Exercises</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 m-2 rounded-md">
  {courseData?.lessons?.map((lesson:any, index:any) => (
    <div key={index} className="collapse collapse-plus bg-base-200 mb-2">
      <input 
        type="checkbox" 
        checked={openLesson === index}
        onChange={() => setOpenLesson(openLesson === index ? null : index)}
      /> 
      <div className="collapse-title text-xl font-medium">
        {lesson.title}
      </div>
      <div className="collapse-content">
        <div className="flex items-start space-x-4">
          <img src={lesson.thumbnail} alt={lesson.title} className="w-24 h-24 object-cover rounded" />
          <div>
            <h3 className="font-semibold">{lesson.title}</h3>
            <p>{lesson.description}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-gray-100 rounded-md p-4">
        <div className="flex justify-center mb-4">
          <button className="font-bold bg-darkBlue text-white p-2 w-full rounded-md hover:duration-300 hover:bg-white hover:text-darkBlue"
          onClick={updateCourse}>
            Update Course
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-full h-36 bg-gray-400 rounded-md flex items-center justify-center">
          <iframe 
          src={courseData?.trial?.video} 
          frameBorder="0" 
          className="w-full h-full"
          allowFullScreen
        ></iframe>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-green-700 font-bold text-xl">{coursePrice}</h1>
        </div>
        <div className="bg-gray-100 border-2 p-2 rounded-md space-y-3">
          <h1 className="font-bold text-lg">Includes</h1>
          <div className="flex p-2 items-center gap-2">
            <FaVideo className="text-xl" />
            <p className="text-sm font-semibold">Content on Demand video</p>
          </div>
          <div className="flex p-2 items-center gap-2">
            <RiArticleFill className="text-xl" />
            <p className="text-sm font-semibold">65 Articles</p>
          </div>
          <div className="flex p-2 items-center gap-2">
            <GiLaptop className="text-xl" />
            <p className="text-sm font-semibold">Access on Mobile and TV</p>
          </div>
          <div className="flex p-2 items-center gap-2">
            <FaRunning className="text-xl" />
            <p className="text-sm font-semibold">Coding Exercises</p>
          </div>
        </div>
        <div className="border-2 mt-4 p-2 rounded-md space-y-4">
          <h1 className="font-bold text-xl">Details</h1>
          <div className="flex p-2 items-center gap-2">
            <PiStudentBold className="text-xl" />
            <p className="text-sm font-semibold">Enrolled: 20</p>
          </div>
          <div className="flex p-2 items-center gap-2">
            <FaClock className="text-xl" />
            <p className="text-sm font-semibold">Duration: 2 hours</p>
          </div>
          <div className="flex p-2 items-center gap-2">
            <FaRunning className="text-xl" />
            <p className="text-sm font-semibold">Coding Exercises</p>
          </div>
        </div>

        <div className="border-2 mt-4 p-2 rounded-md space-y-4">
    <h1 className="font-bold text-xl">Course Status</h1>
    <div className="flex flex-col items-center">
      {courseData?.stage === 'requested' && (
        <p className="text-lg font-semibold text-yellow-600">Pending</p>
      )}
      {courseData?.stage === 'accepted' && (
        <p className="text-lg font-semibold text-green-600">Published</p>
      )}
      {courseData?.stage === 'rejected' && (
        <>
          <p className="text-lg font-semibold text-red-600">Video Rejected</p>
          {courseData?.rejectReason && (
            <div className="mt-2 p-2 bg-red-100 rounded-md">
              <p className="text-sm font-medium">Reason for rejection:</p>
              <p className="text-sm">{courseData.rejectReason}</p>
            </div>
          )}
        </>
      )}
    </div>
  </div>
      </div>

       {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-xl">
                        <h1 className="text-xl font-bold ">You Are Out Of Privilege</h1>
                        <p className="my-2 font-semibold">This course isverified and published . You cannot edit it.</p>
                        <button
                            className="mt-2 p-2 bg-darkBlue text-white rounded-md"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
}

export default CourseDetailPage;