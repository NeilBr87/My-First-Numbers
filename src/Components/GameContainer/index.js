import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import john from './john.png';
import michele from './michele.png';
import neil from './neil.png';
import steph from './steph.png';
import leo from './leo.png';
import terence from './terence.png';
import anna from './anna.png';
import neilaudio from './neil.m4a';
import stephaudio from './steph.m4a';
import johnaudio from './john.m4a';
import micheleaudio from './michele.m4a';
import leoaudio from './leo.m4a';
import terenceaudio from './terence.m4a';
import annaaudio from './anna.m4a';

const people = [
  { name: 'John', image: john, audio: johnaudio },
  { name: 'Michele', image: michele, audio: micheleaudio },
  { name: 'Neil', image: neil, audio: neilaudio },
  { name: 'Steph', image: steph, audio: stephaudio },
  { name: 'Leo', image: leo, audio: leoaudio },
  { name: 'Terence', image: terence, audio: terenceaudio },
  { name: 'Anna', image: anna, audio: annaaudio },
];

export default function GameContainer() {
  const [targetCount, setTargetCount] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

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
    <div className="game-container">
      <h1 id="title">Leo's Counting Game!</h1>
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
  );
}
