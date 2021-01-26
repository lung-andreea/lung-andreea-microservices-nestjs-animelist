import React, { useContext, useState, useEffect } from "react";
import api from "../../utils/api";
import { MainContext } from "../../contexts/MainContext";
import WatchlistRow from "./WatchlistRow";

const Watchlist = () => {
  const { userId, watchlist, setWatchlist } = useContext(MainContext);

  useEffect(() => {
    api
      .getWatchlistForUser(userId)
      .then((response) => setWatchlist(response))
      .fail((error) => {
        console.log("Error retrieving watchlist for user", error);
      });
  }, []);

  return (
    <div className="col-md-7 anime-watchlist-tab">
      <label htmlFor="" className="label">
        Watchlist
      </label>
      <ul className="list-group">
        {watchlist.map((anime) => (
          <WatchlistRow key={anime.mal_id} rowData={anime} />
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
