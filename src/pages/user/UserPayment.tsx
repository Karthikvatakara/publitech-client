import React from 'react'
import { useState } from 'react';
import UserCoursePayment from '../payment/UserCoursePayment';
import UserSubscriptionPayment from '../payment/UserSubscriptionPayment';

function UserPayment() {
  const [ activeTab, setActiveTab ] = useState('course');

  const handleTabClick = (tab:string) => {
    setActiveTab(tab)
  }
  return (
    <div>
      <h1 className='font-bold text-darkBlue p-3 text-2xl flex justify-center'>Payment History</h1>

      <div role="tablist" className="tabs tabs-boxed">
          <a 
            role="tab" 
            className={`tab font-bold text-xl text-darkBlue ${activeTab === 'course' ? 'tab-active' :''}`}
            onClick={() => handleTabClick('course')}
          >
            Course Payments
          </a>
          <a 
            role="tab" 
            className={`tab font-bold text-xl text-darkBlue ${activeTab === 'subscription' ? 'tab-active' : ''}`}
            onClick={() => handleTabClick('subscription')}
          >
            Subscription Payments
          </a>
        </div>


        { activeTab === 'course' && (
          <div>
            <UserCoursePayment/>
          </div>
        )}
        { activeTab === 'subscription' && (
          <div>
            <UserSubscriptionPayment/>
          </div>
        )}
    </div>

  
  )
}

export default UserPayment