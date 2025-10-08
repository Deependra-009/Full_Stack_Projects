import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfileService, loginUserService } from "../../core/services/common.service";
import { UserLoginStart, UserLoginSuccess } from "../../core/store/app.action";
import * as fromAppStore from "../../core/store/app.store.service";
import {  getServiceControlData, getJwtToken } from '../../core/store/app.selector';
import { ServiceStatus } from "../../core/enum/service-status.enum";

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serviceControlData = useSelector(getServiceControlData);
  const jwtToken=useSelector(getJwtToken);

  useEffect(() => {
    if (serviceControlData.UserLoginStatus == ServiceStatus.SUCCESS) {
        navigate("/chat");
    }
  }, [serviceControlData.UserLoginStatus]);





  const [loginPayload, setLoginData] = useState({
    userEmail: "deependra@gmail.com",
    userPassword: "12345678",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginPayload,
      [name]: value,
    });
  };

  const handleSubmit =async (e:any) => {
    e.preventDefault();
    fromAppStore.fetchUserLoginStart(dispatch);
    console.log("Form submitted:", loginPayload);

    try{
      const response=await loginUserService(loginPayload);
      setTimeout(()=>{
        fromAppStore.fetchUserLoginSuccess(dispatch,response.data);

      },3000)
    }
    catch(error){
      fromAppStore.fetchUserLoginError(dispatch);
      console.log(error);
    }

  };

  return (

    <>
        <section className=" w-[100%] bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            QuickChat
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    value={loginPayload.userEmail}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    id="userPassword"
                    name="userPassword"
                    value={loginPayload.userPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
