import { Outlet } from "react-router-dom";
import HomeComponent from "../../components/home";

const Home = () => {
  return (
    <>
      <HomeComponent />
      <Outlet />
    </>
  );
};

export default Home;
