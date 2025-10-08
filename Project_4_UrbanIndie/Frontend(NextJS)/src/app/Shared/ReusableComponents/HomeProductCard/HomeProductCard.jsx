import './HomeProductCard.css';
export const HomeProductCard = ({ New_Arrival, ContainerTitle }) => {

    const searchProduct = (item) => {

        // DataTransferServiceService.removeSearchTextFromCookie();
        // DataTransferServiceService.saveSearchText(item.department);
        // this.router.navigateByUrl("/search-product");

    }
    return (
        <>
            <div className="w-[100%] flex justify-center items-center ">
                <div className="w-[90%] mt-[3%]">
                    <div className="w-[100%] h-[30px] text-2xl">
                        { ContainerTitle }
                    </div>
                    <hr className="h-[1px] my-8 bg-gray-200  dark:bg-gray-800" />
                    <div className="w-[100%]     grid 2xl:grid-cols-4  xl:grid-cols-3 gap-5 sm:gap-[50px]  lg:grid-cols-3 md:grid-cols-2 grid-cols-2">
                        {/* *ngFor="let item of New_Arrival" */}
                        {
                            New_Arrival.map((item,index) => (
                                <div key={index} className=" hover:cursor-pointer card-custom-hover  hover:text-red-500  md:w-[270px]   xl:w-[280px] mobile:[w-[40%]   sm:w-[220px] 2xl:w-[300px] mx-auto  my-0  rounded-md  p-3"  >
                                    <img src={item.link} className="w-[100%] bg-cover bg-center " />
                                    <button className="text-gray-600 pt-1 pb-1  ">Explore </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div >
        </>
    )
}