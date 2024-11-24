import { useState } from 'react';
import './style.css';
import GameContainer from '../GameContainer'
export default function Container() {
  
  let passwordEncoded = "trexroar";
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [attempts , setAttempts] = useState(0);
  // function to check the password

  function checkPassword() {
    let input = document.querySelector("input").value;
    if (input === passwordEncoded) {
      setPasswordCorrect(true);
    } else {
      setPasswordCorrect(false);
      setAttempts(attempts + 1);
    }
  }
  
  
  return (
    <div>
      
    {!passwordCorrect && (
      <div id="passwordBox">        
        <h2>Input the password</h2>
        <div id="passwordRow">
        <input id="passwordField" type="password" />
        <button id="submit" onClick={checkPassword}>Submit</button>
        </div>  
      </div>
    )}
       {passwordCorrect && <GameContainer />}
       {attempts > 0 && !passwordCorrect && <p>Incorrect password. Attempts: {attempts}</p>}

    </div>
  );
}