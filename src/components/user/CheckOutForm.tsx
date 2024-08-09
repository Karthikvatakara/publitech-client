// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { CourseEntity } from '../../interface/courseEntity';
// import { UserEntity } from '../../interface/UserEntity';
// import { config } from '../../common/configurations';
// import { FaLock } from 'react-icons/fa';

// interface CheckoutFormProps {
//   courseData: CourseEntity;
//   user: UserEntity;
// }

// const CardElementStyle = {
//   style: {
//     base: {
//       fontSize: '16px',
//       color: '#32325d',
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: 'antialiased',
//       '::placeholder': {
//         color: '#aab7c4'
//       }
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a'
//     }
//   }
// };

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ courseData, user }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       setError('Stripe has not loaded yet. Please try again later.');
//       setLoading(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError('Card element not found.');
//       setLoading(false);
//       return;
//     }

//     const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (paymentMethodError) {
//       setError(paymentMethodError.message ?? 'An unknown error occurred.');
//       setLoading(false);
//       return;
//     }

//     const { id: paymentMethodId } = paymentMethod;
//     try {
//       const body = {
//         courseId: courseData._id,
//         userId: user._id,
//         amount: courseData?.pricing?.amount,
//         thumbnail: courseData?.thumbnail,
//         courseName: courseData?.title,
//         instructorRef: courseData?.instructorRef,
//         paymentMethodId
//       };

//       const response = await axios.post('/create-checkout-session', body, config);

//       const sessionId = response.data.id;
//       const { error: checkoutError } = await stripe.redirectToCheckout({ sessionId });

//       if (checkoutError) {
//         setError(checkoutError.message ?? 'An unknown error occurred.');
//       }
//     } catch (error: any) {
//       setError(error.message ?? 'An unknown error occurred.');
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
//           Credit or debit card
//         </label>
//         <div className="mt-1 relative rounded-md shadow-sm">
//           <CardElement 
//             id="card-element"
//             options={CardElementStyle}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//       </div>

//       {error && (
//         <div className="rounded-md bg-red-50 p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-red-800">
//                 There was an error processing your payment
//               </h3>
//               <div className="mt-2 text-sm text-red-700">
//                 <p>{error}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div>
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//             !stripe || loading 
//               ? 'bg-indigo-300 cursor-not-allowed' 
//               : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
//           }`}
//         >
//           <FaLock className="mr-2" />
//           {loading ? 'Processing...' : `Pay ₹${courseData?.pricing?.amount}`}
//         </button>
//       </div>

//       <div className="mt-4 text-center">
//         <p className="text-xs text-gray-500">
//           Your payment is secure. We use industry-standard encryption to protect your information.
//         </p>
//       </div>
//     </form>
//   );
// };

// export default CheckoutForm;