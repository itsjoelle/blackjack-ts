import { Card } from './card';

export enum Suit {
  diamond = '♦',
  heart = '♥',
  club = '♣',
  spade = '♠',
}

export type Name =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PlayerAction = 'hit' | 'stand';
export interface CardData {
  readonly name: Name;
  readonly suit: Suit;
  readonly value: Value;

  getValue: () => Value;
  getName: () => Name;
  getSuit: () => Suit;
}

export interface DeckData {
  reset: () => void;
  createDeck: () => void;
  popTopCard: () => Card | undefined;
}
