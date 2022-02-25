import React, { useState, useEffect } from "react";
import * as API from "../helpers/api";

const initialData = [
  {
    avatar: "",
    email: "",
    first_name: "",
    id: null,
  },
];

const data = [
  {
    id: 1,
    background: "red",
  },
  {
    id: 2,
    background: "black",
  },
  {
    id: 3,
    background: "red",
  },
  {
    id: 4,
    background: "green",
  },
];

export default function Home() {
  const [userData, setUserData] = useState(initialData);

  useEffect(() => {
    async function dataCall() {
      const res = await API.users();
      setUserData(res.data.data);
    }
    dataCall();
  }, []);

  const combinedClass = {};

  return (
    <div className="py-5 px-24">
      <div className="text-4xl text-center font-semibold">
        Hello ReqRes user!
      </div>
      <div className="col hidden flex flex-row justify-center flex-wrap gap-4 my-5">
        {userData.map((item) => {
          const { id, first_name, email, avatar } = item;
          return (
            <div className="w-72 flex flex-col items-center my-2" key={id}>
              <div className="font-bold mt-2">{first_name}</div>
              <div className="my-2">{email}</div>
              <div
                className="w-32 h-32 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${avatar})` }}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row justify-center flex-wrap gap-4 my-5">
        {data.map((item) => {
          console.log(item);
          return (
            <div
              className={`w-72 flex flex-col items-center my-2 ${
                item.background === "red"
                  ? "bg-red-100"
                  : item.background === "green"
                  ? "bg-green-200"
                  : "bg-blue-300"
              }`}
              //   style={{ backgroundColor: `${item.background}` }}
            >
              Vaibhav {item.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}
