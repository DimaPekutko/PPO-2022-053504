import socketClient from "../firebase/socketClient"

export default class Game {


  init(canvas, roomConfig, setRoomConfig) {

    // socketClient.on("SPAWN_APPLE", this.onSpawnAppleRoomEvent.bind(this))

    this.cnv = canvas
    this.cnv.width = document.body.clientWidth
    this.cnv.height = document.body.clientWidth
    this.ctx = canvas.getContext("2d")
    this.ctx.font = "bold 20px Arial"

    this.MAP_SIZE = 20 // game field will be represented with MAP_SIZExMAP_SIZE proportions
    this.CELL_SIZE = parseInt(this.cnv.width / this.MAP_SIZE)

    this.roomConfig = roomConfig
    this.setRoomConfig = setRoomConfig
    this.roomId = roomConfig.roomId
    this.playerDirection = null
    this.player = null
    this.players = []
    this.enemy = null
    this.apple = null

    
    // setup start apple position
    this.apple = {
      color: "red",
      pos: { 
        x: this.CELL_SIZE*(parseInt(this.MAP_SIZE/2)),
        y: this.CELL_SIZE*(parseInt(this.MAP_SIZE/2)+1),
      }
    }
    
    this.playersInitPositions = [
      { x: 0, y: 0 },
      { x: this.CELL_SIZE * (this.MAP_SIZE - 1), y: this.CELL_SIZE * (this.MAP_SIZE - 1) },
      { x: 0, y: this.CELL_SIZE * (this.MAP_SIZE - 1) },
      { x: this.CELL_SIZE * (this.MAP_SIZE - 1), y: 0 }
    ]
    
    this.playersInitDirections = [
      "RIGHT",
      "LEFT",
      "FORWARD",
      "BACKWARD"
    ]

    this.preparePlayers()

    window.onkeydown = (e) => {
      if (e.key === "w") this.updatePlayerDirection("FORWARD")
      if (e.key === "s") this.updatePlayerDirection("BACKWARD")
      if (e.key === "d") this.updatePlayerDirection("RIGHT")
      if (e.key === "a") this.updatePlayerDirection("LEFT")
    }

    socketClient.on("UPDATE_SNAKE", this.onUpdateSnakeRoomEvent.bind(this))
    socketClient.on("SNAKE_COLLIDED", this.onSnakeCollidedRoomEvent.bind(this))
    socketClient.on("SPAWN_APPLE", this.onSpawnAppleRoomEvent.bind(this))

    // starting main game loop
    this.gameLoop = setInterval(
      this.update.bind(this),
      100
    )
  }

  preparePlayers() {
    // receiving roomConfig.players as [pl1 {...}, pl2 {...}]
    // setup first player in top left corner of the map with right movement dir.
    // second player at down right corner with left movement. dir. and etc.
    this.players = []
    for (let i = 0; i < this.roomConfig.players.length; i++) {
      const plInitData = this.roomConfig.players[i]
      const actor = {
        ...plInitData,
        tail: [],
        pos: this.playersInitPositions[i]
      }
      if (this.isMySocket(actor.socketId)) {
        this.playerRoomIndex = i
        this.playerDirection = this.playersInitDirections[i]
      }
      this.players.push(actor)
    }
  }

  getPlayer() {
    return this.players[this.playerRoomIndex]
  }

  isMySocket(socketId) {
    return socketClient.id === socketId
  }


  onUpdateSnakeRoomEvent(body) {
    if (body.roomId !== this.roomId) return
    const self = this // for map function
    if (this.isMySocket(body.fromSocketId)) {
      // this.playerDirection = body.direction
      // this.player.pos = this.pos_to_local_pos(body.player.head)
      // this.player.tail = body.player.tail.map(part => self.pos_to_local_pos(part))
      
    }
    else {
      // this.enemyDirection = body.direction
      this.players[body.playerRoomIndex].pos = this.pos_to_local_pos(body.player.head)
      this.players[body.playerRoomIndex].tail = body.player.tail.map(part => self.pos_to_local_pos(part))
    }
  }

  onSnakeCollidedRoomEvent(body) {
    if (body.roomId !== this.roomId) return
    const newState = {
      players: [...this.roomConfig.players]
    }
    newState.players[body.playerRoomIndex].lifesCount--
    this.setRoomConfig(newState)
    if (
      newState.players[body.playerRoomIndex].lifesCount === 0 &&
      this.playerRoomIndex === 0
    ) {
      socketClient.emit("ROOM_GAME_OVER", {
        roomId: this.roomId,
        players: newState.players
      })
    }
    else {
      this.draw_objects(this.players[body.playerRoomIndex].colors[0])
      this.preparePlayers()
    }
  }

  onSpawnAppleRoomEvent(body) {
    if (body.roomId !== this.roomId) return
    this.apple.pos = this.pos_to_local_pos(body.pos)
  }

  clear_map(clearColor) {
    this.ctx.fillStyle = clearColor
    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
  }

  draw_objects(clearColor = "black") {
    this.clear_map(clearColor)

    const apple = this.apple
    const pl = this.player
    const en = this.enemy

    // apple
    this.ctx.fillStyle = apple.color
    this.ctx.fillRect(apple.pos.x, apple.pos.y, this.CELL_SIZE, this.CELL_SIZE)

    // this.ctx.beginPath()
    // this.ctx.arc(apple.pos.x+this.CELL_SIZE/2, apple.pos.y+this.CELL_SIZE/2, this.CELL_SIZE/2, 0, Math.PI*2)
    // this.ctx.fill()
    
    for (let i = 0; i < this.players.length; i++) {
      const pl = this.players[i]
      // player tail
      this.ctx.fillStyle = pl.colors[1]
      for (let i = 0; i < pl.tail.length; i++) {
        let part = pl.tail[i]
        this.ctx.fillRect(part.x, part.y, this.CELL_SIZE, this.CELL_SIZE)
      }
      // player head
      this.ctx.fillStyle = pl.colors[0]
      this.ctx.fillRect(pl.pos.x, pl.pos.y, this.CELL_SIZE, this.CELL_SIZE)
      // player title
      let pl_title = `${pl.username} ${pl.tail.length + 1}`
      this.ctx.fillStyle = "white"
      this.ctx.fillText(
        pl_title,
        pl.pos.x - 5,
        pl.pos.y - 5
      )
    }

  }

  update_player_pos(player, direction) {
    const pl = { ...player }
    const speed = this.CELL_SIZE
    const prevPos = { x: pl.pos.x, y: pl.pos.y }
    switch (direction) {
      case "FORWARD":
        pl.pos.y -= speed
        break
      case "BACKWARD":
        pl.pos.y += speed
        break
      case "RIGHT":
        pl.pos.x += speed
        break
      case "LEFT":
        pl.pos.x -= speed
        break
      default:
        break
    }

    const intMapSize = this.CELL_SIZE * this.MAP_SIZE
    if (pl.pos.x < 0) {
      pl.pos.x = intMapSize - this.CELL_SIZE
    }
    if (pl.pos.x + this.CELL_SIZE > intMapSize) {
      pl.pos.x = 0
    }
    if (pl.pos.y < 0) {
      pl.pos.y = intMapSize - this.CELL_SIZE
    }
    if (pl.pos.y + this.CELL_SIZE > intMapSize) {
      pl.pos.y = 0
    }

    let prevTail = prevPos
    for (let i = pl.tail.length - 1; i >= 0; i--) {
      let tmp = pl.tail[i]
      pl.tail[i] = { x: prevTail.x, y: prevTail.y }
      prevTail = tmp
    }
  }

  pos_to_local_pos(pos) {
    return {
      x: pos.x*this.CELL_SIZE,
      y: pos.y*this.CELL_SIZE
    }
  }

  local_pos_to_pos(pos) {
    return {
      x: parseInt(pos.x/this.CELL_SIZE),
      y: parseInt(pos.y/this.CELL_SIZE)
    }
  }

  spawn_apple() {
    const x = parseInt(Math.random() * this.MAP_SIZE) * this.CELL_SIZE
    const y = parseInt(Math.random() * this.MAP_SIZE) * this.CELL_SIZE
    return { x, y }
  }

  is_collide_with_cell(target, obs) {
    return parseInt(target.x) === parseInt(obs.x) &&
      parseInt(target.y) === parseInt(obs.y)
  }

  check_player_collision() {
    const player = this.getPlayer()
    // with apple
    if (this.is_collide_with_cell(player.pos, this.apple.pos)) {

      socketClient.emit("SPAWN_APPLE", {
        roomId: this.roomId,
        fromSocketId: socketClient.id,
        pos: this.local_pos_to_pos(this.spawn_apple())
      })

      player.tail.push({
        x: player.pos.x,
        y: player.pos.y
      })
    }
    // with enemy tail
    for (let i = 0; i < this.players.length; i++) {
      if (i === this.playerRoomIndex)
        continue
      for (let j = 0; j < this.players[i].tail.length; j++) {
        let part = this.players[i].tail[j]
        if (this.is_collide_with_cell(player.pos, part)) {
          this.draw_objects(this.players[this.playerRoomIndex].colors[0])
          player.pos.x = -this.CELL_SIZE*100
          socketClient.emit("SNAKE_COLLIDED", {
            roomId: this.roomId,
            fromSocketId: socketClient.id,
            playerRoomIndex: this.playerRoomIndex,
          })
        }
      }
    }
  }

  gameOver() {
    socketClient.removeListener("UPDATE_SNAKE")
    socketClient.removeListener("SNAKE_COLLIDED")
    socketClient.removeListener("SPAWN_APPLE")
    clearInterval(this.gameLoop)
  }

  updatePlayerDirection(direction) {
    this.playerDirection = direction
  }
  
  update() {
    const player = this.getPlayer()

    this.check_player_collision()
    this.update_player_pos(player, this.playerDirection)
    // this.update_player_pos(this.enemy, this.enemyDirection)
    this.draw_objects()
    const self = this // for map function
    socketClient.emit("UPDATE_SNAKE", {
      roomId: this.roomId,
      fromSocketId: socketClient.id,
      direction: this.playerDirection,
      playerRoomIndex: this.playerRoomIndex,
      player: {
        head: this.local_pos_to_pos(player.pos),
        tail: player.tail.map(part => self.local_pos_to_pos(part))
      }
    })
  }

  onJoystickMove(direction) {
    this.updatePlayerDirection(direction)
  }

}