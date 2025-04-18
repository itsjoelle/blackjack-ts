import { CardData, Name, Suit, Value } from './types';
export const suits: Suit[] = [Suit.diamond, Suit.heart, Suit.club, Suit.spade];

export const nums = [
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['10', 10],
];
export const faces = [
  ['J', 10],
  ['K', 10],
  ['Q', 10],
];

export class Card implements CardData {
  readonly suit: Suit;
  readonly name: Name;
  readonly value: Value;
  constructor(suit: Suit, name: Name, value: Value) {
    this.suit = suit;
    this.value = value;
    this.name = name;
  }

  getValue() {
    return this.value;
  }

  getName() {
    return this.name;
  }

  getSuit() {
    return this.suit;
  }
}
