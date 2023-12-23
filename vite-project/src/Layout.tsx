import React, { ReactNode } from "react";
import Navbar from "./components/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100%", flexWrap: "nowrap" }}>
      <Navbar />
      <div style={{ width: "100%", height: "auto", padding: "20px", flexWrap: "nowrap" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
