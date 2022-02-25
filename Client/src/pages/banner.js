import React from "react";
import Warlock from "../assets/images/warlock.png";
// const style={
//     borderRadius
// }
import "./banner.css";
export default function Banner() {
  return (
    <div className="flex gap-5 pt-28 px-24">
      <div className="flex-1 py-36 flex-wrap">
        <div className="text-6xl font-black text-white mb-10">
          Nemesis Downfall Pre-Sale Token Coming Soon!
        </div>
        <div className="font-light text-xl text-gray-200 mb-10">
          Nemesis Downfall is a first-person play to earn crypto shooter video
          game!
        </div>
        <div className="flex justify-between gap-5">
          <button className="  flex-1 text-white border-0 rounded-lg hover:bg-yellow-400 py-5 p-2 text-sm bg-red-600 transition ease-in duration-100 uppercase w-full font-semibold">
            <a href="https://nemesisdownfall.com/whitepaper/" target="_blank">Whitepaper</a>
          </button>
          <button className="  flex-1 text-white border-0 rounded-lg bg-yellow-400 py-5 p-2 text-sm hover:bg-red-600 transition ease-in duration-100 uppercase w-full font-semibold">
            <a href="https://nemesisdownfall.com/pitchdeck/" target="_blank">Pitch Deck</a>
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img src={Warlock} alt="war" className="ball h-5/6 mt-20" />
      </div>
    </div>
  );
}
