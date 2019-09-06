import './Hangman.css'
import React, { Component } from 'react'
import { HangmanProps } from './hangmanProps'
import { HangmanStates } from './hangmanStates'

import {
  generateHangmanBtns,
  getLetterIndexesInSecret,
  generateSercret
} from './helpers'
import { HangmanStatus } from './hangmanStatus'

export default class Hangman extends Component<HangmanProps, HangmanStates> {
  state = {
    hangmanBtns: generateHangmanBtns(),
    hangmanImageIndex: 0,
    hangmanStatus: HangmanStatus.runing,
    hangmanWord: Array(this.props.hangmanSecretLength).fill('-'),
    hangmanTryNum: this.props.hangmanSecretLength + 1,
    hangmanSecret: generateSercret(this.props.hangmanSecretLength)
  }

  playAgain = () => {
    // get new words
    this.setState({
      hangmanBtns: generateHangmanBtns(),
      hangmanImageIndex: 0,
      hangmanStatus: HangmanStatus.runing,
      hangmanWord: Array(this.props.hangmanSecretLength).fill('-'),
      hangmanTryNum: this.props.hangmanSecretLength + 1,
      hangmanSecret: generateSercret(this.props.hangmanSecretLength)
    })
  }
  getHangmanStatus = (remaing: number, status: HangmanStatus): JSX.Element => {
    let msg = ''
    if (remaing === 0) {
      msg = 'Looser'
    } else if (status === HangmanStatus.game_won) {
      msg = 'Winner!!!!'
    }
    return (
      <div>
        <h1>{msg}</h1>
        <button style={{ width: 150, height: 40 }} onClick={this.playAgain}>
          Play Again
        </button>
      </div>
    )
  }

  btnClick = (e: React.MouseEvent, btnIndex: number, val: string): void => {
    const {
      hangmanSecret,
      hangmanBtns,
      hangmanWord,
      hangmanImageIndex,
      hangmanTryNum,
      hangmanStatus
    } = this.state
    const indexesMatch = getLetterIndexesInSecret(hangmanSecret, val)
    let newHangmanImageIndex = hangmanImageIndex
    let newHangmanTryNum = hangmanTryNum
    let hangmanWordCopy = [...hangmanWord]
    let newHangmanStatus = hangmanStatus

    if (indexesMatch.length === 0) {
      newHangmanImageIndex++
      newHangmanTryNum--
    } else {
      indexesMatch.forEach(i => {
        hangmanWordCopy.splice(i, 1, val)
      })
    }
    const hangmanBtnsCopy = hangmanBtns.map(b => {
      if (b.text === val) {
        b.isDisabled = true
      }
      return b
    })

    if (newHangmanTryNum === 0) {
      newHangmanStatus = HangmanStatus.game_over
    }
    if (
      newHangmanTryNum > 0 &&
      hangmanWordCopy.join('') === this.state.hangmanSecret
    ) {
      newHangmanStatus = HangmanStatus.game_won
    }
    this.setState({
      hangmanBtns: hangmanBtnsCopy,
      hangmanWord: hangmanWordCopy,
      hangmanImageIndex: newHangmanImageIndex,
      hangmanTryNum: newHangmanTryNum,
      hangmanStatus: newHangmanStatus
    })
  }
  render() {
    const {
      hangmanBtns,
      hangmanWord,
      hangmanImageIndex,
      hangmanTryNum,
      hangmanStatus,
      hangmanSecret
    } = this.state
    const { hangmanImages } = this.props
    console.log(hangmanWord)
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        {/* Hangman img */}
        <img
          src={hangmanImages[hangmanImageIndex]}
          alt={`ìmg${hangmanImageIndex}`}
        ></img>

        <div className="Hangman-word">
          {hangmanWord.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
        {/* div.Hangman-word */}
        {hangmanTryNum === 0 && (
          <div className="Hangman-word-secret">
            <span>Secret Was:</span>
            {hangmanSecret.split('').map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        )}

        {/* div.Hangman-btns */}
        {hangmanTryNum > 0 && hangmanStatus === HangmanStatus.runing ? (
          <div className="Hangman-btns">
            {hangmanBtns.map((b, i) => (
              <button
                key={i}
                disabled={b.isDisabled}
                onClick={e => this.btnClick(e, i, b.text)}
              >
                {b.text}
              </button>
            ))}
          </div>
        ) : (
          this.getHangmanStatus(hangmanTryNum, hangmanStatus)
        )}
      </div>
    )
  }
}
