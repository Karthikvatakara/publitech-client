import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, RootState } from '../../../redux/store';
import { getSingleCourse } from '../../../redux/actions/course/courseActons';
import ReactPlayer from 'react-player';
import { FaPlay, FaPaperclip, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

function CoursePreview() {
  const [courseData, setCourseData] = useState<any | null>(null);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppState>();
  const { loading, course } = useSelector<RootState, { loading: boolean; course: any }>((state) => state.courses);

  useEffect(() => {
    if (courseId) {
      getData(courseId);
    }
  }, [dispatch, courseId]);

  const getData = async (courseId: string) => {
    const response = await dispatch(getSingleCourse(courseId));
    if (response?.payload?.success) {
      setCourseData(response?.payload?.data);
    }
  };

  const handleLessonClick = (index: number) => {
    setCurrentLesson(index);
  };

  const handleOpenPDF = (attachmentUrl: string) => {
    window.open(attachmentUrl, '_blank');
  };

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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ExpandableDescription = ({ description, maxWords }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const words = description?.split(' ') || [];
  const shortDescription = words.slice(0, maxWords).join(' ');
  const isLongDescription = words.length > maxWords;

  return (
    <div className="text-gray-600 mb-4">
      <p>
        {isExpanded ? description : shortDescription}
        {isLongDescription && !isExpanded && '...'}
      </p>
      {isLongDescription && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

const LessonItem = ({ lesson, index, currentLesson, handleLessonClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = lesson.description.split(' ');
  const isLongDescription = words.length > 50;

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`p-3 rounded-md cursor-pointer transition duration-300 ease-in-out ${
        currentLesson === index
          ? 'bg-blue-100 border-l-4 border-blue-500'
          : 'hover:bg-gray-100'
      }`}
      onClick={() => handleLessonClick(index)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow">
          <FaPlay className={`mr-2 ${currentLesson === index ? 'text-blue-500' : 'text-gray-500'}`} />
          <div className="flex-grow">
            <h3 className="font-semibold">{lesson.title}</h3>
            <p className={`text-sm text-gray-600 ${isExpanded ? '' : 'line-clamp-2'}`}>
              {isExpanded ? lesson.description : words.slice(0, 50).join(' ')}
              {isLongDescription && !isExpanded && '...'}
            </p>
            {isLongDescription && (
              <button 
                onClick={toggleExpand} 
                className="text-blue-500 hover:text-blue-700 text-sm mt-1 focus:outline-none"
              >
                {isExpanded ? (
                  <span className="flex items-center">Show Less <FaChevronUp className="ml-1" /></span>
                ) : (
                  <span className="flex items-center">Show More <FaChevronDown className="ml-1" /></span>
                )}
              </button>
            )}
          </div>
        </div>
        {lesson.attachments && (
          <FaPaperclip className="text-gray-400 ml-2 flex-shrink-0" title="Attachment available" />
        )}
      </div>
    </div>
  );
};

export default CoursePreview;