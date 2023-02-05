import { Outlet } from "react-router-dom";
import AppBarWrapper from "./AppBarWrapper";

export default function Layout() {
    return (
      <div>
        <AppBarWrapper />
        <Outlet />
      </div>
      
    );
  };