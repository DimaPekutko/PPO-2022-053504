import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom";
import { GameStateProvider } from "./context/GameStateProvider";
import GameScreen from "./components/GameScreen";
import MainMenuScreen from "./components/MainMenuScreen";
import JoinRoomScreen from "./components/JoinRoomScreen";
import CreateRoomScreen from "./components/CreateRoomScreen";
import LoginScreen from "./components/LoginScreen";
import { UserProvider } from "./context/UserProvider";
import ProfileScreen from "./components/ProfileScreen";
import GameOverScreen from "./components/GameOverScreen";

function App() {

  return (
    <UserProvider>
      <GameStateProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainMenuScreen />} />
            <Route path="/join" element={<JoinRoomScreen />} />
            <Route path="/create" element={<CreateRoomScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="/game_over" element={<GameOverScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </HashRouter>
      </GameStateProvider>
    </UserProvider>
  );
}

export default App;
