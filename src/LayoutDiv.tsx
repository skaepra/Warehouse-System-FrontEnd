import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout(): React.JSX.Element {
  return (
    <> 
      <div className="sm:w-[calc(100%-200px)] sm:ml-[200px]">
         <Outlet />
      </div>
    </>
  );
}