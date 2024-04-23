import { create } from "zustand";
import {
  FEATURED,
  JUMP_BACK_IN,
  MADE_FOR_YOU,
  RECENT_PLAYED,
  Token,
  UNIQUELY_YOURS,
  YOUR_TOP_MIXES,
  ClientID,
  ClientSecret,
  Tracks,
} from "../api/api.service";

// Ma'lumotlarni localStorage ga saqlash uchun function
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// localStorage dan ma'lumotlarni olish uchun function
const loadFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : null;
};

const useProductStore = create((set) => ({
  loading: false,
  error: "",
  token: loadFromLocalStorage("token") || "",

  setToken: (newToken) => {
    set({ token: newToken });
    saveToLocalStorage("token", newToken); // Tokenni localStoragega saqlash
  },

  fetchProducts: async (url) => {
    try {
      set({ loading: true, error: "" });
      const authResponse = await fetch(Token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(ClientID + ":" + ClientSecret)}`,
        },
        body: "grant_type=client_credentials",
      });

      const authData = await authResponse.json();
      const token = `${authData.token_type} ${authData.access_token}`;
      set({ token, loading: false });
      saveToLocalStorage("token", token);

      // FEATURED PLAYLIST
      const FEATURED_response = await fetch(FEATURED, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      // YOUR TOP MIXES:
      const response = await fetch(YOUR_TOP_MIXES, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      // MADE FOR YOU:
      const MADE_FOR_YOU_response = await fetch(MADE_FOR_YOU, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });
      // RECENT PLAYED:
      const RECENT_PLAYED_response = await fetch(RECENT_PLAYED, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });
      // JUMP BACK IN:
      const JUMP_BACK_IN_response = await fetch(JUMP_BACK_IN, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });
      // UNIQUELY YOURS:
      const UNIQUELY_YOURS_response = await fetch(UNIQUELY_YOURS, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      // Tracks
      const Tracks_response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      // Tracks_response
      const TracksData = await Tracks_response.json();
      const Tracks_playlists = TracksData?.items || [];
      set({ Tracks_playlists, loading: false, error: "" });

      // YOUR TOP MIXES:
      const playlistData = await response.json();
      const playlists = playlistData.playlists?.items || [];
      set({ playlists, loading: false, error: "" });

      // FEATURED PLAYLIST
      const FEATURED_playlistData = await FEATURED_response.json();
      const FEATURED_playlists = FEATURED_playlistData.playlists?.items || [];
      set({ FEATURED_playlists, loading: false, error: "" });

      // MADE FOR YOU:
      const MADE_FOR_YOU_playlistData = await MADE_FOR_YOU_response.json();
      const MADE_FOR_YOU_playlists =
        MADE_FOR_YOU_playlistData.playlists?.items || [];
      set({ MADE_FOR_YOU_playlists, loading: false, error: "" });

      // RECENT PLAYED:
      const RECENT_PLAYED_playlistData = await RECENT_PLAYED_response.json();
      const RECENT_PLAYED_playlists =
        RECENT_PLAYED_playlistData.playlists?.items || [];
      set({ RECENT_PLAYED_playlists, loading: false, error: "" });

      // JUMP BACK IN:
      const JUMP_BACK_IN_playlistData = await JUMP_BACK_IN_response.json();
      const JUMP_BACK_IN_playlists =
        JUMP_BACK_IN_playlistData.playlists?.items || [];
      set({ JUMP_BACK_IN_playlists, loading: false, error: "" });

      // UNIQUELY YOURS:
      const UNIQUELY_YOURS_playlistData = await UNIQUELY_YOURS_response.json();
      const UNIQUELY_YOURS_playlists =
        UNIQUELY_YOURS_playlistData.playlists?.items || [];
      set({ UNIQUELY_YOURS_playlists, loading: false, error: "" });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default useProductStore;

// ?limit=50&offset=0&market=US
