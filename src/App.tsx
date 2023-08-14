import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [messenger, setMessenger] = useState<string>("");
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [background, setBackground] = useState("");

  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputDisabled) {
      setGuess(event.target.value);
    }
  };
  console.log(randomNumber);
  // console.log(attempts);
  // console.log(inputDisabled);

  const handleSubmitGuess = () => {
    if (!inputDisabled) {
      const guessNumber = parseInt(guess);
      setPreviousGuesses([...previousGuesses, guess]);
      setAttempts(attempts + 1);
      if (guessNumber == randomNumber) {
        setMessenger("Congratulations! You got it right!");
        setBackground("green");
        setInputDisabled(true);
      } else if (guessNumber > randomNumber) {
        setMessenger("大きすぎます");
        setBackground("red");
      } else {
        setMessenger("小さすぎます");
        setBackground("red");
      }
      setGuess("");

      if (attempts >= 3 && guessNumber != randomNumber) {
        setMessenger("gameOver.Try again!");
        setBackground("yellow");
        setInputDisabled(true);
      } else if (attempts >= 3 && guessNumber == randomNumber) {
        setMessenger("Congratulations! You got it right!");
        setInputDisabled(true);
      }
    }
  };

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }, []);
  const handleStartNewGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessenger("");
    setPreviousGuesses([]);
    setAttempts(0);
    setInputDisabled(false);
  };
  return (
    <div className="container">
      <div className="box">
        {attempts === 4 && <p>Số ngẫu nhiên: {randomNumber}</p>}
        <h1>Number guessing game</h1>
        <p>
          We have selected a random number between 1 and 100. See if you can
          guess it in 4 turns or fewer. We'll tell you if your guess was too
          high or too low.
        </p>
        <div className="guess">
          <label htmlFor="guessContent">Enter a guess: </label>
          <input
            onChange={handleGuessChange}
            type="number"
            id="guessContent"
            className="guessContent"
            disabled={inputDisabled}
            value={guess}
          ></input>
          <input
            type="submit"
            className="guessSubmit"
            value="Submit guess"
            onClick={handleSubmitGuess}
            disabled={inputDisabled}
          ></input>
        </div>
        <div className="resultParas">
          {attempts > 0 && (
            <p className="guesses">
              Previous guesses:{previousGuesses.join(", ")}
            </p>
          )}
          <div style={{ background: `${background}`, color: " black" }}>
            <div>{messenger && <p>{messenger}</p>}</div>{" "}
          </div>
          {attempts === 4 && (
            <button className="startNew" onClick={handleStartNewGame}>
              Start new game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
