import { useSelector } from "react-redux";
import "./Loader.css";
import { getLoadingData } from "../../core/store/app.selector";
import { LoaderType } from "../../core/enum/loader-type.enum";
export const Loader = () => {
  const loaderData = useSelector(getLoadingData);
  return (
    <>
      <div className="container">
        <div className="loader-overlay"></div>
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          {loaderData.type == LoaderType.LOGIN && (
            <div className="login-loader--text"></div>
          )}
          {loaderData.type == LoaderType.FETCHING_DATA && (
            <div className="fetching-data-loader--text"></div>
          )}
          {
            loaderData.type==LoaderType.CONNECT_TO_SERVER && (
              <div className="connecting-to-server-loader--text"></div>
            )}
        </div>
      </div>
    </>
  );
};
