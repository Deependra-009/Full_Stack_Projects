import { useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { AboutMe } from "../Sections/AboutMe/AboutMe";
import { ContactUs } from "../Sections/ContactUs/ContactUs";
import { Home } from "../Sections/Home/Home";
import { Project } from "../Sections/Projects/Project";
import { Skills } from "../Sections/Skills/Skills";
import { isDarkModeSelector } from "../shared/redux/selector";

export const Main = () => {
  const isDarkMode = useSelector(isDarkModeSelector);

  return (
    <>
      <div className="w-100">
        <div className={`${isDarkMode?'bg-black':'bg-white'} w-100  md:block sticky-top`}>
          <div className="w-100  md:block sticky-top">
            <Navbar />
          </div>
          <div className="w-100 ">
            {/* Home Section */}
            <Home />

            {/* About Me */}
            <AboutMe />

            {/* Projects */}
            <Project />

            {/* Skills */}
            <Skills />

            {/* ContactUs */}
            <ContactUs />
          </div>
        </div>
      </div>
    </>
  );
};
