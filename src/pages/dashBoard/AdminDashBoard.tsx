import SummaryCards from '../../components/dashBoard/admin/cardSection/SummaryCards';
import ChartSection from '../../components/dashBoard/admin/chartSection/ChartSection';
import EnrollmentTable from '../../components/dashBoard/admin/tableSection/EnrollmentTable';

function AdminDashboard() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </header>
      <main className="p-6">
        {/* <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2> */}
        <SummaryCards />
        <ChartSection />
        <EnrollmentTable />
      </main>
    </div>
  );
}


export default AdminDashboard;