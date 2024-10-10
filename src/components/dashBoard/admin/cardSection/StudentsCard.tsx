

function StudentsCard({ data }: { data: number}) {

  return (
    <div>
       <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center">
        <span className="text-2xl mr-3">👥</span>
        <div>
          <h3 className="text-sm text-gray-500">Total Students</h3>
          <p className="text-2xl font-bold">{data}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default StudentsCard
