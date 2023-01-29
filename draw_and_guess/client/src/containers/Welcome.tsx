import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/form/Input";
import { setUserId, setUsername, userId } from "../app/gamesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/form/Button";

const Welcome = () => {
  const [localUsername, setLocalUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const playerId = useAppSelector(userId);

  const dispatch = useAppDispatch();

  function handleSetUsername() {
    dispatch(setUsername(localUsername));

    if (!playerId) {
      const id = uuidv4();
      dispatch(setUserId(id));
    }
  }
  return (
    <div>
      <div>Welcome to Draw-guess game Enjoy!</div>
      <Input
        onChange={(e) => {
          setLocalUsername(e.target.value);
        }}
        name="User name"
        label="Enter your name "
        type="text"
        value={localUsername}
      />
      <Button onClick={handleSetUsername}>Save</Button>
    </div>
  );
};

export default Welcome;
