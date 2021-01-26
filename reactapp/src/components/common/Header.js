import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import api from "../../utils/api";

const Header = ({ ws }) => {
  const history = useHistory();
  const [newsAlertsActive, setNewsAlertsActive] = useState(false);
  const { userId } = useContext(MainContext);

  const redirectToLogin = () => {
    history.push("/login");
  };

  const subscribeToNewsAlert = () => {
    if (newsAlertsActive) {
      //TODO: unsubcribe from news
      setNewsAlertsActive(false);
    } else {
      setNewsAlertsActive(true);
      // eslint-disable-next-line react/prop-types
      ws.emit("news", userId);
      api.ENDPOINT.news(userId)
        .then(() => {
          console.log("Subscribed to news!");
        })
        .fail((error) => {
          console.log("Error subscribing/unsubscribing to news!", error);
        });
    }
  };

  return (
    <header id="header">
      <div className="inner">
        <h1 className="logo">Anime watchlist manager</h1>
        <nav id="nav">
          <a onClick={redirectToLogin}>Log out</a>
        </nav>
        <label onClick={subscribeToNewsAlert}>
          {newsAlertsActive ? "Stop News" : "Get News"}
        </label>
      </div>
    </header>
  );
};

export default Header;
