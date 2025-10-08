"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { usePathname } from "next/navigation";

const NavbarSetting = () => {
  const [isHomePage, setIsHomePage] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const pathName = usePathname();

  const handleWindowScroll = () => {
    if (!isMobileMenu) {
      setScrolled(window.pageYOffset > (85 * window.innerHeight) / 100);
    } else {
      setScrolled(window.pageYOffset > (40 * window.innerHeight) / 100);
    }
  };

  useEffect(() => {
    if (pathName == "/") setIsHomePage(true);
    else setIsHomePage(false);
  }, [pathName]);

  const handleWindowResize = () => {
    setIsMobileMenu(window.innerWidth <= 768);
    // You can add more logic or update state based on the new screen width here
  };

  useEffect(() => {
    // Add event listeners when the component mounts
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", handleWindowResize);

    // Remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [isMobileMenu]);

  return (
    <>
      {isHomePage && (
        <div className="w-full bg-home-bg-image min-h-[50vh] transparent bg-top bg-cover md:mt-0 md:min-h-[95vh]  bg-no-repeat md:bg-cover bg-fixed ">
          {scrolled == false && (
            <Navbar style={"transparent  text-white"} color={"white"} />
          )}
          {scrolled && (
            <Navbar
              style={"bg-white text-black border-b-[1px] border-slate-200"}
              color={"black"}
            />
          )}
        </div>
      )}
      {isHomePage == false && (
        <>
          <Navbar
            style={"bg-white text-black border-b-[1px] border-slate-200"}
            color={"black"}
          />
          <div className="h-[90px]"></div>
        </>
      )}
    </>
  );
};

export default NavbarSetting;
