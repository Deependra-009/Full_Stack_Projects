import { useSelector } from "react-redux";
import { LogoIcons } from "../../icons/Icons";
import { Logo } from "../../shared/Logo/Logo";
import "./HomeStyle.css";
import { isDarkModeSelector, jsonData } from "../../shared/redux/selector";

export const Home = () => {
  const isDarkMode = useSelector(isDarkModeSelector);
  const portfolioData = useSelector(jsonData);

  return (
    <>
      <div id="home" className="w-100">
        <div className="block md:hidden">
          <Logo />
        </div>

        <div className="w-100  md:h-[100vh] flex flex-row items-center ">
          <div className="w-100  px-5 md:px-0 mt-5 md:mt-0">
            <div className="md:text-[60px] text-[30px]">Hi,</div>
            <div className="w-full  md:text-[60px] text-[27px] class-head">
              I'm
              <span className={`${isDarkMode?'text-white ':'text-black'} span-text`} ></span>
            </div>

            <div className={`md:w-[70%] ${isDarkMode?'text-white ':'text-black'} pt-5 text-[20px] `}>
              {portfolioData.home_intro}
            </div>
          </div>
        </div>
        <div className="w-[100%] md:hidden px-5">
          <div className="w-100 mt-10">
            <div className="flex justify-between w-[90%]">
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
        <div className="diamond-logo   mt-[7rem] md:mt-0">
          <hr></hr>
        </div>
      </div>
    </>
  );
};
