import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import api from "../../utils/api";
import { MainContext } from "../../contexts/MainContext";

const status = {
  PLANNING: "Planning",
  PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const WatchlistRow = (props) => {
  const { _id, title, episodes } = props.rowData;
  const [userStatus, setUserStatus] = useState(props.rowData.userStatus);
  const [userProgress, setUserProgress] = useState(props.rowData.userProgress);
  const { userId, watchlist, setWatchlist } = useContext(MainContext);
  let latestRowData = {
    ...props.rowData,
    userStatus: userStatus,
    userProgress: userProgress,
  };

  const onSelectChange = (event) => {
    const updatedObject = {
      ...latestRowData,
      userStatus: event.target.value,
    };
    setUserStatus(event.target.value);
    updateWatchlistEntry(updatedObject);
  };

  const onEpisodesChange = (event) => {
    const newUserProgress =
      event.target.value <= episodes ? event.target.value : userProgress;
    const updatedObject = {
      ...latestRowData,
      userProgress: newUserProgress,
    };
    setUserProgress(newUserProgress);
    userProgress !== newUserProgress && updateWatchlistEntry(updatedObject);
  };

  const onDelete = () => {
    api.removeAnime(userId, _id).then(() => {
      const newWatchlist = watchlist.filter((anime) => anime._id !== _id);
      setWatchlist(newWatchlist);
    });
  };

  const updateWatchlistEntry = (updatedObject) => {
    api
      .updateAnime(userId, _id, updatedObject)
      .then((response) => {
        console.log(response);
      })
      .fail((error) => console.log("Error updating watchlist entry", error));
  };

  return (
    <li className="row list-group-item watchlist-row">
      <div className="text-justify text-truncate font-weight-bold col-4">
        {title}
      </div>
      <div className="input-group col-lg-4 col-md-3 col-xs-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Status
          </label>
        </div>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={onSelectChange}
          value={userStatus}
        >
          <option value={status.PLANNING}>{status.PLANNING}</option>
          <option value={status.PROGRESS}>{status.PROGRESS}</option>
          <option value={status.COMPLETED}>{status.COMPLETED}</option>
        </select>
      </div>
      <div className="input-group episodes-control col-lg-3 col-md-3 col-xs-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Episodes</span>
        </div>
        <input
          type="number"
          onChange={onEpisodesChange}
          className="form-control"
          value={userProgress}
        />
      </div>
      <div className="text-justify text-truncate font-weight-bold col-1">
        / {episodes}
      </div>
      <div className="trash-icon col-1" onClick={onDelete}>
        <i className="fas fa-trash" />
      </div>
    </li>
  );
};

WatchlistRow.propTypes = {
  rowData: PropTypes.object,
};

export default WatchlistRow;
