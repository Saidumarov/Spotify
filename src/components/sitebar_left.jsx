import { useState } from "react";
import HomeIC, { CreateIC, LibraryIC, LikeIC, SearchIC } from "../constants";
import "../sass/sitebar_left.scss";
import { useNavigate } from "react-router-dom";
const SiteBarLeft = () => {
  const [active, setActive] = useState("home");
  const root = useNavigate();
  const handelClike = (clik) => {
    setActive(clik);
  };
  return (
    <div className="sitebar_left_w">
      <div className="sitebar_icons">
        <div
          className={`icon ${active === "home" ? "active" : ""}`}
          onClick={() => (handelClike("home"), root("/"))}
        >
          <HomeIC />
          <p>Home</p>
        </div>
        <div
          className={`icon ${active === "search" ? "active" : ""}`}
          onClick={() => handelClike("search")}
        >
          <SearchIC />
          <p>Search</p>
        </div>
        <div
          className={`icon ${active === "library" ? "active" : ""}`}
          onClick={() => handelClike("library")}
        >
          <LibraryIC />
          <p>Library</p>
        </div>
        <div
          className={`icon ${active === "create" ? "active" : ""}`}
          id="create"
          onClick={() => handelClike("create")}
        >
          <CreateIC />
          <p>Create</p>
        </div>
        <div
          className={`icon ${active === "like" ? "active" : ""}`}
          onClick={() => (handelClike("like"), root("/likes"))}
        >
          <LikeIC />
          <p>Likes</p>
        </div>
      </div>
      <div className="text">
        <div className="text_p">
          <p> Chill Mix</p>
          <p>Insta Hits</p>
          <p>Your Top Songs 2021</p>
          <p>Mellow Songs</p>
          <p>Anime Lofi & Chillhop Music</p>
          <p>BG Afro “Select” Vibes</p>
          <p>Afro “Select” Vibes</p>
          <p>Happy Hits!</p>
          <p>Deep Focus</p>
          <p>Instrumental Study</p>
          <p>OST Compilations</p>
          <p>Nostalgia for old souled mill...</p>
          <p>Mixed Feelings</p>
        </div>
      </div>
    </div>
  );
};

export default SiteBarLeft;
