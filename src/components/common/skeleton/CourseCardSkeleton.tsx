
const CourseCardSkeleton = () => {
  return (
    <div className="mt-14 flex items-center justify-center">
      <div className="bg-white w-72 h-[400px] flex flex-col rounded-xl overflow-hidden shadow-md border border-gray-200">
        <div className="h-48 bg-gray-200 rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
            </div>
            <div className="flex justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-1/4 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;