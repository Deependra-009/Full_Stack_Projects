import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});














//  <footer class="bg-black dark:bg-white mt-20">
//   <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
//     <div class="flex">

//       <div class="w-[30%] mb-6 md:mb-0 ">
//         <a href="" class="flex flex-wrap items-center">
//           <img
//             src="/assets/Images/Vector.png"
//             class="h-8 mr-3 dark:text-black text-white"
//             alt="UrbanIndie Logo"/>
//           <span
//             class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black text-white"
//             >UrbanIndie</span>
//         </a>

//         <ul class="dark:text-black text-white text-sm font-semibold mt-14">
//           <li class="mb-4">
//             <a href="" class="hover:underline">Promotions</a>
//           </li>
//           <li class="mb-4">
//             <a href="" class="hover:underline">Gift Cards</a>
//           </li>
//           <li class="mb-4">
//             <a href="" class="hover:underline">Stores</a>
//           </li>
//           <li class="mb-4">
//             <a href="" class="hover:underline">Stores Directory</a>
//           </li>
//         </ul>
//       </div>

//       <div class=" w-[70%] grid xs:grid-cols-2 sm:grid-cols-3 justify-items-center sm:ml-12 lg:ml-12">
//         <div>
//           <h2
//             class="mb-6 text-sm font-semibold uppercase dark:text-black text-white"
//           >
//             Explore
//           </h2>
//           <ul class="text-gray-600 dark:text-gray-400 font-medium">
//             <li class="mb-4">
//               <a href="" class="hover:underline">Men Fashion</a>
//             </li>
//             <li class="mb-4">
//               <a href="" class="hover:underline">Woman Fashion</a>
//             </li>
//             <li class="mb-4">
//               <a href="" class="hover:underline">Kids Fashion</a>
//             </li>
//             <li class="mb-4">
//               <a href="" class="hover:underline">Beauty</a>
//             </li>
//             <li class="mb-4">
//               <a href="" class="hover:underline">Home & Living</a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h2
//             class="mb-6 text-sm font-semibold uppercase dark:text-black text-white"
//           >
//             Help
//           </h2>
//           <ul class="text-gray-600 dark:text-gray-400 font-medium">
//             <li class="mb-4">
//               <a
//                 href=""
//                 class="hover:underline"
//                 >FAQs</a
//               >
//             </li>
//             <li class="mb-4">
//               <a href="" class="hover:underline"
//                 >Track Orders</a
//               >
//             </li>
//             <li class="mb-4">
//               <a
//                 href=""
//                 class="hover:underline"
//                 >Returns</a
//               >
//             </li>
//             <li class="mb-4">
//               <a
//                 href=""
//                 class="hover:underline"
//                 >Shipping</a
//               >
//             </li>
//             <li class="mb-4">
//               <a
//                 href=""
//                 class="hover:underline"
//                 >Accessibility</a
//               >
//             </li>
//           </ul>
//         </div>
//             <div>
//               <h2 class="mb-6 text-sm font-semibold uppercase dark:text-black text-white">
//                 Sign Up & Save 10% On Your Purchases
//               </h2>
//               <ul class="text-gray-600 dark:text-gray-400 font-medium">
//                 <li class="mb-4">
//                   <a
//                     href="https://github.com/themesberg/flowbite"
//                     class="hover:underline"
//                     >Subscribe for news on our latest arrivals, exclusive promotions
//                     and events.</a
//                   >
//                 </li>
//                 <li>
//                   <button
//                     type="button"
//                     class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                   >
//                     Sign Up & Save 10%
//                   </button>
//                 </li>
//               </ul>
//             </div>
           
//           </div>

        
//         </div>
       
        


//         <div class="grid sm:grid-cols-3 justify-items-center ml-45">

//           <div class="ml-0.5">
//             <h2
//               class="mb-6 text-sm font-semibold uppercase dark:text-black text-white"
//             >
//               Contact us
//             </h2>
//             <ul class="text-gray-600 dark:text-gray-400 font-medium">
             
//               <li class="mb-4">
//                 <a href="" class="hover:underline">Email us</a>
//               </li>
//               <li class="mb-4">
//                 <a href="" class="hover:underline">Call us</a>
//               </li>
//               <li class="mb-4">
//                 <a href="" class="hover:underline">Chat with us</a>
//               </li>
//             </ul>
//           </div>
//           <div class="ml-12">
//             <h2
//               class="mb-6 text-sm font-semibold uppercase dark:text-black text-white"
//             >
//              About
//             </h2>
//             <ul class="text-gray-600 dark:text-gray-400 font-medium">
//               <li class="mb-4">
//                 <a
//                   href=""
//                   class="hover:underline"
//                   >About UrbanIndie</a
//                 >
//               </li>
//               <li class="mb-4">
//                 <a href="" class="hover:underline"
//                   >Careers</a
//                 >
//               </li>
//               <li class="mb-4">
//                 <a
//                   href=""
//                   class="hover:underline"
//                   >Privacy Commitment</a
//                 >
//               </li>
//             </ul>
//           </div>
//         </div>

        
    
//         <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//         <div class="sm:flex sm:items-center sm:justify-between">
//           <a href="" class="flex items-center">
//             <img
//               src="/assets/Images/Vector.png"
//               class="h-5 mr-3 dark:text-black text-white"
//               alt="UrbanIndie Logo"
//             />
//             <span
//               class="self-center font-semibold whitespace-nowrap dark:text-black text-white"
//               >UrbanIndie</span
//             >
//           </a>
//         </div>
    
//         <div
//           class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
//         >
//           <ul
//             class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
//           >
//             <li>
//               <a href="#" class="hover:underline m-1">Privacy Policy</a>
//             </li>
//             <li>|</li>
//             <li>
//               <a href="#" class="hover:underline m-1">Interest Based Ads</a>
//             </li>
//             <li>|</li>
    
//             <li>
//               <a href="#" class="hover:underline m-1"
//                 >Do Not Sell My Personal Information/Data
//               </a>
//             </li>
//             <li>|</li>
//             <li>
//               <a href="#" class="hover:underline md:mr-6 m-1">Terms & Conditions</a>
//             </li>
//             <br />
//           </ul>
//         </div>
//         <div class="pl-4">
//           <p
//             class="m-1 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
//           >
//             Copyright © 2023 Bring It. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer> 
