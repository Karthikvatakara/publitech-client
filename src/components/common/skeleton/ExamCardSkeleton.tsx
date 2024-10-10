
const ExamCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-sm">
      <div className="bg-gray-200 rounded-full p-4 mb-4 mx-auto w-20 h-20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 mx-auto relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 mx-auto relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 mx-auto relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 mx-auto relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded-full w-full relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
      </div>
    </div>
  );
};

export default ExamCardSkeleton;