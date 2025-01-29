import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="max-w-md text-center space-y-8 p-8 rounded-3xl bg-white/50 backdrop-blur-sm shadow-xl">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-0.5  rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
              <MessageSquare className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Welcome to Hola...!!
          </h2>
          <p className="text-slate-900 dark:text-slate-800 text-lg font-medium">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;