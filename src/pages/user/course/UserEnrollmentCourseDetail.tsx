import { useEffect, useState } from "react";
import { FaBook, FaRegClock, FaVideo, FaTrophy, FaFileDownload, FaRunning, FaClock, FaPlay } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { RiArticleFill } from "react-icons/ri";
import { GiLaptop } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { useParams, useNavigate } from "react-router-dom";
import { AppState } from "../../../redux/store";
import { getSingleCourse } from "../../../redux/actions/course/courseActons";
import { useDispatch } from "react-redux";
import { MdOutlineOndemandVideo } from "react-icons/md";


function UserEnrollmentCourseDetail() {
  const [courseData, setCourseData] = useState<any | null>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const [openLesson, setOpenLesson] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppState>();

  useEffect(() => {
    if (courseId) {
      getData(courseId);
    }
  }, [dispatch, courseId]);

  const getData = async (courseId: string) => {
    const res = await dispatch(getSingleCourse(courseId));
    if (res?.payload?.success) {
      setCourseData(res?.payload?.data);
    }
  };


  const handlePreview = () => {
      console.log("🚀 ~ handlePreview ~ courseId:", courseId)
    navigate(`/student/courses/preview/${courseId}`);
  };

  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4 bg-gray-50">
      <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col">
          <div className="flex items-center mb-6">
            <img src={courseData?.thumbnail} alt="" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h1 className="font-bold text-xl">{courseData?.instructorRef?.username}</h1>
              <p className="text-gray-600">Instructor</p>
            </div>
          </div>
          <h1 className="font-bold text-3xl mb-4">{courseData?.title}</h1>
          <div className="flex flex-wrap mb-6">
            <div className="mr-6 flex items-center">
              <FaBook className="text-xl mr-2 text-yellow-400" />
              <p>{courseData?.lessons?.length} Lessons</p>
            </div>
            <div className="mr-6 flex items-center">
              <FaRegClock className="text-xl mr-2 text-yellow-400" />
              <p>20 Hours</p>
            </div>
            <div className="flex items-center">
              <IoMdFlash className="text-xl mr-2 text-yellow-400" />
              <p>Beginner</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h2 className="font-bold text-2xl mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">{courseData?.description}</p>
            <h3 className="font-bold text-xl mb-2">What You Will Learn</h3>
            <ul className="list-disc list-inside text-gray-700">
              {courseData?.whatWillLearn && courseData?.whatWillLearn?.length > 0 ? (
                courseData?.whatWillLearn?.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No items available</li>
              )}
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h2 className="font-bold text-2xl mb-4">This Course Includes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaVideo className="text-xl mr-3 text-gray-600" />
                <p>Content on Demand video</p>
              </div>
              <div className="flex items-center">
                <RiArticleFill className="text-xl mr-3 text-gray-600" />
                <p>65 Articles</p>
              </div>
              <div className="flex items-center">
                <GiLaptop className="text-xl mr-3 text-gray-600" />
                <p>Access on Mobile and TV</p>
              </div>
              <div className="flex items-center">
                <FaTrophy className="text-xl mr-3 text-gray-600" />
                <p>Certificate of Completion</p>
              </div>
              <div className="flex items-center">
                <FaFileDownload className="text-xl mr-3 text-gray-600" />
                <p>Downloadable Resources</p>
              </div>
              <div className="flex items-center">
                <FaRunning className="text-xl mr-3 text-gray-600" />
                <p>Coding Exercises</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {courseData?.lessons?.map((lesson: any, index: number) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => setOpenLesson(openLesson === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold">Lesson {index + 1}: {lesson.title}</h3>
                  <span className="text-blue-600">{openLesson === index ? '−' : '+'}</span>
                </div>
                {openLesson === index && (
                  <div className="p-4 border-t">
                    <div className="flex items-start space-x-4 ">
                      <img src={lesson.thumbnail} alt={lesson.title} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">{lesson.description}</p>
                     
                      </div>
                    </div>
                    <div className="flex justify-end">
                    <button
                    onClick={() => handlePreview()}
                    className="border-2 border-darkBlue text-darkBlue  px-2 py-1 rounded-md  transition duration-300 flex items-center"
                    >
                    <MdOutlineOndemandVideo className="mr-2 text-darkBlue text-xl" />
                     <h1 className="font-bold">Preview</h1>
                    </button>
                    </div>
                   
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <div className="mb-6">
            <iframe 
              src={courseData?.trial?.video} 
              frameBorder="0" 
              className="w-full aspect-video rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
         
          <div className="space-y-4 mb-6">
            <h2 className="font-bold text-xl">Includes</h2>
            <div className="flex items-center">
              <FaVideo className="text-xl mr-3 text-gray-600" />
              <p>Content on Demand video</p>
            </div>
            <div className="flex items-center">
              <RiArticleFill className="text-xl mr-3 text-gray-600" />
              <p>65 Articles</p>
            </div>
            <div className="flex items-center">
              <GiLaptop className="text-xl mr-3 text-gray-600" />
              <p>Access on Mobile and TV</p>
            </div>
            <div className="flex items-center">
              <FaRunning className="text-xl mr-3 text-gray-600" />
              <p>Coding Exercises</p>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <h2 className="font-bold text-xl">Details</h2>
            <div className="flex items-center">
              <PiStudentBold className="text-xl mr-3 text-gray-600" />
              <p>Enrolled: 20</p>
            </div>
            <div className="flex items-center">
              <FaClock className="text-xl mr-3 text-gray-600" />
              <p>Duration: 2 hours</p>
            </div>
          </div>
          
        </div>
      </div>

    
    </div>
  );
}

export default UserEnrollmentCourseDetail;