import React, { useEffect, useState } from "react";
import socketClient from "../firebase/socketClient";
// import { getGameRoom } from "../firebase/firebaseMiddleware";

export const UserContext = React.createContext({
  login: null,
  register: null,
  updateUserAvatar: null,
  updateUsername: null,
  getUserPlayedGames: null,
  exitUser: null,
  user: null
})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("user_data"))
    if (cachedUser) {
      setUser(cachedUser)
    }
  }, [])

  const login = (username, password, callback) => {
    const payload = {
      user: {
        username: username,
        password: password
      }
    }
    socketClient.emit("USER_LOGIN", payload, (err, response) => {
      if (!err) {
        setUser(response)
        localStorage.setItem("user_data", JSON.stringify(response))
      }
      callback(err)
    })
  }

  const register = (username, password, callback) => {
    const payload = {
      user: {
        username: username,
        password: password
      }
    }
    socketClient.emit("USER_REGISTER", payload, (err, response) => {
      if (!err) {
        setUser(response)
        localStorage.setItem("user_data", JSON.stringify(response))
      }
      callback(err)
    })
  }

  const updateUserAvatar = (callback) => {
    const payload = {
      userId: user._id
    }
    socketClient.emit("USER_UPDATE_AVATAR", payload, (err, response) => {
      if (!err) {
        const newUser = {...user}
        newUser.avatarUrl = response.avatarUrl
        setUser(newUser)
        localStorage.setItem("user_data", JSON.stringify(newUser))
      }
      callback(err)
    })
  }

  const updateUsername = (newName, callback) => {
    const payload = {
      userId: user._id,
      username: newName
    }
    socketClient.emit("USER_UPDATE_USERNAME", payload, (err, response) => {
      if (!err) {
        const newUser = {...user}
        newUser.username = response.username
        setUser(newUser)
        localStorage.setItem("user_data", JSON.stringify(newUser))
      }
      callback(err)
    })
  }

  const getUserPlayedGames = (callback) => {
    const payload = {
      userId: user._id
    }
    socketClient.emit("USER_GAMES", payload, (err, response) => {
      let games = []
      if (!err) {
        games = response.playedGames
      }
      callback(err, games)
    })
  }

  const exitUser = () => {
    localStorage.removeItem("user_data")
    setUser(null)
  }

  return (
    <UserContext.Provider value={{
      login: login,
      register: register,
      updateUserAvatar: updateUserAvatar,
      updateUsername: updateUsername,
      getUserPlayedGames: getUserPlayedGames,
      exitUser: exitUser,
      user: user
    }}>
      {children}
    </UserContext.Provider>
  )
}
