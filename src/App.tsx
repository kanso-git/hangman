import React from 'react'

import './App.css'
import Hangman from './components/Hangman/Hangman'
import img0 from '../src/assets/images/0.jpg'
import img1 from '../src/assets/images/1.jpg'
import img2 from '../src/assets/images/2.jpg'
import img3 from '../src/assets/images/3.jpg'
import img4 from '../src/assets/images/4.jpg'
import img5 from '../src/assets/images/5.jpg'
import img6 from '../src/assets/images/6.jpg'

const App: React.FC = () => {
  const hangmanImages = [img0, img1, img2, img3, img4, img5, img6]
  return (
    <div className="App">
      <Hangman hangmanSecretLength={5} hangmanImages={hangmanImages} />
    </div>
  )
}

export default App
