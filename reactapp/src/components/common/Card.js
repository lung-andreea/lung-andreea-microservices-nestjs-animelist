import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, image_url, score, episodes, buttonAction }) => {
  return (
    <div className="col-lg-6 col-md-6 col-xs-6">
      <div className="profile-card-6">
        <img src={image_url} className="img img-responsive" />
        <div className="profile-name">{title}</div>
        <a
          type="button"
          className="btn-floating btn-lg purple-gradient card-add"
          onClick={buttonAction}
        >
          <i className="fas fa-plus" />
        </a>
        <div className="profile-overview">
          <div className="profile-overview">
            <div className="row text-center">
              <div className="col-xs-4">
                <h3>{score}</h3>
                <p>Score</p>
              </div>
              <div className="col-xs-4">
                <h3>{episodes}</h3>
                <p>Episodes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  score: PropTypes.number,
  episodes: PropTypes.number,
  buttonAction: PropTypes.func,
};

export default Card;
