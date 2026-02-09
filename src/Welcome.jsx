import { useGame } from "./GameContext";

export default function Welcome() {
  const { start, highScores } = useGame();
  return (
    <>
      <section className="welcome">
        <p>Welcome to Whack a Mole!</p>
        <p>Whack a mole to earn points.</p>
        <p>How many can you get?</p>
        <button onClick={start}>Play</button>
      </section>
      <section className="highscores">
        <h2>High Scores</h2>
        <ul>
          {highScores.length > 0 ? (
            highScores.map((score, i) => <li key={i}>{score}</li>)
          ) : (
            <li>None yet... Play the game!</li>
          )}
        </ul>
      </section>
    </>
  );
}
