import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import man from './man.png';
import woman from './woman.png';
import boy from './boy.png';
import girl from './girl.png';
import olderman from './olderman.png';
import boy2 from './boy2.png';
import olderwoman from './olderwoman.png';
import boyaudio from './boy.mp3';
import girlaudio from './girl.mp3';
import manaudio from './Man.mp3';
import womanaudio from './woman.mp3';
import oldermanaudio from './olderman.mp3';
import boy2audio from './boy2.mp3';
import olderwomanaudio from './olderwoman.mp3';

const people = [
  { name: 'man', image: man, audio: manaudio },
  { name: 'woman', image: woman, audio: womanaudio },
  { name: 'boy', image: boy, audio: boyaudio },
  { name: 'girl', image: girl, audio: girlaudio },
  { name: 'olderman', image: olderman, audio: oldermanaudio },
  { name: 'boy2', image: boy2, audio: boy2audio },
  { name: 'olderwoman', image: olderwoman, audio: olderwomanaudio },
];

export default function GameContainer() {
  const [targetCount, setTargetCount] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const audioPlayedRef = useRef(false);

useEffect(() => {
  if (!audioPlayedRef.current) {
    startNewRound();
    audioPlayedRef.current = true;
  }
}, []);

  const startNewRound = () => {
    const randomPerson = people[Math.floor(Math.random() * people.length)];
    const count = Math.floor(Math.random() * 10) + 1;
    setTargetCount(count);
    setSelectedPerson(randomPerson);

    // Generate an array of numbers from 1 to 10 for options
    const numberOptions = Array.from({ length: 10 }, (_, i) => i + 1);
    setOptions(numberOptions);

    // Reset message and hide overlay
    setMessage('');
    setShowOverlay(false);

    // Play audio for the selected person
    const audio = new Audio(randomPerson.audio);
    audio.play();
  };

  const handleOptionClick = (number) => {
    if (number === targetCount) {
      setMessage(''); // Clear any previous message
      setShowOverlay(true); // Show overlay on correct answer
    } else {
      setMessage('Almost there!'); // Show gentle "try again" message
    }
  };

  const handleNextRound = () => {
    startNewRound();
  };

  return (

  <section>

    {!gameOpen && <div>
    <div id="startContainer">
      <h1 style={{fontSize: "40px"}} >My First Numbers</h1>
      <button id="startGame" onClick={() => setGameOpen(true)}>Start Game</button>
    </div>
    </div>}

    {gameOpen && <div>
    <div className="game-container">
      <h1 id="title">My First Numbers</h1>
      {selectedPerson && (
        <>
          <div className="images-container">
            {/* Render the images based on target count */}
            {Array.from({ length: targetCount }).map((_, i) => (
              <img className="profileImg" key={i} src={selectedPerson.image} alt={selectedPerson.name} />
            ))}
          </div>
        </>
      )}
      {message && <p className="message try-again">{message}</p>}
      <div className="options-container">
        {options.map((option) => (
          <p className="optionKey" key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </p>
        ))}
      </div>



      {/* Overlay for correct answer */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>That's right!</h2>
            <p id="correct">{targetCount}</p>
            <button className="nextRound" onClick={handleNextRound}>Next Round</button>
          </div>
        </div>
      )}
    </div>
    </div>}

  </section>
  );
}
