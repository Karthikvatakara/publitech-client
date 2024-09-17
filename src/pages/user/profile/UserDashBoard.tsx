import React from 'react';

const courses = [
  {
    title: "Kerala Mohiniyattam",
    image: "https://res.cloudinary.com/dozwnxgav/image/upload/v1721888078/images/r4rq6gwigd8ami8adgzw.jpg",
    enrollDate: "6/20/2024",
    completion: 75
  },
  {
    title: "React from basics to pro",
    image: "https://res.cloudinary.com/dozwnxgav/image/upload/v1721888485/images/bbxtgmfbdyochkf0crrn.png",
    enrollDate: "6/21/2024",
    completion: 50
  },
  {
    title: "Mind Relaxing meditation",
    image: "https://res.cloudinary.com/dozwnxgav/image/upload/v1721889540/images/smwny0vbyl0kcnuktp9m.jpg",
    enrollDate: "6/22/2024",
    completion: 30
  },
  {
    title: "UI/UX Designing",
    image: "https://res.cloudinary.com/dozwnxgav/image/upload/v1721888848/images/qus0he3ksikcm902q0qt.jpg",
    enrollDate: "6/23/2024",
    completion: 10
  }
];

const UserDashBoard = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Panel</h1>
        <div className="flex items-center space-x-4">
          <span>karthik</span>
          <button className="bg-blue-500 text-white p-2 rounded-full">
            {/* User icon */}
          </button>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="Completed Courses" value="3" icon="🎓" />
          <StatCard title="Ongoing Courses" value="1" icon="📚" />
          <StatCard title="Total Enrolled Courses" value="4" icon="📊" />
        </div>

        <LearningStreak />

        <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">My Enrollments</h2>
        <div className="grid grid-cols-2 gap-4">
          {courses.map((course, index) => (
            <CourseCard 
              key={index}
              title={course.title}
              enrollDate={course.enrollDate}
              completion={course.completion}
              image={course.image}
            />
          ))}
        </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Top Performing Categories</h2>
          <BarChart />
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <div className="flex justify-between items-center">
      <span className="text-3xl">{icon}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <h3 className="mt-2 text-sm">{title}</h3>
  </div>
);

const LearningStreak = () => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-2">Your Learning Streak</h2>
    <div className="flex justify-between">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
        <div key={day} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full ${index === 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1">{day}</span>
        </div>
      ))}
    </div>
    <p className="text-sm mt-2">1 day streak 🔥</p>
  </div>
);

const CourseCard = ({ title, enrollDate, completion, image }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-2" />
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">Enrolled: {enrollDate}</p>
    <div className="mt-2 bg-gray-200 rounded-full">
      <div 
        className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" 
        style={{ width: `${completion}%` }}
      >
        {completion}%
      </div>
    </div>
  </div>
);

const BarChart = () => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    {/* Implement bar chart here */}
    <p>Bar chart placeholder</p>
  </div>
);

export default UserDashBoard;