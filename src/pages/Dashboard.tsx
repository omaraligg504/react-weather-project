import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserPostsCard from '../components/UserPostsCard';
import NoteManagerCard from '../components/NoteManagerCard';
import AnalyticsCard from '../components/AnalyticsCard';
import WeatherCard from '../components/WeatherCard';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserPostsCard />
          <NoteManagerCard />
          <AnalyticsCard />
          <WeatherCard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
