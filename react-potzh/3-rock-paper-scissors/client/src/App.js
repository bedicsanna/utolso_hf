import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3030");

export function App() {
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [tip, setTip] = useState(null);
  const [otherTip, setOtherTip] = useState(null);
  const [result, setResult] = useState(null);
  const [overAll, setOverAll] = useState({
    you: 0,
    other: 0,
  });

  const handleJoin = () => {
    socket.emit("join-game")
  }

  const handleChange = (e) => {
    setTip(e.target.value)
    setDisabled(true)
    socket.emit("tip", e.target.value)
  }

  useEffect(() => {
    socket.on("join-game-response", () => {
      setJoined(true)
      setWaiting(true)
    });
    socket.on("game-started", () => {
      setJoined(true)
      setWaiting(false)
      setDisabled(false)
    });
    socket.on("tip-response", (data) => {
      setOtherTip(data["lastRound"]["other"])
      setResult(data["lastRound"]["result"])
      setOverAll(data["overAll"])

      setTimeout(() => {
        setDisabled(false)
        setOtherTip(null)
        setTip(null)
      }, 5000);
    });
    socket.on("game-over", () => {
      setJoined(false)
      setWaiting(false)
    });
    socket.on("error", (message) => {
      setError(message)
    });
  }, []);

  if (error !== null){
    <div>{error}</div>
    setTimeout(() => {
      setError(null)
    }, 6000);
  }

  if (!joined) return <Button onClick={handleJoin} variant="contained">Join game</Button>
  else if (joined && waiting) return "Waiting..."
  return (
    <>
      <Button onClick={() => socket.emit("leave-game")} variant="outlined" color="error">
        Leave game
      </Button>
      <Grid container spacing={1}>
        <Grid item xs={12} md={5}>
          <Box>
            <h3>You: {overAll.you}</h3>
            <ToggleButtonGroup value={tip} onChange={handleChange} disabled={disabled} color="primary" exclusive>
              <ToggleButton value="rock">Rock</ToggleButton>
              <ToggleButton value="paper">Paper</ToggleButton>
              <ToggleButton value="scissors">Scissors</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box>
            <h3>Result</h3>
            {result !== null ? result : ""}
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <h3>Other: {overAll.other}</h3>
            <ToggleButtonGroup
              color="secondary"
              value={otherTip}
              exclusive
              disabled
            >
              <ToggleButton value="rock">Rock</ToggleButton>
              <ToggleButton value="paper">Paper</ToggleButton>
              <ToggleButton value="scissors">Scissors</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
