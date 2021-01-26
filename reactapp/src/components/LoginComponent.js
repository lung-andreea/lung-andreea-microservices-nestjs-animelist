import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import api from "../utils/api";
import Field from "./common/Field";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const { setJwt, setUserId } = useContext(MainContext);
  const history = useHistory();

  useEffect(() => {
    setJwt("");
    setUserId(0);
  }, []);

  function toggleDisabled() {
    if (username !== "" && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    $.ajax(api.ENDPOINT.LOGIN, {
      type: "POST",
      data: JSON.stringify({
        username: username,
        password: password,
      }),
      contentType: "application/json; charset=UTF-8",
    })
      .done((response) => {
        console.log(response);
        // TODO: show success / error notification
        response.access_token && setJwt(response.access_token);
        response.userId && setUserId(response.userId);
        history.push("/");
      })
      .fail((error) => {
        console.log("Error logging in user", error);
      });
  }

  const renderField = (
    label,
    inputType,
    inputValue,
    setInputValue,
    icon,
    placeholderText
  ) => {
    return (
      <Field
        label={label}
        inputType={inputType}
        inputValue={inputValue}
        onInputValueChange={(event) => {
          setInputValue(event.target.value);
          toggleDisabled();
        }}
        icon={icon}
        iconPosition="left"
        placeholderText={placeholderText}
      />
    );
  };

  const redirectToRegister = () => {
    history.push("/register");
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box">
                {renderField(
                  "Username",
                  "text",
                  username,
                  setUsername,
                  "fa-user",
                  "bobby21"
                )}
                {renderField(
                  "Password",
                  "password",
                  password,
                  setPassword,
                  "fa-lock",
                  "*******"
                )}
                <div className="field">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="button is-success"
                  >
                    Login
                  </button>
                  <div
                    className="authentication-link"
                    onClick={redirectToRegister}
                  >
                    Don't have an account? Register now
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
