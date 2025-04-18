import { Card } from '../card';
import { CardData, Name, Suit, Value } from '../types';

export const mockCard = (name: Name, suit: Suit, value: Value): CardData =>
  new Card(suit, name, value);

export const cards = [
  mockCard('2', Suit.diamond, 2),
  mockCard('A', Suit.spade, 3),
  mockCard('K', Suit.heart, 10),
  mockCard('Q', Suit.diamond, 10),
  mockCard('J', Suit.spade, 10),
  mockCard('10', Suit.heart, 10),
];
