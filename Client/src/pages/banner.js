import React from "react";
import Warlock from "../assets/images/nemesis.png";
// const style={
//     borderRadius
// }
import "./banner.css";
export default function Banner() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row flex-wrap justify-center gap-5 px-6 pt-10 items-center">
        <div className="w-full xl:w-2/4 lg:w-11/12 flex flex-col h-full">
          <div className="text-6xl font-black text-white mb-10">
            Nemesis Downfall Pre-Sale Token Coming Soon!
          </div>
          <div className="font-light text-xl text-gray-200 mb-10">
            Nemesis Downfall is a first-person play to earn crypto shooter video
            game!
          </div>
          <div className="flex justify-between gap-5">
            <button className=" flex-1 text-white border-0 rounded-lg py-5 p-2 text-sm transition ease-in duration-100 uppercase w-full font-semibold primary__button">
              <a href="https://nemesisdownfall.com/whitepaper/" target="_blank">
                <div className="w-full"> Whitepaper</div>
              </a>
            </button>

            <button className=" flex-1 text-white border-0 rounded-lg py-5 p-2 text-sm transition ease-in duration-100 uppercase w-full font-semibold secondary__button">
              <a href="https://nemesisdownfall.com/pitchdeck/" target="_blank">
                <div className="w-full"> Pitch Deck</div>
              </a>
            </button>
          </div>
        </div>
        <div className="flex justify-center ml-5" style={{ height: "800px" }}>
          <img src={Warlock} alt="war" className="ball mt-20 " />
        </div>
      </div>

      {/* <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            // style={{
            //   backgroundImage: "url(
            //     'https://source.unsplash.com/oWTW-jNGl9I/600x800'
            //   )",
            // }}
          ></div>
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Reset Password
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./register.html"
                >
                  Create an Account!
                </a>
              </div>
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
}
