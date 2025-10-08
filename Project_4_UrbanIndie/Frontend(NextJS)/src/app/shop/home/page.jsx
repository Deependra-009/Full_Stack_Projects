"use client";

import {
  hp_category_images,
  hp_new_arrival_images,
  hp_recommended_images,
  hps_images,
} from "../../Core/Constant_Data/HomePageImages";
import { HomeProductCard } from "../../Shared/ReusableComponents/HomeProductCard/HomeProductCard";

export const HomePage = () => {
  return (
    <>
      <div className="w-[100%] ">
        {/* <!-- New Arrival --> */}
        <div className="w-[100%] border-2-black">
          <HomeProductCard
            ContainerTitle={"New Arrival"}
            New_Arrival={hp_new_arrival_images}
          ></HomeProductCard>
        </div>
        {/* <!-- Most Wanted Brand --> */}
        <div className="w-[100%]  items-center flex justify-center">
          <div className="w-[80%] mt-[3%]">
            <div className="w-[100%] h-[30px] text-2xl">Most Wanted Brands</div>
            <hr className="h-px my-8 bg-gray-200 border-0" />
            <img
              src="./../../../../assets/Images/homepage/hnw1.png"
              className="w-[100%]  h-[150px] md:h-[480px]"
            />
            <div className="mt-[3%] w-[100%] flex justify-between overflow-quick overflow-x-auto">
              {hps_images.map((item, index) => (
                <div key={index} className="w-[186px] mr-5">
                  <div
                    className="w-[140px] h-[200px] md:w-[190px] md:h-[250px]"
                    style={{
                      background: `url(${item.link})`,
                      backgroundPosition:'center',
                      backgroundSize:'cover'
                    }}
                  ></div>
                  {/* style={`background-image: url('${item.link}');`} */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <!-- Recommended --> */}
        <div className="w-[100%] ">
          <HomeProductCard
            ContainerTitle={"Recommended"}
            New_Arrival={hp_recommended_images}
          ></HomeProductCard>
        </div>

        {/* < !--Categories --> */}
        <div className="w-[100%] ">
          <HomeProductCard
            ContainerTitle={"Categories"}
            New_Arrival={hp_category_images}
          ></HomeProductCard>
        </div>
      </div>
    </>
  );
};
