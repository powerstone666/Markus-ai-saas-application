function Empty({label}) {
    
  return (
    <div className="h-full p-8 flex flex-col items-center justify-center">
      <div className="relative h-48 w-48">
        <img src="https://68.media.tumblr.com/tumblr_m4azcqZ9uV1qge5e6o1_500.gif"/>
      </div>
      <p className="text-gray-400 text-sm text-center font-bold">
        {label}
      </p>
    </div>
  );
}
export default Empty;