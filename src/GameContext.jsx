import { createContext, useContext, useEffect, useRef, useState } from "react";

const NUM_HOLES = 9;
const TIME_LIMIT = 15;

const GameContext = createContext();

/** Game logic for Whack-a-Mole */
export function GameProvider({ children }) {
  const [field, setField] = useState(makeField());
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [playing, setPlaying] = useState(false);

  const [time, setTime] = useState(TIME_LIMIT);
  const timer = useRef();

  // Stop the game when timer reaches 0
  useEffect(() => {
    if (time <= 0) stop();
  }, [time]);

  /** Whacking a mole means making a new field and increasing the score */
  const whack = () => {
    setField(makeField(field));
    setScore(score + 1);
  };

  /** Starts a new game by resetting the score and field */
  const start = () => {
    setScore(0);
    setField(makeField());
    setPlaying(true);

    timer.current = setInterval(() => setTime((time) => time - 1), 1000);
  };

  // Why make this a separate function instead of letting components use `setPlaying`?
  // This allows us to add more game-stopping logic in the future in this one place
  // instead of having to rewrite all the components that would have used `setPlaying`.
  // ... such as updating the high scores!
  const stop = () => {
    setPlaying(false);

    const newScores = [...highScores, score].sort((a, z) => z - a);
    setHighScores(newScores.slice(0, 5));

    clearInterval(timer.current);
    setTime(TIME_LIMIT);
  };

  const value = {
    field,
    score,
    highScores,
    playing,
    time,
    whack,
    start,
    stop,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw Error("Game context must be used within GameProvider.");
  return context;
}

/** @returns {boolean[]} false = hole, true = mole */
function makeField(field = Array(NUM_HOLES).fill(false)) {
  // Create an array containing the indexes of all holes
  const holes = field.reduce((holes, isMole, i) => {
    if (!isMole) holes.push(i);
    return holes;
  }, []);
  const mole = holes[Math.floor(Math.random() * holes.length)];

  const newField = Array(NUM_HOLES).fill(false);
  newField[mole] = true;
  return newField;
}
