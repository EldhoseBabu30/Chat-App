import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./Skeltons/MessageSkelton";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

   
    socket.on("typing", (username) => {
      if (username !== authUser.username) {
        setTypingUser(username);
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", (username) => {
      if (username !== authUser.username) {
        setIsTyping(false);
      }
    });

    return () => {
      unsubscribeFromMessages();
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages, socket, authUser.username]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map((message) => {
          const isAuthUser = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isAuthUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[80%] ${isAuthUser ? "flex-row-reverse" : "flex-row"} gap-4 group`}>
                <div className="flex-shrink-0 self-end">
                  <div className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm overflow-hidden 
                    group-hover:shadow-md transition-shadow duration-200">
                    <img
                      src={isAuthUser ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className={`space-y-2 ${isAuthUser ? "items-end" : "items-start"}`}>
                  <div 
                    className={`px-5 py-3 rounded-2xl shadow-sm
                      ${isAuthUser 
                        ? "bg-blue-500 text-white" 
                        : "bg-white text-gray-700"}
                      group-hover:shadow-md transition-shadow duration-200
                      ${message.image ? "max-w-sm" : ""}
                    `}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-full rounded-xl mb-3 shadow-sm"
                      />
                    )}
                    {message.text && (
                      <p className="text-sm leading-relaxed">
                        {message.text}
                      </p>
                    )}
                  </div>
                  <time 
                    className={`text-xs text-gray-400 px-2
                      ${isAuthUser ? "text-right" : "text-left"}
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    `}
                  >
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          );
        })}

      
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
              {typingUser} typing...
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;