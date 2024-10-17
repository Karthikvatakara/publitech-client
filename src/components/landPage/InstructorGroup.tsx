import instructor1 from "../../assets/instructors/360_F_584652599_s89lyUhPSMfX5YsRlKsa1AglJT7vNioO.jpg"
import instructor2 from "../../assets/instructors/download (2).jpeg"
import instructor3 from "../../assets/instructors/download (3).jpeg"
import instructor4 from "../../assets/instructors/serious-successful-arabian-businessman-formal-260nw-1879913899.webp"

function InstructorGroup() {
  const instructors = [
    { img: instructor1, name: "Renuka Singh" },
    { img: instructor2, name: "mohan mehta" },
    { img: instructor3, name: "Deepika mehta" },
    { img: instructor4, name: "Phirosha mehta" },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-center font-bold text-2xl sm:text-3xl mb-8'>
        Co-<span className='text-darkBlue'>Founders</span>
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {instructors.map((instructor, index) => (
          <div key={index} className='flex flex-col items-center'>
            <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 overflow-hidden rounded-full mb-4'>
              <img 
                src={instructor.img} 
                alt={instructor.name} 
                className='w-full h-full object-cover hover:scale-110 cursor-pointer transition duration-300'
              />
            </div>
            <h2 className='text-sm text-center font-bold'>{instructor.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InstructorGroup