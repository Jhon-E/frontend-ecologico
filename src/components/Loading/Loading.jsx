function Loading() {
  return (
    <div className="w-screen h-screen gap-x-2 flex justify-center items-center">
      <div className="w-5 bg-myGreen animate-pulse h-5 rounded-full" />
      <div className="w-5 animate-pulse h-5 bg-[#67f54e] rounded-full" />
      <div className="w-5 h-5 animate-pulse bg-[#98f57a] rounded-full" />
    </div>
  )
}
export default Loading