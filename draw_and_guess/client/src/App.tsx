
import styles from "./styles/Home.module.css";
import { v4 as uuidv4 } from 'uuid';
import RoomsContainer from "./containers/Rooms";
import { useEffect, useState } from "react";
import { setUserId, setUsername, userId, username } from "./app/gamesSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Room from "./containers/Room";
import Rooms from "./containers/Rooms";


function Home() {
  const dispatch = useAppDispatch();
  const playerName = useAppSelector(username)
  const playerId = useAppSelector(userId)
  const [localUsername, setLocalUsername] = useState(localStorage.getItem("username"))
  function handleSetUsername() {
    dispatch(setUsername(localUsername));
    if (!playerId) {
      const id = uuidv4()
      dispatch(setUserId(id))
    }
  
  }

  useEffect(() => {
    if (playerName && !playerId) {
      const id = uuidv4()
      dispatch(setUserId(id))

    }
  }, []);

  return (
    <div>
      {!playerName && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" onChange={(e) => { setLocalUsername(e.target.value) }} />
            <button className="cta" onClick={handleSetUsername}>
              START
            </button>
          </div>
        </div>
      )}
      {playerId && playerName && (
        <div className={styles.container}>
          <RoomsContainer />
        </div>
      )}
    </div>
  );
}
const App = () => {
  const routes = useRoutes([
    { path: '/room', element: <Room /> },
    { path: '/home', element: <Rooms /> },
    { path: '/', element: <Home /> }
  ])
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper