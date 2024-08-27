import { FaPlay, FaPaperclip, FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const LessonItem = ({ lesson, index, currentLesson, handleLessonClick, progress }) => {
  // console.log("🚀 ~ LessonItem ~ progress:", progress)
  const [isExpanded, setIsExpanded] = useState(false);
  const words = lesson.description.split(' ');
  const isLongDescription = words.length > 50;

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const isCompleted = progress?.isCompleted || false;
  // console.log("🚀 ~ LessonItem ~ isCompleted:", isCompleted)

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
        <div className="flex items-center">
          {lesson.attachments && (
            <FaPaperclip className="text-gray-400 mr-2 flex-shrink-0" title="Attachment available" />
          )}
          {isCompleted && (
            <FaCheckCircle className="text-green-500 flex-shrink-0" title="Lesson completed" />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonItem;