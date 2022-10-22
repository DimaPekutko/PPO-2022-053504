import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameStateContext } from "../context/GameStateProvider"
import socketClient from "../firebase/socketClient"
import { uuid } from "./../utils"

const CreateRoomScreen = () => {

  const formBtnRef = useRef()
  const navigate = useNavigate()

  const [roomId, setRoomId] = useState("")
  const MAX_PLAYERS_COUNT = 4
  const [playersCount, setPlayersCount] = useState(2)
  const [formMessage, setFormMessage] = useState("")

  const gameStateCtx = useContext(GameStateContext)

  useEffect(() => {
    // socketClient.on("START_GAME", onStartGameRoomEvent)
  }, [])


  const formError = (msg) => {
    formBtnRef.current.disabled = false
    setFormMessage(msg)
  }

  const onPlayersCountInputChange = (e) => {
    setFormMessage("")
    const count = Number(e.target.value)
    if (!isNaN(count)) {
      setPlayersCount(count)
    }
  }

  const onCreateRoomBtnClick = (e) => {
    if (playersCount < 2 || playersCount > MAX_PLAYERS_COUNT) {
      return formError(`Invalid players count. Allowed: min=2, max=${MAX_PLAYERS_COUNT}`)
    }

    formBtnRef.current.disabled = true

    const createdRoomId = uuid().slice(0, 12)
    setRoomId(createdRoomId)

    socketClient.emit("CREATE_ROOM", {
      room: {
        roomId: createdRoomId,
        maxPlayersCount: playersCount,
      }
    })
  }

  const onJoinRoomBtnClick = (e) => {
    navigate("/join", { 
      state: {
        roomId: roomId
      } 
    })
  }

  return (
    <div className="container create_room_container">
      <h1 className="title">
        Create game
      </h1>
      <label>
        Players count:
      </label>
      <input
        placeholder="ID"
        value={playersCount}
        type="text" pattern="[0-9]*"
        onChange={onPlayersCountInputChange}
      />
      <label>
        {formMessage}
      </label>
      {
        roomId.length > 0 ? (
          <>
            <label>
              ID: {roomId}
            </label>
            <button onClick={onJoinRoomBtnClick} ref={formBtnRef}>
              Join room
            </button>
          </>
        ) : (
          <button onClick={onCreateRoomBtnClick} ref={formBtnRef}>
            Create game
          </button>
        )
      }
    </div>
  )
}

export default CreateRoomScreen