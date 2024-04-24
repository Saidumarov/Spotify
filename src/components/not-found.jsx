import { Button, Heading, Text } from "@chakra-ui/react";
import { NotIC } from "../constants";
import { useNavigate } from "react-router-dom";
import "../sass/not.scss";
const NotFound = () => {
  const root = useNavigate();
  return (
    <div className="notfound">
      <NotIC />
      <Heading>Page not found</Heading>
      <Text>We can’t seem to find the page you are looking for.</Text>
      <Button onClick={() => root("/")}>Home</Button>
    </div>
  );
};

export default NotFound;
