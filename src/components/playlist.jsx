import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "../store/productStore";
import {
  Btn,
  Dowenload,
  Filter,
  HeaderIC,
  LikeICActive,
  LikeICThrer,
  Pausebtn,
  PlayBtnGroup,
  PlayBtnGroupIC,
  Playbtn,
} from "../constants";
import "../sass/playlist.scss";
import { LoadingLine, LoadingProduct } from "./loadingCard";
import { Audioprovider } from "../context";
import useLikeStore from "../store/like";

const PlaylistComponent = () => {
  const {
    loading,
    error,
    playlists,
    FEATURED_playlists,
    MADE_FOR_YOU_playlists,
    RECENT_PLAYED_playlists,
    JUMP_BACK_IN_playlists,
    UNIQUELY_YOURS_playlists,
    Tracks_playlists,
    fetchProducts,
  } = useProductStore();
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const [data, setData] = useState(null);
  const [playList, setplayList] = useState();
  const [artists, setArtists] = useState("");
  const root = useNavigate();
  const { audio, setAudio, endaudio, setendAudio } = useContext(Audioprovider);
  const [likeData, setlikeData] = useState([]);
  const [pay, setPay] = useState(false);
  const [audioPlayID, setaudioPlayID] = useState();
  const { likes, addLike, removeLike } = useLikeStore((state) => state);

  useEffect(() => {
    switch (urlApi) {
      case "playlists":
        setData(playlists);
        break;
      case "FEATURED_playlists":
        setData(FEATURED_playlists);
        break;
      case "MADE_FOR_YOU_playlists":
        setData(MADE_FOR_YOU_playlists);
        break;
      case "RECENT_PLAYED_playlists":
        setData(RECENT_PLAYED_playlists);
        break;
      case "JUMP_BACK_IN_playlists":
        setData(JUMP_BACK_IN_playlists);
        break;
      case "UNIQUELY_YOURS_playlists":
        setData(UNIQUELY_YOURS_playlists);
        break;
      case "Tracks_playlists":
        setData(Tracks_playlists);
        break;
      default:
        break;
    }
  }, [id, urlApi]);

  useEffect(() => {
    if (data !== null) {
      const foundPlaylist = data?.find((el) => el?.id === id);
      if (foundPlaylist) {
        setplayList(foundPlaylist);
        fetchProducts(foundPlaylist?.tracks?.href);
      }
    }
    setArtists(Tracks_playlists);
    setPay(endaudio);
  }, [id, urlApi, data, endaudio]);

  const like = (playList) => {
    addLike(playList);
    setlikeData(likes);
  };

  // Unlike function
  const unlike = (id) => {
    removeLike(id);
  };

  useEffect(() => {
    const like = JSON.parse(localStorage.getItem("like")) | [];
    setlikeData(like);
  }, []);

  const handelAudioPlay = (url) => {
    setaudioPlayID(url);
    localStorage.setItem("audioUrl", JSON.stringify(url));
    setAudio(url);
    setPay(!pay);
    if (pay) {
      setAudio(true);
      localStorage.setItem("audioPlay", JSON.stringify("paused"));
    } else {
      setAudio(false);
      localStorage.setItem("audioPlay", JSON.stringify("play"));
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="playlist_w"
          style={{
            background: `linear-gradient(180deg, ${
              playList?.primary_color || "white"
            } 5.09%, #121212 33.4%) `,
          }}
        >
          {loading && Tracks_playlists === undefined ? (
            <LoadingProduct />
          ) : (
            <>
              <div
                className="playlist_header"
                style={{
                  background: `linear-gradient(180deg, ${
                    playList?.primary_color || "white"
                  } 100%, #121212 0%) `,
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
                  <img src={playList?.images?.map((img) => img?.url)} alt="" />
                </div>
                <div className="play_right">
                  <p>PUBLIC PLAYLIST</p>
                  <h2> {playList?.name} </h2>
                  <p className="p">{artists[15]?.track?.name}</p>
                  <p className="p">
                    {artists[15]?.track?.album.name}{" "}
                    {artists[15]?.track?.album.release_date}{" "}
                    {artists[15]?.track?.album.release_date_precision}{" "}
                  </p>
                </div>
              </div>
              <div className="play_btns">
                <div className="buttons">
                  <button
                    className={`play_btn ${
                      pay && artists[5]?.track?.id == audioPlayID?.track?.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handelAudioPlay(artists[5])}
                  >
                    <span>
                      <Pausebtn />
                    </span>
                    <span>
                      <Playbtn />
                    </span>
                  </button>
                  <button
                    className={`likeIC ${(() => {
                      const likedItems =
                        JSON.parse(localStorage.getItem("likes")) || [];
                      const isLiked = likedItems.some(
                        (item) => item?.id === playList?.id
                      );
                      return isLiked ? "liked" : "";
                    })()}`}
                    onClick={() => {
                      const likedItems =
                        JSON.parse(localStorage.getItem("likes")) || [];
                      const isLiked = likedItems.some(
                        (item) => item?.id === playList?.id
                      );
                      if (isLiked) {
                        unlike(playList?.id);
                      } else {
                        like(playList);
                      }
                    }}
                  >
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
                  {Tracks_playlists?.map((el, i) => (
                    <div className="albumCart" key={i}>
                      <span style={{ color: "#B3B3B3" }}>
                        {pay && el?.track?.id == audioPlayID?.track?.id ? (
                          <LoadingLine />
                        ) : (
                          i + 1
                        )}

                        <div className="playGroup">
                          <img src={el?.track?.album?.images[0].url} alt="" />
                          <div
                            className={`playgroup_btn ${
                              pay && el?.track?.id == audioPlayID?.track?.id
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handelAudioPlay(el)}
                          >
                            <span>
                              <PlayBtnGroupIC />
                            </span>

                            <span>
                              <PlayBtnGroup />
                            </span>
                          </div>
                        </div>
                        <p>
                          {el?.track?.album?.artists
                            ?.slice(0, 2)
                            .map((name, i) => (
                              <p
                                className={`albumCardName ${
                                  pay && el?.track?.id == audioPlayID?.track?.id
                                    ? "active"
                                    : ""
                                }`}
                                key={i}
                              >
                                {name?.name}
                              </p>
                            ))}
                        </p>
                      </span>
                      <p className="p1">{el?.track?.album?.artists[0].name}</p>
                      <p className="p2">
                        {el?.track?.explicit ? (
                          <span>
                            <LikeICActive />
                          </span>
                        ) : (
                          <span></span>
                        )}

                        <span className="timeT">
                          {Math.floor(el?.track?.duration_ms / 1000 / 60)}
                          {" : "}
                          {Math.floor((el?.track?.duration_ms / 1000) % 60)}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaylistComponent;
