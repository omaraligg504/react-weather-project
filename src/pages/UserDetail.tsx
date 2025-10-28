import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.json() as Promise<User>;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["user-posts", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      return response.json() as Promise<Post[]>;
    },
  });

  const { data: todos } = useQuery({
    queryKey: ["user-todos", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${id}`
      );
      const data = (await response.json()) as Promise<Todo[]>;
      const completed = (await data)
        .filter((t) => t.completed)
        .map((t) => t.id);
      setCompletedTodos(new Set(completed));
      return data;
    },
  });

  const toggleTodo = (todoId: number) => {
    setCompletedTodos((prev) => {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="text-center p-6 rounded-xl shadow-lg bg-white/60 backdrop-blur">
          <p className="text-slate-700 font-medium">Fetching user data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start gap-6">
          {/* Left: profile panel (dark, compact) */}
          <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 rounded-lg shadow-xl p-6 flex-shrink-0">
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-700/60 hover:bg-slate-700/80 transition-colors text-sm"
            >
              ← Back
            </button>

            <div className="flex items-center gap-4 mt-3">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-900 font-bold text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  {user.name}
                </h1>
                <p className="text-xs text-slate-300">
                  ID: {user.id} • @visitor
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <div>
                <div className="text-xs text-slate-400">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Phone</div>
                <div className="font-medium">{user.phone}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Website</div>
                <div className="font-medium">{user.website}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs text-slate-300">
              <div className="mb-2">Activity</div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-slate-800/60 rounded">
                  Posts {posts.length}
                </div>
                <div className="px-3 py-1 bg-slate-800/60 rounded">
                  Todos {todos.length}
                </div>
              </div>
            </div>
          </aside>

          {/* Right: content area */}
          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Posts card (light, colorful accent) */}
              <div className="rounded-lg bg-white shadow-md p-5 ring-1 ring-emerald-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    User Posts
                  </h2>
                  <span className="text-sm text-emerald-600 font-medium">
                    {posts.length}
                  </span>
                </div>

                <div className="space-y-4 max-h-[56vh] overflow-y-auto pr-2">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="p-4 rounded-md border-l-4 border-emerald-300 bg-emerald-50/30"
                    >
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-700">{post.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Todos card (bright, checklist style) */}
              <div className="rounded-lg bg-white shadow-md p-5 ring-1 ring-amber-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Todos & Checklist
                  </h2>
                  <span className="text-sm text-amber-600 font-medium">
                    {todos.length}
                  </span>
                </div>

                <ul className="space-y-3 max-h-[56vh] overflow-y-auto">
                  {todos.map((todo) => {
                    const isCompleted = completedTodos.has(todo.id);
                    return (
                      <li key={todo.id} className="flex items-start gap-3">
                        <label
                          className={`flex items-center gap-3 cursor-pointer select-none w-full p-3 rounded-md transition-shadow ${
                            isCompleted
                              ? "bg-amber-50/60 shadow-inner"
                              : "bg-white/60 hover:shadow-sm"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleTodo(todo.id)}
                            className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-0"
                          />
                          <div className="flex-1">
                            <div
                              className={`text-sm ${
                                isCompleted
                                  ? "text-slate-400 line-through"
                                  : "text-slate-800"
                              }`}
                            >
                              {todo.title}
                            </div>
                            <div className="text-xs text-slate-400">
                              #{todo.id}
                            </div>
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Footer / Additional info strip */}
            <div className="mt-6 rounded-lg p-4 bg-gradient-to-r from-slate-100 to-white border border-slate-100">
              <div className="text-sm text-slate-600">
                This layout uses a dark profile panel and colorful content cards
                to clearly distinguish identity and activity — different visual
                rhythm from the previous design.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
