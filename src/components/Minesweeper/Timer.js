import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const Time = forwardRef((_, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formattedTime = () => {
    return (
      ("0" + Math.floor(time / 60)).slice(-2) +
      ":" +
      ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  useImperativeHandle(ref, () => ({
    resetTimer: handleReset,
    stopTimer: handleStop,
    startTimer: handleStart,
    time: formattedTime,
  }));

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return <span>{formattedTime()}</span>;
});

export default Time;
