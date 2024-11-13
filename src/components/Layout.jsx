import { Suspense } from "react";
import AppBar from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};

export default Layout;
