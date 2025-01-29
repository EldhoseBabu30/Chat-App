const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"} gap-4 animate-pulse`}
        >
          {idx % 2 === 0 && (
            <div className="flex-shrink-0">
              <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          )}

          <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"} max-w-[70%]`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className={`
              rounded-2xl p-1
              ${idx % 2 === 0 
                ? "rounded-tl-sm bg-gray-200 dark:bg-gray-700" 
                : "rounded-tr-sm bg-gray-100 dark:bg-gray-800"}
            `}>
              <div className="h-16 w-[300px] rounded-xl bg-gray-300/50 dark:bg-gray-600/50" />
            </div>
          </div>

          {idx % 2 !== 0 && (
            <div className="flex-shrink-0">
              <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;