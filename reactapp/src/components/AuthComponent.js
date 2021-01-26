import React, { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext.js";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function AuthComponent(props) {
  const { jwt } = useContext(MainContext);
  const history = useHistory();

  useEffect(() => {
    if (jwt === "" || !jwt) {
      history.push("/login");
    }
  }, [history, jwt]);

  return <>{props.children}</>;
}

AuthComponent.propTypes = {
  children: PropTypes.node,
};

export default AuthComponent;
