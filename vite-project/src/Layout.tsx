import React, { ReactNode } from "react";
import Navbar from "./components/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ width: "100%", height: "100%", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
