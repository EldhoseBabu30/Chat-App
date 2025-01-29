import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ProfileImage = ({ user, isOnline }) => (
  <div className="relative">
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
      <img
        src={user.profilePic || "/avatar.png"}
        alt={user.fullName}
        className="w-full h-full object-cover"
      />
    </div>
    {isOnline && (
      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 
        ring-2 ring-white shadow-sm">
      </div>
    )}
  </div>
);

const UserStatus = ({ isOnline }) => (
  <p className="text-sm">
    <span className={`inline-flex items-center gap-1.5 
      ${isOnline ? "text-green-500" : "text-gray-400"}`}>
      <span className={`w-1.5 h-1.5 rounded-full 
        ${isOnline ? "bg-green-500" : "bg-gray-400"}`}>
      </span>
      {isOnline ? "Online" : "Offline"}
    </span>
  </p>
);

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-400 
      hover:text-gray-600 transition-all duration-200
      active:scale-95 hover:shadow-sm"
  >
    <X size={24} />
  </button>
);

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-6 py-4 border-b border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ProfileImage user={selectedUser} isOnline={isOnline} />

          <div className="space-y-1">
            <h3 className="font-semibold text-gray-800">
              {selectedUser.fullName}
            </h3>
            <UserStatus isOnline={isOnline} />
          </div>
        </div>

        <CloseButton onClick={() => setSelectedUser(null)} />
      </div>
    </div>
  );
};

export default ChatHeader;