import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const typingTimeoutRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socket.emit("typing", authUser.username);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", authUser.username);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6 w-full bg-white border-t border-gray-100 shadow-sm">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-gray-100 shadow-md 
                group-hover:shadow-lg transition-all duration-200"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white 
                hover:bg-red-50 transition-all duration-200 flex items-center justify-center 
                shadow-lg border border-gray-100 group-hover:scale-105"
              type="button"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            className="w-full px-6 py-3.5 rounded-full bg-gray-50 border border-gray-100
              focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none
              text-gray-700 placeholder-gray-400 text-base transition-all duration-200"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-3.5 rounded-full hover:bg-gray-50 transition-all duration-200
              ${imagePreview ? "text-blue-500" : "text-gray-400"}
              hover:shadow-md active:scale-95`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={24} className="hover:scale-110 transition-transform" />
          </button>
        </div>
        <button
          type="submit"
          className={`p-3.5 rounded-full transition-all duration-200
            ${(!text.trim() && !imagePreview) 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg active:scale-95"
            }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={24} className="hover:scale-110 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;