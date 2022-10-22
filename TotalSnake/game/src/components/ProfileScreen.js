import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { timestampToDate } from "../utils"


const ProfileScreen = () => {

  const navigate = useNavigate()
  const userCtx = useContext(UserContext)

  const [name, setName] = useState("")
  const [playedGames, setPlayedGames] = useState([])
  const [formMessage, setFormMessage] = useState("")


  useEffect(() => {
    if (userCtx.user) {
      setName(userCtx.user.username)
      userCtx.getUserPlayedGames(onPlyedGamesFetched)
    }

  }, [userCtx.user])

  const onPlyedGamesFetched = (err, games) => {
    setPlayedGames(games)
  }

  const onUpdateUserAvatarBtnClick = (e) => {
    userCtx.updateUserAvatar((err) => {
      if (err) {
        setFormMessage(err)
      }
    })
  }

  const onUpdateUsernameBtnClick = (e) => {
    if (name.trim().length >= 5) {

      if (name.trim().length <= 12) {
        userCtx.updateUsername(name, (err) => {
          if (err) {
            setFormMessage(err)
          }
          else {
            setFormMessage("Username updated!")
          }
        })
      }
      else {
        setFormMessage("Username too long!")
      }

    }
    else {
      setFormMessage("Username too short!")
    }
  }

  const onUserExitBtnClick = (e) => {
    userCtx.exitUser()
    navigate("/login")
  }

  return (
    <div className="container profile_container">
      <h1 className="title">
        Your profile
      </h1>
      {
        userCtx.user && (
          <>
            <img
              className="profile_avatar"
              alt="avatar"
              src={userCtx.user.avatarUrl}
              onError={(e) => e.target.src = "default_avatar.png"}
            />
            <br />
            <button onClick={onUpdateUserAvatarBtnClick}>
              Change avatar
            </button>
            <label>Your name:</label>
            <input
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value) | setFormMessage("")}
            />
            <label>
              {formMessage}
            </label>
            <button onClick={onUpdateUsernameBtnClick}>
              Change name
            </button>
          </>
        )
      }
      <hr />
      <h1 className="title">
        Statistics
      </h1>
      {
        playedGames.length > 0 ? playedGames.map((game, i) => {
          return (
            <div key={i} className="game_statistics_row">
              <span>
                <i>
                  {timestampToDate(game.timestamp)}
                </i>
              </span>
              {
                game.players.map((player, i) => {
                  return (
                    <span key={i}>
                      <b style={{ color: player.colors[0] }}>{
                        userCtx.user._id === player.id ?
                          "YOU" :
                          player.username
                      }
                      </b>
                      ({player.lifesCount})
                      {i + 1 < game.players.length && " vs"}
                    </span>
                  )
                })
              }
            </div>
          )
        }) : <label>There are no played games yet!</label>
      }
      <br />
      <button onClick={onUserExitBtnClick}>
        Exit from account
      </button>
      <br />
    </div>
  )

}

export default ProfileScreen