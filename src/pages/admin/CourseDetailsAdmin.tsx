import React, { useEffect, useState } from "react";
import { FaBook, FaRegClock, FaVideo, FaTrophy, FaFileDownload, FaRunning, FaClock } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { RiArticleFill } from "react-icons/ri";
import { GiLaptop } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { getSingleCourse } from "../../redux/actions/course/courseActons";
import axios from "axios";
import { URL } from "../../common/api";
import { config } from "../../common/configurations";

function CourseDetailsAdmin() {
    const [courseData, setCourseData] = useState<any | null>(null);
    const [actionTaken, setActionTaken] = useState(false);
    const { courseId } = useParams<{ courseId: string }>();
    const [openLesson, setOpenLesson] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [ rejectionError,setRejectionError ] = useState('')
    const dispatch = useDispatch<AppState>();

    useEffect(() => {
        if (courseId) {
            getData(courseId);
        }
    }, [dispatch, courseId, actionTaken]);

    const getData = async (courseId: string) => {
        console.log("🚀 ~ getData ~ courseId:", courseId);
        const res = await dispatch(getSingleCourse(courseId));
        console.log("🚀 ~ getData ~ res:", res);
        if (res?.payload?.success) {
            setCourseData(res?.payload?.data);
        }
    };

    const handleCourseAction = async (action: "accepted" |"rejected") => {
        if (action === "rejected") {
            setIsRejectModalOpen(true);
        } else {
            try {
              const updatedCourseData = { ...courseData, isVerified: true, stage: "accepted", isPublished: true };
              console.log("🚀 ~ handleCourseAction ~ updatedCourseData:", updatedCourseData)
              
                const response = await axios.put(`${URL}/api/course/update-course/${courseId}`,  updatedCourseData , config);
                
                console.log("🚀 ~ handleCourseAction ~ response:", response)
                if (response.data.success) {
                    setActionTaken(true);
                } else {
                    console.error("Error updating course status:", response.data.message);
                }
            } catch (error) {
                console.error(error, "error occurred in status change");
            }
        }
    };

    const handleRejectConfirm = async () => {
        try {
            setRejectionError('');
            if (!rejectionReason.trim()) {
              setRejectionError('Rejection reason cannot be empty.');
              return;
          }
          
          if (rejectionReason.trim().length < 10) {
              setRejectionError('Rejection reason must be at least 10 characters long.');
              return;
          }

            const updatedCourseData = { ...courseData, isVerified: true, stage: "rejected", isPublished: false,rejectReason:rejectionReason };

            const response = await axios.put(`${URL}/api/course/update-course/${courseId}`,updatedCourseData, config);
            
            if (response.data.success) {
                setActionTaken(true);
                setIsRejectModalOpen(false);
                setRejectionReason('');
            } else {
                console.error("Error updating course status:", response.data.message);
            }
        } catch (error) {
            console.error(error, "error occurred in status change");
        }
    };

    const coursePrice = courseData?.pricing?.amount == 0 ? "free" : `₹ ${courseData?.pricing?.amount}`;

    return (
        <div className="w-full grid grid-cols-12 gap-4 p-4">
            <div className="col-span-12 md:col-span-8 bg-gray-100 rounded-md p-4">
                <div className="flex flex-col">
                    <div className="p-3 flex items-center ">
                        <div className="rounded-full w-12 h-12 m-2 flex items-center justify-center">
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
                            <p className="m-2">{courseData?.lessons?.length}</p>
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
                        <p className="font-semibold">{courseData?.description}</p>
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
                        {courseData?.lessons?.map((lesson: any, index: number) => (
                            <div key={index} className="collapse collapse-plus bg-base-200 mb-2">
                                <input
                                    type="checkbox"
                                    checked={openLesson === index}
                                    onChange={() => setOpenLesson(openLesson === index ? null : index)}
                                />
                                <div className="collapse-title text-xl font-medium">
                                    <span className="font-bold mr-2">Lesson {index + 1}:</span> {lesson.title}
                                </div>
                                <div className="collapse-content">
                                    <div className="flex flex-col space-y-4">
                                        <div className="w-full h-64">
                                            <iframe
                                                src={lesson.video}
                                                frameBorder="0"
                                                className="w-full h-full"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                <span className="font-bold">Lesson {index + 1}:</span> {lesson.title}
                                            </h3>
                                            <p>{lesson.description}</p>
                                            {lesson.attachments && (
                                                <div>
                                                    <h4 className="font-semibold mt-2">Attachments:</h4>
                                                    <a href={lesson.attachments.url} target="_blank" rel="noopener noreferrer">
                                                        {lesson.attachments.title}
                                                    </a>
                                                </div>
                                            )}
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
                <div className="mt-4 space-y-2">
                    {courseData?.stage === "requested" && (
                        <>
                            <button
                                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                onClick={() => handleCourseAction("accepted")}
                            >
                                Publish
                            </button>
                            <button
                                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                onClick={() => setIsRejectModalOpen(true)}
                            >
                                Reject
                            </button>
                        </>
                    )}
                    {courseData?.stage === "accepted" && (
                        <div className="text-green-600 font-bold text-center">Approved</div>
                    )}
                    {courseData?.stage === "rejected" && (
                        <div className="text-red-600 font-bold text-center">Rejected</div>
                    )}
                </div>
            </div>

            {isRejectModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Reject Course</h2>
                        <textarea
                            className="w-full h-32 p-2 border rounded mb-4"
                            placeholder="Enter reason for rejection"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        ></textarea>
                         {rejectionError && (
                          <p className="text-red-500 text-sm mb-2">{rejectionError}</p>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => {
                                    setIsRejectModalOpen(false);
                                    setRejectionReason('');
                                    setRejectionError('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={handleRejectConfirm}
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseDetailsAdmin;