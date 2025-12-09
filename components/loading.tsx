const Loading = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 h-screen w-screen">
      <div className="border-2 h-7 w-7 rounded-full animate-spin border-l-transparent border-r-sky-500 border-t-sky-500 border-b-sky-500"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;