import { useRef } from "react";
import { Joystick } from "react-joystick-component"
import { useSwipeable } from "react-swipeable"


const GameController = ({ onJoystickMove }) => {

  const swipeHandlers = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedUp: () => {
      onJoystickMove("FORWARD")
    },
    onSwipedDown: () => {
      onJoystickMove("BACKWARD")
    },
    onSwipedRight: () => {
      onJoystickMove("RIGHT")
    },
    onSwipedLeft: () => {
      onJoystickMove("LEFT")
    },
  })

  const swipeRef = useRef();

  const refPassthrough = (el) => {
    swipeHandlers.ref(el);
    swipeRef.current = el;
  }

  return (
    <div {...swipeHandlers} ref={refPassthrough} className="joystick_wrap">
        {/* <div className="joystick_row">
          <button onClick={() => onJoystickMove("FORWARD")}>T</button>
        </div>
        <div className="joystick_row">
          <button onClick={() => onJoystickMove("LEFT")}>L</button>
          <button>🐍</button>
          <button onClick={() => onJoystickMove("RIGHT")}>R</button>
        </div>
        <div className="joystick_row">
          <button onClick={() => onJoystickMove("BACKWARD")}>D</button>
        </div> */}
        
    </div>
  )
}

export default GameController