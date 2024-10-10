import SummaryCardsStudent from '../../../components/dashBoard/student/SummaryCardsStudent';
import MyEnrollmentsSection from '../../../components/dashBoard/student/MyEnrollmentsSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const UserDashBoard = () => {
  const { user } = useSelector((state:RootState) => state.user)

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Panel</h1>
        <div className="flex items-center space-x-4">
          <span className='font-bold text-gray-500'>{user?.username}</span>
          <button className="bg-blue-500 text-white p-2 rounded-full">
            {/* User icon */}
          </button>
        </div>
      </header>

      <main>
        <SummaryCardsStudent/>
  
        {/* <LearningStreak /> */}
        <MyEnrollmentsSection/>

        <section className="mt-6">
          {/* <h2 className="text-xl font-semibold mb-4">Top Performing Categories</h2> */}
          {/* <BarChart /> */}
        </section>
      </main>
    </div>
  );
};



// const LearningStreak = () => (
//   <div className="bg-gray-100 p-4 rounded-lg shadow">
//     <h2 className="text-lg font-semibold mb-2">Your Learning Streak</h2>
//     <div className="flex justify-between">
//       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
//         <div key={day} className="flex flex-col items-center">
//           <div className={`w-8 h-8 rounded-full ${index === 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//           <span className="text-xs mt-1">{day}</span>
//         </div>
//       ))}
//     </div>
//     <p className="text-sm mt-2">1 day streak 🔥</p>
//   </div>
// );

// const BarChart = () => (
//   <div className="bg-gray-100 p-4 rounded-lg shadow">
//     {/* Implement bar chart here */}
//     <p>Bar chart placeholder</p>
//   </div>
// );

export default UserDashBoard;