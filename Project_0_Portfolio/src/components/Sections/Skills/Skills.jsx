import { Images } from "../../../core/Images";
import {  Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isDarkModeSelector, isMobileSelector, jsonData } from "../../shared/redux/selector";

export const Skills = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const isMobileScreen=useSelector(isMobileSelector);
  const portfolioData = useSelector(jsonData);

  useEffect(()=>{
    setIsMobile(isMobileScreen);
  },[isMobileScreen])



  return (
    <>
      <div id="skills" className="w-100 min-h-[100vh] ">
        <div className="diamond-logo mt-[10rem] ">
          <hr></hr>
        </div>

        <div className="w-100  mt-[10rem]">
          {/* Programming Language */}
          <SkillsSection
            isMobile={isMobile}
            data={Images.programmingLanguage}
            heading={"Programming Language"}
          />

          {/* Tools Language */}
          <SkillsSection
            isMobile={isMobile}
            data={Images.tools}
            heading={"Tools & Utilities"}
          />
        </div>

        <div className="w-100 mt-[7rem]">
          <div className="text-[25px]  my-10 w-[90%] text-center text-green-500">
            Coding Handles
          </div>

          <div className="w-[100%]  md:flex md:justify-around mt-[2%] p-5">
            {portfolioData.codingHandles.map((item, index) => (
                <CodingHandleSection
                  url={item.url}
                  name={item.name}
                  key={index}
                />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SkillsSection = ({ data, heading ,isMobile}) => {
  const isDarkMode = useSelector(isDarkModeSelector);
  return (
    <>
      <div className="w-[100%]">
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Hello world!"
          className="text-[25px] my-10 w-100 md:w-[90%]  flex justify-center text-green-500"
        >
          {heading}
        </div>

        <div className="w-100  p-5 grid grid-cols-3 md:grid-cols-5 gap-10">
          {data.map((item,index) => (
            <div key={index}>
              <div

                data-tooltip-id={item.name}
                data-tooltip-content={item.name}
                className="bg-white my-2 md:my-0 w-[80px] h-[80px]  md:w-[100px] md:h-[100px] overflow-hidden rounded-[50%] flex justify-center items-center"
              >
                <img
                  src={`Images/skills/${item.image}`}
                  className=" skill-logo "
                  alt="Skill Logo"
                ></img>
              </div>
              <Tooltip
                id={item.name}
                place={isMobile?'bottom':'right'}
                style={{
                  backgroundColor: isDarkMode?'white':'black',
                  font: "20px",
                  fontWeight: "500",
                  color: isDarkMode?'red':'white',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const CodingHandleSection = ({ url, name }) => {
  const isDarkMode = useSelector(isDarkModeSelector);

  return (
    <>
      <a className="w-[100%]" href={url} target="_blank" rel="noopener noreferrer">
        <button className={`text-[17px] w-[100%] md:my-0 ${isDarkMode?'text-white':'text-black'} my-3 2xl:w-[70%] md:w-[90%] py-3 border-red-500 border-[3px] rounded-[50px]  ${isDarkMode?'hover:text-white':'hover:text-white'}  hover:bg-red-500`}>
          {name}
        </button>
      </a>
    </>
  );
};
