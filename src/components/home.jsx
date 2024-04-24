import React, { useContext, useEffect, useState } from "react";
import useProductStore from "../store/productStore";
import "../sass/home.scss";
import { Btn, Pausebtn, Playbtn } from "../constants";
import ProductCard from "./card";
import LoadingCard, { LoadingCardMine } from "./loadingCard";
import { Audioprovider } from "../context";
import { useNavigate } from "react-router-dom";
import { Tracks } from "../api/api.service";

const HomeComponent = () => {
  const {
    loading,
    error,
    playlists,
    FEATURED_playlists,
    MADE_FOR_YOU_playlists,
    RECENT_PLAYED_playlists,
    JUMP_BACK_IN_playlists,
    UNIQUELY_YOURS_playlists,
    fetchProducts,
  } = useProductStore();
  const [activeId, setActiveId] = useState(null);
  const [activePlay, setactivePlay] = useState(false);
  const { audio, setAudio } = useContext(Audioprovider);
  const root = useNavigate();

  const handleClick = (id) => {
    setActiveId(id);
    setactivePlay(!activePlay);
  };

  useEffect(() => {
    fetchProducts(Tracks);
  }, []);

  return (
    <div className="container">
      <div className="home">
        {loading ||
        JUMP_BACK_IN_playlists === undefined ||
        UNIQUELY_YOURS_playlists === undefined ? (
          <div className="products">
            <div className="loadingMine">
              <LoadingCardMine />
            </div>
            <div className="product_cards">
              <LoadingCard />
            </div>
          </div>
        ) : (
          <>
            <div className="home_header">
              <button className="btn" onClick={() => root(-1)}>
                <Btn />
              </button>
              <button className="btn">
                <Btn />
              </button>
            </div>
            <h3 className="h3_good">Good afternoon</h3>
            <div className="home_carts">
              {FEATURED_playlists?.length > 0 &&
                FEATURED_playlists.slice(0, 6).map((el, i) => (
                  <div
                    className="cart"
                    key={i}
                    onClick={() =>
                      root(
                        `/playlist/${el?.id}?type=${el?.tracks?.href}?playlist=${el?.href}`
                      )
                    }
                  >
                    <img src={el?.images?.map((el) => el?.url)} alt="" />
                    <h3>{el.name}</h3>
                    <button
                      className={`play_btn ${
                        activeId === el?.id ? "active" : ""
                      }`}
                      onClick={() => handleClick(el?.id)}
                    >
                      {activePlay ? <Pausebtn /> : <Playbtn />}
                    </button>
                  </div>
                ))}
            </div>
            <div className="products" style={{ marginTop: "30px" }}>
              <div className="product_title">
                <h4>Your top mixes</h4>
                <p>SEE ALL</p>
              </div>
              <div className="product_cards">
                {playlists?.length > 0 && (
                  <ProductCard
                    data={{
                      data: playlists,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="products" style={{ marginTop: "30px" }}>
              <div className="product_title">
                <h4>Made for you</h4>
                <p>SEE ALL</p>
              </div>
              <div className="product_cards">
                {MADE_FOR_YOU_playlists?.length > 0 && (
                  <ProductCard
                    data={{
                      data: MADE_FOR_YOU_playlists,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="products" style={{ marginTop: "30px" }}>
              <div className="product_title">
                <h4>Recently played</h4>
                <p>SEE ALL</p>
              </div>
              <div className="product_cards">
                {RECENT_PLAYED_playlists?.length > 0 && (
                  <ProductCard
                    data={{
                      data: RECENT_PLAYED_playlists,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="products" style={{ marginTop: "30px" }}>
              <div className="product_title">
                <h4>Jump back in</h4>
                <p>SEE ALL</p>
              </div>
              <div className="product_cards">
                {JUMP_BACK_IN_playlists?.length > 0 && (
                  <ProductCard
                    data={{
                      data: JUMP_BACK_IN_playlists,
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className="products"
              style={{ marginTop: "30px", paddingBottom: "110px" }}
            >
              <div className="product_title">
                <h4>Uniquely yours</h4>
                <p>SEE ALL</p>
              </div>
              <div className="product_cards">
                {UNIQUELY_YOURS_playlists?.length > 0 && (
                  <ProductCard
                    data={{
                      data: UNIQUELY_YOURS_playlists,
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
