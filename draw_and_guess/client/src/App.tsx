import { v4 as uuidv4 } from "uuid";
import Rooms from "./containers/Rooms";
import { useEffect } from "react";
import { setUserId, userId, username } from "./app/gamesSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Room from "./containers/Room";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Welcome from "./containers/Welcome";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const playerName = useAppSelector(username);
  const playerId = useAppSelector(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (playerName && !playerId) {
      const id = uuidv4();
      dispatch(setUserId(id));
    }
  }, []);

  if (!playerName) {
    navigate("/home");
  }

  return <div>{!playerName ? <Welcome /> : <Rooms />}</div>;
}
const App = () => {
  const routes = useRoutes([
    { path: "/room/:id", element: <Room /> },
    { path: "/home", element: <Rooms /> },
    { path: "/", element: <Home /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
