"use client";

import { ServiceStatus } from "@/app/core/enum/service-status.enum";
import { useRouter } from "next/navigation";
import * as fromAppStore from "@/app/core/store/app.store.service";
import * as fromAppSelector from "@/app/core/store/app.selector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserService } from "@/app/core/services/common.service";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const serviceControlData = useSelector(fromAppSelector.getServiceControlData);
  const jwtToken = useSelector(fromAppSelector.getJwtToken);

  useEffect(() => {
    if (serviceControlData.UserLoginStatus == ServiceStatus.SUCCESS) {
      router.push("/chat");
    }
  }, [serviceControlData.UserLoginStatus]);

  const [loginPayload, setLoginData] = useState({
    userEmail: "deependra@gmail.com",
    userPassword: "12345678",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginPayload,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fromAppStore.fetchUserLoginStart(dispatch);
    console.log("Form submitted:", loginPayload);

    try {
      const response = await loginUserService(loginPayload);
      setTimeout(() => {
        fromAppStore.fetchUserLoginSuccess(dispatch, response.data);
      }, 3000);
    } catch (error) {
      fromAppStore.fetchUserLoginError(dispatch);
      console.log(error);
    }
  };

  return (
    <>
      <section className=" w-[100%] bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold  text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            QuickChat
          </a>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    value={loginPayload.userEmail}
                    onChange={handleChange}
                    className=" border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-white font-medium"
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
                    className=" border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required={true}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-white">
                  Don’t have an account yet?{" "}
                  <a className="font-medium text-red-500 text-primary-600 hover:underline text-primary-500">
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
}
