import React from "react";
import AnimeSearchTab from "./homePage/AnimeSearchTab";
import Header from "./common/Header";
import Watchlist from "./homePage/Watchlist";

// eslint-disable-next-line react/prop-types
function HomePage({ ws }) {
  return (
    <div className="container homepage-container">
      <Header ws={ws} />
      <div className="row text-center">
        <AnimeSearchTab />
        <Watchlist />
      </div>
    </div>
  );
}

export default HomePage;
