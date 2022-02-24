import { useEffect } from 'react';

export default function Timer({isActive, setIsActive, isPaused, setIsPaused, time, setTime}) {

  
  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
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
  
  return (
    <>
      <span className="digits">
        {("0" + Math.floor(time / 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor(time % 60)).slice(-2)}
      </span>
    </>
  );
}