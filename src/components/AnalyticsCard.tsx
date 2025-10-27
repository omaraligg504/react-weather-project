import { useQuery } from "@tanstack/react-query";

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
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.json() as Promise<User[]>;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json() as Promise<Post[]>;
    },
  });

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
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

  const totalUsers = users.length;

  const postsPerUser = users.map((user) => ({
    name: user.username,
    count: posts.filter((post) => post.userId === user.id).length,
  }));

  const mostPosts = postsPerUser.reduce((max, user) =>
    user.count > max.count ? user : max
  );
  const fewestPosts = postsPerUser.reduce((min, user) =>
    user.count < min.count ? user : min
  );

  const completedTodosPerUser = users.map((user) => ({
    name: user.username,
    count: todos.filter((todo) => todo.userId === user.id && todo.completed)
      .length,
  }));

  const mostCompletedTodos = completedTodosPerUser.reduce((max, user) =>
    user.count > max.count ? user : max
  );
  const fewestCompletedTodos = completedTodosPerUser.reduce((min, user) =>
    user.count < min.count ? user : min
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Analytics Overview
      </h2>

      <div className="grid gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Most Active User
            </p>
          </div>
          <p className="font-semibold text-green-700 text-lg">
            {mostPosts.name}
          </p>
          <p className="text-sm text-gray-600">{mostPosts.count} total posts</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">Task Champion</p>
          </div>
          <p className="font-semibold text-purple-700 text-lg">
            {mostCompletedTodos.name}
          </p>
          <p className="text-sm text-gray-600">
            {mostCompletedTodos.count} completed tasks
          </p>
        </div>

        <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
          <p className="text-sm text-gray-600">Most Completed Todos</p>
          <p className="font-semibold text-purple-700">
            {mostCompletedTodos.name}
          </p>
          <p className="text-sm text-gray-600">
            {mostCompletedTodos.count} completed
          </p>
        </div>

        <div className="p-3 bg-red-50 rounded-md border border-red-200">
          <p className="text-sm text-gray-600">Fewest Completed Todos</p>
          <p className="font-semibold text-red-700">
            {fewestCompletedTodos.name}
          </p>
          <p className="text-sm text-gray-600">
            {fewestCompletedTodos.count} completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
