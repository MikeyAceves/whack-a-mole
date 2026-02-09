import { useGame } from "./GameContext";

export default function Scoreboard() {
  const { score, time, stop } = useGame();
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Time: {time}</p>
      <button onClick={stop}>Restart</button>
    </div>
  );
}
