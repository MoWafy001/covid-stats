import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { SearchProvider } from "../hooks/use-search";

export const Layout: React.FC = () => {
  return (
    <SearchProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </SearchProvider>
  );
};
