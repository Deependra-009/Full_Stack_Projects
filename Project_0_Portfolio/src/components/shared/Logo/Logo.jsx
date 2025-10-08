import './Logo.css'

export const Logo = () => {
  return (
    <>
      <div className="w-100  item-center mt-10">
        {/* <img src="/Images/logo.jpg" className="rounded-[50%] w-[200px]" alt="images"></img> */}
        <div className=" flex  justify-center   items-center ">
          <div className="2xl:w-[300px] flex justify-center items-center 2xl:h-[300px] md:w-[300px] md:h-[300px]  w-[200px] h-[200px]  class-head">
            <div className="md:w-[250px] md:h-[250px] bg-logo-img z-10 2xl:w-[300px] w-[200px] rounded-[100%]  bg-no-repeat bg-cover 2xl:h-[300px] h-[200px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};
