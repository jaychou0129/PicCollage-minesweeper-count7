import Square from "./Square";
import { useState, useEffect } from "react";
import ConfigToolbar from "./ConfigToolbar";
import MessageModal from "../MessageModal";
import { deepCopy, calculateCount } from "../../scripts/helpers";
import {
  initializeBoard,
  propagateOpening,
} from "../../scripts/Minesweeper_scripts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import Timer from "./Timer";
import useWindowDimensions from "../../scripts/useWindowDimensions";

export default function Board() {
  const [gameOver, setGameOver] = useState(false);

  const [gameConfig, setGameConfig] = useState({
    dimension: 16,
    numBombs: 40,
  });

  const [board, setBoard] = useState({
    setup: new Array(gameConfig.dimension).fill(
      new Array(gameConfig.dimension).fill("")
    ),
    initialized: false,
  });

  const [gameState, setGameState] = useState({
    cellStates: new Array(gameConfig.dimension).fill(
      new Array(gameConfig.dimension).fill(0)
    ),
    numUnflipped: gameConfig.dimension * gameConfig.dimension,
    numFlags: 0,
  });

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const { height, width } = useWindowDimensions();

  useEffect(resetGame, [gameConfig]);

  useEffect(() => {
    if (gameState.numUnflipped === gameConfig.numBombs) {
      setGameOver(true);

      const timeString =
        ("0" + Math.floor(time / 60)).slice(-2) +
        ":" +
        ("0" + Math.floor(time % 60)).slice(-2);
      setMessage("You Won!\nTime: " + timeString);
      setShowModal(true);
    }
  }, [gameState.numUnflipped]);

  useEffect(() => {
    if (gameOver) {
      let cellStates = deepCopy(gameState.cellStates);
      let flipArray = [];
      for (let i = 0; i < gameConfig.dimension; i++) {
        for (let j = 0; j < gameConfig.dimension; j++) {
          if (cellStates[i][j] !== 1 && board.setup[i][j] === "BOMB") {
            flipArray.push(`${i}-${j}`);
          }
        }
      }
      flipCells(cellStates, flipArray);
      handlePauseResume();
    }
  }, [gameOver]);

  const flipCells = (cellStates, flipArray) => {
    if (flipArray.length === 0) return;
    const [x, y] = flipArray[0].split("-");
    flipArray.shift();
    setTimeout(() => {
      cellStates[x][y] = 1;
      setGameState({ ...gameState, cellStates: cellStates });
      flipCells(cellStates, flipArray);
    }, 50);
  };

  function resetGame() {
    setBoard({
      ...board,
      initialized: false,
      setup: new Array(gameConfig.dimension).fill(
        new Array(gameConfig.dimension).fill("")
      ),
    });
    setGameState({
      ...gameState,
      cellStates: new Array(gameConfig.dimension).fill(
        new Array(gameConfig.dimension).fill(0)
      ),
      numUnflipped: gameConfig.dimension * gameConfig.dimension,
      numFlags: 0,
    });
    setGameOver(false);
    handleReset();
  }

  const cellClickedHandler = (x, y) => {
    if (gameOver) return;

    let cellStates = deepCopy(gameState.cellStates);
    if (!board.initialized) {
      let b = deepCopy(board.setup);
      initializeBoard(b, x, y, gameConfig);
      setBoard({
        setup: b,
        initialized: true,
      });
      propagateOpening(
        b,
        cellStates,
        x,
        y,
        gameConfig,
        gameState,
        setGameState
      );
      handleStart();
    } else {
      if (board.setup[x][y] === "BOMB") {
        setGameOver(true);
        setMessage("You Lost!");
        setShowModal(true);
      }
      propagateOpening(
        board.setup,
        cellStates,
        x,
        y,
        gameConfig,
        gameState,
        setGameState
      );
    }
  };

  const cellFlaggedHandler = (x, y) => {
    if (gameOver) return;

    let cellStates = deepCopy(gameState.cellStates);
    if (cellStates[x][y] === 0) cellStates[x][y] = -1;
    else if (cellStates[x][y] === -1) cellStates[x][y] = 0;
    setGameState({
      ...gameState,
      cellStates: cellStates,
      numFlags: calculateCount(cellStates, -1),
    });
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <>
      <ConfigToolbar
        easyButtonHandler={() => setGameConfig({ dimension: 9, numBombs: 10 })}
        mediumButtonHandler={() =>
          setGameConfig({ dimension: 16, numBombs: 40 })
        }
        hardButtonHandler={() =>
          setGameConfig({ dimension: 22, numBombs: 100 })
        }
        sizeValue={gameConfig.dimension}
        bombValue={gameConfig.numBombs}
        restartHandler={() => {
          setGameConfig({ ...gameConfig });
          handleReset();
        }}
      />
      <div>
        <Row>
          <Col style={{ float: "left" }}>
            <h3>🚩 {gameConfig.numBombs - gameState.numFlags}</h3>
          </Col>
          <Col style={{ float: "right" }}>
            <h3>
              <FontAwesomeIcon icon={faHourglass} />{" "}
              <Timer
                isActive={isActive}
                isPaused={isPaused}
                time={time}
                setTime={setTime}
              />
            </h3>
          </Col>
        </Row>
        <div className="board-container">
          {board.setup.map((row, row_id) => {
            return (
              <div className="board-row" key={row_id}>
                {row.map((cell, col_id) => {
                  return (
                    <Square
                      key={row_id + "-" + col_id}
                      content={cell}
                      flipped={gameState.cellStates[row_id][col_id]}
                      flip={() => cellClickedHandler(row_id, col_id)}
                      flag={() => cellFlaggedHandler(row_id, col_id)}
                      fontSize={
                        ((Math.min(width, height) * 0.85) /
                          gameConfig.dimension) *
                          0.5 +
                        "px"
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <MessageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        message={message}
      />
    </>
  );
}
