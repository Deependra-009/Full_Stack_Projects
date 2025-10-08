"use client";
import { KidsData } from "../../Core/Constant_Data/KidsData";
import ProductCardDepartmentPage from "./../../Shared/ReusableComponents/ProductCardDepartmentPage/ProductCardDepartmentPage";


const KidsPage = () => {
  return (
    <>
      <div class="w-[100%]">
        <div class="w-[100%] border-b-[2px]  ">
          <div class="w-[100%] flex justify-between h-[10vh]">
            <div class="2xl:w-[20%] md:w-[30%]  xl:w-[30%]  flex justify-end items-center 2xl:pr-5 xl:pr-4">
              {/* <app-breadcrumb></app-breadcrumb> */}
            </div>
            <div class="2xl:w-[20%] md:w-[30%] xl:w-[30%]   flex justify-start items-center 2xl:pl-5 xl:pl-4">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class="bg-gray-200 text-black flex justify-center items-center border-2 border-gray-200 text-[15px] px-3 py-1 "
                type="button"
              >
                Dropdown button{" "}
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[100%] flex mt-5 justify-center">
          <div class="w-[85%] ">
            <div class="w-[100%] text-[20px] h-[3em] flex justify-center items-center bg-gradient-to-r from-white via-red-500 to-white">
              Sale Ends In: 16 H : 07 M : 22 S
            </div>
          </div>
        </div>
        {/* ------------ Product Image --------------- */}\
        <ProductCardDepartmentPage
          heading={KidsData.data1.heading}
          subHeading={KidsData.data1.subheading}
          ProductData={KidsData.data1.product}
        />
        <ProductCardDepartmentPage
          heading={KidsData.data2.heading}
          subHeading={KidsData.data2.subheading}
          ProductData={KidsData.data2.product}
        />
        <ProductCardDepartmentPage
          heading={KidsData.data3.heading}
          subHeading={KidsData.data3.subheading}
          ProductData={KidsData.data3.product}
        />
      </div>
    </>
  );
};

export default KidsPage;
