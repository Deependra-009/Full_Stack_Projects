import { useEffect, useState } from "react";
import { SVGIcons } from "../shared/SVG/SVGIcons";
import { useDispatch, useSelector } from "react-redux";
import { iNavOpenSelector, isDarkModeSelector, isMobileSelector, jsonData } from "../shared/redux/selector";
import { setIsDarkMode, setIsNavOpen } from "../shared/redux/portfolioServiceSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const isMobileScreen = useSelector(isMobileSelector);
  const isNavOpenStatus = useSelector(iNavOpenSelector);
  const isDarkMode = useSelector(isDarkModeSelector);
  const portfolioData = useSelector(jsonData);

  const [isChecked, setIsChecked] = useState(isDarkMode);

  useEffect(() => {
    setIsMobile(isMobileScreen);
  }, [isMobileScreen]);

  useEffect(() => {
    setNavOpen(isNavOpenStatus);
  }, [isNavOpenStatus]);

  const openCloseNavbar = () => {
    dispatch(setIsNavOpen(!isNavOpenStatus));
  };

  return (
    <>
      <div className={`w-100  h-[100px]   md:h-full md:p-10 sticky-top  ${isDarkMode?'bg-black':'bg-white '}`}>
        {isMobile && (
          <div className="w-[100%] h-full px-5 flex justify-between items-center">
            <div className="w-[40%] grey-qo-regular text-[50px] ">
              Deependra
            </div>
            <div className="w-[40%] flex justify-end">
              <SVGIcons name={"HAMBURGER"} openCloseNavbar={openCloseNavbar} />
            </div>
          </div>
        )}

        {(isNavOpen || !isMobile) && (
          <div
            className={`w-[100%]   md:flex  ${
              isNavOpen ? `fixed top-0  left-0 h-[100vh] ${isDarkMode?'bg-black':'bg-white'} ` : ""
            }`}
          >
            <div className="w-100 md:w-[80%]">
              <div
                className={`w-[100%] ${
                  isMobile ? "p-[2rem]" : ""
                } flex justify-end`}
              >
                {isNavOpen && (
                  <div className="w-[100%] flex justify-between items-center h-[50px] ">
                    <div className="w-[40%] grey-qo-regular text-[50px] ">
                      Deependra
                    </div>
                    <SVGIcons
                      name={"CLOSE"}
                      openCloseNavbar={openCloseNavbar}
                    />
                  </div>
                )}
              </div>
              <ul className="md:flex w-[100%] justify-around">
                {portfolioData.nabarItems.map((item, index) => (
                  <ListNavItem
                    projectID={item.projectID}
                    name={item.name}
                    id={index}
                    key={index}
                    isMobile={isMobile}
                    openCloseNavbar={openCloseNavbar}
                  />
                ))}
              </ul>
            </div>
            <div
              className={`w-[100%] md:w-[20%] ${isMobile ? "mt-[3rem]" : ""} `}
            >
              <div className="w-[100%] flex md:justify-end justify-center  ">
                <div className="py-2  flex justify-center items-center">
                  <div className="cursor-pointer">
                    <SVGIcons name={"LIGHT"} color={!isDarkMode?'#ef4444':'#808080'} />
                  </div>
                  <label className="inline-flex mx-[10px] items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={isDarkMode}
                      onChange={()=>{
                        if(isNavOpenStatus) setTimeout(()=>openCloseNavbar(),500)
                        dispatch(setIsDarkMode(!isDarkMode));
                      }}
                    ></input>
                    <div className={`relative w-11 h-6 bg-gray-100 peer-focus:outline-none   rounded-full peer ${isDarkMode?' bg-gray-200':'bg-black'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-red-500 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  `}></div>
                  </label>
                  <div className="cursor-pointer">
                    <SVGIcons name={"DARK"} color={isDarkMode?'#ef4444':'#808080'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ListNavItem = ({ projectID, name, id, isMobile, openCloseNavbar }) => {
  const isDarkMode = useSelector(isDarkModeSelector);

  return (
    <>
      <li
        onClick={() => {
          if (isMobile) {
            openCloseNavbar();
          }
        }}
        className={`w-[100%] ${
          isMobile ? "py-5  border-b-[1px] border-gray-600" : ""
        }   t${isDarkMode?'text-white':'text-black'} md:w-[15%]`}
      >
        <a
          className={`${
            isMobile ? (id % 2 === 0 ? "slide-left" : "slide-right") : ""
          }   w-[100%] slide-left text-[17px] 2xl:text-[20px] flex justify-center items-center  py-2 cursor-pointer  rounded-[10px] hover:border-2 hover:border-red-500`}
          href={projectID}
        >
          {name}
        </a>
      </li>
    </>
  );
};
