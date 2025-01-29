import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import SidebarSkeleton from "../Skeltons/SidebarSkelton";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const socket = useAuthStore.getState().socket;

    const handleNewMessage = (message) => {
      if (selectedUser?._id !== message.senderId) {
        setUnreadMessages((prev) => ({
          ...prev,
          [message.senderId]: (prev[message.senderId] || 0) + 1,
        }));
      }

      setLastMessages((prev) => ({
        ...prev,
        [message.senderId]: message,
      }));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUser?._id]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUnreadMessages((prev) => ({
      ...prev,
      [user._id]: 0,
    }));
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  const getMessagePreview = (message) => {
    if (!message) return "";
    if (message.image) return "📷 Image";
    return message.text.length > 25 ? `${message.text.slice(0, 25)}...` : message.text;
  };

  return (
    <aside className="h-full w-20 lg:w-80 bg-white border-r border-gray-100 flex flex-col transition-all duration-200 shadow-sm">
      <div className="border-b border-gray-100 w-full p-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Users className="size-5 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-800 hidden lg:block">Contacts</span>
        </div>
        
        <div className="mt-4 hidden lg:flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm text-gray-600">Show online only</span>
          </label>
          <span className="text-xs text-gray-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-4 space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`
              w-full px-4 py-3 flex items-center gap-4
              hover:bg-gray-50 transition-all duration-200
              ${selectedUser?._id === user._id ? "bg-blue-50 hover:bg-blue-50" : ""}
              group rounded-lg mx-2 relative
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full ring-2 ring-white shadow-sm group-hover:shadow-md transition-shadow"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white shadow-sm" />
              )}
              {unreadMessages[user._id] > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                  {unreadMessages[user._id]}
                </span>
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                {user.fullName}
              </div>
              {lastMessages[user._id] && (
                <div className="text-sm text-gray-500 truncate">
                  {getMessagePreview(lastMessages[user._id])}
                </div>
              )}
              <div className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-500 font-medium">Online</span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <div className="bg-gray-50 mx-auto rounded-full size-12 flex items-center justify-center mb-3">
              <Users className="size-6 text-gray-400" />
            </div>
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;