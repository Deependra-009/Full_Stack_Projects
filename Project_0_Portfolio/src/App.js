import './App.css';
import { Sidebar } from './components/sideBar/Sidebar';
import { Main } from './components/main/Main';
import 'react-tooltip/dist/react-tooltip.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile, setJsonData } from './components/shared/redux/portfolioServiceSlice';
import { LoadingPage } from './components/LoadingPage/LoadingPage';
import './style/fonts.css'
import { isDarkModeSelector, jsonData } from './components/shared/redux/selector';
function App() {
  const isDarkMode = useSelector(isDarkModeSelector);
  const portfolioData = useSelector(jsonData);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const ran = useRef(false);

  useEffect(() => {
    dispatch(setIsMobile(window.innerWidth <= 768))
    if (ran.current) return;
    ran.current = true;
    fetchPortfolioData();
  }, [dispatch])


  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 768))
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const fetchPortfolioData = () => {
    if (portfolioData == undefined  && ran.current == true && sessionStorage.getItem("PORTFOLIO_DATA") == undefined) {

      fetch("https://raw.githubusercontent.com/Deependra-009/portfolio-data/main/data.json")
        .then(response => response.json())
        .then(data => {
          dispatch(setJsonData(data));
          sessionStorage.setItem("PORTFOLIO_DATA", JSON.stringify(data));
          setTimeout(() => {
            setIsLoading(false);
          }, 2000)

        })
        .catch(error => console.error("Error fetching JSON:", error));
    }
    else if (sessionStorage.getItem("PORTFOLIO_DATA") != undefined) {
      dispatch(setJsonData(JSON.parse(sessionStorage.getItem("PORTFOLIO_DATA"))));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
    }

  }
  return (
    <>
      {
        isLoading && <LoadingPage />
      }
      {
        !isLoading && <div className='w-100 flex sticky-top'>
          <div className={`w-[30%]  h-[100vh] sticky-top md:block hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <Sidebar />
          </div>
          <div className='w-100  md:w-[70%] '>
            <Main />
          </div>


        </div>
      }



    </>
  );
}

export default App;
