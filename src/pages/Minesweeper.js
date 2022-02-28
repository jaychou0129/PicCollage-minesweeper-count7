import LinkButton from "../components/LinkButton";
import Board from "../components/Minesweeper/Board"

export default function Minesweeper() {
  return (
    <header className="App-header">
      <LinkButton
        to="/"
        variant="main"
        text="Back"
        style={{ position: "fixed", left: 5, top: 5 }}
      />
      <Board />
    </header>
  );
}