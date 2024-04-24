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

const PlaylistComponent = () => {
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const playlistUrl = url.toString().split("?playlist=")[1];
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
    const fetchData = async () => {
      try {
        await getToken();
        await getPlaylists(playlistUrl).then((res) => {
          setData(res);
          setplayList(res);
          setArtists(res?.tracks?.items);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, urlApi]);

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

  const handelAudioPlay = (url, type) => {
    setaudioPlayID(url);
    const urlObj = {
      ...url,
      track: {
        ...url.track,
        album: {
          ...url.track.album,
          images: [
            {
              url: playList?.images?.map((img) => img?.url),
            },
          ],
        },
      },
    };
    if (type === "album") {
      localStorage.setItem("audioUrl", JSON.stringify(urlObj));
    } else if (type === "albums") {
      localStorage.setItem("audioUrl", JSON.stringify(url));
    }
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

  useEffect(() => {
    setPay(endaudio);
  }, [id, urlApi, data, endaudio]);

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
                  <img src={playList?.images?.map((img) => img?.url)} alt="" />
                ) : (
                  ""
                )}
              </div>
              <div className="play_right">
                {data !== null ? <p>PUBLIC PLAYLIST</p> : ""}

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
                    pay && artists[15]?.track?.id == audioPlayID?.track?.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handelAudioPlay(artists[15], "album")}
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
                {data?.tracks?.items.slice(2)?.map((el, i) => (
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
                          onClick={() => handelAudioPlay(el, "albums")}
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

export default PlaylistComponent;
