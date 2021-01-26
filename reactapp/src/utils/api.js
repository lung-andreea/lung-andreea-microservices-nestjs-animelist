import $ from "jquery";

const API_GATEWAY_URL = "http://localhost:8080/api";
const AUTHENTICATION_API_URL = `${API_GATEWAY_URL}/auth`;
const ANIME_SERVICE_API_URL = `${API_GATEWAY_URL}/anime`;
const WATCHLIST_API_URL = `${API_GATEWAY_URL}/watchlist`;

const api = {
  ENDPOINT: {
    LOGIN: `${AUTHENTICATION_API_URL}/login`,
    REGISTER: `${AUTHENTICATION_API_URL}/register`,
    WATCHLIST: WATCHLIST_API_URL,

    animeSearch: (query) => {
      return $.ajax(`${ANIME_SERVICE_API_URL}/search`, {
        type: "POST",
        data: JSON.stringify({
          query: query,
        }),
        contentType: "application/json; charset=UTF-8",
      });
    },

    news: (userId) => {
      return $.ajax(`${API_GATEWAY_URL}/news/${userId}`, {
        type: "GET",
        contentType: "application/json; charset=UTF-8",
      });
    },
  },

  getWatchlistForUser: (userId) => {
    return $.ajax(`${WATCHLIST_API_URL}/user/${userId}`, {
      type: "GET",
      contentType: "application/json; charset=UTF-8",
    });
  },

  addAnime: (userId, animeObject) => {
    return $.ajax(`${WATCHLIST_API_URL}/user/${userId}`, {
      type: "POST",
      data: JSON.stringify(animeObject),
      contentType: "application/json; charset=UTF-8",
    });
  },

  removeAnime: (userId, animeId) => {
    return $.ajax(`${WATCHLIST_API_URL}/user/${userId}/anime/${animeId}`, {
      type: "DELETE",
      contentType: "application/json; charset=UTF-8",
    });
  },

  updateAnime: (userId, animeId, newAnimeObject) => {
    return $.ajax(`${WATCHLIST_API_URL}/user/${userId}/anime/${animeId}`, {
      type: "PUT",
      data: JSON.stringify(newAnimeObject),
      contentType: "application/json; charset=UTF-8",
    });
  },
};

export default api;
