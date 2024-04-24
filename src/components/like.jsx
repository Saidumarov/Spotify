import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Btn,
  Dowenload,
  Filter,
  HeaderIC,
  LikeICActive,
  LikeICThrer,
} from "../constants";
import "../sass/playlist.scss";
import likeIMg from "../assets/Screenshot 2022-06-04 at 20 1.png";
import { Heading } from "@chakra-ui/react";
import useLikeStore from "../store/like";
const LikeComponent = () => {
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const [data, setData] = useState(null);
  const root = useNavigate();
  const { likes, removeLike } = useLikeStore((state) => state);

  // Unlike function
  const unlike = (id) => {
    removeLike(id);
  };

  useEffect(() => {
    setData(likes);
  }, [id, urlApi, likes]);

  return (
    <>
      <div className="container">
        <div
          className="playlist_w"
          style={{
            background: `linear-gradient(180deg, #3333a3 5.09%, #121212 33.4%) `,
          }}
        >
          <>
            <div
              className="playlist_header"
              style={{
                background: `linear-gradient(180deg, #3333a3 100%, #12121200 0%) `,
              }}
            >
              <button className="btn" onClick={() => root(-1)}>
                <Btn />
              </button>
              <button className="btn" onClick={() => root(+1)}>
                <Btn />
              </button>
            </div>

            <div className="playlist_carts">
              <div className="play_left">
                <img src={likeIMg} alt="" />
              </div>
              <div className="play_right">
                <p style={{ color: "white" }}>PUBLIC PLAYLIST</p>
                <Heading style={{ color: "white" }}>Liked Songs</Heading>
              </div>
            </div>
            <div className="play_btns">
              <div className="buttons">
                <button className="likeIC liked">
                  <LikeICThrer />
                </button>
                <button className="Dowenload">
                  <Dowenload />
                </button>
                <button className="nuqta">...</button>
              </div>
              <span className="filter">
                <Filter />
              </span>
            </div>
            <div className="albums">
              <HeaderIC />
              <div className="albumCars">
                {data?.map((el, i) => (
                  <div className="albumCart" key={i}>
                    <span style={{ color: "#B3B3B3" }}>
                      {i + 1}
                      {el?.images ? (
                        <img src={el?.images[0]?.url} alt="" />
                      ) : (
                        <img src={el?.album?.images[0].url} alt="" />
                      )}

                      <p>
                        <p key={i}>{el?.name}</p>
                      </p>
                    </span>
                    <p className="p1">{el?.name}</p>
                    <p className="p2">
                      <span onClick={() => unlike(el?.id)}>
                        <LikeICActive />
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default LikeComponent;
