import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OnlineUsers from "../components/OnlineUsers";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <OnlineUsers />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
