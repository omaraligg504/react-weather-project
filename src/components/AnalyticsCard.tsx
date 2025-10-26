import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  username: string;
}

interface Post {
  userId: number;
}

interface Todo {
  userId: number;
  completed: boolean;
}

const AnalyticsCard = () => {
  // Fetch all data
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      return response.json() as Promise<User[]>;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.json() as Promise<Post[]>;
    },
  });

  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      return response.json() as Promise<Todo[]>;
    },
  });

  if (!users || !posts || !todos) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Analytics</h2>
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalUsers = users.length;

  // Count posts per user
  const postsPerUser = users.map(user => ({
    name: user.username,
    count: posts.filter(post => post.userId === user.id).length,
  }));

  const mostPosts = postsPerUser.reduce((max, user) => 
    user.count > max.count ? user : max
  );
  const fewestPosts = postsPerUser.reduce((min, user) => 
    user.count < min.count ? user : min
  );

  // Count completed todos per user
  const completedTodosPerUser = users.map(user => ({
    name: user.username,
    count: todos.filter(todo => todo.userId === user.id && todo.completed).length,
  }));

  const mostCompletedTodos = completedTodosPerUser.reduce((max, user) => 
    user.count > max.count ? user : max
  );
  const fewestCompletedTodos = completedTodosPerUser.reduce((min, user) => 
    user.count < min.count ? user : min
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Analytics</h2>
      
      <div className="space-y-3">
        {/* Total Users */}
        <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
        </div>

        {/* Most Posts */}
        <div className="p-3 bg-green-50 rounded-md border border-green-200">
          <p className="text-sm text-gray-600">Most Posts</p>
          <p className="font-semibold text-green-700">{mostPosts.name}</p>
          <p className="text-sm text-gray-600">{mostPosts.count} posts</p>
        </div>

        {/* Fewest Posts */}
        <div className="p-3 bg-orange-50 rounded-md border border-orange-200">
          <p className="text-sm text-gray-600">Fewest Posts</p>
          <p className="font-semibold text-orange-700">{fewestPosts.name}</p>
          <p className="text-sm text-gray-600">{fewestPosts.count} posts</p>
        </div>

        {/* Most Completed Todos */}
        <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
          <p className="text-sm text-gray-600">Most Completed Todos</p>
          <p className="font-semibold text-purple-700">{mostCompletedTodos.name}</p>
          <p className="text-sm text-gray-600">{mostCompletedTodos.count} completed</p>
        </div>

        {/* Fewest Completed Todos */}
        <div className="p-3 bg-red-50 rounded-md border border-red-200">
          <p className="text-sm text-gray-600">Fewest Completed Todos</p>
          <p className="font-semibold text-red-700">{fewestCompletedTodos.name}</p>
          <p className="text-sm text-gray-600">{fewestCompletedTodos.count} completed</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
