import { useEffect, useState } from "react";
import { ProjectCard } from "../../shared/ProjectCard/ProjectCard";
import { PopulModal } from "../../shared/PopupModal/PopupModal";
import { jsonData } from "../../shared/redux/selector";
import { useSelector } from "react-redux";

export const Project = () => {

    const [projectDetails,setProjectDetails]=useState(false);
    const [projectData,setProjectData]=useState(null);

    const portfolioData = useSelector(jsonData);

    const openProjectDetails=(data)=>{
        setProjectData(data);
        setProjectDetails(true);

    }

    const closeProjectDetails=(data)=>{
        setProjectData(data);
        setProjectDetails(false);

    }
  return (
    <>
      <div id="project" className="w-100  min-h-[100vh] ">
        <div className="diamond-logo mt-[10rem] ">
          <hr></hr>
        </div>

        <div className="w-100  mt-[10rem]">
          <div className="w-100 md:w-[90%] flex justify-center text-green-500 text-[25px]">
            Portfolio Highlights
          </div>
          <div className="w-100 px-5 mt-[5rem] flex justify-center flex-col items-center md:grid md:grid-cols-3 md:gap-10">
            {portfolioData.ProjectData.map((item,index) => (
              <ProjectCard openProjectDetails={openProjectDetails} key={index} data={item} />
            ))}
          </div>
        </div>



        {
            projectDetails && <PopulModal
                data={projectData.data}
                projectName={projectData.name}
                closeProjectDetails={closeProjectDetails}
                status={projectData.status}
                />
        }


      </div>
    </>
  );
};
