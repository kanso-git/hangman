import { IHangmanButton } from './hangmanButton'
import { HangmanStatus } from './hangmanStatus'

export interface HangmanStates {
  hangmanBtns: IHangmanButton[]
  hangmanImageIndex: number
  hangmanStatus: HangmanStatus
  hangmanWord: string[]
  hangmanTryNum: number
  hangmanSecret: string
}
