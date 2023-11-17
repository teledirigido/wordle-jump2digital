import { useEffect, useState } from 'react'
import Word from './components/Word';
import initialWords from './data/initialWords.json';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
  
  const solution = "TIGRE";
  const [words, setWords] = useState(initialWords);
  
  const onKeyUp = (event) => {

    const wordsCopy = [...words];
    const allowedKey = /^[a-zA-Z]$/;
    const currentIndex = words.findIndex( item => !item.isChecked );

    // A - Z
    if ( event.key.match(allowedKey)) {

      wordsCopy[currentIndex].content += event.key.toUpperCase();
      setWords(wordsCopy);

    }


    // Enter
    if( event.key === 'Enter' ) {
      
      const wordToCheck = wordsCopy[currentIndex].content;
      
      fetch('/api/v1/is-word', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: wordToCheck })
      }).then( response => response.json() )
      .then( (data) => {
        if (data.result === 'error' ) {
          toast('The word does not exist! 🎉', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });

      wordsCopy[currentIndex].isChecked = true;

      Array.from(words[currentIndex].content).forEach( (letter, index) => {

        // Exact
        if ( letter === solution.charAt(index) ) {
          wordsCopy[currentIndex].status[index] = 'exact';
          // Includes
        } else if ( solution.includes(letter) ) {
          wordsCopy[currentIndex].status[index] = 'includes';
          // Error
        } else {
          wordsCopy[currentIndex].status[index] = 'error';
        }

      });

      if ( solution === wordsCopy[currentIndex].content ) {
        toast('You won the game! 🎉', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      setWords(wordsCopy);




    }

    // Backspace
    if ( event.key === 'Backspace' ) {
      const currentWord = wordsCopy[currentIndex].content;
      wordsCopy[currentIndex].content = currentWord.substring(0, currentWord.length - 1);
      setWords(wordsCopy);
    }

  };

  useEffect( () => {
    window.addEventListener('keyup', onKeyUp);
  }, []);

  return (
    <>
      <h2>La palabra del dia</h2>
      <div className="word-wrapper">
        {
          words.map( (item, index ) => {
            return (
              <Word word={item} key={index} />
            )
          })
        }
      </div>
      <ToastContainer />
    </>
  )
}

export default App
