import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import HomePage from "./components/HomePage";
import AuthComponent from "./components/AuthComponent";
import RegisterComponent from "./components/RegisterComponent";
import io from "socket.io-client";

function App() {
  let ws;
  useEffect(() => {
    if (!window.WebSocket) alert("WebSocket not supported by this browser");
    const ws = io.connect("ws://192.168.1.3:8081");
    ws.on("connect", () => {
      console.log(`Websocket connected`);
      ws.emit("getNews");
      ws.on("disconnect", () => {
        console.log("disconnected");
      });
    });

    ws.on("open", () => {
      console.log("connection open");
    });

    ws.on("newsAlert", (payload) => {
      console.log(payload);
    });

    ws.on("message", (msg) => {
      console.log(msg);
    });

    ws.on("disconnect", () => {
      console.log("Disconnected websocket");
    });
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Switch>
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/register" component={RegisterComponent} />
      <Route path="/">
        <AuthComponent>
          <HomePage ws={ws} />
        </AuthComponent>
      </Route>
    </Switch>
  );
}

export default App;
