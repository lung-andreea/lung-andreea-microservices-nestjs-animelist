import React from "react";
import { useLocalStorage } from "../utils/functions";
import { useState } from "react";
import PropTypes from "prop-types";

const MainContext = React.createContext();

function MainContextProvider({ children }) {
  const [jwt, setJwt] = useLocalStorage("jwt", "");
  const [userId, setUserId] = useLocalStorage("userId", 0);
  const [watchlist, setWatchlist] = useState([]);

  return (
    <MainContext.Provider
      value={{ jwt, setJwt, userId, setUserId, watchlist, setWatchlist }}
    >
      {children}
    </MainContext.Provider>
  );
}

MainContextProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContextProvider, MainContext };
