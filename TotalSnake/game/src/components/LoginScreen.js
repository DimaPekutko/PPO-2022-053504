import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameStateContext } from "../context/GameStateProvider"
import { UserContext } from "../context/UserProvider"
import socketClient from "../firebase/socketClient"
import { uuid } from "./../utils"

const LoginScreen = () => {

  const navigate = useNavigate()

  const userCtx = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [formMessage, setFormMessage] = useState("")

  useEffect(() => {
    if (userCtx.user) {
      navigate("/")
    }
  }, [])

  const isFormDataValid = () => {
    const name = username.trim()
    const pass = password.trim()
    if (name.length < 5) {
      setFormMessage("Username length too short")
      return false
    }
    if (name.length > 12) {
      setFormMessage("Username length too long")
      return false
    }
    if (pass.length < 5) {
      setFormMessage("Password length too short")
      return false
    }
    setFormMessage("")
    return true
  }

  const onLoginBtnClick = (e) => {
    if (isFormDataValid()) {
      userCtx.login(username.trim(), password.trim(), (err) => {
        if (err) {
          setFormMessage(err)
        }
        else {
          navigate("/")
        }
      })
    }
  }

  const onRegisterBtnClick = (e) => {
    if (isFormDataValid()) {
      userCtx.register(username, password, (err) => {
        if (err) {
          setFormMessage(err)
        }
        else {
          navigate("/")
        }
      })
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        Login :)
      </h1>
      <span>For playing this game you need to be authentificated</span>
      <label>
        Username
      </label>
      <input
        placeholder="username"
        value={username}
        autoComplete="new-login"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>
        password
      </label>
      <input
        placeholder="password"
        value={password}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        {formMessage}
      </label>
      <div className="buttons_row">
        <button onClick={onLoginBtnClick}>
          login
        </button>
        <button onClick={onRegisterBtnClick}>
          register
        </button>
      </div>
    </div>
  )
}

export default LoginScreen