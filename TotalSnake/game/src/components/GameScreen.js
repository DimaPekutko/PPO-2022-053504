import GameField from "./GameField"
import React, { useContext, useEffect } from "react"
import GameController from "./GameController";
import { GameStateContext, GameStateProvider } from "../context/GameStateProvider";
import socketClient from "../firebase/socketClient";
import { useNavigate } from "react-router-dom";


const GameScreen = () => {

  const navigate = useNavigate()
  const gameStateCtx = useContext(GameStateContext)

  useEffect(() => {
    const cnv = document.getElementById("game_cnv")
    if (gameStateCtx.gameRoomConfig) {
      gameStateCtx.initializeGame(cnv)
      socketClient.on("ROOM_GAME_OVER", onGameOver)
    }
  }, [])

  const onGameOver = (body) => {
    gameStateCtx.finishGame()
    socketClient.removeListener("ROOM_GAME_OVER")
    navigate("/game_over", {
      state: {
        room: body
      },
      replace: true
    })
  }

  return (
    <GameStateProvider>
      <div className="container game_screen_container">
        {
          gameStateCtx.gameRoomConfig && gameStateCtx.gameRoomConfig.players.map((player, i) => {
            return (
              <div className="game_player_top_bar" key={i}>
                <img
                  alt="avatar"
                  src={player.avatarUrl}
                  onError={(e) => e.target.src = "default_avatar.png"}
                />
                <span>{player.username}</span>
                <span className="game_hearts_span">
                  {"❤️".repeat(player.lifesCount)}
                </span>
              </div>
            )
          })
        }
        <GameField />
        <GameController onJoystickMove={gameStateCtx.onJoystickMove} />
      </div>
    </GameStateProvider>
  );
}

export default GameScreen
