import { useGame } from "./GameContext";

export default function Field() {
  const { field } = useGame();
  return (
    <ul className="field">
      {field.map((hasMole, i) => (
        <Hole key={i} hasMole={hasMole} />
      ))}
    </ul>
  );
}

function Hole({ hasMole }) {
  const { whack } = useGame();
  if (hasMole) return <li onClick={whack} className="hole mole"></li>;
  return <li className="hole"></li>;
}
