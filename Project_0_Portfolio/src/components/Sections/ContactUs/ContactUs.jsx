import { useSelector } from "react-redux";
import { isDarkModeSelector } from "../../shared/redux/selector";

export const ContactUs = () => {
  const isDarkMode = useSelector(isDarkModeSelector);

  return (
    <>
      <div id="contactus" className="w-100 min-h-[100vh] ">
        <div className="diamond-logo mt-[10rem] ">
          <hr></hr>
        </div>

        <div className="w-100 mt-[10rem]">
          <div className="w-100 md:w-[90%] text-green-500 flex justify-center text-[30px]">
            Contact Us
          </div>
          <div className="w-100 md:w-[90%] ">
            <section className={`${isDarkMode?'bg-black':'bg-white'} h-[93.1vh]`}>
              <div className="py-8 md:py-16 px-4 mx-auto max-w-screen-md">
                <form
                  target="_blank"
                  action="https://formsubmit.co/95cd36dc79da38a2a26dc371fd3922ca"
                  method="POST"
                  className="space-y-8 mt-5"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className={`block mb-2 text-sm font-medium ${isDarkMode?'text-white':'text-black'}`}
                    >
                      Your Mail
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      id="email"
                      className={`shadow-sm  border ${isDarkMode?'bg-black text-white':'bg-white text-black'}  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 shadow-sm-light`}
                      placeholder="name@mail.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className={`block mb-2 text-sm font-medium ${isDarkMode?'text-white':'text-black'}`}
                    >
                      Subject
                    </label>
                    <input
                      name="subject"
                      required
                      type="text"
                      id="subject"
                      className={`shadow-sm  border ${isDarkMode?'bg-black text-white':'bg-white text-black'}  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 shadow-sm-light`}
                      placeholder="Let us know how we can help you"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className={`block mb-2 text-sm font-medium ${isDarkMode?'text-white':'text-black'}`}
                    >
                      Your message
                    </label>
                    <textarea
                      name="message"
                      required
                      id="message"
                      rows="6"
                      className={`shadow-sm  border ${isDarkMode?'bg-black text-white':'bg-white text-black'}  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500 shadow-sm-light`}
                      placeholder="Leave a comment..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-[100%] md:w-[30%] border-2 border-red-500 py-2 rounded-[50px] hover:bg-red-500 hover:text-white"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
