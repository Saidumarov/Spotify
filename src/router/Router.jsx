import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Like from "../pages/like";
import NotFound from "../components/not-found";
import Playlist from "../pages/playlist";
import SiteBarLeft from "../components/sitebar_left";
import SiteBarRight from "../components/sitebar_right";
import "./index.scss";
import AudioPlay from "../components/audioplay";

const Router = () => {
  return (
    <>
      <div className="wrapper">
        <SiteBarLeft />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Like />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteBarRight />
      </div>
      <AudioPlay />
    </>
  );
};

export default Router;
