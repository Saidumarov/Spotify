import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import "../sass/card.scss";
import { Pausebtn, Playbtn } from "../constants";
import { Audioprovider } from "../context";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ data }) => {
  const [activeId, setActiveId] = useState(null);
  const [activePlay, setactivePlay] = useState(false);
  const { audio, setAudio } = useContext(Audioprovider);
  const audioMusic = data?.Tracks_playlists;
  const root = useNavigate();

  const handleClick = async (id) => {
    setActiveId(id);
    setactivePlay(!activePlay);
    await audioMusic?.filter((el) => {
      if (el.track.id === id) {
        return setAudio(el?.track.preview_url);
      }
    });
  };

  return (
    <>
      {data?.data?.map((el, i) => (
        <div
          onClick={() =>
            root(
              `/playlist/${el?.id}?type=${el?.tracks?.href}?playlist=${el?.href}`
            )
          }
          key={i}
          className="card"
        >
          <div>
            <Image
              src={el.images?.map((el) => el?.url)}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              className="card-image"
            />
            <button
              className={`play_btn ${activeId === el?.id ? "active" : ""}`}
              onClick={(e) => handleClick(el?.id, e.stopPropagation())}
            >
              {activePlay && activeId == el?.id ? <Pausebtn /> : <Playbtn />}
            </button>
            <Stack>
              <Heading className="hedding">
                {el?.name?.length > 15
                  ? el.name?.substring(0, 15) + "..."
                  : el.name}
              </Heading>
              <Text>
                {el.description?.length > 40
                  ? el.description?.substring(0, 39) + "..."
                  : el.description}
              </Text>
            </Stack>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
