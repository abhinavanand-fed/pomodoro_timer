import React, { useState } from "react";


const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    setIsRunning(true);
    setIntervalId(
      setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            stopTimer();
            return 0;
          }
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeLeft(1500);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
  };

  const handleHoursChange = event => {
    setHours(event.target.value);
  };

  const handleMinutesChange = event => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = event => {
    setSeconds(event.target.value);
  };

  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;
  return (
    <div className="container-fluid p-5 bg-light">
      <h1 className="text-center">
        {displayMinutes}:{displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
      </h1>
      <div className="form-group d-flex justify-content-center">
        <input
          type="number"
          value={hours}
          onChange={handleHoursChange}
          min="0"
          className="form-control m-2"
        />
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          min="0"
          className="form-control m-2"
        />
        <input
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          min="0"
          className="form-control m-2"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="btn btn-primary m-2"
        >
          Start
          </button>
        <button onClick={stopTimer} disabled={!isRunning} className="btn btn-danger m-2">
          Stop
        </button>
        <button onClick={resetTimer} className="btn btn-secondary m-2">
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
