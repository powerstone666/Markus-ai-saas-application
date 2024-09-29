function Heading(
    {
        title,
        description,
        icon,
        iconColor,
        bgColor
    }
) {
  return (
    <>
  <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 pt-4"> 
         <div className={`p-2 w-fit rounded-md ${bgColor}`}>
                {icon}
         </div>
         <div>
    <h2 className="text-3xl font-bold">
         {title}
    </h2>
    <p className="text-sm text-gray-400 font-bold">
        {description}
    </p>
  </div>
  </div>
    
  </>

  );
}
export default Heading;