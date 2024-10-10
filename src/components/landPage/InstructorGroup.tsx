import instructor1 from "../../assets/instructors/360_F_584652599_s89lyUhPSMfX5YsRlKsa1AglJT7vNioO.jpg"
import instructor2 from "../../assets/instructors/download (2).jpeg"
import instructor3 from "../../assets/instructors/download (3).jpeg"
import instructor4 from "../../assets/instructors/serious-successful-arabian-businessman-formal-260nw-1879913899.webp"

function InstructorGroup() {
  return (
    <>
        <div className='flex flex-col justify-center items-center p-6 m-4 font-bold text-3xl'>
            <h1>Best <span>Instructors</span></h1>
            <div className='p-4 m-6 flex space-x-16'>
                <div className='flex flex-col items-center space-y-4'>
                    <img src={instructor1} alt="" className='object-fill w-36 h-36 rounded-full hover:scale-110 hover:border-2 cursor-pointer duration-300'/>
                    <h1 className='text-sm'>Phirosha mehta</h1>
                </div>
                <div className='flex flex-col items-center space-y-4'>
                    <img src={instructor2} alt="" className='w-36 h-36 object-fill rounded-full hover:scale-110 hover:border-2 cursor-pointer duration-300'/>
                    <h1 className='text-sm'>Phirosha mehta</h1>
                </div>
                <div className='flex flex-col items-center space-y-4'>
                    <img src={instructor3} alt="" className='w-36 h-36 rounded-full  object-fill hover:scale-110 hover:border-2 cursor-pointer duration-300' />
                    <h1 className='text-sm'>Phirosha mehta</h1>
                </div>
                <div className='space-y-4 flex flex-col items-center'>
                    <img src={instructor4} alt="" className='w-36 h-36 rounded-full object-cover hover:scale-110 hover:border-2 cursor-pointer duration-300' />
                    <h1 className='text-sm'>Phirosha mehta</h1>

                </div>
            </div>
        </div>
    </>
  )
}

export default InstructorGroup
