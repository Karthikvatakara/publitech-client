import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, RootState } from '../../../redux/store';
import { getSingleCourse } from '../../../redux/actions/course/courseActons';
import ReactPlayer from 'react-player';
import { FaPlay, FaPaperclip, FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import axios from 'axios';
import _ from 'lodash';
import LessonItem from './courseComponents/LessonItem';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import ExpandableDescription from './courseComponents/ExpandableDescription';
import { RiPlayReverseFill } from 'react-icons/ri';
import { EnrollmentEntity } from '../../../interface/EnrollmentEntity';
import { assessmentEntity } from '../../../interface/assessmentEntity';
import ExamPassedModal from '../../../components/exam/ExamPassedModal';

interface LessonProgress {
  lastWatchedPosition?: number;
  totalTimeWatched?: number;
  isCompleted?: boolean;
}

function CoursePreview() {
  const [courseData, setCourseData] = useState<any | null>(null);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({});
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppState>();
  const { loading, course } = useSelector<RootState, { loading: boolean; course: any }>((state) => state.courses);
  const userId = useSelector((state: RootState) => state.user.user._id);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [ enrollment, setEnrollment ] = useState<EnrollmentEntity | null>(null)
  const [ examPresent, setExamPresent ] = useState<boolean>(false);
  const [allLessonsCompleted, setAllLessonsCompleted] = useState<boolean>(false);
  const [ examDetails, setExamDetails ] = useState<assessmentEntity | null>(null);
  const [ examPassed, setExamPassed ] = useState<boolean>(false)
  const navigate = useNavigate();
  const [ showPassedModal, setShowPassedModal ] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    getEnrolledCourse();
  },[])

  useEffect(() => {
    const fetchData = async() => {
      await getExamsOfCourse();
      getExamResult();
    }
    fetchData();
  },[])

  useEffect(() => {
    if (courseId) {
      getData(courseId);
    }
  }, [dispatch, courseId]);


  useEffect(() => {
    if (courseId && courseData?.lessons[currentLesson]?._id) {
      fetchLessonProgress(courseData.lessons[currentLesson]._id);
    }
  }, [courseId, currentLesson, courseData]);

  useEffect(() => {
    if (examDetails && examDetails._id) {
      getExamResult();
    }
  }, [examDetails]);

  const checkAllLessonsCompleted = useCallback(() => {
    if (enrollment?.progress?.lessonProgress && courseData?.lessons) {
      const allCompleted = courseData.lessons.every(lesson => 
        enrollment?.progress?.lessonProgress.find(lp => lp.lessonId === lesson._id)?.isCompleted
      );
      setAllLessonsCompleted(allCompleted);
    }
  }, [enrollment, courseData]); 

  useEffect(() => {
    checkAllLessonsCompleted();
  }, [enrollment, courseData, checkAllLessonsCompleted]);

 
  const getData = async (courseId: string) => {
    const response = await dispatch(getSingleCourse(courseId));
    if (response?.payload?.success) {
      setCourseData(response?.payload?.data);
    }
  };

  const getEnrolledCourse = async() => {
    const response = await axios.get(`${URL}/api/course/enrollment/${courseId}/${userId}`,config);
    setEnrollment(response?.data?.data)
    console.log("🚀 ~ getEnrolledCourse ~ response:", response?.data?.data)
  }

  const getExamsOfCourse = async() => {
    const response = await axios.get(`${URL}/api/course/exams/${courseId}`,config);
    console.log("🚀 ~ getExamsOfCourse ~ response:", response)
    if( response?.data?.succes ) {
      console.log(response?.data?.success,"::::::::::::::::::::::::")
      setExamPresent(true);
      setExamDetails(response?.data?.data)
    }
  }

  const fetchLessonProgress = async (lessonId: string) => {
    try {
      const response = await axios.get<{data: LessonProgress }>(`${URL}/api/course/lesson-progress/${userId}/${courseId}/${lessonId}`, config);
      setLessonProgress(response?.data?.data || {});
      // console.log(response?.data?.data,"????????????????????????????????????")
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
      setLessonProgress({});
    }
  };

  const handleLessonClick = (index: number) => {
    setCurrentLesson(index);
    setHasInitialized(false);
    if (courseData?.lessons[index]?._id) {
      fetchLessonProgress(courseData.lessons[index]._id);
    }
  };

  const handleOpenPDF = (attachmentUrl: string) => {
    window.open(attachmentUrl, '_blank');
  };

  const handleProgress = useCallback(
    _.debounce(async (progress) => {
      const lessonId = courseData.lessons[currentLesson]._id;
      const timeWatched = progress.playedSeconds;
      const totalDuration = progress.loadedSeconds;
      const isCompleted = (timeWatched / totalDuration) >= 0.95; // Consider it complete when 95% watched
  
      try {
        await axios.post(`${URL}/api/course/lesson-progress`, {
          userId,
          courseId,
          lessonId,
          timeWatched,
          totalDuration,
          isCompleted
        }, config);
  
        setLessonProgress(prev => ({
          ...prev,
          lastWatchedPosition: timeWatched,
          totalTimeWatched: timeWatched,
          isCompleted
        }));
  
        if (isCompleted) {
          getEnrolledCourse(); // Call this when the lesson is completed
        }
      } catch (error) {
        console.error('Error updating lesson progress:', error);
      }
    }, 5000),
    [userId, courseId, currentLesson, courseData, getEnrolledCourse]
  );

  const getExamResult = async() => {
    if(examDetails && examDetails?._id) {
      const response = await axios.get(`${URL}/api/course/isResultExist/${examDetails?._id}`,config);
      console.log("🚀 ~ getExamResult ~ response:", response)
      if (response?.data?.success){
        if(response?.data?.data?.isPassed){
          setExamPassed(true)
        }
      }else{
        setExamPassed(false)
      }
    }else{
      console.log("not data is received yet");   
    }
  }


  const handleTakeExam = () => {
    console.log(examPassed,"1222233333333333333333333333");
    if(examPassed){
      setShowPassedModal(true)
    }else{
      navigate(`/student/exams/${examDetails?._id}`)
    }
  }


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen p-4'>
      <div className='w-full p-4 bg-white rounded-lg shadow-md mb-4'>
        <h1 className='text-darkBlue font-bold text-3xl break-words'>{courseData?.title}</h1>
      </div>
      <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-8 bg-white p-4 rounded-lg shadow-md'>
          {courseData?.lessons && courseData.lessons.length > 0 ? (
            <ReactPlayer
              url={courseData.lessons[currentLesson].video}
              controls
              width="100%"
              height="auto"
              className="react-player"
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
              onProgress={handleProgress}
              progressInterval={1000}
              playing={false}
              onReady={() => {
                if (lessonProgress?.lastWatchedPosition && !hasInitialized) {
                  playerRef.current?.seekTo(lessonProgress.lastWatchedPosition, 'seconds');
                  setHasInitialized(true);
                }
              }}
              ref={playerRef}
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
              <p className="text-gray-500">No video available</p>
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2 break-words">
              {courseData?.lessons[currentLesson]?.title}
            </h2>
            <ExpandableDescription 
              description={courseData?.lessons[currentLesson]?.description} 
              maxWords={50}
            />
            {courseData?.lessons[currentLesson]?.attachments && (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FaPaperclip className="text-blue-500 mr-2" />
                    <span className="font-medium">{courseData.lessons[currentLesson].attachments.title || 'Lesson Resources'}</span>
                  </div>
                  <button
                    onClick={() => handleOpenPDF(courseData?.lessons[currentLesson]?.attachments?.url)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
                  >
                    <FaPaperclip className="mr-2" />
                    View PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='lg:col-span-4 bg-white p-4 rounded-lg shadow-md'>
          <h2 className='font-bold text-darkBlue text-xl mb-4'>Course Content</h2>
          <div className="space-y-2">
            {courseData?.lessons?.map((lesson: any, index: number) => (
              <LessonItem
                key={index}
                lesson={lesson}
                index={index}
                currentLesson={currentLesson}
                handleLessonClick={handleLessonClick}
                // progress={courseData.progress?.lessonProgress?.find(lp => lp.lessonId === lesson._id)}
                progress={enrollment?.progress?.lessonProgress?.find(lp => lp.lessonId === lesson._id)}
              />
            ))}
            {/* {console.log(examPresent,"EXAMPRESENT CONSOLLING")} */}
            {/* {console.log(allLessonsCompleted,"all lessons Completed CONSOLLING")} */}
            {examPresent && allLessonsCompleted && (
          <button className='w-full bg-darkBlue text-white p-2 border rounded-md font-semibold' onClick={()=> handleTakeExam()}>
            Take Exam
          </button>
        )}          
        </div>
        </div>
      </div>
      <ExamPassedModal
      isOpen={showPassedModal}
      onClose={() => setShowPassedModal(false)}
    />
    </div>
    
  );
}

export default CoursePreview;