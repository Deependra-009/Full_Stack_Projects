import { useSelector } from "react-redux";
import {  LogoIcons } from "../icons/Icons";
import { Logo } from "../shared/Logo/Logo";
import { isDarkModeSelector, jsonData } from "../shared/redux/selector";
export const Sidebar = () => {
  const isDarkMode = useSelector(isDarkModeSelector);
  const portfolioData = useSelector(jsonData);
  return (
    <>
      <div className="w-[100%] h-full flex justify-center items-center sticky-top">
        <div className={`w-[80%] ${isDarkMode?'bg-[#1b1b1b85]':'bg-gray-100'} h-[90vh] rounded-[40px] p-10 `}>
          <div className="w-100 text-[20px] xl:text-[25px] 2xl:text-[30px] item-center">{portfolioData.name}</div>
          <Logo />
          <div className="w-100 mt-20">
            <div className="text-green-500">Specialization</div>
            <div className="mt-2 text-red-500 text-[20px]  2xl:text-[30px]">
              Full Stack Developer
            </div>
          </div>
          <div className="w-100 mt-10">
            <div className="flex justify-between w-[100%]">
              {portfolioData.contactLogo.map((item,index) => (
                <a key={index} href={item.url} target="_blank" rel="noreferrer">
                  <div className="w-[50px] hover:-translate-y-2 duration-200 cursor-pointer  flex justify-center items-center rounded-[50%] h-[50px] border-2 border-red-500">
                    <LogoIcons name={item.name} />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <a href={portfolioData.resume_link} target="_blank" rel="noreferrer">
              <button className="border-red-500 border-[2px] w-[90%] py-3 text-red-500 hover:bg-red-500 hover:text-white">
                DOWNLOAD CV
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
