import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { UserContext } from "../context/UserProvider";

const MainMenuScreen = () => {
  const navigate = useNavigate()
  const userCtx = useContext(UserContext)

  useEffect(() => {
    if (!userCtx.user) {
      navigate("/login")
    }
  }, [])

  return (
    <div className="container main_menu_container">
      <h2 id="main_manu_logo">
        Snake & Snake
      </h2>
      <span>Hello, {userCtx.user?.username || "guest"}!</span>
      <div className="main_menu_items_container">
        <button onClick={() => navigate("/join")}>
          Join game
        </button>
        <button onClick={() => navigate("/create")}>
          Create room
        </button>
        <button onClick={() => navigate("/profile")}>
          Statistics
        </button>
      </div>
    </div>
  )
}

export default MainMenuScreen