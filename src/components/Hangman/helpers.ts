import { IHangmanButton } from './hangmanButton'

const randomWords = require('random-english-words')
///import  {generateHangmanBtns,generateHangmanImages} from  './heplers'
export const generateHangmanBtns = (): IHangmanButton[] => {
  let btns: IHangmanButton[] = []
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach((v, i) => {
    btns.push({
      text: v,
      isDisabled: false
    })
  })

  return btns
}

export const getLetterIndexesInSecret = (
  secret: string,
  lettre: string
): number[] => {
  let indexes: number[] = []
  secret.split('').forEach((v, i) => {
    if (v === lettre) {
      indexes.push(i)
    }
  })
  return indexes
}

export const generateSercret = (len: number): string => {
  return randomWords({ minChars: 5, maxChars: 5 }) as string
}
