const StudentCourseCard = ({ title, enrollDate, completion, image }:{ title:string, enrollDate:string,completion: number, image: string}) => {

    const purchasedDate = new Date(enrollDate).toLocaleDateString();
return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-2" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Enrolled: {purchasedDate}</p>
      <div className="mt-2 bg-gray-200 rounded-full relative h-6">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
          style={{ width: `${completion}%` }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-xs font-medium z-10">
            {completion}%
          </span>
        </div>
      </div>
    </div>
)};
  
  export default StudentCourseCard;