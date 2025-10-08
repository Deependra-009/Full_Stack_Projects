import "./Loading.css";
export const LoadingPage = () => {
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center">
        <div>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      </div>
    </>
  );
};
