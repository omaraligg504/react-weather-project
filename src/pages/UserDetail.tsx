import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [completedTodos, setCompletedTodos] = useState<Set<number>>(new Set());

  // Fetch user details
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      return response.json() as Promise<User>;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ['user-posts', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      return response.json() as Promise<Post[]>;
    },
  });

  const { data: todos } = useQuery({
    queryKey: ['user-todos', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
      const data = await response.json() as Promise<Todo[]>;
      const completed = (await data).filter(t => t.completed).map(t => t.id);
      setCompletedTodos(new Set(completed));
      return data;
    },
  });

  const toggleTodo = (todoId: number) => {
    setCompletedTodos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(todoId)) {
        newSet.delete(todoId);
      } else {
        newSet.add(todoId);
      }
      return newSet;
    });
  };

  if (!user || !posts || !todos) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            &lt;  Back 
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Website:</span> {user.website}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Posts ({posts.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {posts.map(post => (
                <div key={post.id} className="p-3 border border-gray-200 rounded-md">
                  <h3 className="font-semibold text-gray-800 mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Todos ({todos.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {todos.map(todo => {
                const isCompleted = completedTodos.has(todo.id);
                return (
                  <div
                    key={todo.id}
                    onClick={() => toggleTodo(todo.id)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      isCompleted 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <p className={`text-sm ${
                      isCompleted 
                        ? 'text-green-700 line-through' 
                        : 'text-gray-700'
                    }`}>
                      {todo.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetail;
