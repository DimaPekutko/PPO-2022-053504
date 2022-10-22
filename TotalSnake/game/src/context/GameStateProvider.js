import React, { useEffect, useState } from "react";
import Game from "../core/Game";
// import { getGameRoom } from "../firebase/firebaseMiddleware";

export const GameStateContext = React.createContext({
  initializeGame: null,
  finishGame: null,
  onJoystickMove: null,

  gameRoomConfig: null,
  setGameRoomConfig: null,

})

export const GameStateProvider = ({ children }) => {
  const [game, setGame] = useState(null)
  const [gameRoomConfig, setGameRoomConfig] = useState(null)

  const initGame = (canvas) => {
    const game = new Game()
    game.init(canvas, gameRoomConfig, setGameRoomConfig)
    setGame(game)
  }

  const onJoystickMove = (direction) => {
    if (game) {
      game.onJoystickMove(direction)
    }
  }


  const finishGame = (e) => {
    if (game) {
      game.gameOver()
    }
  }

  return (
    <GameStateContext.Provider value={{
      initializeGame: initGame,
      finishGame: finishGame,

      onJoystickMove: onJoystickMove,
      gameRoomConfig: gameRoomConfig,
      setGameRoomConfig: setGameRoomConfig,
    }}>
      {children}
    </GameStateContext.Provider>
  )
}
