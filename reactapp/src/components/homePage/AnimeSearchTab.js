import React, { useContext, useState, useEffect } from "react";
import api from "../../utils/api";
import Field from "../common/Field";
import Card from "../common/Card";
import { MainContext } from "../../contexts/MainContext";

const AnimeSearchTab = () => {
  const [query, setQuery] = useState("");
  const [cardData, setCardData] = useState([]);
  const { userId, watchlist, setWatchlist } = useContext(MainContext);

  const searchAnime = () => {
    query &&
      api.ENDPOINT.animeSearch(query)
        .done((response) => {
          setCardData(response);
        })
        .fail((error) => {
          console.log("Error receiving response from external resource", error);
        });
  };

  const addAnimeToWatchlist = (anime) => {
    api
      .addAnime(userId, anime)
      .then((response) => {
        console.log(response);
        setWatchlist([...watchlist, response]);
      })
      .fail((error) => {
        console.log("Error adding anime to watchlist", error);
      });
  };

  return (
    <div className="col-lg-5 col-md-4 anime-search-tab">
      <Field
        label="Search"
        inputType="text"
        inputValue={query}
        onInputValueChange={(event) => {
          setQuery(event.target.value);
        }}
        icon="fa-search"
        iconPosition="right"
        iconAction={searchAnime}
        placeholderText="Search anime..."
      />
      <div className="row anime-search-tab__cards-container">
        {cardData.map((card) => (
          <Card
            key={card.mal_id}
            image_url={card.image_url}
            title={card.title}
            score={card.score}
            episodes={card.episodes}
            buttonAction={() => addAnimeToWatchlist(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeSearchTab;
