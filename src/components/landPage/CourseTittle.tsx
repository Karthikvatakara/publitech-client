
function CourseSection() {
  return (
    <>
        
            <div className='flex justify-between p-1 m-1 ms-8 me-8 font-semibold'>
                
                <div className='hover:bg-darkBlue rounded-xl p-2 hover:text-white duration-300 cursor-pointer'>All Courses</div>
                <div className='flex space-x-14'>
                <div className='hover:bg-darkBlue rounded-xl p-2 hover:text-white duration-300 cursor-pointer'>Design</div>
                <div className='hover:bg-darkBlue rounded-xl p-2 hover:text-white duration-300 cursor-pointer'>Devolopment</div>
                <div className='hover:bg-darkBlue rounded-xl p-2 hover:text-white duration-300 cursor-pointer'>PhotoGraphy</div>
                <div className='hover:bg-darkBlue rounded-xl p-2 hover:text-white duration-300 cursor-pointer'>Music</div>
                </div>
            </div>
        
    </>
  )
}

export default CourseSection
