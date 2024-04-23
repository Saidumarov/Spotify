import { createContext, useState } from "react";
export const Audioprovider = createContext();
function AudioProps({ children }) {
  const [audio, setAudio] = useState(null);
  const [endaudio, setendAudio] = useState(0);

  return (
    <>
      <Audioprovider.Provider
        value={{
          audio,
          setAudio,
          endaudio,
          setendAudio,
        }}
      >
        {children}
      </Audioprovider.Provider>
    </>
  );
}

export default AudioProps;
