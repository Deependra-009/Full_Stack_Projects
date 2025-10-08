"use client";

import { useSelector } from "react-redux";
import { Loader } from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import * as fromAppSelector from "@/app/core/store/app.selector";





export default function Home() {

  const loadingData = useSelector(fromAppSelector.getLoadingData);

  return (
    <div className="w-[100%]">
      <Login/>
      {loadingData.loading && <Loader />}
    </div>
  );
}
