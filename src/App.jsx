import { ChakraProvider } from "@chakra-ui/react";
import RouterA from "./router/Router";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <RouterA />
      </ChakraProvider>
    </>
  );
};

export default App;
