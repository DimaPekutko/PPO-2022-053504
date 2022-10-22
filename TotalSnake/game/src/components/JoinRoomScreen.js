import { useContext, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GameStateContext } from "../context/GameStateProvider"
import { UserContext } from "../context/UserProvider" 
import socketClient from "../firebase/socketClient"
import { uuid } from "./../utils"

const SNAKE_COLORS = [
  ["lime", "green"],
  ["yellow", "orange"],
  ["magenta", "purple"],
  ["pink", "hotpink"],
]


const JoinRoomScreen = () => {

  const formBtnRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()

  const [roomId, setRoomId] = useState("")
  const [colorIdx, setColorIdx] = useState(0)
  const [formMessage, setFormMessage] = useState("")

  const gameStateCtx = useContext(GameStateContext)
  const userCtx = useContext(UserContext)

  useEffect(() => {
    if (location?.state?.roomId) {
      setRoomId(location.state.roomId)
    }
    socketClient.on("START_GAME", onStartGameRoomEvent)
  }, [])

  const formError = (msg) => {
    formBtnRef.current.disabled = false
    setFormMessage(msg)
  }

  const onStartGameRoomEvent = async (roomConfig) => {
    gameStateCtx.setGameRoomConfig(roomConfig)
    socketClient.removeListener("START_GAME")
    navigate("/game")
  }

  const onJoinRoomBtnClick = async (e) => {
    formBtnRef.current.disabled = true
    setFormMessage("searching room...")

    const payload = {
      roomId: roomId,
      player: {
        socketId: socketClient.id,
        id: userCtx.user._id,
        avatarUrl: userCtx.user.avatarUrl,
        username: userCtx.user.username,
        lifesCount: 3,
        colors: SNAKE_COLORS[colorIdx]
      }
    }
    socketClient.emit("JOIN_ROOM", payload, (err, response) => {
      if (err) {
        formError(err)
      }
      else {
        setFormMessage(response)
      }
    })

  }

  return (
    <div className="container join_room_container">
      <h1 className="title">
        Join game
      </h1>
      <label>
        Room ID:
      </label>
      <input
        placeholder="ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value) | setFormMessage("")}
      />
      <label>Your color:</label>
      <div className="colors_list_container">
        {
          SNAKE_COLORS.map((clr, i) => {
            return (
              <div
                key={i}
                className={colorIdx === i ? "selected_color" : ""}
                onClick={() => setColorIdx(i)}
                style={{
                  background: clr[1],
                  color: clr[0]
                }}>
                {clr[0]}
              </div>
            )
          })
        }
      </div>
      <label>
        {formMessage}
      </label>
      <button onClick={onJoinRoomBtnClick} ref={formBtnRef}>
        Join game
      </button>
    </div>
  )
}

export default JoinRoomScreen