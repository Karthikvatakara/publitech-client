// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from '../../components/user/CheckOutForm';
// import { RootState } from '../../redux/store';
// import { useSelector } from 'react-redux';
// import { FaBook, FaUser, FaClock, FaGraduationCap } from 'react-icons/fa';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

// const CheckoutPage = () => {
//     const { loading, user } = useSelector((state: RootState) => state.user);
//     const { course } = useSelector((state: RootState) => state.courses);

//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                     <div className="px-4 py-5 sm:px-6">
//                         <h2 className="text-3xl font-extrabold text-gray-900">Checkout</h2>
//                         <p className="mt-1 max-w-2xl text-sm text-gray-500">Complete your purchase</p>
//                     </div>
//                     <div className="border-t border-gray-200">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//                             <div>
//                                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Course Details</h3>
//                                 <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//                                     <div className="flex items-center mb-4">
//                                         <FaBook className="text-indigo-600 mr-2" />
//                                         <span className="font-semibold">{course?.title}</span>
//                                     </div>
//                                     <div className="flex items-center mb-4">
//                                         <FaUser className="text-indigo-600 mr-2" />
//                                         <span>{course?.instructorRef?.username}</span>
//                                     </div>
//                                     <div className="flex items-center mb-4">
//                                         <FaClock className="text-indigo-600 mr-2" />
//                                         <span>{course?.duration || 'N/A'} hours</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <FaGraduationCap className="text-indigo-600 mr-2" />
//                                         <span>{course?.level || 'All levels'}</span>
//                                     </div>
//                                 </div>
//                                 <div className="mt-6">
//                                     <h4 className="text-lg font-semibold text-gray-900 mb-2">Price</h4>
//                                     <p className="text-3xl font-bold text-indigo-600">
//                                         {course?.pricing?.amount === 0 ? 'Free' : `₹${course?.pricing?.amount}`}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment Details</h3>
//                                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                                     <Elements stripe={stripePromise}>
//                                         <CheckoutForm courseData={course} user={user} />
//                                     </Elements>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;