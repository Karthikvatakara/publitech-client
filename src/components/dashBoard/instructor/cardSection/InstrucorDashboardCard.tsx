
const InstrucorDashboardCard = ({ title, value, icon }:{ title:string, value:number, icon: any}) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <span className="text-2xl mr-2">{icon}</span>
        <div>
          <h2 className="text-sm text-gray-500">{title}</h2>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

export default InstrucorDashboardCard;