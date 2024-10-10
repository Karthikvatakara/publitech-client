import  { useState } from 'react'
import CoursePayments from './CoursePayments'
import SubscriptionPayments from './SubscriptionPayments'

function AdminPayments() {
  const [ activeTab, setActiveTab ] = useState('course');

  const handleTabClick = (tab:any) => {
    setActiveTab(tab)
  }

  return (
    <div>
  <h1 className='font-bold text-2xl text-darkBlue p-4'>Payment History</h1>
  <div >
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
  </div>

    {activeTab === "course" && (
      <div>
        <CoursePayments/>
      </div>
    )}
    { activeTab === "subscription" && (
      <div>
        <SubscriptionPayments/>
      </div>
    )}
    </div>
  )
}

export default AdminPayments
