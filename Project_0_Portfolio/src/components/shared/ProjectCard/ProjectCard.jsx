import { useSelector } from "react-redux";
import { SVGIcons } from "../SVG/SVGIcons";
import { isDarkModeSelector } from "../redux/selector";

export const ProjectCard = ({ data,openProjectDetails }) => {
  const isDarkMode = useSelector(isDarkModeSelector);


  return (
    <>
      <div className={`max-w-sm mt-10 md:mt-0 relative overflow-hidden   ${isDarkMode?'border-[1px] border-gray-200':''} rounded-lg shadow  bg-white`}>
        {data.status === "IN-PROGRESS" && (
          <div className="py-2 text-[20px] bg-red-500 absolute rotate-[-35deg] text-white left-[-60px] top-[32px]   w-[90%] h-[50px] flex justify-center items-center">
            In-Progress
          </div>
        )}
        <div>
          <img
            className={`rounded-t-lg h-[250px] ${isDarkMode?'':'border-[4px] border-gray-100'}  md:h-[250px]`}
            src={`/Images/projects/${data.image}`}
            alt=""
          />
        </div>
        <div className="py-5 px-3 md:p-5 border-t-[2px] border-gray-300 bg-gray-100">
          <div className="w-100 text-[18px] 2xl:flex justify-between items-center  my-3">
            <div className="2xl:w-fit w-[100%] flex justify-center 2xl:pb-[0px] pb-[10px]">
            {data.name}
            </div>
            <div className="text-[15px] 2xl:w-fit w-[100%] flex justify-center bg-green-500 px-2 py-1 text-white rounded-[50px]">
              {data.type}
            </div>
          </div>
          <button onClick={()=>{
            openProjectDetails(data)
          }} className="w-[100%] bg-red-500 text-white 2xl:text-[20px] text-[15px] flex justify-center items-center border-2 border-red-500 py-2  rounded-[50px]">
            Click for more details
            <SVGIcons name={'RIGHT_ICON'}/>
          </button>
        </div>
      </div>



    </>
  );
};
