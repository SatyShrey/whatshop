export default function Loading() {

  return (
    <div className="absolute backdrop-blur-sm top-0 bottom-0 left-0 right-0 flex justify-center items-center anim2">
      <div className="w-lg max-w-11/12 flex flex-col gap-3 items-center bg-base-100 shadow-[0_0_1px] p-3 rounded">
        <p className="">Please wait...</p>
        <div className=" loading loading-bars" />
      </div>
    </div>
  )
}
