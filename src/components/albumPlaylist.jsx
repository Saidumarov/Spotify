import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getPlaylists, getToken } from "../hooks";

const AlbumPlaylist = () => {
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const playlistUrl = url.toString().split("?playlist=")[1];
  const [data, setData] = useState(null);
  const [playList, setplayList] = useState();
  const root = useNavigate();
  const { audio, setAudio, endaudio, setendAudio } = useContext(Audioprovider);
  const [likeData, setlikeData] = useState([]);
  const [pay, setPay] = useState(false);
  const [audioPlayID, setaudioPlayID] = useState();
  const { likes, addLike, removeLike } = useLikeStore((state) => state);

  useEffect(() => {
    setPay(endaudio);
    const fetchData = async () => {
      try {
        await getToken();
        await getPlaylists(playlistUrl).then((res) => {
          setplayList(res);
          //   console.log(res);
        });
        await getPlaylists(urlApi.toString().split("?playlist=")[0]).then(
          (res) => {
            setData(res);
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    if (pay) {
      setAudio(true);
      localStorage.setItem("audioPlay", JSON.stringify("paused"));
    } else {
      setAudio(false);
      localStorage.setItem("audioPlay", JSON.stringify("play"));
    }
  }, [id, urlApi, endaudio]);

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
      {data == null || undefined ? <LoadingProduct /> : ""}
      <div className="container">
        <div
          className="playlist_w"
          style={{
            background: `linear-gradient(180deg, ${
              playList?.primary_color || "white"
            } 5.09%, #121212 33.4%) `,
          }}
        >
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
                {data !== null ? (
                  <img src={playList?.album?.images[0].url} alt="" />
                ) : (
                  ""
                )}
              </div>
              <div className="play_right">
                {data !== null ? <p>PUBLIC PLAYLIST</p> : ""}

                <h2> {playList?.name?.substring(0, 15)} </h2>
                <p className="p">{playList?.name?.substring(0, 15)}</p>
                <p className="p">
                  {playList?.album.name}
                  {playList?.album.release_date}{" "}
                  {playList?.album.release_date_precision}{" "}
                </p>
              </div>
            </div>
            <div className="play_btns">
              <div className="buttons">
                <button
                  className={`play_btn ${
                    pay && playList?.id == audioPlayID?.track?.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handelAudioPlay({ track: playList })}
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
                {data?.items.slice(2)?.map((el, i) => (
                  <div
                    className="albumCart"
                    key={i}
                    onClick={() =>
                      root(
                        `/album/playlist/${el?.track?.id}?type=${
                          urlApi.toString().split("?playlist=")[0]
                        }?playlist=${el?.track?.href}`
                      )
                    }
                  >
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
                          onClick={(e) => (
                            handelAudioPlay(el), e.stopPropagation()
                          )}
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
        </div>
      </div>
    </>
  );
};

export default AlbumPlaylist;
