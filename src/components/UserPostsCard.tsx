import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserPostsCard = () => {
  const navigate = useNavigate();

  // Fetch users using React Query
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
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
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Team Members
        </h2>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {users?.length || 0} users
        </span>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar pr-2">
        {users?.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-200 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium group-hover:scale-110 transition-transform">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  );
};

export default UserPostsCard;
