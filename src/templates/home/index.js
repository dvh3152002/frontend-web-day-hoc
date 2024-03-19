import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";

function HomeTemplate() {
  return (
    <div className="w-[90%] m-auto">
      <Header />
      <Outlet className="min-h-screen" />
      <Footer />
    </div>
  );
}

export default HomeTemplate;
