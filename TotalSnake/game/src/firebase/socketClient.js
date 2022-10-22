import { io } from "socket.io-client"

const SERVER_URL = "https://desolate-sierra-02188.herokuapp.com"

// const SERVER_URL = "http://localhost:4242"

const socketClient = io(SERVER_URL, {transports: ['websocket', 'polling', 'flashsocket']})

export default socketClient