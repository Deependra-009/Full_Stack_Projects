"use client";
import { DropDownItems } from "../../Core/Constant_Data/DropDownItems";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./Navbar.css";
// import { useRouter } from "next/router";

export const Navbar = ({ style, color }) => {
  const [MobileMenu, setMobileMenu] = useState(true);
  const [NavOpen, setNavOpen] = useState(false);
  const [SearchClick, setSearchClick] = useState(true);
  const [ShowSubMenu, setShowSubMenu] = useState(true);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [CartItem, setCartItem] = useState(0);
  const [SearchText, setSearchText] = useState("");
  const [NavId, setNavId] = useState(0);
  const [PrevId, setPrevId] = useState(0);
  const [SubId, setSubId] = useState(0);
  const [PrevSubId, setPrevSubId] = useState(0);

  const openSearchBar = () => {};
  const search = () => {};
  const getQuery = (event) => {};
  const generateRouterLink = () => {};

  const handleClick = (event) => {
    const target = event.target;

    const searchBar = document.getElementById("search-bar");
    const navLink = document.getElementById("nav-link");
    const subDropdown = document.getElementsByClassName("custom-h3");
    const homeDropdown = document.getElementsByClassName("home-dropdown");
    const navOpenButton = document.getElementById("nav_open_button");
    const svgDropdown = document.getElementById("svgdropdown");

    let checkSubDRopDown = false;
    for (let item of Array.from(subDropdown)) {
      if (item == event.target) {
        const currelementToStyle = item.children[0];
        checkSubDRopDown = true;
        const id = Number(item.id);
        if (SubId == id) {
          setPrevSubId(SubId);
          setSubId(0);
        } else if (SubId != id) {
          setPrevSubId(id);
          setSubId(id);
        } else setSubId(0);
        return;
      }
    }
    if (checkSubDRopDown == false) {
      setSubId(0);
    }

    // Logic for handling clicks on home-dropdown elements
    let checkHomeDropDown = false;
    for (let item of Array.from(homeDropdown)) {
      if (item == event.target) {
        checkHomeDropDown = true;
        const id = Number(item.id);
        if (MobileMenu) {
          const currelementToStyle = item.children[0];
          if (NavId == id) {
            setPrevId(NavId);
            setNavId(0);
          } else if (NavId != id) {
            setPrevId(id);
            setNavId(id);
          } else {
            setNavId(0);
          }
          return;
        }
      }
    }
    if (checkHomeDropDown == false) {
      setNavId(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [SubId, PrevSubId, NavId, PrevId, MobileMenu]);

  useEffect(() => {
    const handleResize = () => {
      setMobileMenu(window.innerWidth <= 768);
    };
    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`${style}   w-[100%] fixed top-0 left-0 z-10 bg-fixed `}>
        <div className="w-[100%] justify-between flex h-[90px]">
          <div className=" md:w-[30%] w-[40%] pl-[50px]    flex justify-center items-center ">
            <Link href="/">
              <div className="w-[32px] mr-3  h-[32px]  bg-[url('/assets/Images/Vector.png')]"></div>
            </Link>

            <div className="md:block hidden text-[20px] font-medium">
              UrbanIndie
            </div>
          </div>

          <div
            className={`${
              MobileMenu
                ? NavOpen
                  ? "block  bg-white text-black"
                  : "hidden"
                : " block"
            } md:w-[40%] w-[100%] md:h-[90px] h-[90vh] md:pb-0 pb-5 md:overflow-hidden overflow-auto  md:top-0 md:relative fixed left-0 top-[90px] md:flex    md:justify-around md:items-center`}
            id="nav-link"
          >
            {DropDownItems.map((mainitem, i) => (
              <div key={i} className="md:w-[20%] ">
                <Link href={mainitem.link}>
                  <div
                    id={mainitem.id}
                    type="button"
                    onMouseOver={() => {
                      if (MobileMenu == false) {
                        setPrevId(mainitem.id);
                        setNavId(mainitem.id);
                      }
                    }}
                    className={`md:w-[100%]  text-[15px] md:text-[18px] w-[100%] home-dropdown  ${
                      MobileMenu ? "border-b-[1px] " : mainitem.border
                    }   h-[60px] md:hover:border-b-[5px]    md:h-[90px] flex justify-between  md:justify-center items-center hover:cursor-pointer md:px-0 md:py-0   pl-5   `}
                  >
                    {mainitem.text}

                    {mainitem.id != 0 && (
                      <div className="md:hidden  block mr-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>

                {NavId == i && i != 0 && (
                  <div
                    onMouseLeave={() => setNavId(0)}
                    className=" md:overflow-hidden  overflow-y-auto md:py-0   md:z-50 custom-dropdown md:fixed left-[15%] md:top-[90px] md:w-[70%]  w-[100%] md:h-[450px]   text-black bg-white"
                  >
                    <div className="w-[100%] custom-dropdown-subdiv  grid md:grid-cols-5 grid-rows-1   md:grid-flow-row gap-0  ">
                      {mainitem.dropdownContent.map((item, itemindex) => (
                        <div
                          key={itemindex}
                          className={`  ${
                            itemindex % 2 == 1 ? "md:bg-gray-100" : "bg-white"
                          } md:pl-0 pl-5 custom-dropdown-cards w-[100%]  md:h-[450px]  `}
                        >
                          {item.map((subitem, subindex) => (
                            <div
                              key={subindex}
                              className="w-[100%] md:mt-2  pl-5"
                            >
                              <h4
                                onClick={() =>
                                  MobileMenu == false
                                    ? generateRouterLink([
                                        mainitem.text,
                                        subitem.label,
                                      ])
                                    : ""
                                }
                                id={subitem.id}
                                className={`${mainitem.style} cursor-pointer custom-h4 md:py-0 py-2 flex justify-between custom-h3 items-center font-medium`}
                              >
                                {subitem.label}

                                {subitem.subItems != undefined &&
                                  subitem.subItems.length != 0 && (
                                    <div className="md:hidden block mr-10">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-chevron-right"
                                      >
                                        <path d="m9 18 6-6-6-6" />
                                      </svg>
                                    </div>
                                  )}
                              </h4>

                              {subitem.subItems != undefined &&
                                subitem.subItems.map(
                                  (subsubitem, subsubitemindex) => (
                                    <ul
                                      key={subsubitemindex}
                                      className={` ${
                                        SubId == subitem.id ? "block" : "hidden"
                                      }  md:pl-0 pl-5  text-gray-700 md:pb-0  py-3  md:block md:py-[4px] hover:text-black hover:cursor-pointer hover:font-medium`}
                                    >
                                      <li onClick={generateRouterLink}>
                                        {subsubitem}
                                      </li>
                                    </ul>
                                  )
                                )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="md:w-[30%]  w-[60%] md:pr-0 pr-2 flex md:justify-center justify-around items-center">
            <div id="search-button" className="hover:cursor-pointer w-[13%]">
              <div>
                {SearchClick == false && (
                  <svg
                    onClick={openSearchBar()}
                    xmlns="http://www.w3.org/2000/svg"
                    stroke={color}
                    className="w-[130%] h-[130%] md:w-[60%] md:h-[60%]"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                )}
              </div>

              <div>
                {/* <!-- search svg --> */}
                {SearchClick == true && (
                  <svg
                    onClick={openSearchBar}
                    className="w-[130%] h-[130%] md:w-[60%] md:h-[60%]"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.2"
                      cx="20"
                      cy="20"
                      r="19.375"
                      stroke={color}
                      strokeWidth="1.25"
                    />
                    <g opacity="0.6">
                      <circle
                        cx="19.129"
                        cy="19.129"
                        r="8.12903"
                        stroke={color}
                        strokeWidth="2"
                      />
                      <path
                        d="M24.9355 24.9355L28.5 28.5001"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                )}
              </div>
            </div>

            {isLoginUser == true && (
              <div className=" relative hover:cursor-pointer w-[13%]">
                <svg
                  className="w-[130%] h-[130%] md:w-[60%] md:h-[60%]"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.2"
                    cx="20"
                    cy="20"
                    r="19.375"
                    stroke={color}
                    strokeWidth="1.25"
                  />
                  <g opacity="0.6">
                    <path
                      d="M15.0957 16.1428V16.1428C16.9662 14.1814 17.9014 13.2006 19.0201 12.918C19.6632 12.7555 20.3366 12.7555 20.9797 12.918C22.0984 13.2006 23.0337 14.1814 24.9041 16.1428V16.1428"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.4629 23.6419C11.0434 21.1676 10.8337 19.9304 11.1592 18.9569C11.494 17.9554 12.2025 17.1204 13.138 16.6247C14.0474 16.1428 15.3068 16.1428 17.8257 16.1428H22.1743C24.6932 16.1428 25.9526 16.1428 26.862 16.6247C27.7975 17.1204 28.5059 17.9554 28.8408 18.9569C29.1663 19.9304 28.9566 21.1676 28.5371 23.6419C28.2274 25.4687 28.0726 26.382 27.6325 27.0782C27.1784 27.7964 26.5126 28.3571 25.7261 28.6835C24.9638 28.9999 24.0339 28.9999 22.1743 28.9999H17.8257C15.9661 28.9999 15.0362 28.9999 14.2739 28.6835C13.4874 28.3571 12.8216 27.7964 12.3675 27.0782C11.9274 26.382 11.7726 25.4687 11.4629 23.6419Z"
                      stroke={color}
                      strokeWidth="2"
                    />
                    <path
                      d="M15.6406 20.2571V24.8856"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 20.2571V24.8856"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24.3594 20.2571V24.8856"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                {CartItem != 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6  h-6  text-xs font-bold text-white bg-red-500  rounded-full  -top-[40%] left-[70%]  md:-top-[10%]  md:left-[40%] dark:border-gray-900">
                    {CartItem}
                  </div>
                )}
              </div>
            )}

            {isLoginUser == true && (
              <div className="hover:cursor-pointer w-[13%]">
                <svg
                  className="w-[130%] h-[130%] md:w-[60%] md:h-[60%]"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.2"
                    cx="20"
                    cy="20"
                    r="19.375"
                    stroke={color}
                    strokeWidth="1.25"
                  />
                  <g opacity="0.6">
                    <path
                      d="M27 26.5C27 28.0294 24 29 20 29C16 29 13 28.0294 13 26.5C13 24.2692 16.5 23 20 23C23.5 23 27 24.5 27 26.5Z"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 20C22.4853 20 24.5 17.9853 24.5 15.5C24.5 13.0147 22.4853 11 20 11C17.5147 11 15.5 13.0147 15.5 15.5C15.5 17.9853 17.5147 20 20 20Z"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            )}

            {isLoginUser == false && (
              <div className="hover:cursor-pointer w-[13%]">
                <svg
                  className="w-[130%] h-[130%] md:w-[60%] md:h-[60%]"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.2"
                    cx="20"
                    cy="20"
                    r="19.375"
                    stroke={color}
                    strokeWidth="1.25"
                  />
                  <g opacity="0.6">
                    <path
                      d="M27 26.5C27 28.0294 24 29 20 29C16 29 13 28.0294 13 26.5C13 24.2692 16.5 23 20 23C23.5 23 27 24.5 27 26.5Z"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 20C22.4853 20 24.5 17.9853 24.5 15.5C24.5 13.0147 22.4853 11 20 11C17.5147 11 15.5 13.0147 15.5 15.5C15.5 17.9853 17.5147 20 20 20Z"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            )}
          </div>

          {/* Hamburgur */}

          {MobileMenu && (
            <button
              id="nav_open_button"
              type="button"
              onClick={() => {
                setNavOpen(!NavOpen);
              }}
              className="fixed  bg-transparent   inline-flex items-center  w-[20%] h-[90px]   justify-center text-sm text-black outline-none"
            >
              {/* <!-- <img className="w-[50%]" src="./../../../../assets/Images/Nav/menu.png"> --> */}
              {NavOpen == false && (
                <svg
                  id="opennavsvg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
              {NavOpen == true && (
                <svg
                  id="closenavsvg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
