import { useSelector } from "react-redux";
import { isDarkModeSelector } from "../redux/selector";

export const PopulModal = ({
  data,
  projectName,
  closeProjectDetails,
  status,
}) => {
  const isDarkMode = useSelector(isDarkModeSelector);

  return (
    <>
      <div className={`fixed top-0 ${isDarkMode?'bg-black':'bg-white'}  z-[10]  py-5  right-0 left-0 md:left-[30%]   `}>
        <div className="relative mt-[7rem]  overflow-hidden md:h-[85vh] h-[83vh] mx-2  ">
          <div className="border-red-500 overflow-quick overflow-y-auto  text-red-500  h-[100%] rounded-[10px] shadow border-[3px]">
            <div className={`flex ${isDarkMode?'bg-black':'bg-white'}  sticky top-0  items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600`}>
              <div className="flex items-center">
                <h3 className="text-xl font-semibold mr-10">{projectName}</h3>
                {status === "IN-PROGRESS" && (
                  <span className="w-[150px] flex rounded-[50px] justify-center items-center h-[40px] text-[18px] bg-white px-3 py-2 ">
                    In-Progress
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  closeProjectDetails(null);
                }}
                type="button"
                className={`${isDarkMode?'text-white ':'text-black'} bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ${isDarkMode?'hover:bg-white':'hover:bg-red-500 '} `}
                data-modal-hide="default-modal"
              >
                <svg
                  className={`w-3 h-3  ${isDarkMode?'text-red-500 ':'text-red-500 hover:text-white'}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className={`p-4 ${isDarkMode?'text-white':'text-black'} md:p-5 space-y-4`}>
              <div className="text-green-500 text-[20px]">Overview</div>
              <div className="text-[17px] leading-relaxed ">{data.content}</div>

              <div className="w-100">
                <div className="text-green-500 text-[20px]">Features</div>
                <div className="w-100 py-5 flex flex-wrap">
                  <ol>
                    {data.features.map((item, index) => (
                      <li key={index} className="text-[17px] leading-relaxed">
                        {index + 1}: &nbsp; {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="w-100">
                <div className="text-green-500 text-[20px]">
                  Technology Used
                </div>
                <div className="w-100 py-5 flex flex-wrap">
                  {data.technology_used.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 mx-3 py-3 min-w-[100px] my-2 md:min-w-[100px] flex justify-center items-center rounded-[50px] text-[15px] md:font-[600]  border-red-500 border-2"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-100">
                <div className="text-green-500 text-[20px]">Tools Used</div>
                <div className="w-100 py-5 flex flex-wrap">
                  {data.tools_used.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 mx-3 py-3 min-w-[100px] my-2 md:min-w-[100px] flex justify-center items-center rounded-[50px] text-[15px] md:font-[600]  border-red-500 border-2"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-100 p-5 border-t border-gray-600">
              <div className="w-100 md:w-[50%] md:flex md:items-center">
                {data.github_url.length !== 0 && (
                  <a
                    href={data.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="md:min-w-[40%] w-[100%] mb-3 md:my-0 md:max-w-[50%] flex justify-center cursor-pointer px-5 mr-10 rounded-[50px] border-2 border-green-500 hover:bg-green-500 text-green-500 py-2 hover:text-blue-900 text-[14px] md:text-[18px]"
                  >
                    Project Link
                  </a>
                )}

                {data.video_url.length !== 0 && (
                  <a
                    href={data.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="md:min-w-[40%] w-[100%] mt-3 md:my-0 md:max-w-[50%] flex justify-center cursor-pointer px-5 rounded-[50px] border-2 border-green-500 hover:bg-green-500 text-green-500 py-2 hover:text-blue-900 text-[14px] md:text-[18px]"
                  >
                    Project Video Link
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
