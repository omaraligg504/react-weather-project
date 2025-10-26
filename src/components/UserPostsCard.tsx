import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserPostsCard = () => {
  const navigate = useNavigate();

  // Fetch users using React Query
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      return response.json() as Promise<User[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Users & Posts</h2>
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Users & Posts</h2>
      <p className="text-sm text-gray-600 mb-4">Click on a user to view their posts and todos</p>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {users?.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPostsCard;
