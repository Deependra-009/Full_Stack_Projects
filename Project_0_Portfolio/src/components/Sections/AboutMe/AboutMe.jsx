import { useSelector } from "react-redux";
import { SVGIcons } from "../../shared/SVG/SVGIcons";
import "./AboutMeStyle.css";
import { isDarkModeSelector, jsonData } from "../../shared/redux/selector";
export const AboutMe = () => {
  const isDarkMode = useSelector(isDarkModeSelector);
  const portfolioData = useSelector(jsonData);

  return (
    <>
      <div
        id="aboutme"
        className=" px-5 md:px-0 w-100 min-h-[100vh] pt-[10rem]"
      >
        <div className="w-100 ">
          <div className="w-[100%] md:w-[90%] box p-5  min-h-[60vh]  ">
            <span className={`box-span ${isDarkMode?'bg-black':'bg-white'}`}></span>
            <div className="w-[100%] box-body">
              <div className="w-[100%] text-red-500 mb-5 flex justify-center items-center text-[35px] md:text-[50px]">
                About
              </div>
              <div className={`px-2 md:p-5 ${isDarkMode?'text-white':'text-black'} text-[15px] md:text-[20px]`}>
                {portfolioData.aboutMe.intro_1}
                {portfolioData.aboutMe.intro_2}
                <br></br>
                <br></br>
                {portfolioData.aboutMe.intro_3}
                <br></br>
                <br></br>
                {portfolioData.aboutMe.intro_4}
              </div>
            </div>
          </div>

          <div className="diamond-logo   mt-[10rem] ">
            <hr></hr>
          </div>

          {/* Education & Experience */}

          <div className="text-red-500 mt-[10rem] flex flex-col-reverse md:flex-row p-5 md:p-0 w-100% md:flex md:justify-around">
            <div data-aos="fade-right " className="md:w-[40%] mb-5 ">
              <div className="md:w-100%  md:text-[30px] text-[20px] pb-5 md:pb-10">
                Education
              </div>
              <div className={` px-10 py-[20px] border-2 ${isDarkMode?'border-white':'border-red-500 border-[3px]'} rounded-2xl`}>
                <ol className=" relative border-l border-gray-200 ">
                  <li className="ml-6 mb-10 ">
                    <SVGIcons name={"CALENDER"} isDarkMode={isDarkMode}/>
                    <h3 className="mb-1 text-[20px] font-semibold text-red-500 ">
                      SRMCEM,Lucknow
                    </h3>
                    <time className={`block mb-2 text-[18px] font-normal leading-none ${isDarkMode?'text-white':'text-black'} `}>
                      B.Tech (Information Technology)
                    </time>
                    <p className={`text-base font-normal  ${isDarkMode?'text-white':'text-black'}`}>
                      2018-22 | Percentage: 83.4%
                    </p>
                  </li>
                  <li className="ml-6 mb-10">
                    <SVGIcons name={"CALENDER"} isDarkMode={isDarkMode}/>
                    <h3 className="mb-1 text-[20px] font-semibold ">
                      New Public Inter College
                    </h3>
                    <time className={`block mb-2 text-[18px] font-normal leading-none ${isDarkMode?'text-white':'text-black'} `}>
                      Class XII (CBSE)
                    </time>
                    <p className={`text-base font-normal ${isDarkMode?'text-white':'text-black'}`}>
                      2018 | Percentage: 84%
                    </p>
                  </li>
                  <li className="ml-6 mb-10">
                    <SVGIcons name={"CALENDER"} isDarkMode={isDarkMode}/>
                    <h3 className="mb-1 text-[20px] font-semibold ">
                      New Public Inter College
                    </h3>
                    <time className={`block mb-2 text-[18px] font-normal leading-none ${isDarkMode?'text-white':'text-black'}`}>
                      Class X (CBSE)
                    </time>
                    <p className={`text-base font-normal ${isDarkMode?'text-white':'text-black'}`}>
                      2016 | Percentage: 82%
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div data-aos="fade-down " className="md:w-[40%] w-[100%] mb-5">
              <div className="md:w-[100%]  w-[100%] md:text-[30px] text-[20px] pb-5 md:pb-10">
                Experience <span className=" font-serif text-[30px]">({portfolioData.totalExperience}+ Year)</span>
              </div>
              <div className={`text-red-500 px-10 w-[100%] py-[20px] border-2 ${isDarkMode?'border-white':'border-red-500 border-[3px]'} rounded-2xl`}>
                <ol className=" relative border-l border-gray-200 ">
                  <li className="ml-6 mb-10">
                    <SVGIcons name={"CALENDER"} isDarkMode={isDarkMode} />
                    <h3 className="mb-1 text-[20px] font-semibold">COGNIZANT</h3>
                    <h5 className={`mb-2 text-[18px]  ${isDarkMode?'text-white':'text-black'}`}>Software Engineer</h5>
                    <time className={`block mb-2 text-[18px] font-normal leading-none ${isDarkMode?'text-white':'text-black'} `}>
                      Aug 2022 - <span className="text-red-500 text-[20px] font-semibold">Present</span>
                    </time>
                  </li>
                  <li className="ml-6 mb-10">
                    <SVGIcons name={"CALENDER"} isDarkMode={isDarkMode}/>
                    <h3 className="mb-1 text-[20px] font-semibold">COGNIZANT</h3>
                    <h5 className={`mb-2  text-[18px]  ${isDarkMode?'text-white':'text-black'}`}>
                      Software Engineer Intern
                    </h5>
                    <time className={`block mb-2 text-[18px] font-normal leading-none text-white `}>
                      Feb 2022 - July 2022
                    </time>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
