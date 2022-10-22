import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const GameOverScreen = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [room, setRoom] = useState(null)


  useEffect(() => {
    if (location?.state?.room) {
      setRoom(location.state.room)
    }
  }, [])


  const getFailedPlayerUsername = () => {
    if (room) {
      for (const player of room.players) {
        if (player.lifesCount === 0) {
          return player.username
        }
      }
    }
    return ""
  }

  return (
    <div className="container">
      <h1 className="title">
        Game over
      </h1>
      {
        room && room.players.map((player, i) => {
          return (
            <div key={i} className="game_finish_player_row">
              <img
                src={player.avatarUrl}
                alt="avatar"
                onError={(e) => e.target.src = "default_avatar.png"}
              />
              <span style={{ color: player.colors[0] }}>
                {player.username}
              </span>
              <span style={{ color: player.colors[0] }}>
                {player.lifesCount}
              </span>
            </div>
          )
        })
      }
      {
        room && (
          <label>
            {getFailedPlayerUsername()} lose the game!
          </label>
        )
      }
      <button onClick={() => navigate("/")}>
        Back to Main Menu
      </button>
    </div>
  )
}

export default GameOverScreen