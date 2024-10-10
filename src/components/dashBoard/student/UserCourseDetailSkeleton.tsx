
const UserCourseDetailSkeleton = () => {
  const ShimmerEffect = () => (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
  );

  return (
    <div className="w-full p-4 md:p-8 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-gray-100 rounded-md p-6 md:p-11 space-y-3 mb-8">
        <div className="h-8 bg-gray-300 rounded w-3/4 relative overflow-hidden">
          <ShimmerEffect />
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2 relative overflow-hidden">
          <ShimmerEffect />
        </div>
        <div className="h-4 bg-gray-300 rounded w-2/3 relative overflow-hidden">
          <ShimmerEffect />
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4 relative overflow-hidden">
          <ShimmerEffect />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content skeleton */}
        <div className="md:col-span-2 bg-gray-100 rounded-md p-6">
          <div className="space-y-6">
            {/* Instructor info skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full w-12 h-12 bg-gray-300 mr-4 relative overflow-hidden">
                  <ShimmerEffect />
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2 relative overflow-hidden">
                    <ShimmerEffect />
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-16 relative overflow-hidden">
                    <ShimmerEffect />
                  </div>
                </div>
              </div>
              <div className="w-24 h-8 bg-gray-300 rounded relative overflow-hidden">
                <ShimmerEffect />
              </div>
            </div>

            {/* Course title skeleton */}
            <div className="h-6 bg-gray-300 rounded w-3/4 relative overflow-hidden">
              <ShimmerEffect />
            </div>

            {/* Course stats skeleton */}
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-300 rounded w-20 relative overflow-hidden">
                  <ShimmerEffect />
                </div>
              ))}
            </div>

            {/* Overview skeleton */}
            <div className="border-2 border-gray-300 p-6 rounded-lg space-y-4">
              <div className="h-5 bg-gray-300 rounded w-1/4 relative overflow-hidden">
                <ShimmerEffect />
              </div>
              <div className="h-4 bg-gray-300 rounded w-full relative overflow-hidden">
                <ShimmerEffect />
              </div>
              <div className="h-4 bg-gray-300 rounded w-full relative overflow-hidden">
                <ShimmerEffect />
              </div>
              <div className="h-5 bg-gray-300 rounded w-1/3 relative overflow-hidden">
                <ShimmerEffect />
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded w-2/3 relative overflow-hidden">
                    <ShimmerEffect />
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons skeleton */}
            <div className="border-2 border-gray-300 rounded-md">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-300 rounded mb-2 relative overflow-hidden">
                  <ShimmerEffect />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="bg-gray-100 rounded-md p-6">
          <div className="mb-6">
            <div className="w-full h-36 bg-gray-300 rounded-md relative overflow-hidden">
              <ShimmerEffect />
            </div>
          </div>
          <div className="text-center mb-6">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto relative overflow-hidden">
              <ShimmerEffect />
            </div>
          </div>
          <div className="mb-6">
            <div className="h-12 bg-gray-300 rounded w-full relative overflow-hidden">
              <ShimmerEffect />
            </div>
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-md space-y-4">
            <div className="h-5 bg-gray-300 rounded w-1/4 relative overflow-hidden">
              <ShimmerEffect />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-full relative overflow-hidden">
                <ShimmerEffect />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourseDetailSkeleton;