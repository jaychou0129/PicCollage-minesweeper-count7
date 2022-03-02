import BackButton from "../components/BackButton";
import Board from "../components/Minesweeper/Board";

export default function Minesweeper() {
  return (
    <header className="App-header">
      <BackButton />
      <Board />
    </header>
  );
}
