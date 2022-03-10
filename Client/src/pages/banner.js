import React from "react";
import Warlock from "../assets/images/nemesis.png";
// const style={
//     borderRadius
// }
import "./banner.css";
export default function Banner() {
  return (
    <div className="container mx-auto h-full">
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 py-20">
        <div className=" px-10 xl:py-44 lg:py-40 md:py-36 py-28">
          <div className="xl:text-6xl lg:text-5xl md:text-4xl text-4xl font-black text-white mb-10">
            Nemesis Downfall Token Pre-Sale Coming Soon!
          </div>
          <div className="font-light text-xl text-gray-200 mb-10">
            Nemesis downfall is a first person shooter, play to earn shooter video
            game!
          </div>
          <div className="flex justify-between gap-5">
            

            <a
                href="https://nemesisdownfall.com/whitepaper/"
                target="_blank"
                rel="noreferrer"
                className=" flex-1 text-white border-0 rounded-lg py-5 p-2 text-sm transition ease-in duration-100 uppercase w-full font-semibold primary__button"
                style={{textAlign:"center"}}
              >
                <div className="w-full"> Whitepaper</div>
            </a>

            <a
                href="https://nemesisdownfall.com/pitchdeck/"
                target="_blank"
                rel="noreferrer"
                className=" flex-1 text-white border-0 rounded-lg py-5 p-2 text-sm transition ease-in duration-100 uppercase w-full font-semibold secondary__button"
                style={{textAlign:"center"}}
              >
                <div className="w-full"> Pitch Deck</div>
            </a>

          </div>
        </div>
        <div className=" flex justify-center">
          <div className="h-full jumping__image my-auto">
            <img src={Warlock} alt="war" className="ball h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
