import { Skeleton, Stack } from "@chakra-ui/react";
import "../sass/loading.scss";

const LoadingCard = () => {
  const data = [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <>
      {data.map((_, i) => (
        <article className="item" key={i}>
          <Stack>
            <Skeleton
              height="200px"
              borderRadius={"6px"}
              margin={"0 auto"}
              marginTop={"5px"}
              className="loading_card"
            />
            <Skeleton
              height="45px"
              borderRadius={"6px"}
              margin={"0 auto"}
              marginTop={"0px"}
              marginBottom={"10px"}
              className="loading_card"
            />
          </Stack>
        </article>
      ))}
    </>
  );
};

export default LoadingCard;

export const LoadingCardMine = () => {
  const data = [{}, {}, {}, {}, {}, {}];
  return (
    <>
      {data.map((_, i) => (
        <article className="item" key={i}>
          <Stack>
            <Skeleton
              height="65px"
              width={"98.5%"}
              borderRadius={"6px"}
              margin={"0 auto"}
              marginTop={"0px"}
              marginBottom={"10px"}
              className="loading_card"
            />
          </Stack>
        </article>
      ))}
    </>
  );
};

export function LoadingProduct() {
  return (
    <div className="loading_product">
      <div className="loading_product_item">
        <div className="radus_loading"></div>
        <div className="radus_loading1"></div>
      </div>
    </div>
  );
}

export const LoadingLine = () => {
  return (
    <>
      <div className="loading">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </>
  );
};
